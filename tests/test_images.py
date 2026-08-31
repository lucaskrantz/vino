import hashlib
from pathlib import Path

import pytest

from vino_animals.images import (
    choose_width,
    detect_media_type,
    direct_image_url,
    download_images,
)
from vino_animals.models import ImageRecord, ProductImage, WineProduct
from vino_animals.storage import read_models, write_jsonl_atomic


def test_choose_highest_available_width_not_exceeding_request() -> None:
    image = ProductImage(base_url="https://example.test/image", available_widths=[100, 400, 800])
    assert choose_width(image, 700) == 400
    assert direct_image_url(image.base_url, 400) == "https://example.test/image_400.webp"


def test_detect_webp_and_reject_html() -> None:
    assert detect_media_type(b"RIFF\x00\x00\x00\x00WEBPpayload") == ("image/webp", ".webp")
    with pytest.raises(ValueError, match="supported"):
        detect_media_type(b"<html>not an image</html>")


def test_limited_resume_does_not_truncate_existing_manifest(tmp_path: Path) -> None:
    image_content = b"RIFF\x00\x00\x00\x00WEBPpayload"
    digest = hashlib.sha256(image_content).hexdigest()
    products = []
    records = []
    for product_id in ("1", "2"):
        local_path = tmp_path / f"{product_id}.webp"
        local_path.write_bytes(image_content)
        products.append(
            WineProduct(
                product_id=product_id,
                name=product_id,
                country="Sverige",
                category="Vin",
                price_sek=100,
                volume_ml=750,
                price_per_750ml_sek=100,
                images=[
                    ProductImage(
                        base_url=f"https://example.test/{product_id}",
                        available_widths=[800],
                    )
                ],
            )
        )
        records.append(
            ImageRecord(
                product_id=product_id,
                image_index=0,
                image_base_url=f"https://example.test/{product_id}",
                source_url=f"https://example.test/{product_id}_800.webp",
                local_path=str(local_path),
                rendition_width=800,
                media_type="image/webp",
                byte_size=len(image_content),
                sha256=digest,
            )
        )
    products_path = tmp_path / "products.jsonl"
    manifest_path = tmp_path / "images.jsonl"
    write_jsonl_atomic(products_path, products)
    write_jsonl_atomic(manifest_path, records)

    available, downloaded, failed = download_images(
        products_path,
        images_dir=tmp_path / "downloads",
        manifest_path=manifest_path,
        limit=1,
        delay_seconds=0,
    )

    assert (available, downloaded, failed) == (2, 0, 0)
    assert len(list(read_models(manifest_path, ImageRecord))) == 2


def test_changed_source_image_is_redownloaded(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    old_content = b"RIFF\x00\x00\x00\x00WEBPold"
    new_content = b"RIFF\x00\x00\x00\x00WEBPnew"
    local_path = tmp_path / "old.webp"
    local_path.write_bytes(old_content)
    products_path = tmp_path / "products.jsonl"
    manifest_path = tmp_path / "images.jsonl"
    new_base_url = "https://example.test/new"
    write_jsonl_atomic(
        products_path,
        [
            WineProduct(
                product_id="1",
                name="Wine",
                country="Sverige",
                category="Vin",
                price_sek=100,
                volume_ml=750,
                price_per_750ml_sek=100,
                images=[ProductImage(base_url=new_base_url, available_widths=[800])],
            )
        ],
    )
    write_jsonl_atomic(
        manifest_path,
        [
            ImageRecord(
                product_id="1",
                image_index=0,
                image_base_url="https://example.test/old",
                source_url="https://example.test/old_800.webp",
                local_path=str(local_path),
                rendition_width=800,
                media_type="image/webp",
                byte_size=len(old_content),
                sha256=hashlib.sha256(old_content).hexdigest(),
            )
        ],
    )

    monkeypatch.setattr(
        "vino_animals.images._get_image",
        lambda *_args, **_kwargs: (new_content, f"{new_base_url}_800.webp"),
    )
    available, downloaded, failed = download_images(
        products_path,
        images_dir=tmp_path / "downloads",
        manifest_path=manifest_path,
        delay_seconds=0,
    )

    assert (available, downloaded, failed) == (1, 1, 0)
    record = next(read_models(manifest_path, ImageRecord))
    assert record.image_base_url == new_base_url
    assert record.sha256 == hashlib.sha256(new_content).hexdigest()


def test_download_failure_is_recorded_while_completed_images_are_kept(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    products_path = tmp_path / "products.jsonl"
    manifest_path = tmp_path / "images.jsonl"
    products = [
        WineProduct(
            product_id=product_id,
            name=product_id,
            country="Sverige",
            category="Vin",
            price_sek=100,
            volume_ml=750,
            price_per_750ml_sek=100,
            images=[ProductImage(base_url=f"https://example.test/{product_id}")],
        )
        for product_id in ("1", "2")
    ]
    write_jsonl_atomic(products_path, products)
    content = b"RIFF\x00\x00\x00\x00WEBPimage"
    calls = 0

    def fetch(*_args, **_kwargs):
        nonlocal calls
        calls += 1
        if calls == 2:
            raise RuntimeError("second image failed")
        return content, "https://example.test/1_800.webp"

    monkeypatch.setattr("vino_animals.images._get_image", fetch)
    errors_path = tmp_path / "errors.jsonl"
    outcome = download_images(
        products_path,
        images_dir=tmp_path / "downloads",
        manifest_path=manifest_path,
        errors_path=errors_path,
        delay_seconds=0,
    )

    assert outcome == (1, 1, 1)
    assert "second image failed" in errors_path.read_text(encoding="utf-8")
    records = list(read_models(manifest_path, ImageRecord))
    assert [(record.product_id, record.image_base_url) for record in records] == [
        ("1", "https://example.test/1")
    ]
