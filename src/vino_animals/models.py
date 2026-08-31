"""Validated records exchanged between pipeline stages."""

from __future__ import annotations

from datetime import UTC, date, datetime
from enum import StrEnum
from typing import Self

from pydantic import BaseModel, ConfigDict, Field, model_validator

SCHEMA_VERSION = "1.0"


def utc_now() -> datetime:
    return datetime.now(UTC)


class Record(BaseModel):
    model_config = ConfigDict(extra="forbid")


class ProductImage(Record):
    base_url: str
    available_widths: list[int] = Field(default_factory=list)


class WineProduct(Record):
    schema_version: str = SCHEMA_VERSION
    product_id: str
    product_number: str | None = None
    name: str
    subtitle: str | None = None
    producer: str | None = None
    country: str
    category: str
    wine_type: str | None = None
    wine_subtype: str | None = None
    vintage: int | None = None
    assortment: str | None = None
    price_sek: float = Field(gt=0)
    volume_ml: float = Field(gt=0)
    price_per_750ml_sek: float = Field(gt=0)
    alcohol_percentage: float | None = Field(default=None, ge=0)
    is_organic: bool | None = None
    product_launch_date: datetime | None = None
    images: list[ProductImage] = Field(default_factory=list)


class ImageRecord(Record):
    schema_version: str = SCHEMA_VERSION
    product_id: str
    image_index: int = Field(ge=0)
    image_base_url: str | None = None
    source_url: str
    local_path: str
    rendition_width: int = Field(gt=0)
    media_type: str
    byte_size: int = Field(gt=0)
    sha256: str = Field(pattern=r"^[0-9a-f]{64}$")
    fetched_at: datetime = Field(default_factory=utc_now)


class AnimalPresence(StrEnum):
    PRESENT = "present"
    ABSENT = "absent"
    UNCERTAIN = "uncertain"


class LabelVisibility(StrEnum):
    GOOD = "good"
    PARTIAL = "partial"
    UNREADABLE = "unreadable"


class TaxonGroup(StrEnum):
    MAMMAL = "mammal"
    BIRD = "bird"
    FISH = "fish"
    REPTILE = "reptile"
    AMPHIBIAN = "amphibian"
    INSECT = "insect"
    ARACHNID = "arachnid"
    CRUSTACEAN = "crustacean"
    MOLLUSK = "mollusk"
    OTHER_INVERTEBRATE = "other_invertebrate"
    MYTHICAL_OR_HERALDIC = "mythical_or_heraldic"
    UNKNOWN = "unknown"


class DepictionStyle(StrEnum):
    REALISTIC = "realistic"
    STYLIZED = "stylized"
    SILHOUETTE = "silhouette"
    HERALDIC = "heraldic"
    MYTHICAL = "mythical"
    AMBIGUOUS = "ambiguous"


class AnimalDetection(Record):
    animal_name: str = Field(description="Specific English common name, singular and lowercase")
    taxon_group: TaxonGroup
    depiction_style: DepictionStyle
    confidence: float = Field(ge=0, le=1)
    evidence: str = Field(description="Short visual evidence and location on the package")


class LabelAssessment(Record):
    label_visibility: LabelVisibility
    animal_presence: AnimalPresence
    detections: list[AnimalDetection]
    confidence: float = Field(ge=0, le=1)
    needs_review: bool
    notes: str

    @model_validator(mode="after")
    def presence_matches_detections(self) -> Self:
        if self.animal_presence == AnimalPresence.PRESENT and not self.detections:
            raise ValueError("present assessments require at least one detection")
        if self.animal_presence == AnimalPresence.ABSENT and self.detections:
            raise ValueError("absent assessments cannot contain detections")
        if self.animal_presence == AnimalPresence.UNCERTAIN and not self.needs_review:
            raise ValueError("uncertain assessments must be marked for review")
        if (
            self.label_visibility == LabelVisibility.UNREADABLE
            and self.animal_presence == AnimalPresence.ABSENT
        ):
            raise ValueError("an unreadable label cannot support an absent assessment")
        return self


class VisionResult(Record):
    schema_version: str = SCHEMA_VERSION
    product_id: str
    image_index: int = Field(ge=0)
    image_sha256: str = Field(pattern=r"^[0-9a-f]{64}$")
    provider: str
    model: str
    prompt_version: str
    image_detail: str = "high"
    response_id: str | None = None
    input_tokens: int | None = Field(default=None, ge=0)
    output_tokens: int | None = Field(default=None, ge=0)
    total_tokens: int | None = Field(default=None, ge=0)
    cost_usd: float | None = Field(default=None, ge=0)
    assessed_at: datetime = Field(default_factory=utc_now)
    assessment: LabelAssessment


class ManualReview(Record):
    product_id: str
    image_index: int = Field(ge=0)
    image_sha256: str = Field(pattern=r"^[0-9a-f]{64}$")
    animal_presence: AnimalPresence
    animal_names: list[str] = Field(default_factory=list)
    taxon_groups: list[TaxonGroup] = Field(default_factory=list)
    reviewer: str = Field(min_length=1)
    reviewed_at: datetime
    notes: str = ""

    @model_validator(mode="after")
    def review_is_consistent(self) -> Self:
        if self.animal_presence == AnimalPresence.PRESENT and not self.animal_names:
            raise ValueError("present manual reviews require animal_names")
        if self.animal_presence == AnimalPresence.PRESENT and not self.taxon_groups:
            raise ValueError("present manual reviews require taxon_groups")
        if self.animal_presence == AnimalPresence.ABSENT and (
            self.animal_names or self.taxon_groups
        ):
            raise ValueError("absent manual reviews cannot list animals")
        return self


class QualityScore(Record):
    product_id: str
    quality_score: float
    scale_min: float
    scale_max: float
    normalized_score_0_100: float = Field(ge=0, le=100)
    score_source: str = Field(min_length=1)
    observed_at: date
    source_url: str | None = None
    review_count: int | None = Field(default=None, ge=0)
    score_scope: str | None = None
    match_confidence: float | None = Field(default=None, ge=0, le=1)
    source_record_id: str | None = None

    @model_validator(mode="after")
    def valid_scale(self) -> Self:
        if self.scale_max <= self.scale_min:
            raise ValueError("scale_max must exceed scale_min")
        if not self.scale_min <= self.quality_score <= self.scale_max:
            raise ValueError("quality_score must lie within its declared scale")
        return self
