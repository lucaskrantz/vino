import json
from pathlib import Path
from urllib.parse import parse_qs

import httpx

from vino_animals.models import WineProduct
from vino_animals.scores import read_quality_scores
from vino_animals.storage import write_jsonl_atomic
from vino_animals.vivino import (
    IdentityReviewDecision,
    LookupStatus,
    VivinoClient,
    VivinoIdentityReview,
    build_query,
    export_vivino_scores,
    fetch_vivino,
    lookup_product,
)


def product(vintage: int = 2024, country: str = "Sverige") -> WineProduct:
    return WineProduct(
        product_id="24697568",
        name="Skepparps",
        subtitle="Grand Prix Solaris",
        producer="Skepparps Vingård",
        country=country,
        category="Vin",
        wine_type="Mousserande vin",
        vintage=vintage,
        price_sek=249,
        volume_ml=750,
        price_per_750ml_sek=249,
    )


def response_payload(*, country_code: str = "se", records_matched: int = 1) -> dict:
    return {
        "explore_vintage": {
            "records_matched": records_matched,
            "matches": [
                {
                    "vintage": {
                        "id": 167632313,
                        "year": 2021,
                        "statistics": {
                            "ratings_average": 3.6,
                            "ratings_count": 206,
                            "wine_ratings_average": 3.5,
                            "wine_ratings_count": 1184,
                            "is_wine_rating": False,
                        },
                        "image": {"location": "//images.vivino.com/example.png"},
                        "wine": {
                            "id": 12345,
                            "name": "Grand Prix Solaris Mousserande Brut",
                            "winery": {"name": "Skepparps Vingard"},
                            "region": {
                                "name": "Skåne",
                                "country": {"code": country_code, "name": "Sverige"},
                            },
                            "statistics": None,
                        },
                    }
                }
            ],
        }
    }


def client_for(payload: dict, captured_urls: list[str] | None = None) -> VivinoClient:
    def handler(request: httpx.Request) -> httpx.Response:
        if captured_urls is not None:
            captured_urls.append(str(request.url))
        return httpx.Response(200, json=payload, request=request)

    return VivinoClient(transport=httpx.MockTransport(handler), attempts=1)


def test_client_uses_current_search_term_parameter_not_ignored_q() -> None:
    urls: list[str] = []
    client = client_for(response_payload(), urls)
    try:
        client.search("Skepparps Grand Prix Solaris", [3])
    finally:
        client.close()

    query = parse_qs(httpx.URL(urls[0]).query.decode())
    assert query["search_term"] == ["Skepparps Grand Prix Solaris"]
    assert "q" not in query
    assert query["wine_type_ids[]"] == ["3"]
    assert query["grape_filter"] == ["varietal"]
    assert query["order_by"] == ["relevance"]
    assert query["order"] == ["desc"]
    assert query["page_size"] == ["24"]


def test_lookup_reads_vintage_statistics_and_matches_identity() -> None:
    client = client_for(response_payload())
    try:
        lookup = lookup_product(client, product())
    finally:
        client.close()

    assert lookup.status == LookupStatus.MATCHED
    assert lookup.selected is not None
    assert lookup.selected.vintage_rating == 3.6
    assert lookup.selected.vintage_ratings_count == 206
    assert lookup.selected.wine_rating == 3.5
    assert lookup.selected.wine_ratings_count == 1184
    assert lookup.selected.vintage_match == "mismatch"
    assert lookup.selected.match_confidence >= 0.82


def test_large_relevance_catalogue_does_not_veto_a_strong_identity_match() -> None:
    client = client_for(response_payload(records_matched=46_230))
    try:
        lookup = lookup_product(client, product())
    finally:
        client.close()

    assert lookup.status == LookupStatus.MATCHED
    assert lookup.warnings == ["large_relevance_result_set"]


def test_query_excludes_legal_producer_and_vintage() -> None:
    assert build_query(product()) == "Skepparps Grand Prix Solaris"


def test_consumer_brand_can_match_when_legal_producer_differs() -> None:
    payload = response_payload(country_code="cl")
    vintage = payload["explore_vintage"]["matches"][0]["vintage"]
    vintage["year"] = 2024
    vintage["wine"]["name"] = "Cabernet Sauvignon"
    vintage["wine"]["winery"]["name"] = "Gato Negro"
    branded_product = WineProduct(
        product_id="793524",
        name="Gato Negro",
        subtitle="Cabernet Sauvignon",
        producer="Viña San Pedro",
        country="Chile",
        category="Vin",
        wine_type="Rött vin",
        vintage=2024,
        price_sek=37,
        volume_ml=250,
        price_per_750ml_sek=111,
    )
    client = client_for(payload)
    try:
        lookup = lookup_product(client, branded_product)
    finally:
        client.close()

    assert lookup.status == LookupStatus.MATCHED
    assert lookup.selected is not None
    assert lookup.selected.producer_similarity == 0
    assert lookup.selected.match_confidence >= 0.82


def test_relevance_rank_breaks_equal_identity_scores_before_rating_count() -> None:
    payload = response_payload()
    first = payload["explore_vintage"]["matches"][0]
    second = json.loads(json.dumps(first))
    first["vintage"]["id"] = 1
    first["vintage"]["statistics"]["ratings_count"] = 5
    second["vintage"]["id"] = 2
    second["vintage"]["statistics"]["ratings_count"] = 50_000
    payload["explore_vintage"]["matches"] = [first, second]
    client = client_for(payload)
    try:
        lookup = lookup_product(client, product())
    finally:
        client.close()

    assert lookup.selected is not None
    assert lookup.selected.rank == 1
    assert lookup.selected.vivino_vintage_id == 1


def test_brand_only_query_requires_manual_review() -> None:
    brand_only = product().model_copy(update={"name": "Skepparps", "subtitle": None})
    client = client_for(response_payload())
    try:
        lookup = lookup_product(client, brand_only)
    finally:
        client.close()

    assert lookup.status == LookupStatus.NEEDS_REVIEW
    assert "brand_only_query_requires_review" in lookup.warnings


def test_country_mismatch_is_never_automatically_matched() -> None:
    client = client_for(response_payload(country_code="fr"))
    try:
        lookup = lookup_product(client, product())
    finally:
        client.close()

    assert lookup.status == LookupStatus.NEEDS_REVIEW
    assert lookup.selected is not None
    assert lookup.selected.hard_conflicts == ["country_mismatch"]


def test_imported_wine_can_match_its_own_country() -> None:
    client = client_for(response_payload(country_code="fr"))
    try:
        lookup = lookup_product(client, product(country="Frankrike"))
    finally:
        client.close()

    assert lookup.status == LookupStatus.MATCHED
    assert lookup.selected is not None
    assert lookup.selected.country_similarity == 1
    assert lookup.selected.hard_conflicts == []


def test_exact_vintage_rating_exports_by_default(tmp_path: Path) -> None:
    client = client_for(response_payload())
    try:
        lookup = lookup_product(client, product(vintage=2021))
    finally:
        client.close()
    lookups = tmp_path / "lookups.jsonl"
    scores = tmp_path / "scores.csv"
    write_jsonl_atomic(lookups, [lookup])

    assert export_vivino_scores(lookups, scores) == (1, 0)
    score = read_quality_scores(scores)["24697568"]
    assert score.quality_score == 3.6
    assert score.review_count == 206
    assert score.score_scope == "vintage"


def test_hash_bound_identity_review_can_approve_ambiguous_match(tmp_path: Path) -> None:
    client = client_for(response_payload())
    try:
        lookup = lookup_product(client, product(vintage=2021), match_threshold=0.99)
    finally:
        client.close()
    assert lookup.status == LookupStatus.NEEDS_REVIEW
    assert lookup.selected is not None
    assert lookup.response_sha256 is not None

    lookups = tmp_path / "lookups.jsonl"
    reviews = tmp_path / "identity-reviews.jsonl"
    scores = tmp_path / "scores.csv"
    write_jsonl_atomic(lookups, [lookup])
    write_jsonl_atomic(
        reviews,
        [
            VivinoIdentityReview(
                product_id=lookup.product_id,
                matcher_version=lookup.matcher_version,
                response_sha256=lookup.response_sha256,
                decision=IdentityReviewDecision.ACCEPT,
                candidate_rank=lookup.selected.rank,
                vivino_wine_id=lookup.selected.vivino_wine_id,
                vivino_vintage_id=lookup.selected.vivino_vintage_id,
                reviewer="test-reviewer",
                review_method="test",
                reason_code="identity_verified",
            )
        ],
    )

    assert export_vivino_scores(
        lookups, scores, identity_reviews_path=reviews
    ) == (1, 0)


def test_stale_identity_review_hash_is_rejected(tmp_path: Path) -> None:
    client = client_for(response_payload())
    try:
        lookup = lookup_product(client, product(vintage=2021), match_threshold=0.99)
    finally:
        client.close()
    assert lookup.selected is not None
    lookups = tmp_path / "lookups.jsonl"
    reviews = tmp_path / "identity-reviews.jsonl"
    write_jsonl_atomic(lookups, [lookup])
    write_jsonl_atomic(
        reviews,
        [
            VivinoIdentityReview(
                product_id=lookup.product_id,
                matcher_version=lookup.matcher_version,
                response_sha256="0" * 64,
                decision=IdentityReviewDecision.ACCEPT,
                candidate_rank=lookup.selected.rank,
                vivino_wine_id=lookup.selected.vivino_wine_id,
                vivino_vintage_id=lookup.selected.vivino_vintage_id,
                reviewer="test-reviewer",
                review_method="test",
                reason_code="identity_verified",
            )
        ],
    )

    try:
        export_vivino_scores(lookups, tmp_path / "scores.csv", identity_reviews_path=reviews)
    except ValueError as exc:
        assert "response hash" in str(exc)
    else:
        raise AssertionError("stale identity review was accepted")


def test_export_requires_explicit_opt_in_for_across_vintage_rating(tmp_path: Path) -> None:
    client = client_for(response_payload())
    try:
        lookup = lookup_product(client, product())
    finally:
        client.close()
    lookups = tmp_path / "lookups.jsonl"
    scores = tmp_path / "scores.csv"
    write_jsonl_atomic(lookups, [lookup])

    assert export_vivino_scores(lookups, scores) == (0, 1)
    exported, rejected = export_vivino_scores(lookups, scores, allow_wine_level=True)

    assert (exported, rejected) == (1, 0)
    score = read_quality_scores(scores)["24697568"]
    assert score.quality_score == 3.5
    assert score.review_count == 1184
    assert score.score_scope == "wine"
    assert score.match_confidence is not None
    assert json.loads(lookup.model_dump_json())["response_sha256"] is not None


def test_fetch_retries_a_previous_error_without_forcing_successes(tmp_path: Path) -> None:
    def forbidden(request: httpx.Request) -> httpx.Response:
        return httpx.Response(403, text="blocked", request=request)

    failing_client = VivinoClient(transport=httpx.MockTransport(forbidden), attempts=1)
    try:
        failed_lookup = lookup_product(failing_client, product())
    finally:
        failing_client.close()
    assert failed_lookup.status == LookupStatus.ERROR

    products_path = tmp_path / "products.jsonl"
    output_path = tmp_path / "lookups.jsonl"
    write_jsonl_atomic(products_path, [product()])
    write_jsonl_atomic(output_path, [failed_lookup])
    successful_client = client_for(response_payload())
    try:
        first_counts = fetch_vivino(
            products_path, output_path, client=successful_client, delay_seconds=0
        )
        second_counts = fetch_vivino(
            products_path, output_path, client=successful_client, delay_seconds=0
        )
    finally:
        successful_client.close()

    assert first_counts == {"matched": 1}
    assert second_counts == {"skipped": 1}
