import csv
from pathlib import Path

from vino_animals.review import REVIEW_QUEUE_FIELDS
from vino_animals.reviewer import ReviewStore
from vino_animals.scores import read_manual_reviews


def make_queue(path: Path, image_path: str, digest: str) -> None:
    row = {
        field: ""
        for field in REVIEW_QUEUE_FIELDS
    }
    row.update(
        {
            "product_id": "123",
            "image_index": "0",
            "image_sha256": digest,
            "animal_presence": "present",
            "animal_names": "fox",
            "taxon_groups": "mammal",
            "local_path": image_path,
            "ai_model": "test-model",
            "ai_prompt_version": "1.3",
            "ai_label_visibility": "good",
            "ai_confidence": "0.95",
            "ai_needs_review": "True",
            "queue_reason": "model_flag",
            "ai_evidence": "main front label: fox",
        }
    )
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=REVIEW_QUEUE_FIELDS)
        writer.writeheader()
        writer.writerow(row)


def test_review_store_saves_hash_bound_full_correction(tmp_path: Path) -> None:
    image = tmp_path / "data" / "images" / "123" / "0.webp"
    image.parent.mkdir(parents=True)
    image.write_bytes(b"image")
    digest = "a" * 64
    queue = tmp_path / "queue.csv"
    reviews = tmp_path / "reviews.csv"
    make_queue(queue, "data/images/123/0.webp", digest)

    store = ReviewStore(queue, reviews, tmp_path)
    assert store.snapshot()["rows"][0]["reviewed"] is False
    saved = store.save(
        {
            "product_id": "123",
            "image_index": 0,
            "image_sha256": digest,
            "animal_presence": "present",
            "animal_names": ["Foxes"],
            "taxon_groups": ["mammal"],
            "reviewer": "tester",
            "notes": "Clearly visible.",
        }
    )

    assert saved.animal_names == ["fox"]
    loaded = read_manual_reviews(reviews)
    assert loaded[("123", 0)].reviewer == "tester"
    assert loaded[("123", 0)].notes == "Clearly visible."
    assert store.snapshot()["rows"][0]["reviewed"] is True


def test_review_store_rejects_wrong_image_hash(tmp_path: Path) -> None:
    queue = tmp_path / "queue.csv"
    make_queue(queue, "data/images/123/0.webp", "a" * 64)
    store = ReviewStore(queue, tmp_path / "reviews.csv", tmp_path)

    try:
        store.save(
            {
                "product_id": "123",
                "image_index": 0,
                "image_sha256": "b" * 64,
                "animal_presence": "absent",
                "animal_names": [],
                "taxon_groups": [],
                "reviewer": "tester",
            }
        )
    except ValueError as exc:
        assert "hash" in str(exc)
    else:  # pragma: no cover - assertion guard
        raise AssertionError("wrong image hash was accepted")
