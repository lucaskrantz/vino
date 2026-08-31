"""Create a human-review queue without discarding original AI measurements."""

from __future__ import annotations

import csv
import tempfile
from pathlib import Path
from typing import Any

from .models import AnimalPresence, ImageRecord, VisionResult
from .storage import read_models

REVIEW_QUEUE_FIELDS = [
    "product_id",
    "image_index",
    "image_sha256",
    "animal_presence",
    "animal_names",
    "taxon_groups",
    "reviewer",
    "reviewed_at",
    "notes",
    "local_path",
    "ai_model",
    "ai_prompt_version",
    "ai_label_visibility",
    "ai_confidence",
    "ai_needs_review",
    "queue_reason",
    "ai_evidence",
]


def _latest_results(path: Path, model_filter: str | None) -> dict[tuple[str, int], VisionResult]:
    latest: dict[tuple[str, int], VisionResult] = {}
    for result in read_models(path, VisionResult):
        if model_filter and result.model != model_filter:
            continue
        key = (result.product_id, result.image_index)
        if key not in latest or result.assessed_at > latest[key].assessed_at:
            latest[key] = result
    return latest


def create_review_queue(
    image_manifest: Path,
    vision_results: Path,
    output_path: Path,
    *,
    confidence_threshold: float = 0.8,
    model_filter: str | None = None,
    include_all: bool = False,
) -> int:
    images = {
        (image.product_id, image.image_index, image.sha256): image
        for image in read_models(image_manifest, ImageRecord)
    }
    results = _latest_results(vision_results, model_filter)
    rows: list[dict[str, Any]] = []
    for _key, result in sorted(results.items()):
        reasons: list[str] = []
        assessment = result.assessment
        if assessment.animal_presence == AnimalPresence.UNCERTAIN:
            reasons.append("uncertain")
        if assessment.needs_review:
            reasons.append("model_flag")
        if assessment.confidence < confidence_threshold:
            reasons.append("low_confidence")
        if not include_all and not reasons:
            continue
        image = images.get((result.product_id, result.image_index, result.image_sha256))
        if image is None:
            reasons.append("image_manifest_mismatch")
        rows.append(
            {
                "product_id": result.product_id,
                "image_index": result.image_index,
                "image_sha256": result.image_sha256,
                "animal_presence": str(assessment.animal_presence),
                "animal_names": ";".join(
                    sorted({detection.animal_name for detection in assessment.detections})
                ),
                "taxon_groups": ";".join(
                    sorted({str(detection.taxon_group) for detection in assessment.detections})
                ),
                "reviewer": "",
                "reviewed_at": "",
                "notes": "",
                "local_path": image.local_path if image else "",
                "ai_model": result.model,
                "ai_prompt_version": result.prompt_version,
                "ai_label_visibility": str(assessment.label_visibility),
                "ai_confidence": assessment.confidence,
                "ai_needs_review": assessment.needs_review,
                "queue_reason": ";".join(reasons) or "audit_sample",
                "ai_evidence": " | ".join(
                    detection.evidence for detection in assessment.detections
                ),
            }
        )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(
        "w",
        encoding="utf-8",
        newline="",
        prefix=f".{output_path.name}.",
        dir=output_path.parent,
        delete=False,
    ) as handle:
        temporary = Path(handle.name)
        writer = csv.DictWriter(handle, fieldnames=REVIEW_QUEUE_FIELDS)
        writer.writeheader()
        writer.writerows(rows)
    temporary.replace(output_path)
    return len(rows)
