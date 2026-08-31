"""Explicit adapters for external quality scores and human image reviews."""

from __future__ import annotations

import csv
from pathlib import Path
from typing import TextIO

from .models import AnimalPresence, ManualReview, QualityScore, TaxonGroup

_SCORE_COLUMNS = {
    "product_id",
    "quality_score",
    "scale_min",
    "scale_max",
    "score_source",
    "observed_at",
    "source_url",
}
_REVIEW_COLUMNS = {
    "product_id",
    "image_index",
    "image_sha256",
    "animal_presence",
    "animal_names",
    "taxon_groups",
    "reviewer",
    "reviewed_at",
    "notes",
}


def _validated_reader(handle: TextIO, path: Path, expected_columns: set[str]) -> csv.DictReader:
    reader = csv.DictReader(handle)
    missing = expected_columns - set(reader.fieldnames or [])
    if missing:
        raise ValueError(f"{path} is missing columns: {', '.join(sorted(missing))}")
    return reader


def read_quality_scores(path: Path) -> dict[str, QualityScore]:
    if not path.exists():
        return {}
    scores: dict[str, QualityScore] = {}
    with path.open(encoding="utf-8-sig", newline="") as handle:
        reader = _validated_reader(handle, path, _SCORE_COLUMNS)
        for line_number, row in enumerate(reader, start=2):
            product_id = row["product_id"].strip()
            if not product_id:
                raise ValueError(f"Missing product_id at {path}:{line_number}")
            if product_id in scores:
                raise ValueError(f"Duplicate product_id {product_id!r} in {path}")
            score = float(row["quality_score"])
            scale_min = float(row["scale_min"])
            scale_max = float(row["scale_max"])
            if scale_max <= scale_min:
                raise ValueError(f"Invalid score scale at {path}:{line_number}")
            normalized = (score - scale_min) / (scale_max - scale_min) * 100
            review_count = (row.get("review_count") or "").strip()
            match_confidence = (row.get("match_confidence") or "").strip()
            scores[product_id] = QualityScore(
                product_id=product_id,
                quality_score=score,
                scale_min=scale_min,
                scale_max=scale_max,
                normalized_score_0_100=normalized,
                score_source=row["score_source"].strip(),
                observed_at=row["observed_at"].strip(),
                source_url=row["source_url"].strip() or None,
                review_count=int(review_count) if review_count else None,
                score_scope=(row.get("score_scope") or "").strip() or None,
                match_confidence=(float(match_confidence) if match_confidence else None),
                source_record_id=(row.get("source_record_id") or "").strip() or None,
            )
    return scores


def _split_list(value: str) -> list[str]:
    return [item.strip() for item in value.split(";") if item.strip()]


def read_manual_reviews(path: Path) -> dict[tuple[str, int], ManualReview]:
    if not path.exists():
        return {}
    reviews: dict[tuple[str, int], ManualReview] = {}
    with path.open(encoding="utf-8-sig", newline="") as handle:
        reader = _validated_reader(handle, path, _REVIEW_COLUMNS)
        for line_number, row in enumerate(reader, start=2):
            product_id = row["product_id"].strip()
            if not product_id:
                raise ValueError(f"Missing product_id at {path}:{line_number}")
            image_index = int(row["image_index"])
            key = (product_id, image_index)
            if key in reviews:
                raise ValueError(f"Duplicate review {key!r} in {path}")
            reviews[key] = ManualReview(
                product_id=product_id,
                image_index=image_index,
                image_sha256=row["image_sha256"].strip(),
                animal_presence=AnimalPresence(row["animal_presence"].strip()),
                animal_names=_split_list(row["animal_names"]),
                taxon_groups=[TaxonGroup(value) for value in _split_list(row["taxon_groups"])],
                reviewer=row["reviewer"].strip(),
                reviewed_at=row["reviewed_at"].strip(),
                notes=row["notes"].strip(),
            )
    return reviews
