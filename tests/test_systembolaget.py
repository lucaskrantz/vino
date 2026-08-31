import json
import subprocess
from pathlib import Path

import pytest

from vino_animals.models import WineProduct
from vino_animals.storage import read_models
from vino_animals.systembolaget import (
    CORE_WINE_TYPES,
    DEFAULT_DOCKER_IMAGE,
    Runner,
    build_commands,
    fetch_records,
    ingest,
    read_source_records,
)

FIXTURE = Path("tests/fixtures/systembolaget.ndjson")


def test_default_docker_image_uses_the_published_release_tag() -> None:
    assert DEFAULT_DOCKER_IMAGE == "ghcr.io/alexgustafsson/systembolaget-api:5.0.0"


def test_commands_split_the_core_wine_types_without_origin_filter() -> None:
    commands = build_commands(
        Runner.DOCKER,
        docker_image="adapter:v5",
        limit_per_type=3,
    )

    assert len(commands) == len(CORE_WINE_TYPES) == 4
    assert {command[command.index("--subcategory") + 1] for command in commands} == set(
        CORE_WINE_TYPES
    )
    for command in commands:
        assert command[:4] == ["docker", "run", "--rm", "adapter:v5"]
        assert command[command.index("--category") + 1] == "Vin"
        assert "--origin" not in command
        assert command[-2:] == ["--limit", "3"]


def test_fetch_retries_a_transient_upstream_failure(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    calls = 0

    def run(*_args, **_kwargs):
        nonlocal calls
        calls += 1
        if calls == 1:
            return subprocess.CompletedProcess([], 1, stdout="", stderr="unexpected EOF")
        return subprocess.CompletedProcess([], 0, stdout='{"productId":"1"}\n', stderr="")

    monkeypatch.setattr("vino_animals.systembolaget.subprocess.run", run)
    monkeypatch.setattr("vino_animals.systembolaget.time.sleep", lambda _seconds: None)

    assert fetch_records(["systembolaget"], attempts=2) == [{"productId": "1"}]
    assert calls == 2


def test_ingest_includes_imported_core_wine_and_excludes_glogg(tmp_path: Path) -> None:
    records = read_source_records(FIXTURE)
    raw = tmp_path / "raw.jsonl"
    products_path = tmp_path / "products.jsonl"
    manifest = tmp_path / "manifest.json"

    summary = ingest(
        records,
        raw_output=raw,
        products_output=products_path,
        manifest_output=manifest,
        commands=None,
    )

    products = list(read_models(products_path, WineProduct))
    assert summary.raw_count == 3
    assert summary.included_count == 2
    assert summary.exclusion_counts == {"wine_type_not_core": 1}
    assert {product.country for product in products} == {"Sverige", "Frankrike"}
    assert products[0].price_per_750ml_sek == 150
    assert products[0].images[0].available_widths == [20, 100, 400, 800]
    inclusion = json.loads(manifest.read_text())["client_inclusion"]
    assert inclusion == {
        "categoryLevel1": "Vin",
        "categoryLevel2": list(CORE_WINE_TYPES),
    }
