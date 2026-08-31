from datetime import date

import pytest

from vino_animals.analysis import build_rows, run_analysis, summarize
from vino_animals.models import (
    AnimalDetection,
    AnimalPresence,
    DepictionStyle,
    ImageRecord,
    LabelAssessment,
    LabelVisibility,
    ManualReview,
    ProductImage,
    QualityScore,
    TaxonGroup,
    VisionResult,
    WineProduct,
)
from vino_animals.storage import write_jsonl_atomic

HASH = "a" * 64


def product(product_id: str, price: float) -> WineProduct:
    return WineProduct(
        product_id=product_id,
        name=f"Wine {product_id}",
        country="Sverige",
        category="Vin",
        wine_type="Rött vin",
        price_sek=price,
        volume_ml=750,
        price_per_750ml_sek=price,
        images=[ProductImage(base_url=f"https://example.test/{product_id}")],
    )


def result(product_id: str, presence: AnimalPresence) -> VisionResult:
    detections = []
    if presence == AnimalPresence.PRESENT:
        detections = [
            AnimalDetection(
                animal_name="Foxes",
                taxon_group=TaxonGroup.MAMMAL,
                depiction_style=DepictionStyle.STYLIZED,
                confidence=0.9,
                evidence="fox on central crest",
            )
        ]
    return VisionResult(
        product_id=product_id,
        image_index=0,
        image_sha256=HASH,
        provider="test",
        model="test-model",
        prompt_version="1.0",
        assessment=LabelAssessment(
            label_visibility=LabelVisibility.GOOD,
            animal_presence=presence,
            detections=detections,
            confidence=0.9,
            needs_review=False,
            notes="",
        ),
    )


def test_rows_and_comparison_use_standardized_price_and_score() -> None:
    products = [product("animal", 200), product("plain", 100)]
    results = {
        ("animal", 0): result("animal", AnimalPresence.PRESENT),
        ("plain", 0): result("plain", AnimalPresence.ABSENT),
    }
    scores = {
        "animal": QualityScore(
            product_id="animal",
            quality_score=90,
            scale_min=0,
            scale_max=100,
            normalized_score_0_100=90,
            score_source="panel",
            observed_at=date(2025, 3, 8),
        )
    }

    rows = build_rows(products, results, scores, {})
    summary = summarize(rows, iterations=0)

    assert rows[0]["animal_names"] == "fox"
    assert rows[0]["animal_categories"] == "fox"
    assert rows[0]["taxon_groups"] == "mammal"
    fox_summary = next(
        group
        for group in summary["group_summaries"]
        if group["dimension"] == "animal_name" and group["group"] == "fox"
    )
    assert fox_summary["price_per_750ml_sek"]["mean"] == 200
    price_comparison = summary["comparisons"][0]
    assert price_comparison["mean_difference_animal_minus_no_animal"] == 100
    assert summary["cohort"]["products_with_scores"] == 1


def test_missing_image_classification_is_uncertain_not_absent() -> None:
    rows = build_rows([product("missing", 100)], {}, {}, {})
    assert rows[0]["animal_presence"] == "uncertain"


def test_stale_manual_review_is_rejected() -> None:
    ai_result = result("animal", AnimalPresence.ABSENT)
    review = ManualReview(
        product_id="animal",
        image_index=0,
        image_sha256="b" * 64,
        animal_presence=AnimalPresence.PRESENT,
        animal_names=["fox"],
        taxon_groups=[TaxonGroup.MAMMAL],
        reviewer="reviewer",
        reviewed_at="2025-03-08T12:00:00Z",
    )
    with pytest.raises(ValueError, match="Stale"):
        build_rows(
            [product("animal", 100)], {("animal", 0): ai_result}, {}, {("animal", 0): review}
        )


def test_analysis_binds_results_to_current_image_manifest(tmp_path) -> None:
    products_path = tmp_path / "products.jsonl"
    results_path = tmp_path / "results.jsonl"
    images_path = tmp_path / "images.jsonl"
    write_jsonl_atomic(products_path, [product("animal", 100)])
    write_jsonl_atomic(results_path, [result("animal", AnimalPresence.PRESENT)])
    write_jsonl_atomic(
        images_path,
        [
            ImageRecord(
                product_id="animal",
                image_index=0,
                image_base_url="https://example.test/animal",
                source_url="https://example.test/animal_800.webp",
                local_path="data/images/animal/0.webp",
                rendition_width=800,
                media_type="image/webp",
                byte_size=100,
                sha256=HASH,
            )
        ],
    )

    summary = run_analysis(
        products_path,
        results_path,
        {},
        {},
        dataset_output=tmp_path / "dataset.csv",
        summary_output=tmp_path / "summary.json",
        report_output=tmp_path / "report.md",
        image_manifest_path=images_path,
        iterations=0,
    )

    assert summary["method"]["image_hash_binding"]["validated_vision_result_n"] == 1
    assert summary["cohort"]["vision_model_product_counts"] == {"test-model": 1}


def test_analysis_rejects_result_for_superseded_image(tmp_path) -> None:
    products_path = tmp_path / "products.jsonl"
    results_path = tmp_path / "results.jsonl"
    images_path = tmp_path / "images.jsonl"
    write_jsonl_atomic(products_path, [product("animal", 100)])
    write_jsonl_atomic(results_path, [result("animal", AnimalPresence.PRESENT)])
    write_jsonl_atomic(
        images_path,
        [
            ImageRecord(
                product_id="animal",
                image_index=0,
                image_base_url="https://example.test/animal",
                source_url="https://example.test/new.webp",
                local_path="data/images/animal/0.webp",
                rendition_width=800,
                media_type="image/webp",
                byte_size=100,
                sha256="b" * 64,
            )
        ],
    )

    with pytest.raises(ValueError, match="Stale vision result hash"):
        run_analysis(
            products_path,
            results_path,
            {},
            {},
            dataset_output=tmp_path / "dataset.csv",
            summary_output=tmp_path / "summary.json",
            report_output=tmp_path / "report.md",
            image_manifest_path=images_path,
            iterations=0,
        )
