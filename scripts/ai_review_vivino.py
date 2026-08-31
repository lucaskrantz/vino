#!/usr/bin/env python3
"""Conservatively adjudicate ambiguous Vivino identities with a structured text model.

Score values and rating counts are deliberately excluded from the prompt so outcome knowledge
cannot influence identity decisions. Decisions are hash-bound to the exact lookup response and
remain explicitly AI-assisted rather than human validation.
"""

from __future__ import annotations

import argparse
import json
import os
import time
from datetime import UTC, datetime
from pathlib import Path
from typing import Literal

from openai import OpenAI
from pydantic import BaseModel, Field

from vino_animals.models import WineProduct
from vino_animals.storage import append_jsonl, read_models
from vino_animals.vivino import (
    IdentityReviewDecision,
    LookupStatus,
    VivinoCandidate,
    VivinoIdentityReview,
    VivinoLookup,
)

PROMPT_VERSION = "vivino-identity-review-1.0"
SYSTEM_PROMPT = """You are reviewing entity matches between a Swedish retailer wine listing and
Vivino candidates. Decide identity only. You never see or infer ratings.

ACCEPT only when a candidate is clearly the same commercial wine/cuvee. Word order, accents,
translation, a legal producer versus consumer brand, and vintage mismatch may differ without
changing wine identity. A shared winery, grape, region, or generic name alone is not enough.
Reserve, Leyenda, single-vineyard, colour, grape, and other cuvee designations are identity-bearing:
do not silently map a different variant. Reject country conflicts. Reject brand-only target names
when the candidate adds an unsupported cuvee. When none of the supplied candidates is clearly the
same wine, reject. Be conservative: uncertainty means reject.

Return one decision for every input product. For acceptance, candidate_rank must identify one of
the supplied candidates. For rejection, candidate_rank must be null. Use confidence to express
confidence in your adjudication, not the source matcher."""

ReasonCode = Literal[
    "exact_commercial_identity",
    "equivalent_name_or_brand",
    "different_cuvee_or_variant",
    "country_conflict",
    "brand_only_ambiguous",
    "insufficient_identity_evidence",
    "no_candidate_matches",
]


class ReviewDecision(BaseModel):
    product_id: str
    decision: Literal["accept", "reject"]
    candidate_rank: int | None = None
    reason_code: ReasonCode
    confidence: float = Field(ge=0, le=1)
    rationale: str = Field(min_length=1, max_length=300)


class ReviewBatch(BaseModel):
    decisions: list[ReviewDecision]


def latest_lookups(path: Path) -> dict[str, VivinoLookup]:
    latest: dict[str, VivinoLookup] = {}
    for lookup in read_models(path, VivinoLookup):
        previous = latest.get(lookup.product_id)
        if previous is None or lookup.fetched_at > previous.fetched_at:
            latest[lookup.product_id] = lookup
    return latest


def current_reviews(path: Path) -> dict[tuple[str, str, str], VivinoIdentityReview]:
    reviews: dict[tuple[str, str, str], VivinoIdentityReview] = {}
    if not path.exists():
        return reviews
    for review in read_models(path, VivinoIdentityReview):
        key = (review.product_id, review.matcher_version, review.response_sha256)
        previous = reviews.get(key)
        if previous is None or review.reviewed_at > previous.reviewed_at:
            reviews[key] = review
    return reviews


def candidate_payload(candidate: VivinoCandidate) -> dict[str, object]:
    return {
        "candidate_rank": candidate.rank,
        "wine_name": candidate.wine_name,
        "winery_name": candidate.winery_name,
        "country_code": candidate.country_code,
        "country_name": candidate.country_name,
        "region_name": candidate.region_name,
        "vintage": candidate.vintage,
        "vintage_match": candidate.vintage_match,
        "hard_conflicts": candidate.hard_conflicts,
    }


def input_payload(lookup: VivinoLookup, product: WineProduct) -> dict[str, object]:
    return {
        "product_id": lookup.product_id,
        "systembolaget": {
            "name": product.name,
            "subtitle": product.subtitle,
            "producer": product.producer,
            "country": product.country,
            "wine_type": product.wine_type,
            "vintage": product.vintage,
        },
        "search_query": lookup.query,
        "lookup_warnings": lookup.warnings,
        "candidates": [candidate_payload(candidate) for candidate in lookup.candidates[:3]],
    }


def chunks(values: list[VivinoLookup], size: int) -> list[list[VivinoLookup]]:
    return [values[index : index + size] for index in range(0, len(values), size)]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--lookups", type=Path, default=Path("data/external/vivino_lookups.jsonl"))
    parser.add_argument("--products", type=Path, default=Path("data/interim/products.jsonl"))
    parser.add_argument(
        "--output", type=Path, default=Path("data/manual/vivino_identity_reviews.jsonl")
    )
    parser.add_argument("--matcher-version", default="1.2")
    parser.add_argument("--model", default="openai/gpt-5.6-luna")
    parser.add_argument("--batch-size", type=int, default=30)
    args = parser.parse_args()

    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        raise SystemExit("Set OPENROUTER_API_KEY before running AI-assisted review")
    products = {product.product_id: product for product in read_models(args.products, WineProduct)}
    lookups = latest_lookups(args.lookups)
    existing = current_reviews(args.output)
    pending = [
        lookup
        for lookup in lookups.values()
        if lookup.matcher_version == args.matcher_version
        and lookup.status == LookupStatus.NEEDS_REVIEW
        and lookup.response_sha256 is not None
        and (lookup.product_id, lookup.matcher_version, lookup.response_sha256) not in existing
    ]
    pending.sort(key=lambda lookup: lookup.product_id)
    if not pending:
        print("No pending Vivino identity reviews.")
        return

    client = OpenAI(
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1",
        default_headers={
            "HTTP-Referer": "https://github.com/vino-animals/vino-animals",
            "X-Title": "vino-animals identity review",
        },
    )
    accepted = rejected = 0
    for batch_number, batch in enumerate(chunks(pending, args.batch_size), start=1):
        payload = [input_payload(lookup, products[lookup.product_id]) for lookup in batch]
        response = None
        for attempt in range(3):
            try:
                response = client.chat.completions.parse(
                    model=args.model,
                    messages=[
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {
                            "role": "user",
                            "content": "Adjudicate these identity records:\n"
                            + json.dumps(payload, ensure_ascii=False, separators=(",", ":")),
                        },
                    ],
                    response_format=ReviewBatch,
                    max_completion_tokens=10_000,
                    extra_body={"reasoning": {"effort": "none", "exclude": True}},
                )
                break
            except Exception:
                if attempt == 2:
                    raise
                time.sleep(2**attempt)
        if response is None:  # pragma: no cover - defensive
            raise RuntimeError("Review provider returned no response")
        parsed = response.choices[0].message.parsed
        if parsed is None:
            raise RuntimeError("Review provider returned no parsed decisions")
        by_product = {decision.product_id: decision for decision in parsed.decisions}
        expected = {lookup.product_id for lookup in batch}
        if set(by_product) != expected or len(parsed.decisions) != len(expected):
            raise ValueError("Review response did not contain exactly one decision per product")

        reviewed_at = datetime.now(UTC)
        for lookup in batch:
            decision = by_product[lookup.product_id]
            candidates_by_rank = {candidate.rank: candidate for candidate in lookup.candidates}
            candidate = (
                candidates_by_rank.get(decision.candidate_rank)
                if decision.candidate_rank is not None
                else None
            )
            accept = decision.decision == "accept"
            safety_reason: str | None = None
            if accept and candidate is None:
                raise ValueError(f"Unknown candidate rank for {lookup.product_id}")
            if accept and candidate and candidate.hard_conflicts:
                accept = False
                safety_reason = "country_conflict"
            if accept and "brand_only_query_requires_review" in lookup.warnings:
                accept = False
                safety_reason = "brand_only_ambiguous"
            if accept and decision.confidence < 0.85:
                accept = False
                safety_reason = "insufficient_identity_evidence"

            final_candidate = candidate if accept else None
            review = VivinoIdentityReview(
                product_id=lookup.product_id,
                matcher_version=lookup.matcher_version,
                response_sha256=lookup.response_sha256 or "",
                decision=(
                    IdentityReviewDecision.ACCEPT if accept else IdentityReviewDecision.REJECT
                ),
                candidate_rank=final_candidate.rank if final_candidate else None,
                vivino_wine_id=final_candidate.vivino_wine_id if final_candidate else None,
                vivino_vintage_id=(final_candidate.vivino_vintage_id if final_candidate else None),
                reviewer="openrouter-structured-review",
                review_method="conservative_ai_identity_review",
                review_model=args.model,
                prompt_version=PROMPT_VERSION,
                response_id=getattr(response, "id", None),
                review_confidence=decision.confidence,
                reviewed_at=reviewed_at,
                reason_code=safety_reason or decision.reason_code,
                notes=decision.rationale,
            )
            append_jsonl(args.output, review)
            if accept:
                accepted += 1
            else:
                rejected += 1
        print(
            f"Reviewed batch {batch_number}: {len(batch)} records; "
            f"accepted={accepted}, rejected={rejected}"
        )

    print(f"Completed AI-assisted identity review: accepted={accepted}, rejected={rejected}")


if __name__ == "__main__":
    main()
