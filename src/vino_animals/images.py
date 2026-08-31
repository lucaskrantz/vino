"""Product-image retrieval with resumability and content validation."""

from __future__ import annotations

import hashlib
import os
import re
import tempfile
import time
from datetime import UTC, datetime
from pathlib import Path
from urllib.parse import urlencode

import httpx

from .models import ImageRecord, ProductImage, WineProduct
from .storage import append_jsonl, read_models, sha256_file, write_jsonl_atomic

_SAFE_ID = re.compile(r"[^A-Za-z0-9_.-]+")


def choose_width(image: ProductImage, requested_width: int) -> int:
    available = image.available_widths
    if not available:
        return requested_width
    eligible = [width for width in available if width <= requested_width]
    return max(eligible) if eligible else min(available)


def direct_image_url(base_url: str, width: int) -> str:
    return f"{base_url.rstrip('/')}_{width}.webp"


def proxy_image_url(direct_url: str, width: int) -> str:
    query = urlencode({"url": direct_url, "w": str(width), "q": "85"})
    return f"https://www.systembolaget.se/_next/image/?{query}"


def detect_media_type(content: bytes) -> tuple[str, str]:
    if content.startswith(b"\xff\xd8\xff"):
        return "image/jpeg", ".jpg"
    if content.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png", ".png"
    if content.startswith((b"GIF87a", b"GIF89a")):
        return "image/gif", ".gif"
    if len(content) >= 12 and content[:4] == b"RIFF" and content[8:12] == b"WEBP":
        return "image/webp", ".webp"
    raise ValueError("Response is not a supported JPEG, PNG, GIF, or WebP image")


def _safe_product_id(product_id: str) -> str:
    cleaned = _SAFE_ID.sub("_", product_id)
    if not cleaned or cleaned in {".", ".."}:
        raise ValueError(f"Unsafe product id: {product_id!r}")
    return cleaned


def _write_bytes_atomic(path: Path, content: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(prefix=f".{path.name}.", dir=path.parent)
    temporary = Path(temporary_name)
    try:
        with os.fdopen(descriptor, "wb") as handle:
            handle.write(content)
            handle.flush()
            os.fsync(handle.fileno())
        temporary.replace(path)
    except BaseException:
        temporary.unlink(missing_ok=True)
        raise


def _get_image(
    client: httpx.Client,
    urls: list[str],
    *,
    max_bytes: int,
    attempts: int,
) -> tuple[bytes, str]:
    errors: list[str] = []
    for url in urls:
        for attempt in range(attempts):
            try:
                response = client.get(url)
                response.raise_for_status()
                if len(response.content) > max_bytes:
                    raise ValueError(f"image exceeds {max_bytes} bytes")
                detect_media_type(response.content)
                return response.content, str(response.url)
            except (httpx.HTTPError, ValueError) as exc:
                errors.append(f"{url}: {exc}")
                if attempt + 1 < attempts:
                    time.sleep(2**attempt)
    raise RuntimeError("Unable to fetch a valid image; " + " | ".join(errors))


def download_images(
    products_path: Path,
    *,
    images_dir: Path,
    manifest_path: Path,
    errors_path: Path | None = None,
    requested_width: int = 800,
    timeout_seconds: float = 30,
    delay_seconds: float = 0.1,
    max_bytes: int = 20 * 1024 * 1024,
    attempts: int = 3,
    force: bool = False,
    limit: int = 0,
    fail_fast: bool = False,
) -> tuple[int, int, int]:
    """Download product images and return ``(available, newly_downloaded, failed)``."""
    products = list(read_models(products_path, WineProduct))
    expected_keys = {
        (product.product_id, image_index)
        for product in products
        for image_index in range(len(product.images))
    }
    previous: dict[tuple[str, int], ImageRecord] = {}
    if manifest_path.exists():
        for record in read_models(manifest_path, ImageRecord):
            key = (record.product_id, record.image_index)
            if key in expected_keys:
                if key in previous:
                    raise ValueError(f"Duplicate image manifest record for {key!r}")
                previous[key] = record

    # Start with prior records so a limited/resumed run never truncates valid manifest entries.
    records = previous.copy()
    newly_downloaded = 0
    failed = 0
    processed = 0
    headers = {"User-Agent": "vino-animals-research/0.1 (non-commercial research)"}

    def checkpoint() -> list[ImageRecord]:
        ordered_records = [records[key] for key in sorted(records)]
        write_jsonl_atomic(manifest_path, ordered_records)
        return ordered_records

    with httpx.Client(timeout=timeout_seconds, follow_redirects=True, headers=headers) as client:
        for product in products:
            for image_index, image in enumerate(product.images):
                if limit > 0 and processed >= limit:
                    return len(checkpoint()), newly_downloaded, failed
                processed += 1
                width = choose_width(image, requested_width)
                key = (product.product_id, image_index)
                old = previous.get(key)
                if (
                    not force
                    and old is not None
                    and old.image_base_url == image.base_url
                    and old.rendition_width == width
                ):
                    old_path = Path(old.local_path)
                    if old_path.exists() and sha256_file(old_path) == old.sha256:
                        records[key] = old
                        continue

                # Never leave a stale record available if this refresh fails midway.
                records.pop(key, None)
                try:
                    direct_url = direct_image_url(image.base_url, width)
                    content, actual_url = _get_image(
                        client,
                        [direct_url, proxy_image_url(direct_url, width)],
                        max_bytes=max_bytes,
                        attempts=attempts,
                    )
                    media_type, extension = detect_media_type(content)
                    local_path = (
                        images_dir
                        / _safe_product_id(product.product_id)
                        / f"{image_index}{extension}"
                    )
                    _write_bytes_atomic(local_path, content)
                    records[key] = ImageRecord(
                        product_id=product.product_id,
                        image_index=image_index,
                        image_base_url=image.base_url,
                        source_url=actual_url,
                        local_path=str(local_path),
                        rendition_width=width,
                        media_type=media_type,
                        byte_size=len(content),
                        sha256=hashlib.sha256(content).hexdigest(),
                    )
                    newly_downloaded += 1
                    if delay_seconds > 0:
                        time.sleep(delay_seconds)
                except Exception as exc:
                    failed += 1
                    if errors_path is not None:
                        append_jsonl(
                            errors_path,
                            {
                                "product_id": product.product_id,
                                "image_index": image_index,
                                "image_base_url": image.base_url,
                                "rendition_width": width,
                                "failed_at": datetime.now(UTC).isoformat(),
                                "error_type": type(exc).__name__,
                                "error": str(exc),
                            },
                        )
                    if fail_fast:
                        checkpoint()
                        raise
                except BaseException:
                    checkpoint()
                    raise

    return len(checkpoint()), newly_downloaded, failed
