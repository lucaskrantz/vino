"""Auditable vision classification with resumable OpenAI and OpenRouter backends."""

from __future__ import annotations

import base64
import os
import time
from dataclasses import dataclass
from datetime import UTC, datetime
from enum import StrEnum
from pathlib import Path
from typing import Any, Protocol

from .models import AnimalDetection, ImageRecord, LabelAssessment, VisionResult
from .storage import append_jsonl, read_models, sha256_file
from .taxonomy import normalize_animal_name

PROMPT_VERSION = "1.3"
DEFAULT_OPENAI_MODEL = "gpt-4o-mini-2024-07-18"
DEFAULT_OPENROUTER_MODEL = "openai/gpt-5.6-luna"
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
SYSTEM_PROMPT = """You are coding visual content for a preregistered research dataset.
Inspect what is visibly depicted in the wine package's primary front-label artwork. For this
study, logo imagery and other front-label artwork are the same exposure.

First locate the primary front label: the main paper or printed body panel carrying the wine or
product name. Only imagery inside that panel is eligible. Always ignore closures, screwcaps,
corks, capsules, foil, neck labels or bands, glass embossing, back labels, package background,
and anything else outside the primary front-label panel—even when an animal is clearly visible
there. Within the main panel, ignore separate regulatory, certification, appellation, award, or
quality-seal icons, plus recycling and food-pairing marks.

Use a strict definition of animal imagery. Count only a clearly recognizable, intentionally
depicted animal figure, head, or body within the eligible main-label artwork. Real, stylized,
silhouetted, heraldic, or mythical forms can count when the animal itself is unmistakable and is
depicted as a subject. A standalone clear animal can count even when heraldic decoration is also
nearby, but do not count the heraldic ornament itself. A brand logo counts only when it clearly
depicts the animal itself rather than functioning as a crest or emblem.

Do not count humans, plants, animal words with no visible animal, reflections, or background
scenery outside the package label. Do not infer an animal from a product name, assumed brand
identity, or conventional heraldic symbolism. Do not count a crest, coat of arms, shield, crown,
mantling, scrollwork, decorative border, tiny emblem, or seal as an animal. In particular, do not
count isolated wings over or behind a crest/shield, winged shields, or other decorative heraldic
fragments; wings alone are not an animal. Do not count an animal-like shape that is only a tiny,
ambiguous, or ornamental part of such a motif. Before using PRESENT, verify that the animal is
both unmistakable and independently depicted, not merely inferred from the surrounding crest.
If only excluded crest or heraldic ornament is visible, classify the label as ABSENT when the
label is otherwise readable.

Before using PRESENT, verify every detection is in the eligible main-label region. If animals
occur only in excluded regions, classify the visible main label without them. Start each
detection's evidence with "main front label:" and state its location there. Require unmistakable
anatomical evidence such as a head, body, limbs, wings attached to an identifiable bird, or fins.
Use UNCERTAIN only when label visibility or image quality prevents deciding whether a qualifying
animal is present; do not use UNCERTAIN merely because excluded heraldic ornament is complex.
Set needs_review=true for UNCERTAIN cases and for any genuinely borderline qualifying depiction.

Use PRESENT only with visual evidence. Use ABSENT when the relevant front label is visible well
enough to support absence under this strict definition. List each distinct animal type once,
using a specific singular lowercase English common name. Use mythical_or_heraldic as the taxon
group only when no real biological group fits (for example, a dragon). Evidence must be brief and
visual. Do not make claims about wine quality.
"""
USER_PROMPT = "Classify animal imagery on this product image according to the protocol."


class VisionProvider(StrEnum):
    OPENAI = "openai"
    OPENROUTER = "openrouter"


class ImageDetail(StrEnum):
    LOW = "low"
    HIGH = "high"


@dataclass(frozen=True)
class ProviderResponse:
    assessment: LabelAssessment
    response_id: str | None
    model: str
    provider: str = "openai"
    input_tokens: int | None = None
    output_tokens: int | None = None
    total_tokens: int | None = None
    cost_usd: float | None = None


class VisionClassifier(Protocol):
    def classify(self, path: Path, media_type: str) -> ProviderResponse: ...


def _usage_value(usage: Any, *names: str) -> int | None:
    if usage is None:
        return None
    for name in names:
        value = getattr(usage, name, None)
        if isinstance(value, int):
            return value
    return None


def _usage_cost(usage: Any) -> float | None:
    if usage is None:
        return None
    value = getattr(usage, "cost", None)
    if not isinstance(value, (int, float)):
        extra = getattr(usage, "model_extra", None) or {}
        value = extra.get("cost")
    return float(value) if isinstance(value, (int, float)) and value >= 0 else None


class OpenAIVisionClassifier:
    def __init__(
        self,
        model: str,
        api_key: str | None = None,
        detail: ImageDetail = ImageDetail.HIGH,
    ) -> None:
        try:
            from openai import OpenAI
        except ImportError as exc:  # pragma: no cover - depends on optional install
            raise RuntimeError(
                "Install the vision dependency with: pip install -e '.[vision]'"
            ) from exc
        self.model = model
        self.detail = detail
        self.client = OpenAI(api_key=api_key)

    def classify(self, path: Path, media_type: str) -> ProviderResponse:
        encoded = base64.b64encode(path.read_bytes()).decode("ascii")
        request: dict[str, Any] = {
            "model": self.model,
            "store": False,
            "max_output_tokens": 1200,
            "input": [
                {"role": "system", "content": [{"type": "input_text", "text": SYSTEM_PROMPT}]},
                {
                    "role": "user",
                    "content": [
                        {"type": "input_text", "text": USER_PROMPT},
                        {
                            "type": "input_image",
                            "image_url": f"data:{media_type};base64,{encoded}",
                            "detail": str(self.detail),
                        },
                    ],
                },
            ],
            "text_format": LabelAssessment,
        }
        if self.model.startswith("gpt-5.6"):
            request["reasoning"] = {"effort": "none"}
        response = self.client.responses.parse(**request)
        assessment = response.output_parsed
        if assessment is None:
            raise RuntimeError("Vision provider returned no parsed assessment")
        usage = getattr(response, "usage", None)
        return ProviderResponse(
            assessment=normalize_assessment(assessment),
            response_id=getattr(response, "id", None),
            model=getattr(response, "model", self.model),
            provider="openai",
            input_tokens=_usage_value(usage, "input_tokens", "prompt_tokens"),
            output_tokens=_usage_value(usage, "output_tokens", "completion_tokens"),
            total_tokens=_usage_value(usage, "total_tokens"),
            cost_usd=_usage_cost(usage),
        )


class OpenRouterVisionClassifier:
    def __init__(
        self,
        model: str = DEFAULT_OPENROUTER_MODEL,
        api_key: str | None = None,
        detail: ImageDetail = ImageDetail.HIGH,
        base_url: str = OPENROUTER_BASE_URL,
    ) -> None:
        try:
            from openai import OpenAI
        except ImportError as exc:  # pragma: no cover - depends on optional install
            raise RuntimeError(
                "Install the vision dependency with: pip install -e '.[vision]'"
            ) from exc
        resolved_key = api_key or os.environ.get("OPENROUTER_API_KEY")
        if not resolved_key:
            raise RuntimeError("Set OPENROUTER_API_KEY before using the OpenRouter provider")
        self.model = model
        self.detail = detail
        self.client = OpenAI(
            api_key=resolved_key,
            base_url=base_url,
            default_headers={
                "HTTP-Referer": "https://github.com/vino-animals/vino-animals",
                "X-Title": "vino-animals",
            },
        )

    def classify(self, path: Path, media_type: str) -> ProviderResponse:
        encoded = base64.b64encode(path.read_bytes()).decode("ascii")
        response = self.client.chat.completions.parse(
            model=self.model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": USER_PROMPT},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{media_type};base64,{encoded}",
                                "detail": str(self.detail),
                            },
                        },
                    ],
                },
            ],
            response_format=LabelAssessment,
            max_completion_tokens=1200,
            extra_body={"reasoning": {"effort": "none", "exclude": True}},
        )
        message = response.choices[0].message
        assessment = message.parsed
        if assessment is None:
            refusal = getattr(message, "refusal", None)
            raise RuntimeError(
                f"OpenRouter returned no parsed assessment{f': {refusal}' if refusal else ''}"
            )
        usage = getattr(response, "usage", None)
        return ProviderResponse(
            assessment=normalize_assessment(assessment),
            response_id=getattr(response, "id", None),
            model=getattr(response, "model", self.model),
            provider="openrouter",
            input_tokens=_usage_value(usage, "prompt_tokens", "input_tokens"),
            output_tokens=_usage_value(usage, "completion_tokens", "output_tokens"),
            total_tokens=_usage_value(usage, "total_tokens"),
            cost_usd=_usage_cost(usage),
        )


def create_vision_classifier(
    provider: VisionProvider,
    *,
    model: str,
    detail: ImageDetail = ImageDetail.HIGH,
) -> VisionClassifier:
    if provider == VisionProvider.OPENROUTER:
        return OpenRouterVisionClassifier(model=model, detail=detail)
    return OpenAIVisionClassifier(
        model=model, api_key=os.environ.get("OPENAI_API_KEY"), detail=detail
    )


def normalize_assessment(assessment: LabelAssessment) -> LabelAssessment:
    """Normalize detections and conservatively flag high-risk visual judgments."""
    detections_by_name: dict[str, AnimalDetection] = {}
    for detection in assessment.detections:
        animal_name = normalize_animal_name(detection.animal_name)
        normalized = AnimalDetection(
            animal_name=animal_name,
            taxon_group=detection.taxon_group,
            depiction_style=detection.depiction_style,
            confidence=detection.confidence,
            evidence=detection.evidence.strip(),
        )
        previous = detections_by_name.get(animal_name)
        if previous is None or normalized.confidence > previous.confidence:
            detections_by_name[animal_name] = normalized
    detections = list(detections_by_name.values())
    risky_terms = ("small", "tiny", "crest", "emblem", "seal", "embossed", "ornamental")
    needs_review = assessment.needs_review or any(
        detection.depiction_style.value in {"heraldic", "ambiguous", "mythical"}
        or any(term in detection.evidence.casefold() for term in risky_terms)
        for detection in detections
    )
    return assessment.model_copy(update={"detections": detections, "needs_review": needs_review})


def classify_images(
    image_manifest: Path,
    *,
    output_path: Path,
    errors_path: Path,
    model: str,
    provider_name: VisionProvider = VisionProvider.OPENAI,
    detail: ImageDetail = ImageDetail.HIGH,
    classifier: VisionClassifier | None = None,
    limit: int = 0,
    delay_seconds: float = 0,
    force: bool = False,
    fail_fast: bool = False,
) -> tuple[int, int, int]:
    """Classify images and return ``(attempted, succeeded, skipped)``."""
    image_records = list(read_models(image_manifest, ImageRecord))
    existing: set[tuple[str, int, str, str, str, str, str]] = set()
    if output_path.exists():
        for result in read_models(output_path, VisionResult):
            existing.add(
                (
                    result.product_id,
                    result.image_index,
                    result.image_sha256,
                    result.provider,
                    result.model,
                    result.prompt_version,
                    result.image_detail,
                )
            )

    active_classifier = classifier or create_vision_classifier(
        provider_name, model=model, detail=detail
    )
    attempted = succeeded = skipped = 0
    for image in image_records:
        key = (
            image.product_id,
            image.image_index,
            image.sha256,
            str(provider_name),
            model,
            PROMPT_VERSION,
            str(detail),
        )
        if not force and key in existing:
            skipped += 1
            continue
        if limit > 0 and attempted >= limit:
            break
        attempted += 1
        path = Path(image.local_path)
        try:
            if not path.exists():
                raise FileNotFoundError(f"Image does not exist: {path}")
            actual_hash = sha256_file(path)
            if actual_hash != image.sha256:
                raise ValueError(f"Image hash mismatch for {path}")
            provider_response = active_classifier.classify(path, image.media_type)
            result = VisionResult(
                product_id=image.product_id,
                image_index=image.image_index,
                image_sha256=image.sha256,
                provider=provider_response.provider,
                model=provider_response.model,
                prompt_version=PROMPT_VERSION,
                image_detail=str(detail),
                response_id=provider_response.response_id,
                input_tokens=provider_response.input_tokens,
                output_tokens=provider_response.output_tokens,
                total_tokens=provider_response.total_tokens,
                cost_usd=provider_response.cost_usd,
                assessment=provider_response.assessment,
            )
            append_jsonl(output_path, result)
            existing.add(key)
            succeeded += 1
        except Exception as exc:  # preserve failures so batch work remains auditable
            append_jsonl(
                errors_path,
                {
                    "product_id": image.product_id,
                    "image_index": image.image_index,
                    "image_sha256": image.sha256,
                    "provider": str(provider_name),
                    "model": model,
                    "prompt_version": PROMPT_VERSION,
                    "image_detail": str(detail),
                    "failed_at": datetime.now(UTC).isoformat(),
                    "error_type": type(exc).__name__,
                    "error": str(exc),
                },
            )
            if fail_fast:
                raise
        if delay_seconds > 0:
            time.sleep(delay_seconds)
    return attempted, succeeded, skipped
