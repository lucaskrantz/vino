import csv
from pathlib import Path

from vino_animals.models import (
    AnimalPresence,
    ImageRecord,
    LabelAssessment,
    LabelVisibility,
    VisionResult,
)
from vino_animals.review import create_review_queue
from vino_animals.storage import write_jsonl_atomic


def test_queue_includes_uncertain_result(tmp_path: Path) -> None:
    digest = "a" * 64
    images_path = tmp_path / "images.jsonl"
    results_path = tmp_path / "results.jsonl"
    output_path = tmp_path / "queue.csv"
    write_jsonl_atomic(
        images_path,
        [
            ImageRecord(
                product_id="123",
                image_index=0,
                source_url="https://example.test/image.webp",
                local_path="data/images/123/0.webp",
                rendition_width=800,
                media_type="image/webp",
                byte_size=100,
                sha256=digest,
            )
        ],
    )
    write_jsonl_atomic(
        results_path,
        [
            VisionResult(
                product_id="123",
                image_index=0,
                image_sha256=digest,
                provider="test",
                model="test-model",
                prompt_version="1.0",
                assessment=LabelAssessment(
                    label_visibility=LabelVisibility.PARTIAL,
                    animal_presence=AnimalPresence.UNCERTAIN,
                    detections=[],
                    confidence=0.5,
                    needs_review=True,
                    notes="small label",
                ),
            )
        ],
    )

    assert create_review_queue(images_path, results_path, output_path) == 1
    with output_path.open(encoding="utf-8", newline="") as handle:
        row = next(csv.DictReader(handle))
    assert row["animal_presence"] == "uncertain"
    assert row["queue_reason"] == "uncertain;model_flag;low_confidence"
    assert row["reviewer"] == ""
