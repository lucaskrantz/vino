"""Conservative adapter for Vivino's undocumented public explore endpoint.

The endpoint/response-field discovery was informed by BaconWappedBitcoin/ha-wine-cellar.
This implementation is independent, removes Home Assistant coupling, corrects current endpoint
parameters, matches candidates explicitly, and never treats the first search result as truth.
"""

from __future__ import annotations

import csv
import hashlib
import json
import random
import tempfile
import time
import unicodedata
from collections import Counter
from datetime import UTC, datetime
from enum import StrEnum
from pathlib import Path
from typing import Any
from urllib.parse import urlencode

import httpx
from pydantic import Field

from .models import Record, WineProduct
from .storage import append_jsonl, read_models

VIVINO_EXPLORE_URL = "https://www.vivino.com/api/explore/explore"
MATCHER_VERSION = "1.2"
# Vivino rejects non-browser user agents at the time of writing. Keep this configurable in code
# and stop rather than trying to bypass blocks or authentication challenges.
DEFAULT_USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)
_ALL_WINE_TYPE_IDS = [1, 2, 3, 4, 7]
_COMPANY_WORDS = {"ab", "estate", "vin", "vingard", "vineri", "wine", "winery", "wines"}
_COUNTRY_CODES = {
    "argentina": "ar",
    "armenien": "am",
    "australien": "au",
    "belgien": "be",
    "brasilien": "br",
    "bulgarien": "bg",
    "chile": "cl",
    "danmark": "dk",
    "england": "gb",
    "finland": "fi",
    "frankrike": "fr",
    "georgien": "ge",
    "grekland": "gr",
    "indien": "in",
    "israel": "il",
    "italien": "it",
    "japan": "jp",
    "kanada": "ca",
    "kina": "cn",
    "kroatien": "hr",
    "libanon": "lb",
    "mexiko": "mx",
    "moldavien": "md",
    "nederlanderna": "nl",
    "nordmakedonien": "mk",
    "norge": "no",
    "nya zeeland": "nz",
    "portugal": "pt",
    "rumanien": "ro",
    "schweiz": "ch",
    "slovakien": "sk",
    "slovenien": "si",
    "spanien": "es",
    "storbritannien": "gb",
    "sverige": "se",
    "sydafrika": "za",
    "tjeckien": "cz",
    "turkiet": "tr",
    "tyskland": "de",
    "ungern": "hu",
    "uruguay": "uy",
    "usa": "us",
    "osterrike": "at",
}


class LookupStatus(StrEnum):
    MATCHED = "matched"
    NEEDS_REVIEW = "needs_review"
    NO_MATCH = "no_match"
    ERROR = "error"


class IdentityReviewDecision(StrEnum):
    ACCEPT = "accept"
    REJECT = "reject"


class VivinoCandidate(Record):
    rank: int = Field(ge=1)
    vivino_wine_id: int = Field(gt=0)
    vivino_vintage_id: int | None = Field(default=None, gt=0)
    wine_name: str
    winery_name: str = ""
    vintage: int | None = None
    country_code: str = ""
    country_name: str = ""
    region_name: str = ""
    vintage_rating: float | None = Field(default=None, ge=1, le=5)
    vintage_ratings_count: int | None = Field(default=None, ge=0)
    wine_rating: float | None = Field(default=None, ge=1, le=5)
    wine_ratings_count: int | None = Field(default=None, ge=0)
    is_wine_rating: bool | None = None
    image_url: str = ""
    source_url: str
    name_similarity: float = Field(ge=0, le=1)
    producer_similarity: float | None = Field(default=None, ge=0, le=1)
    country_similarity: float = Field(ge=0, le=1)
    match_confidence: float = Field(ge=0, le=1)
    vintage_match: str
    hard_conflicts: list[str] = Field(default_factory=list)


class VivinoLookup(Record):
    schema_version: str = "1.0"
    matcher_version: str = MATCHER_VERSION
    product_id: str
    product_name: str
    product_subtitle: str | None = None
    product_producer: str | None = None
    product_vintage: int | None = None
    query: str
    wine_type_ids: list[int]
    status: LookupStatus
    selected: VivinoCandidate | None = None
    candidates: list[VivinoCandidate] = Field(default_factory=list)
    records_matched: int = Field(default=0, ge=0)
    endpoint: str = VIVINO_EXPLORE_URL
    response_sha256: str | None = None
    fetched_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    warnings: list[str] = Field(default_factory=list)
    error: str | None = None


class VivinoIdentityReview(Record):
    """Hash-bound adjudication of one lookup identity, separate from its score."""

    schema_version: str = "1.0"
    product_id: str
    matcher_version: str
    response_sha256: str
    decision: IdentityReviewDecision
    candidate_rank: int | None = Field(default=None, ge=1)
    vivino_wine_id: int | None = Field(default=None, gt=0)
    vivino_vintage_id: int | None = Field(default=None, gt=0)
    reviewer: str
    review_method: str
    review_model: str | None = None
    prompt_version: str | None = None
    response_id: str | None = None
    review_confidence: float | None = Field(default=None, ge=0, le=1)
    reviewed_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    reason_code: str
    notes: str = ""


def _normalized_tokens(value: str, *, remove_company_words: bool = False) -> set[str]:
    folded = unicodedata.normalize("NFKD", value.casefold()).encode("ascii", "ignore").decode()
    tokens = {token for token in "".join(c if c.isalnum() else " " for c in folded).split()}
    if remove_company_words:
        tokens -= _COMPANY_WORDS
    return tokens


def _token_f1(left: set[str], right: set[str]) -> float:
    if not left or not right:
        return 0.0
    common = len(left & right)
    if not common:
        return 0.0
    precision = common / len(right)
    recall = common / len(left)
    return 2 * precision * recall / (precision + recall)


def _country_code(value: str) -> str | None:
    folded = unicodedata.normalize("NFKD", value.casefold()).encode("ascii", "ignore").decode()
    normalized = " ".join("".join(c if c.isalnum() else " " for c in folded).split())
    return _COUNTRY_CODES.get(normalized)


def _identity_scores(
    product: WineProduct, wine_name: str, winery_name: str, country_code: str
) -> tuple[float, float | None, float, float]:
    title = " ".join(value for value in (product.name, product.subtitle or "") if value)
    target_title = _normalized_tokens(title, remove_company_words=True)
    candidate_title = _normalized_tokens(wine_name, remove_company_words=True)
    target_producer = _normalized_tokens(product.producer or "", remove_company_words=True)
    candidate_producer = _normalized_tokens(winery_name, remove_company_words=True)
    target_full = target_title | target_producer
    candidate_full = candidate_title | candidate_producer

    direct_name = _token_f1(target_title, candidate_title)
    full_name = _token_f1(target_full, candidate_full)
    containment = len(target_title & candidate_full) / len(target_title) if target_title else 0.0
    name_similarity = max(direct_name, (full_name + containment) / 2)
    producer_similarity = (
        _token_f1(target_producer, candidate_producer)
        if target_producer and candidate_producer
        else None
    )
    target_country_code = _country_code(product.country)
    normalized_country = country_code.casefold()
    if target_country_code and normalized_country:
        country_similarity = 1.0 if target_country_code == normalized_country else 0.0
    else:
        country_similarity = 0.5
    if producer_similarity is None:
        confidence = 0.95 * name_similarity + 0.05 * country_similarity
    else:
        confidence = 0.75 * name_similarity + 0.20 * producer_similarity + 0.05 * country_similarity

    # Systembolaget often supplies the legal producer while Vivino models the consumer-facing
    # brand as the winery (for example Viña San Pedro versus Gato Negro). Do not let that
    # representation difference veto an otherwise complete title-to-wine identity match.
    title_identity_coverage = (
        len(target_title & candidate_full) / len(target_title) if target_title else 0.0
    )
    if title_identity_coverage >= 0.8:
        producer_agnostic_confidence = 0.95 * name_similarity + 0.05 * country_similarity
        confidence = max(confidence, producer_agnostic_confidence)
    return name_similarity, producer_similarity, country_similarity, min(confidence, 1.0)


def _optional_number(value: Any, *, integer: bool = False) -> float | int | None:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        return None
    return int(value) if integer else float(value)


def _rating(value: Any) -> float | None:
    number = _optional_number(value)
    return float(number) if number is not None and 1 <= number <= 5 else None


def _image_url(vintage: dict[str, Any]) -> str:
    image = vintage.get("image")
    if not isinstance(image, dict):
        return ""
    value = image.get("location")
    if not isinstance(value, str):
        return ""
    return f"https:{value}" if value.startswith("//") else value


def candidate_from_match(
    product: WineProduct, match: dict[str, Any], rank: int
) -> VivinoCandidate | None:
    vintage = match.get("vintage")
    if not isinstance(vintage, dict):
        return None
    wine = vintage.get("wine")
    if not isinstance(wine, dict):
        return None
    wine_id = _optional_number(wine.get("id"), integer=True)
    if not wine_id:
        return None
    winery = wine.get("winery") if isinstance(wine.get("winery"), dict) else {}
    region = wine.get("region") if isinstance(wine.get("region"), dict) else {}
    country = region.get("country") if isinstance(region.get("country"), dict) else {}
    wine_name = str(wine.get("name") or "")
    winery_name = str(winery.get("name") or "")
    country_code = str(country.get("code") or "")
    target_vintage = product.vintage
    candidate_vintage_raw = _optional_number(vintage.get("year"), integer=True)
    candidate_vintage = int(candidate_vintage_raw) if candidate_vintage_raw else None

    statistics = vintage.get("statistics")
    if not isinstance(statistics, dict):
        statistics = {}
    wine_statistics = wine.get("statistics")
    if not isinstance(wine_statistics, dict):
        wine_statistics = {}

    vintage_rating = _rating(statistics.get("ratings_average"))
    vintage_count = _optional_number(statistics.get("ratings_count"), integer=True)
    wine_rating = _rating(statistics.get("wine_ratings_average"))
    wine_count = _optional_number(statistics.get("wine_ratings_count"), integer=True)
    if wine_rating is None:
        wine_rating = _rating(wine_statistics.get("ratings_average"))
        wine_count = _optional_number(wine_statistics.get("ratings_count"), integer=True)

    name_score, producer_score, country_score, confidence = _identity_scores(
        product, wine_name, winery_name, country_code
    )
    if target_vintage is None:
        vintage_match = "target_missing"
    elif candidate_vintage is None:
        vintage_match = "candidate_missing"
    elif candidate_vintage == target_vintage:
        vintage_match = "exact"
    else:
        vintage_match = "mismatch"
    hard_conflicts = []
    target_country_code = _country_code(product.country)
    if target_country_code and country_code and target_country_code != country_code.casefold():
        hard_conflicts.append("country_mismatch")

    source_url = f"https://www.vivino.com/w/{int(wine_id)}"
    if candidate_vintage:
        source_url += f"?{urlencode({'year': candidate_vintage})}"
    return VivinoCandidate(
        rank=rank,
        vivino_wine_id=int(wine_id),
        vivino_vintage_id=(
            int(value)
            if (value := _optional_number(vintage.get("id"), integer=True)) is not None
            else None
        ),
        wine_name=wine_name,
        winery_name=winery_name,
        vintage=candidate_vintage,
        country_code=country_code,
        country_name=str(country.get("name") or ""),
        region_name=str(region.get("name") or ""),
        vintage_rating=float(vintage_rating) if vintage_rating is not None else None,
        vintage_ratings_count=int(vintage_count) if vintage_count is not None else None,
        wine_rating=float(wine_rating) if wine_rating is not None else None,
        wine_ratings_count=int(wine_count) if wine_count is not None else None,
        is_wine_rating=(
            statistics.get("is_wine_rating")
            if isinstance(statistics.get("is_wine_rating"), bool)
            else None
        ),
        image_url=_image_url(vintage),
        source_url=source_url,
        name_similarity=name_score,
        producer_similarity=producer_score,
        country_similarity=country_score,
        match_confidence=confidence,
        vintage_match=vintage_match,
        hard_conflicts=hard_conflicts,
    )


def build_query(product: WineProduct) -> str:
    """Build the concise catalogue phrase Vivino's relevance search expects.

    Producer and vintage remain matching evidence, but including them in ``search_term`` made
    the explore endpoint lose obvious products whose Vivino listing uses a consumer brand as
    its winery or has no current-vintage record.
    """
    values = [product.name, product.subtitle or ""]
    unique: list[str] = []
    seen: set[str] = set()
    for value in values:
        normalized = " ".join(value.casefold().split())
        if value and normalized not in seen:
            unique.append(value.strip())
            seen.add(normalized)
    return " ".join(unique)


def wine_type_ids(product: WineProduct) -> list[int]:
    wine_type = (product.wine_type or "").casefold()
    if "rött" in wine_type or "rott" in wine_type:
        return [1]
    if "vitt" in wine_type:
        return [2]
    if "mousserande" in wine_type:
        return [3]
    if "rosé" in wine_type or "rose" in wine_type:
        return [4]
    if "dessert" in wine_type or "starkvin" in wine_type:
        return [7]
    return _ALL_WINE_TYPE_IDS.copy()


class VivinoClient:
    def __init__(
        self,
        *,
        country_code: str = "SE",
        currency_code: str = "SEK",
        language: str = "en",
        timeout_seconds: float = 30,
        attempts: int = 3,
        user_agent: str = DEFAULT_USER_AGENT,
        transport: httpx.BaseTransport | None = None,
    ) -> None:
        self.country_code = country_code
        self.currency_code = currency_code
        self.language = language
        self.attempts = attempts
        self.client = httpx.Client(
            timeout=timeout_seconds,
            follow_redirects=True,
            headers={"User-Agent": user_agent, "Accept": "application/json"},
            transport=transport,
        )

    def close(self) -> None:
        self.client.close()

    def search(self, query: str, type_ids: list[int]) -> tuple[dict[str, Any], bytes]:
        params: list[tuple[str, str]] = [
            ("search_term", query),
            ("page", "1"),
            ("page_size", "24"),
            ("country_code", self.country_code),
            ("currency_code", self.currency_code),
            ("language", self.language),
            ("grape_filter", "varietal"),
            ("order_by", "relevance"),
            ("order", "desc"),
        ]
        params.extend(("wine_type_ids[]", str(value)) for value in type_ids)
        last_error: Exception | None = None
        for attempt in range(self.attempts):
            try:
                response = self.client.get(VIVINO_EXPLORE_URL, params=params)
                if response.status_code == 429 or response.status_code >= 500:
                    last_error = httpx.HTTPStatusError(
                        f"retryable Vivino status {response.status_code}",
                        request=response.request,
                        response=response,
                    )
                    if attempt + 1 < self.attempts:
                        retry_after = response.headers.get("Retry-After")
                        wait = min(float(retry_after), 60) if retry_after else 2**attempt
                        time.sleep(wait + random.random() / 4)
                    continue
                response.raise_for_status()
                raw = response.content
                data = json.loads(raw)
                if not isinstance(data, dict):
                    raise ValueError("Vivino returned a non-object JSON response")
                return data, raw
            except (httpx.HTTPError, json.JSONDecodeError, ValueError) as exc:
                last_error = exc
                if isinstance(exc, httpx.HTTPStatusError) and exc.response.status_code < 500:
                    break
                if attempt + 1 < self.attempts:
                    time.sleep(2**attempt + random.random() / 4)
        raise RuntimeError(f"Vivino request failed: {last_error}")


def lookup_product(
    client: VivinoClient,
    product: WineProduct,
    *,
    match_threshold: float = 0.82,
    max_candidates: int = 25,
    max_records_matched: int = 500,
) -> VivinoLookup:
    query = build_query(product)
    type_ids = wine_type_ids(product)
    try:
        response, raw = client.search(query, type_ids)
        explore = response.get("explore_vintage")
        if not isinstance(explore, dict):
            raise ValueError("Missing explore_vintage object")
        matches = explore.get("matches")
        if not isinstance(matches, list):
            matches = []
        candidates = [
            candidate
            for rank, match in enumerate(matches[:max_candidates], start=1)
            if isinstance(match, dict)
            and (candidate := candidate_from_match(product, match, rank)) is not None
        ]
        candidates.sort(
            key=lambda candidate: (
                candidate.match_confidence,
                candidate.vintage_match == "exact",
                -candidate.rank,
                candidate.vintage_ratings_count or 0,
            ),
            reverse=True,
        )
        selected = candidates[0] if candidates else None
        raw_records_matched = explore.get("records_matched")
        records_matched = (
            raw_records_matched if isinstance(raw_records_matched, int) else len(matches)
        )
        warnings = []
        if records_matched > max_records_matched:
            warnings.append("large_relevance_result_set")
        product_name_tokens = _normalized_tokens(product.name, remove_company_words=True)
        producer_tokens = _normalized_tokens(product.producer or "", remove_company_words=True)
        brand_only_query = (
            not product.subtitle
            and bool(product_name_tokens)
            and bool(producer_tokens)
            and _token_f1(product_name_tokens, producer_tokens) >= 0.8
        )
        if brand_only_query:
            warnings.append("brand_only_query_requires_review")
        if selected is None:
            status = LookupStatus.NO_MATCH
        elif (
            selected.match_confidence >= match_threshold
            and not selected.hard_conflicts
            and not brand_only_query
        ):
            # Vivino reports the size of the whole relevance-ranked catalogue result, which can
            # be large even when the leading identity is strong. Candidate identity and hard
            # conflicts—not catalogue size—determine automatic acceptance.
            status = LookupStatus.MATCHED
        else:
            status = LookupStatus.NEEDS_REVIEW
        return VivinoLookup(
            product_id=product.product_id,
            product_name=product.name,
            product_subtitle=product.subtitle,
            product_producer=product.producer,
            product_vintage=product.vintage,
            query=query,
            wine_type_ids=type_ids,
            status=status,
            selected=selected,
            candidates=candidates,
            records_matched=records_matched,
            response_sha256=hashlib.sha256(raw).hexdigest(),
            warnings=warnings,
        )
    except Exception as exc:
        return VivinoLookup(
            product_id=product.product_id,
            product_name=product.name,
            product_subtitle=product.subtitle,
            product_producer=product.producer,
            product_vintage=product.vintage,
            query=query,
            wine_type_ids=type_ids,
            status=LookupStatus.ERROR,
            error=f"{type(exc).__name__}: {exc}",
        )


def fetch_vivino(
    products_path: Path,
    output_path: Path,
    *,
    client: VivinoClient | None = None,
    match_threshold: float = 0.82,
    delay_seconds: float = 1.0,
    limit: int = 0,
    force: bool = False,
) -> Counter[str]:
    products = list(read_models(products_path, WineProduct))
    completed: set[tuple[str, str, str]] = set()
    if output_path.exists():
        latest: dict[tuple[str, str, str], VivinoLookup] = {}
        for result in read_models(output_path, VivinoLookup):
            key = (result.product_id, result.query, result.matcher_version)
            previous = latest.get(key)
            if previous is None or result.fetched_at > previous.fetched_at:
                latest[key] = result
        completed = {key for key, result in latest.items() if result.status != LookupStatus.ERROR}

    own_client = client is None
    active_client = client or VivinoClient()
    counts: Counter[str] = Counter()
    attempted = 0
    try:
        for product in products:
            query = build_query(product)
            key = (product.product_id, query, MATCHER_VERSION)
            if not force and key in completed:
                counts["skipped"] += 1
                continue
            if limit > 0 and attempted >= limit:
                break
            attempted += 1
            result = lookup_product(active_client, product, match_threshold=match_threshold)
            append_jsonl(output_path, result)
            counts[str(result.status)] += 1
            if delay_seconds > 0:
                time.sleep(delay_seconds)
    finally:
        if own_client:
            active_client.close()
    return counts


VIVINO_SCORE_FIELDS = [
    "product_id",
    "quality_score",
    "scale_min",
    "scale_max",
    "score_source",
    "observed_at",
    "source_url",
    "review_count",
    "score_scope",
    "match_confidence",
    "source_record_id",
    "matched_name",
    "matched_winery",
    "matched_vintage",
    "vivino_wine_id",
    "vivino_vintage_id",
]


def _score_from_lookup(
    lookup: VivinoLookup,
    *,
    allow_wine_level: bool,
    candidate: VivinoCandidate | None = None,
    identity_approved: bool = False,
) -> tuple[float, int, str] | None:
    active_candidate = candidate or lookup.selected
    if (
        active_candidate is None
        or (lookup.status != LookupStatus.MATCHED and not identity_approved)
    ):
        return None
    candidate = active_candidate
    if lookup.product_vintage is None:
        if candidate.wine_rating is None or candidate.wine_ratings_count is None:
            return None
        return candidate.wine_rating, candidate.wine_ratings_count, "wine"
    if candidate.vintage_match == "exact" and candidate.is_wine_rating is False:
        if candidate.vintage_rating is None or candidate.vintage_ratings_count is None:
            return None
        return candidate.vintage_rating, candidate.vintage_ratings_count, "vintage"
    if allow_wine_level and candidate.wine_rating is not None:
        return candidate.wine_rating, candidate.wine_ratings_count or 0, "wine"
    return None


def _load_identity_reviews(path: Path | None) -> dict[str, VivinoIdentityReview]:
    latest: dict[str, VivinoIdentityReview] = {}
    if path is None or not path.exists():
        return latest
    for review in read_models(path, VivinoIdentityReview):
        previous = latest.get(review.product_id)
        if previous is None or review.reviewed_at > previous.reviewed_at:
            latest[review.product_id] = review
    return latest


def _candidate_from_review(
    lookup: VivinoLookup, review: VivinoIdentityReview
) -> VivinoCandidate | None:
    if review.matcher_version != lookup.matcher_version:
        raise ValueError(f"Stale Vivino review matcher for product {lookup.product_id}")
    if not lookup.response_sha256 or review.response_sha256 != lookup.response_sha256:
        raise ValueError(f"Stale Vivino review response hash for product {lookup.product_id}")
    if review.decision == IdentityReviewDecision.REJECT:
        return None
    if review.candidate_rank is None or review.vivino_wine_id is None:
        raise ValueError(f"Accepted Vivino review lacks candidate identity: {lookup.product_id}")
    for candidate in lookup.candidates:
        if (
            candidate.rank == review.candidate_rank
            and candidate.vivino_wine_id == review.vivino_wine_id
            and candidate.vivino_vintage_id == review.vivino_vintage_id
        ):
            return candidate
    raise ValueError(f"Reviewed Vivino candidate is absent for product {lookup.product_id}")


def export_vivino_scores(
    lookups_path: Path,
    output_path: Path,
    *,
    min_match_confidence: float = 0.82,
    min_review_count: int = 5,
    allow_wine_level: bool = False,
    identity_reviews_path: Path | None = None,
) -> tuple[int, int]:
    latest: dict[str, VivinoLookup] = {}
    for lookup in read_models(lookups_path, VivinoLookup):
        previous = latest.get(lookup.product_id)
        if previous is None or lookup.fetched_at > previous.fetched_at:
            latest[lookup.product_id] = lookup

    identity_reviews = _load_identity_reviews(identity_reviews_path)
    rows: list[dict[str, Any]] = []
    rejected = 0
    for lookup in latest.values():
        review = identity_reviews.get(lookup.product_id)
        identity_approved = review is not None and review.decision == IdentityReviewDecision.ACCEPT
        if review is not None:
            candidate = _candidate_from_review(lookup, review)
            if candidate is None:
                rejected += 1
                continue
        else:
            candidate = lookup.selected
        score = _score_from_lookup(
            lookup,
            allow_wine_level=allow_wine_level,
            candidate=candidate,
            identity_approved=identity_approved,
        )
        if (
            candidate is None
            or (not identity_approved and candidate.match_confidence < min_match_confidence)
            or score is None
            or score[1] < min_review_count
        ):
            rejected += 1
            continue
        rating, review_count, scope = score
        rows.append(
            {
                "product_id": lookup.product_id,
                "quality_score": rating,
                "scale_min": 1,
                "scale_max": 5,
                "score_source": "Vivino community",
                "observed_at": lookup.fetched_at.date().isoformat(),
                "source_url": (
                    candidate.source_url
                    if scope == "vintage"
                    else f"https://www.vivino.com/w/{candidate.vivino_wine_id}"
                ),
                "review_count": review_count,
                "score_scope": scope,
                "match_confidence": round(candidate.match_confidence, 6),
                "source_record_id": (
                    f"wine:{candidate.vivino_wine_id};vintage:{candidate.vivino_vintage_id or ''}"
                ),
                "matched_name": candidate.wine_name,
                "matched_winery": candidate.winery_name,
                "matched_vintage": candidate.vintage or "",
                "vivino_wine_id": candidate.vivino_wine_id,
                "vivino_vintage_id": candidate.vivino_vintage_id or "",
            }
        )

    rows.sort(key=lambda row: str(row["product_id"]))
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
        writer = csv.DictWriter(handle, fieldnames=VIVINO_SCORE_FIELDS)
        writer.writeheader()
        writer.writerows(rows)
    temporary.replace(output_path)
    return len(rows), rejected
