"""Descriptive, non-causal analysis for the animal-label cohort."""

from __future__ import annotations

import csv
import random
import statistics
import tempfile
from collections import Counter, defaultdict
from collections.abc import Iterable
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

from .models import (
    AnimalPresence,
    ImageRecord,
    ManualReview,
    QualityScore,
    VisionResult,
    WineProduct,
)
from .storage import read_models, write_json_atomic
from .taxonomy import animal_categories, normalize_animal_name

ROW_FIELDS = [
    "product_id",
    "product_number",
    "name",
    "subtitle",
    "producer",
    "country",
    "wine_type",
    "wine_subtype",
    "vintage",
    "price_sek",
    "volume_ml",
    "price_per_750ml_sek",
    "animal_presence",
    "animal_names",
    "animal_categories",
    "taxon_groups",
    "classification_source",
    "vision_models",
    "quality_score",
    "score_scale_min",
    "score_scale_max",
    "quality_score_0_100",
    "score_source",
    "score_observed_at",
    "score_review_count",
    "score_scope",
    "score_match_confidence",
    "score_source_record_id",
]


def _latest_results(path: Path, model_filter: str | None) -> dict[tuple[str, int], VisionResult]:
    latest: dict[tuple[str, int], VisionResult] = {}
    if not path.exists():
        return latest
    for result in read_models(path, VisionResult):
        if model_filter and result.model != model_filter:
            continue
        key = (result.product_id, result.image_index)
        if key not in latest or result.assessed_at > latest[key].assessed_at:
            latest[key] = result
    return latest


def _validate_image_bindings(
    products: list[WineProduct],
    results: dict[tuple[str, int], VisionResult],
    reviews: dict[tuple[str, int], ManualReview],
    image_manifest_path: Path | None,
) -> dict[str, Any]:
    """Bind every measurement and correction to the currently downloaded image hash."""
    if image_manifest_path is None or not image_manifest_path.exists():
        if results or reviews:
            raise ValueError(
                "An image manifest is required when vision results or manual reviews are present"
            )
        return {
            "image_manifest": str(image_manifest_path) if image_manifest_path else None,
            "image_record_n": 0,
            "validated_vision_result_n": 0,
            "validated_manual_review_n": 0,
        }

    expected_images = {
        (product.product_id, image_index): product_image.base_url
        for product in products
        for image_index, product_image in enumerate(product.images)
    }
    images: dict[tuple[str, int], ImageRecord] = {}
    for image in read_models(image_manifest_path, ImageRecord):
        key = (image.product_id, image.image_index)
        if key in images:
            raise ValueError(f"Duplicate image manifest record for {key!r}")
        if key not in expected_images:
            raise ValueError(f"Image manifest record is outside the current cohort: {key!r}")
        if image.image_base_url != expected_images[key]:
            raise ValueError(f"Stale image source URL for product/image {key!r}")
        images[key] = image

    for key, result in results.items():
        image = images.get(key)
        if image is None:
            raise ValueError(f"Vision result has no current image manifest record for {key!r}")
        if result.image_sha256 != image.sha256:
            raise ValueError(f"Stale vision result hash for product/image {key!r}")
    for key, review in reviews.items():
        image = images.get(key)
        if image is None:
            raise ValueError(f"Manual review has no current image manifest record for {key!r}")
        if review.image_sha256 != image.sha256:
            raise ValueError(f"Stale manual review hash for product/image {key!r}")

    return {
        "image_manifest": str(image_manifest_path),
        "image_record_n": len(images),
        "validated_vision_result_n": len(results),
        "validated_manual_review_n": len(reviews),
    }


def _product_classification(
    product: WineProduct,
    results: dict[tuple[str, int], VisionResult],
    reviews: dict[tuple[str, int], ManualReview],
) -> dict[str, str]:
    expected = len(product.images)
    states: list[AnimalPresence] = []
    names: set[str] = set()
    groups: set[str] = set()
    sources: set[str] = set()
    models: set[str] = set()

    invalid_review_indexes = [
        index
        for review_product, index in reviews
        if review_product == product.product_id and index >= expected
    ]
    if invalid_review_indexes:
        raise ValueError(
            f"Manual review indexes exceed available images for {product.product_id}: "
            f"{invalid_review_indexes}"
        )

    for image_index in range(expected):
        key = (product.product_id, image_index)
        result = results.get(key)
        review = reviews.get(key)
        if review is not None:
            if result is None:
                raise ValueError(f"Manual review has no matching AI result for {key!r}")
            if review.image_sha256 != result.image_sha256:
                raise ValueError(f"Stale manual review hash for product/image {key!r}")
            states.append(review.animal_presence)
            names.update(normalize_animal_name(value) for value in review.animal_names)
            groups.update(str(value) for value in review.taxon_groups)
            models.add(result.model)
            sources.add("manual")
            continue
        if result is None:
            continue
        states.append(result.assessment.animal_presence)
        models.add(result.model)
        sources.add("ai")
        if result.assessment.animal_presence == AnimalPresence.PRESENT:
            names.update(
                normalize_animal_name(detection.animal_name)
                for detection in result.assessment.detections
            )
            groups.update(str(detection.taxon_group) for detection in result.assessment.detections)

    if AnimalPresence.PRESENT in states:
        presence = AnimalPresence.PRESENT
    elif expected == 0 or len(states) < expected or AnimalPresence.UNCERTAIN in states:
        presence = AnimalPresence.UNCERTAIN
    else:
        presence = AnimalPresence.ABSENT

    return {
        "animal_presence": str(presence),
        "animal_names": ";".join(sorted(names)),
        "animal_categories": ";".join(sorted(animal_categories(names, groups))),
        "taxon_groups": ";".join(sorted(groups)),
        "classification_source": "+".join(sorted(sources)) or "none",
        "vision_models": ";".join(sorted(models)),
    }


def build_rows(
    products: Iterable[WineProduct],
    results: dict[tuple[str, int], VisionResult],
    scores: dict[str, QualityScore],
    reviews: dict[tuple[str, int], ManualReview],
) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for product in products:
        classification = _product_classification(product, results, reviews)
        score = scores.get(product.product_id)
        rows.append(
            {
                "product_id": product.product_id,
                "product_number": product.product_number or "",
                "name": product.name,
                "subtitle": product.subtitle or "",
                "producer": product.producer or "",
                "country": product.country,
                "wine_type": product.wine_type or "",
                "wine_subtype": product.wine_subtype or "",
                "vintage": product.vintage if product.vintage is not None else "",
                "price_sek": product.price_sek,
                "volume_ml": product.volume_ml,
                "price_per_750ml_sek": product.price_per_750ml_sek,
                **classification,
                "quality_score": score.quality_score if score else "",
                "score_scale_min": score.scale_min if score else "",
                "score_scale_max": score.scale_max if score else "",
                "quality_score_0_100": score.normalized_score_0_100 if score else "",
                "score_source": score.score_source if score else "",
                "score_observed_at": score.observed_at.isoformat() if score else "",
                "score_review_count": (
                    score.review_count if score and score.review_count is not None else ""
                ),
                "score_scope": score.score_scope if score and score.score_scope else "",
                "score_match_confidence": (
                    score.match_confidence if score and score.match_confidence is not None else ""
                ),
                "score_source_record_id": (
                    score.source_record_id if score and score.source_record_id else ""
                ),
            }
        )
    return rows


def _numbers(rows: Iterable[dict[str, Any]], field: str) -> list[float]:
    return [float(row[field]) for row in rows if row.get(field) not in (None, "")]


def _describe(rows: list[dict[str, Any]]) -> dict[str, Any]:
    prices = _numbers(rows, "price_sek")
    standardized_prices = _numbers(rows, "price_per_750ml_sek")
    scores = _numbers(rows, "quality_score_0_100")

    def stats(values: list[float]) -> dict[str, float | int | None]:
        return {
            "n": len(values),
            "mean": statistics.fmean(values) if values else None,
            "median": statistics.median(values) if values else None,
            "standard_deviation": statistics.stdev(values) if len(values) > 1 else None,
        }

    return {
        "product_n": len(rows),
        "animal_present_n": sum(row["animal_presence"] == AnimalPresence.PRESENT for row in rows),
        "listed_price_sek": stats(prices),
        "price_per_750ml_sek": stats(standardized_prices),
        "quality_score_0_100": stats(scores),
    }


def _percentile(values: list[float], probability: float) -> float:
    ordered = sorted(values)
    position = (len(ordered) - 1) * probability
    lower = int(position)
    upper = min(lower + 1, len(ordered) - 1)
    fraction = position - lower
    return ordered[lower] * (1 - fraction) + ordered[upper] * fraction


def _comparison(
    rows: list[dict[str, Any]],
    metric: str,
    *,
    iterations: int,
    seed: int,
    score_source: str | None = None,
) -> dict[str, Any]:
    eligible = [row for row in rows if not score_source or row["score_source"] == score_source]
    animal = _numbers(
        [row for row in eligible if row["animal_presence"] == AnimalPresence.PRESENT], metric
    )
    no_animal = _numbers(
        [row for row in eligible if row["animal_presence"] == AnimalPresence.ABSENT], metric
    )
    result: dict[str, Any] = {
        "metric": metric,
        "score_source": score_source,
        "animal_n": len(animal),
        "no_animal_n": len(no_animal),
        "mean_difference_animal_minus_no_animal": None,
        "bootstrap_95pct_ci": None,
        "permutation_p_value_two_sided": None,
    }
    if not animal or not no_animal:
        return result

    observed = statistics.fmean(animal) - statistics.fmean(no_animal)
    result["mean_difference_animal_minus_no_animal"] = observed
    if min(len(animal), len(no_animal)) < 2 or iterations <= 0:
        return result

    rng = random.Random(seed)
    bootstrapped = []
    for _ in range(iterations):
        animal_sample = rng.choices(animal, k=len(animal))
        no_animal_sample = rng.choices(no_animal, k=len(no_animal))
        bootstrapped.append(statistics.fmean(animal_sample) - statistics.fmean(no_animal_sample))
    result["bootstrap_95pct_ci"] = [
        _percentile(bootstrapped, 0.025),
        _percentile(bootstrapped, 0.975),
    ]

    pooled = animal + no_animal
    extreme = 0
    for _ in range(iterations):
        shuffled = pooled.copy()
        rng.shuffle(shuffled)
        difference = statistics.fmean(shuffled[: len(animal)]) - statistics.fmean(
            shuffled[len(animal) :]
        )
        if abs(difference) >= abs(observed):
            extreme += 1
    result["permutation_p_value_two_sided"] = (extreme + 1) / (iterations + 1)
    return result


def summarize(
    rows: list[dict[str, Any]],
    *,
    iterations: int = 5000,
    seed: int = 20250308,
    unmatched_score_ids: list[str] | None = None,
) -> dict[str, Any]:
    by_presence: dict[str, list[dict[str, Any]]] = defaultdict(list)
    by_taxon: dict[str, list[dict[str, Any]]] = defaultdict(list)
    by_animal_name: dict[str, list[dict[str, Any]]] = defaultdict(list)
    by_animal_category: dict[str, list[dict[str, Any]]] = defaultdict(list)
    by_wine_type: dict[str, list[dict[str, Any]]] = defaultdict(list)
    by_country: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for row in rows:
        by_presence[row["animal_presence"]].append(row)
        by_wine_type[row["wine_type"] or "missing"].append(row)
        by_country[row["country"] or "missing"].append(row)
        if row["animal_presence"] == AnimalPresence.PRESENT:
            for group in row["taxon_groups"].split(";"):
                if group:
                    by_taxon[group].append(row)
            for animal_name in row["animal_names"].split(";"):
                if animal_name:
                    by_animal_name[animal_name].append(row)
            for category in row["animal_categories"].split(";"):
                if category:
                    by_animal_category[category].append(row)

    group_summaries = []
    for dimension, groups in (
        ("animal_presence", by_presence),
        ("taxon_group", by_taxon),
        ("animal_name", by_animal_name),
        ("animal_category", by_animal_category),
        ("wine_type", by_wine_type),
        ("country", by_country),
    ):
        for label, group_rows in sorted(groups.items()):
            group_summaries.append(
                {"dimension": dimension, "group": label, **_describe(group_rows)}
            )

    score_sources = sorted({row["score_source"] for row in rows if row["score_source"]})
    comparisons = [
        _comparison(rows, "price_per_750ml_sek", iterations=iterations, seed=seed),
        _comparison(rows, "quality_score_0_100", iterations=iterations, seed=seed + 1),
    ]
    if len(score_sources) > 1:
        comparisons.extend(
            _comparison(
                rows,
                "quality_score_0_100",
                iterations=iterations,
                seed=seed + index + 2,
                score_source=source,
            )
            for index, source in enumerate(score_sources)
        )

    warnings = [
        (
            "Associations are descriptive and do not establish that animal imagery causes "
            "price or quality."
        ),
        "Products with missing/unclear imagery are uncertain, never assumed to have no animal.",
        ("Individual-animal rankings are non-exclusive and can be unstable for small groups."),
        (
            "Price is standardized to 750 ml; wine type, country, vintage, producer, and "
            "assortment may confound comparisons."
        ),
    ]
    if not score_sources:
        warnings.append(
            "No external quality scores were matched; Systembolaget's product payload has "
            "no critic score."
        )
    if len(score_sources) > 1:
        warnings.append(
            "Multiple score sources are present; pooled normalized scores may not be "
            "substantively comparable."
        )
    score_scopes = Counter(row["score_scope"] for row in rows if row["score_scope"])
    vision_models = Counter(
        model for row in rows for model in row["vision_models"].split(";") if model
    )
    if score_scopes.get("wine"):
        warnings.append(
            "Wine-level scores pool ratings across vintages and are not vintage-specific outcomes."
        )
    if len(vision_models) > 1:
        warnings.append(
            "Multiple vision models are present; rerun with --vision-model for a single-model "
            "measurement dataset."
        )

    return {
        "schema_version": "1.0",
        "generated_at": datetime.now(UTC).isoformat(),
        "cohort": {
            "product_n": len(rows),
            "presence_counts": dict(
                sorted(Counter(row["animal_presence"] for row in rows).items())
            ),
            "products_with_scores": sum(bool(row["score_source"]) for row in rows),
            "score_source_counts": dict(
                sorted(Counter(row["score_source"] for row in rows if row["score_source"]).items())
            ),
            "score_scope_counts": dict(sorted(score_scopes.items())),
            "vision_model_product_counts": dict(sorted(vision_models.items())),
            "unmatched_score_product_ids": sorted(unmatched_score_ids or []),
        },
        "method": {
            "primary_price_metric": "price_per_750ml_sek",
            "score_metric": "quality_score normalized to 0-100 using declared source scale",
            "bootstrap_iterations": iterations,
            "permutation_iterations": iterations,
            "random_seed": seed,
            "uncertain_excluded_from_binary_comparisons": True,
        },
        "group_summaries": group_summaries,
        "comparisons": comparisons,
        "warnings": warnings,
    }


def _write_csv_atomic(path: Path, rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(
        "w", encoding="utf-8", newline="", prefix=f".{path.name}.", dir=path.parent, delete=False
    ) as handle:
        temporary = Path(handle.name)
        writer = csv.DictWriter(handle, fieldnames=ROW_FIELDS, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)
    temporary.replace(path)


def _format_number(value: Any) -> str:
    return "—" if value is None else f"{value:.2f}"


def _format_interval(value: list[float] | None) -> str:
    if value is None:
        return "—"
    return f"[{_format_number(value[0])}, {_format_number(value[1])}]"


def render_markdown(summary: dict[str, Any]) -> str:
    cohort = summary["cohort"]
    lines = [
        "# Systembolaget wine animal-label analysis",
        "",
        f"Generated: {summary['generated_at']}",
        "",
        "## Cohort",
        "",
        f"- Products: **{cohort['product_n']}**",
        f"- Presence counts: `{cohort['presence_counts']}`",
        f"- Products with external quality scores: **{cohort['products_with_scores']}**",
        f"- Score sources: `{cohort['score_source_counts']}`",
        f"- Score scopes: `{cohort['score_scope_counts']}`",
        f"- Vision models: `{cohort['vision_model_product_counts']}`",
        "",
        "## Animal presence summaries",
        "",
        "| Group | N | Mean SEK/750 ml | Median SEK/750 ml | Score N | Mean score (0–100) |",
        "|---|---:|---:|---:|---:|---:|",
    ]
    for group in summary["group_summaries"]:
        if group["dimension"] != "animal_presence":
            continue
        price = group["price_per_750ml_sek"]
        score = group["quality_score_0_100"]
        lines.append(
            f"| {group['group']} | {group['product_n']} | {_format_number(price['mean'])} | "
            f"{_format_number(price['median'])} | {score['n']} | {_format_number(score['mean'])} |"
        )

    lines.extend(["", "## Animal taxon summaries", ""])
    taxon_groups = [
        group for group in summary["group_summaries"] if group["dimension"] == "taxon_group"
    ]
    if not taxon_groups:
        lines.append("No products with confirmed animal imagery were available.")
    else:
        lines.extend(
            [
                "| Taxon group | N | Mean SEK/750 ml | Mean score (0–100) |",
                "|---|---:|---:|---:|",
            ]
        )
        for group in taxon_groups:
            lines.append(
                f"| {group['group']} | {group['product_n']} | "
                f"{_format_number(group['price_per_750ml_sek']['mean'])} | "
                f"{_format_number(group['quality_score_0_100']['mean'])} |"
            )

    animal_name_groups = [
        group for group in summary["group_summaries"] if group["dimension"] == "animal_name"
    ]
    lines.extend(["", "## Individual animal imagery rankings", ""])
    if not animal_name_groups:
        lines.append("No individually identified animal imagery was available.")
    else:
        price_ranked = sorted(
            animal_name_groups,
            key=lambda group: group["price_per_750ml_sek"]["mean"] or float("-inf"),
            reverse=True,
        )
        score_ranked = sorted(
            (
                group
                for group in animal_name_groups
                if group["quality_score_0_100"]["mean"] is not None
            ),
            key=lambda group: group["quality_score_0_100"]["mean"],
            reverse=True,
        )
        price_ranks = {group["group"]: rank for rank, group in enumerate(price_ranked, 1)}
        score_ranks = {group["group"]: rank for rank, group in enumerate(score_ranked, 1)}
        lines.extend(
            [
                "| Animal imagery | N | Price rank | Mean SEK/750 ml | Score rank | "
                "Score N | Mean score (0–100) |",
                "|---|---:|---:|---:|---:|---:|---:|",
            ]
        )
        for group in price_ranked:
            score_rank = score_ranks.get(group["group"])
            lines.append(
                f"| {group['group']} | {group['product_n']} | "
                f"{price_ranks[group['group']]} | "
                f"{_format_number(group['price_per_750ml_sek']['mean'])} | "
                f"{score_rank if score_rank is not None else '—'} | "
                f"{group['quality_score_0_100']['n']} | "
                f"{_format_number(group['quality_score_0_100']['mean'])} |"
            )

    lines.extend(
        [
            "",
            "## Wine-type summaries",
            "",
            "| Wine type | N | Mean SEK/750 ml | Animal present | Score N |",
            "|---|---:|---:|---:|---:|",
        ]
    )
    wine_type_groups = [
        group for group in summary["group_summaries"] if group["dimension"] == "wine_type"
    ]
    for group in wine_type_groups:
        lines.append(
            f"| {group['group']} | {group['product_n']} | "
            f"{_format_number(group['price_per_750ml_sek']['mean'])} | "
            f"{group['animal_present_n']} | {group['quality_score_0_100']['n']} |"
        )

    lines.extend(["", "## Exploratory animal vs no-animal comparisons", ""])
    for comparison in summary["comparisons"]:
        source = f" ({comparison['score_source']})" if comparison["score_source"] else ""
        lines.append(
            f"- `{comparison['metric']}`{source}: n={comparison['animal_n']} vs "
            f"{comparison['no_animal_n']}; mean difference = "
            f"{_format_number(comparison['mean_difference_animal_minus_no_animal'])}; "
            f"bootstrap 95% CI = {_format_interval(comparison['bootstrap_95pct_ci'])}; "
            f"permutation p = {_format_number(comparison['permutation_p_value_two_sided'])}."
        )

    lines.extend(["", "## Interpretation limits", ""])
    lines.extend(f"- {warning}" for warning in summary["warnings"])
    lines.append("")
    return "\n".join(lines)


def run_analysis(
    products_path: Path,
    vision_path: Path,
    scores: dict[str, QualityScore],
    reviews: dict[tuple[str, int], ManualReview],
    *,
    dataset_output: Path,
    summary_output: Path,
    report_output: Path,
    image_manifest_path: Path | None = Path("data/interim/images.jsonl"),
    model_filter: str | None = None,
    iterations: int = 5000,
    seed: int = 20250308,
) -> dict[str, Any]:
    products = list(read_models(products_path, WineProduct))
    product_ids = {product.product_id for product in products}
    results = _latest_results(vision_path, model_filter)
    unknown_result_ids = sorted({key[0] for key in results} - product_ids)
    if unknown_result_ids:
        raise ValueError(
            f"Vision results contain products outside the cohort: {unknown_result_ids}"
        )
    unknown_review_ids = sorted({key[0] for key in reviews} - product_ids)
    if unknown_review_ids:
        raise ValueError(
            f"Manual reviews contain products outside the cohort: {unknown_review_ids}"
        )
    image_binding = _validate_image_bindings(products, results, reviews, image_manifest_path)
    rows = build_rows(products, results, scores, reviews)
    summary = summarize(
        rows,
        iterations=iterations,
        seed=seed,
        unmatched_score_ids=sorted(set(scores) - product_ids),
    )
    summary["method"]["image_hash_binding"] = image_binding
    _write_csv_atomic(dataset_output, rows)
    write_json_atomic(summary_output, summary)
    report_output.parent.mkdir(parents=True, exist_ok=True)
    report_output.write_text(render_markdown(summary), encoding="utf-8")
    return summary
