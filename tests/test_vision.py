import hashlib
from pathlib import Path
from types import SimpleNamespace

import pytest
from pydantic import ValidationError

from vino_animals.models import (
    AnimalDetection,
    AnimalPresence,
    DepictionStyle,
    ImageRecord,
    LabelAssessment,
    LabelVisibility,
    TaxonGroup,
    VisionResult,
)
from vino_animals.storage import read_models, write_jsonl_atomic
from vino_animals.vision import (
    ImageDetail,
    OpenAIVisionClassifier,
    OpenRouterVisionClassifier,
    ProviderResponse,
    classify_images,
    normalize_assessment,
)


def detection(name: str, confidence: float) -> AnimalDetection:
    return AnimalDetection(
        animal_name=name,
        taxon_group=TaxonGroup.MAMMAL,
        depiction_style=DepictionStyle.STYLIZED,
        confidence=confidence,
        evidence=f"{name} on label ",
    )


def assessment(
    presence: AnimalPresence = AnimalPresence.PRESENT,
    detections: list[AnimalDetection] | None = None,
) -> LabelAssessment:
    return LabelAssessment(
        label_visibility=LabelVisibility.GOOD,
        animal_presence=presence,
        detections=detections if detections is not None else [detection("fox", 0.9)],
        confidence=0.9,
        needs_review=presence == AnimalPresence.UNCERTAIN,
        notes="",
    )


def test_normalize_assessment_deduplicates_animal_names_by_confidence() -> None:
    normalized = normalize_assessment(
        assessment(detections=[detection("Foxes", 0.7), detection("fox", 0.95)])
    )

    assert len(normalized.detections) == 1
    assert normalized.detections[0].animal_name == "fox"
    assert normalized.detections[0].confidence == 0.95
    assert normalized.detections[0].evidence == "fox on label"


def test_uncertain_assessment_requires_review_flag() -> None:
    with pytest.raises(ValidationError, match="marked for review"):
        LabelAssessment(
            label_visibility=LabelVisibility.PARTIAL,
            animal_presence=AnimalPresence.UNCERTAIN,
            detections=[],
            confidence=0.4,
            needs_review=False,
            notes="",
        )


def test_unreadable_label_cannot_be_classified_absent() -> None:
    with pytest.raises(ValidationError, match="cannot support"):
        LabelAssessment(
            label_visibility=LabelVisibility.UNREADABLE,
            animal_presence=AnimalPresence.ABSENT,
            detections=[],
            confidence=0.4,
            needs_review=True,
            notes="",
        )


class FakeClassifier:
    def __init__(self) -> None:
        self.calls = 0

    def classify(self, _path: Path, _media_type: str) -> ProviderResponse:
        self.calls += 1
        return ProviderResponse(
            assessment=assessment(), response_id="response-1", model="test-model"
        )


def test_classification_is_hash_checked_persisted_and_resumable(tmp_path: Path) -> None:
    content = b"RIFF\x00\x00\x00\x00WEBPimage"
    image_path = tmp_path / "image.webp"
    image_path.write_bytes(content)
    digest = hashlib.sha256(content).hexdigest()
    manifest = tmp_path / "images.jsonl"
    output = tmp_path / "results.jsonl"
    errors = tmp_path / "errors.jsonl"
    write_jsonl_atomic(
        manifest,
        [
            ImageRecord(
                product_id="123",
                image_index=0,
                image_base_url="https://example.test/image",
                source_url="https://example.test/image_800.webp",
                local_path=str(image_path),
                rendition_width=800,
                media_type="image/webp",
                byte_size=len(content),
                sha256=digest,
            )
        ],
    )
    classifier = FakeClassifier()

    first = classify_images(
        manifest,
        output_path=output,
        errors_path=errors,
        model="test-model",
        classifier=classifier,
    )
    second = classify_images(
        manifest,
        output_path=output,
        errors_path=errors,
        model="test-model",
        classifier=classifier,
    )

    assert first == (1, 1, 0)
    assert second == (0, 0, 1)
    assert classifier.calls == 1
    result = next(read_models(output, VisionResult))
    assert result.image_sha256 == digest
    assert result.assessment.detections[0].animal_name == "fox"
    assert not errors.exists()


def test_native_luna_uses_responses_api_without_reasoning(tmp_path: Path) -> None:
    captured: dict = {}

    def parse(**kwargs):
        captured.update(kwargs)
        return SimpleNamespace(
            id="openai-response",
            model="gpt-5.6-luna",
            output_parsed=assessment(),
            usage=SimpleNamespace(
                input_tokens=1200,
                output_tokens=150,
                total_tokens=1350,
                model_extra={},
            ),
        )

    classifier = OpenAIVisionClassifier(
        model="gpt-5.6-luna", api_key="test-key", detail=ImageDetail.HIGH
    )
    classifier.client = SimpleNamespace(responses=SimpleNamespace(parse=parse))
    image = tmp_path / "image.webp"
    image.write_bytes(b"image")

    result = classifier.classify(image, "image/webp")

    image_part = captured["input"][1]["content"][1]
    assert image_part["detail"] == "high"
    assert captured["reasoning"] == {"effort": "none"}
    assert captured["text_format"] is LabelAssessment
    assert result.provider == "openai"
    assert result.input_tokens == 1200


def test_openrouter_uses_high_detail_structured_output_without_reasoning(
    tmp_path: Path,
) -> None:
    captured: dict = {}

    def parse(**kwargs):
        captured.update(kwargs)
        return SimpleNamespace(
            id="or-response",
            model="openai/gpt-5.6-luna",
            choices=[SimpleNamespace(message=SimpleNamespace(parsed=assessment()))],
            usage=SimpleNamespace(
                prompt_tokens=1200,
                completion_tokens=150,
                total_tokens=1350,
                model_extra={"cost": 0.00021},
            ),
        )

    classifier = OpenRouterVisionClassifier(api_key="test-key", detail=ImageDetail.HIGH)
    classifier.client = SimpleNamespace(
        chat=SimpleNamespace(completions=SimpleNamespace(parse=parse))
    )
    image = tmp_path / "image.webp"
    image.write_bytes(b"image")

    result = classifier.classify(image, "image/webp")

    image_part = captured["messages"][1]["content"][1]
    assert image_part["image_url"]["detail"] == "high"
    assert captured["extra_body"] == {"reasoning": {"effort": "none", "exclude": True}}
    assert captured["response_format"] is LabelAssessment
    assert result.provider == "openrouter"
    assert result.input_tokens == 1200
    assert result.output_tokens == 150
    assert result.cost_usd == pytest.approx(0.00021)


def test_hash_mismatch_is_recorded_as_an_error(tmp_path: Path) -> None:
    image_path = tmp_path / "image.webp"
    image_path.write_bytes(b"changed")
    manifest = tmp_path / "images.jsonl"
    output = tmp_path / "results.jsonl"
    errors = tmp_path / "errors.jsonl"
    write_jsonl_atomic(
        manifest,
        [
            ImageRecord(
                product_id="123",
                image_index=0,
                source_url="https://example.test/image.webp",
                local_path=str(image_path),
                rendition_width=800,
                media_type="image/webp",
                byte_size=7,
                sha256="a" * 64,
            )
        ],
    )
    classifier = FakeClassifier()

    assert classify_images(
        manifest,
        output_path=output,
        errors_path=errors,
        model="test-model",
        classifier=classifier,
    ) == (1, 0, 0)
    assert classifier.calls == 0
    assert "Image hash mismatch" in errors.read_text(encoding="utf-8")
    assert not output.exists()
