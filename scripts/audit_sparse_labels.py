#!/usr/bin/env python3
"""Audit sparse animal categories and explain their Vivino score gaps.

This is a read-only diagnostic: it never promotes a likely sibling label or a
rescue-search candidate into the research datasets without image/identity review.
"""

from __future__ import annotations

import argparse
import csv
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

from vino_animals.storage import read_models
from vino_animals.vivino import (
    IdentityReviewDecision,
    LookupStatus,
    VivinoIdentityReview,
    VivinoLookup,
    _candidate_from_review,
    _score_from_lookup,
)


def rows(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


def normalized(value: str) -> str:
    folded = unicodedata.normalize("NFKD", value.casefold()).encode("ascii", "ignore").decode()
    return " ".join("".join(char if char.isalnum() else " " for char in folded).split())


def latest_models(path: Path, model: type) -> dict[str, object]:
    latest: dict[str, object] = {}
    for record in read_models(path, model):
        previous = latest.get(record.product_id)
        timestamp = record.fetched_at if isinstance(record, VivinoLookup) else record.reviewed_at
        if previous is None:
            latest[record.product_id] = record
            continue
        previous_timestamp = (
            previous.fetched_at if isinstance(previous, VivinoLookup) else previous.reviewed_at
        )
        if timestamp > previous_timestamp:
            latest[record.product_id] = record
    return latest


def gap_reason(
    product_id: str,
    lookups: dict[str, VivinoLookup],
    reviews: dict[str, VivinoIdentityReview],
    *,
    allow_wine_level: bool,
) -> str:
    lookup = lookups.get(product_id)
    if lookup is None:
        return "no_lookup"
    if lookup.status == LookupStatus.ERROR:
        return "lookup_error"
    if lookup.status == LookupStatus.NO_MATCH or lookup.selected is None:
        return "no_candidates"
    review = reviews.get(product_id)
    if review and review.decision == IdentityReviewDecision.REJECT:
        return "identity_rejected"
    if lookup.status == LookupStatus.NEEDS_REVIEW and review is None:
        return "identity_unreviewed"
    candidate = _candidate_from_review(lookup, review) if review else lookup.selected
    if candidate is None:
        return "identity_rejected"
    approved = bool(review and review.decision == IdentityReviewDecision.ACCEPT)
    if not approved and candidate.match_confidence < 0.82:
        return "identity_low_confidence"
    score = _score_from_lookup(
        lookup,
        allow_wine_level=allow_wine_level,
        candidate=candidate,
        identity_approved=approved,
    )
    if score is not None:
        return "scored" if score[1] >= 5 else "fewer_than_5_reviews"
    if lookup.product_vintage is not None and not allow_wine_level:
        if candidate.vintage_match != "exact":
            return "no_exact_vintage_returned"
        if candidate.is_wine_rating is not False:
            return "exact_result_is_wine_average"
    if allow_wine_level and candidate.wine_rating is None:
        return "no_wine_rating"
    return "no_rating"


def write_csv(path: Path, values: list[dict[str, object]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fields = list(values[0]) if values else ["product_id"]
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(values)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--categories", default="fox,pig,deer")
    parser.add_argument(
        "--dataset", type=Path, default=Path("data/processed/research_dataset_wine_level.csv")
    )
    parser.add_argument("--lookups", type=Path, default=Path("data/external/vivino_lookups.jsonl"))
    parser.add_argument(
        "--reviews", type=Path, default=Path("data/manual/vivino_identity_reviews.jsonl")
    )
    parser.add_argument(
        "--report", type=Path, default=Path("reports/sparse-label-audit.md")
    )
    parser.add_argument(
        "--gaps", type=Path, default=Path("reports/sparse-label-score-gaps.csv")
    )
    parser.add_argument(
        "--label-candidates", type=Path, default=Path("reports/sparse-label-candidates.csv")
    )
    parser.add_argument(
        "--rescue-pilot", type=Path, default=Path("reports/sparse-label-vivino-rescue-pilot.csv")
    )
    args = parser.parse_args()

    categories = [value.strip() for value in args.categories.split(",") if value.strip()]
    dataset = rows(args.dataset)
    animal_rows = [row for row in dataset if row["animal_presence"] == "present"]
    lookups = latest_models(args.lookups, VivinoLookup)
    reviews = latest_models(args.reviews, VivinoIdentityReview)

    category_rows: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in animal_rows:
        for category in row["animal_categories"].split(";"):
            if category in categories:
                category_rows[category].append(row)

    gap_rows: list[dict[str, object]] = []
    for category in categories:
        for row in category_rows[category]:
            gap_rows.append(
                {
                    "category": category,
                    "product_id": row["product_id"],
                    "name": row["name"],
                    "subtitle": row["subtitle"],
                    "vintage": row["vintage"],
                    "primary_status": gap_reason(
                        row["product_id"], lookups, reviews, allow_wine_level=False
                    ),
                    "wine_level_status": gap_reason(
                        row["product_id"], lookups, reviews, allow_wine_level=True
                    ),
                }
            )
    write_csv(args.gaps, gap_rows)

    # A same-name/subtitle sibling is an audit lead, not proof: vintages and package
    # images can differ. This catches likely omissions without keyword false positives.
    candidate_rows: list[dict[str, object]] = []
    seen: set[tuple[str, str]] = set()
    for category in categories:
        seed_keys = {
            (normalized(row["name"]), normalized(row["subtitle"]))
            for row in category_rows[category]
        }
        for row in dataset:
            if category in row["animal_categories"].split(";"):
                continue
            if (normalized(row["name"]), normalized(row["subtitle"])) not in seed_keys:
                continue
            key = (category, row["product_id"])
            if key in seen:
                continue
            seen.add(key)
            candidate_rows.append(
                {
                    "category": category,
                    "product_id": row["product_id"],
                    "name": row["name"],
                    "subtitle": row["subtitle"],
                    "producer": row["producer"],
                    "current_presence": row["animal_presence"],
                    "current_animals": row["animal_names"],
                    "reason": "same normalized name and subtitle as a confirmed category member",
                }
            )
    write_csv(args.label_candidates, candidate_rows)

    lines = [
        "# Sparse animal-label and score audit",
        "",
        (
            "This audit is diagnostic. Candidate siblings and rescue searches require visual "
            "or identity review before entering canonical data."
        ),
        "",
        "## Representation and score coverage",
        "",
        (
            "| Category | Confirmed wines | Primary scores | Primary coverage | "
            "Across-vintage scores | Across-vintage coverage |"
        ),
        "|---|---:|---:|---:|---:|---:|",
    ]
    for category in categories:
        values = category_rows[category]
        primary = Counter(
            gap_reason(row["product_id"], lookups, reviews, allow_wine_level=False)
            for row in values
        )
        sensitivity = Counter(
            gap_reason(row["product_id"], lookups, reviews, allow_wine_level=True)
            for row in values
        )
        total = len(values)
        lines.append(
            f"| {category} | {total} | {primary['scored']} | {primary['scored'] / total:.1%} | "
            f"{sensitivity['scored']} | {sensitivity['scored'] / total:.1%} |"
        )

    lines.extend(["", "## Why primary scores are missing", ""])
    for category in categories:
        reasons = Counter(
            gap_reason(row["product_id"], lookups, reviews, allow_wine_level=False)
            for row in category_rows[category]
        )
        detail = ", ".join(f"{key.replace('_', ' ')}: {value}" for key, value in reasons.items())
        lines.append(f"- **{category}:** {detail}.")

    lines.extend(
        [
            "",
            (
                "The dominant primary-only loss is the exact-vintage rule. It is not evidence "
                "that the wine has no rating: the existing across-vintage export recovers many "
                "of those rows. Identity rejections and empty search results dominate the "
                "residual sparse-category gap."
            ),
            "",
            "## Possible missed labels",
            "",
            f"The sibling check found **{len(candidate_rows)}** products. Of these, "
            f"**{sum(row['current_presence'] == 'uncertain' for row in candidate_rows)}** are "
            "uncertain (usually no usable Systembolaget image) and "
            f"**{sum(row['current_presence'] == 'absent' for row in candidate_rows)}** are "
            "currently absent, and "
            f"**{sum(row['current_presence'] == 'present' for row in candidate_rows)}** are "
            "present under a different animal category. See "
            f"`{args.label_candidates}`.",
            "",
            (
                "These are leads rather than automatic additions. In particular, alternate "
                "packaging can hide a label that is visible on another SKU, while a reused "
                "product name does not guarantee reused artwork."
            ),
        ]
    )

    if args.rescue_pilot.exists():
        pilot = rows(args.rescue_pilot)
        exact = [row for row in pilot if row.get("exact_score_candidate") == "True"]
        current_sensitivity = {
            row["product_id"]
            for row in rows(Path("data/external/vivino_quality_scores_wine_level.csv"))
        }
        new_wine = [
            row
            for row in pilot
            if row.get("wine_score_candidate") == "True"
            and row["product_id"] not in current_sensitivity
        ]
        lines.extend(
            [
                "",
                "## Producer-assisted Vivino rescue pilot",
                "",
                (
                    f"A hash-recorded pilot queried the **{len(pilot)}** sparse-category "
                    "products missing a primary score with producer + consumer title. It "
                    f"returned **{len(exact)}** exact-vintage candidates and "
                    f"**{len(new_wine)}** wine-level candidates absent from the current "
                    "sensitivity export."
                ),
                "",
                (
                    "The clearest failure is the two Systembolaget SKUs for **The Butcher "
                    "Pinot Noir 2023**: the current title-only query selected an unrelated "
                    "French wine and was correctly rejected; adding producer `Schwarz` "
                    "returned `The Butcher Pinot Noir` by `Johann Schwarz`, exact 2023, 54 "
                    "vintage ratings, with identity confidence 1.0. This proves that at least "
                    "part of the sparse pig score gap is search recall, not absent ratings."
                ),
                "",
                (
                    "All pilot candidates remain outside canonical exports pending identity "
                    "review. Some high-scoring candidates are different cuvées (for example "
                    "Clos Cantenac versus Petit Cantenac), demonstrating why query expansion "
                    "must not bypass adjudication."
                ),
            ]
        )

    lines.extend(
        [
            "",
            "## Recommended process change",
            "",
            (
                "1. Visually adjudicate the sibling-label queue, prioritizing uncertain "
                "duplicate listings and alternate packaging."
            ),
            (
                "2. Add a versioned Vivino rescue stage only for unresolved identities or "
                "missing exact vintages: title-only first, then producer + title, then title + "
                "target vintage."
            ),
            (
                "3. Preserve every response hash and rerun the existing identity review; never "
                "auto-accept solely because a rescue result has a rating."
            ),
            (
                "4. Keep exact-vintage and across-vintage outcomes separate and report both "
                "numerator and denominator per category."
            ),
            "",
        ]
    )
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {args.report}, {args.gaps}, and {args.label_candidates}")


if __name__ == "__main__":
    main()
