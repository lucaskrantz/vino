"""Adapter for AlexGustafsson/systembolaget-api's NDJSON CLI output."""

from __future__ import annotations

import json
import subprocess
import time
from collections import Counter
from dataclasses import dataclass
from datetime import UTC, datetime
from enum import StrEnum
from pathlib import Path
from typing import Any

from .models import ProductImage, WineProduct
from .storage import sha256_file, write_json_atomic, write_jsonl_atomic

UPSTREAM_REPOSITORY = "https://github.com/AlexGustafsson/systembolaget-api"
DEFAULT_UPSTREAM_VERSION = "v5.0.0"
DEFAULT_DOCKER_IMAGE = "ghcr.io/alexgustafsson/systembolaget-api:5.0.0"
CORE_WINE_TYPES = ("Rött vin", "Vitt vin", "Rosévin", "Mousserande vin")


class Runner(StrEnum):
    DOCKER = "docker"
    LOCAL = "local"


@dataclass(frozen=True)
class IngestSummary:
    raw_count: int
    included_count: int
    exclusion_counts: dict[str, int]
    commands: list[list[str]] | None


def build_command(
    runner: Runner,
    *,
    local_binary: str = "systembolaget",
    docker_image: str = DEFAULT_DOCKER_IMAGE,
    limit: int = 0,
    page_delay: str = "250ms",
    wine_type: str | None = None,
) -> list[str]:
    command = [local_binary]
    if runner == Runner.DOCKER:
        command = ["docker", "run", "--rm", docker_image]
    command.extend(
        [
            "assortment",
            "--category",
            "Vin",
            "--sort-by",
            "Name",
            "--sort",
            "ascending",
            "--page-delay",
            page_delay,
        ]
    )
    if wine_type is not None:
        if wine_type not in CORE_WINE_TYPES:
            raise ValueError(f"Unsupported core wine type: {wine_type!r}")
        command.extend(["--subcategory", wine_type])
    if limit > 0:
        command.extend(["--limit", str(limit)])
    return command


def build_commands(
    runner: Runner,
    *,
    local_binary: str = "systembolaget",
    docker_image: str = DEFAULT_DOCKER_IMAGE,
    limit_per_type: int = 0,
    page_delay: str = "250ms",
) -> list[list[str]]:
    """Split by core wine type to avoid the upstream API's result-page ceiling."""
    return [
        build_command(
            runner,
            local_binary=local_binary,
            docker_image=docker_image,
            limit=limit_per_type,
            page_delay=page_delay,
            wine_type=wine_type,
        )
        for wine_type in CORE_WINE_TYPES
    ]


def _parse_ndjson(content: str, source: str) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    for line_number, line in enumerate(content.splitlines(), start=1):
        if not line.strip():
            continue
        try:
            record = json.loads(line)
        except json.JSONDecodeError as exc:
            raise ValueError(f"Invalid JSON at {source}:{line_number}: {exc}") from exc
        if not isinstance(record, dict):
            raise ValueError(f"Expected a JSON object at {source}:{line_number}")
        records.append(record)
    return records


def fetch_records(
    command: list[str], timeout_seconds: float = 900, attempts: int = 3
) -> list[dict[str, Any]]:
    """Run one complete subtype query, retrying transient CLI/network failures from scratch."""
    if attempts < 1:
        raise ValueError("attempts must be at least 1")
    last_detail = "unknown error"
    for attempt in range(attempts):
        try:
            result = subprocess.run(  # noqa: S603 - assembled as an argument list
                command,
                check=False,
                capture_output=True,
                text=True,
                timeout=timeout_seconds,
            )
        except FileNotFoundError as exc:
            raise RuntimeError(f"Could not execute {command[0]!r}; is it installed?") from exc
        except subprocess.TimeoutExpired:
            last_detail = f"timed out after {timeout_seconds:g}s"
        else:
            if result.returncode == 0:
                return _parse_ndjson(result.stdout, "systembolaget stdout")
            detail = (result.stderr or result.stdout).strip()
            last_detail = f"exit code {result.returncode}: {detail}"
        if attempt + 1 < attempts:
            time.sleep(min(2**attempt, 30))
    raise RuntimeError(f"Systembolaget command failed after {attempts} attempts: {last_detail}")


def read_source_records(path: Path) -> list[dict[str, Any]]:
    return _parse_ndjson(path.read_text(encoding="utf-8"), str(path))


def _optional_datetime(value: Any) -> datetime | None:
    if value in (None, ""):
        return None
    if not isinstance(value, str):
        raise ValueError(f"Expected an ISO datetime, got {value!r}")
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def _optional_int(value: Any) -> int | None:
    if value in (None, ""):
        return None
    return int(value)


def _available_widths(record: dict[str, Any]) -> list[int]:
    modules = record.get("imageModules")
    if not isinstance(modules, dict):
        return []
    sizes = modules.get("sizes")
    if not isinstance(sizes, str):
        return []
    widths: set[int] = set()
    for value in sizes.split(";"):
        try:
            width = int(value)
        except ValueError:
            continue
        if width > 0:
            widths.add(width)
    return sorted(widths)


def normalize_product(record: dict[str, Any]) -> WineProduct:
    """Normalize one already in-scope API product or raise on bad required data."""
    widths = _available_widths(record)
    images: list[ProductImage] = []
    for raw_image in record.get("images") or []:
        if not isinstance(raw_image, dict):
            continue
        base_url = raw_image.get("imageUrl")
        if isinstance(base_url, str) and base_url.startswith("https://"):
            images.append(ProductImage(base_url=base_url, available_widths=widths))

    price = float(record["price"])
    volume = float(record["volume"])
    return WineProduct(
        product_id=str(record["productId"]),
        product_number=str(record["productNumber"]) if record.get("productNumber") else None,
        name=str(record["productNameBold"]),
        subtitle=str(record["productNameThin"]) if record.get("productNameThin") else None,
        producer=str(record["producerName"]) if record.get("producerName") else None,
        country=str(record.get("country") or ""),
        category=str(record["categoryLevel1"]),
        wine_type=(str(record["categoryLevel2"]) if record.get("categoryLevel2") else None),
        wine_subtype=(str(record["categoryLevel3"]) if record.get("categoryLevel3") else None),
        vintage=_optional_int(record.get("vintage")),
        assortment=(str(record["assortmentText"]) if record.get("assortmentText") else None),
        price_sek=price,
        volume_ml=volume,
        price_per_750ml_sek=round(price * 750 / volume, 4),
        alcohol_percentage=(
            float(record["alcoholPercentage"])
            if record.get("alcoholPercentage") is not None
            else None
        ),
        is_organic=record.get("isOrganic") if isinstance(record.get("isOrganic"), bool) else None,
        product_launch_date=_optional_datetime(record.get("productLaunchDate")),
        images=images,
    )


def ingest(
    records: list[dict[str, Any]],
    *,
    raw_output: Path,
    products_output: Path,
    manifest_output: Path,
    commands: list[list[str]] | None,
    upstream_version: str = DEFAULT_UPSTREAM_VERSION,
) -> IngestSummary:
    """Persist source data and enforce the Systembolaget core-wine cohort client-side."""
    write_jsonl_atomic(raw_output, records)

    products: list[WineProduct] = []
    exclusions: Counter[str] = Counter()
    seen: set[str] = set()
    for record in records:
        # API filters have occasionally returned false positives; never trust them alone.
        if record.get("categoryLevel1") != "Vin":
            exclusions["category_not_vin"] += 1
            continue
        if record.get("categoryLevel2") not in CORE_WINE_TYPES:
            exclusions["wine_type_not_core"] += 1
            continue
        product_id = str(record.get("productId", ""))
        if not product_id:
            raise ValueError("An in-scope source record has no productId")
        if product_id in seen:
            exclusions["duplicate_product_id"] += 1
            continue
        seen.add(product_id)
        products.append(normalize_product(record))

    write_jsonl_atomic(products_output, products)
    retrieved_at = datetime.now(UTC)
    manifest = {
        "schema_version": "1.0",
        "retrieved_at": retrieved_at.isoformat(),
        "upstream_repository": UPSTREAM_REPOSITORY,
        "upstream_version": upstream_version,
        "source_commands": commands,
        "server_filters": {
            "category": "Vin",
            "subcategories": list(CORE_WINE_TYPES),
        },
        "client_inclusion": {
            "categoryLevel1": "Vin",
            "categoryLevel2": list(CORE_WINE_TYPES),
        },
        "raw_output": str(raw_output),
        "raw_sha256": sha256_file(raw_output),
        "products_output": str(products_output),
        "products_sha256": sha256_file(products_output),
        "raw_count": len(records),
        "included_count": len(products),
        "exclusion_counts": dict(sorted(exclusions.items())),
        "products_without_images": sum(not product.images for product in products),
    }
    write_json_atomic(manifest_output, manifest)
    return IngestSummary(
        raw_count=len(records),
        included_count=len(products),
        exclusion_counts=dict(exclusions),
        commands=commands,
    )
