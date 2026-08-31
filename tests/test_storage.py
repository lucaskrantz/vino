from pathlib import Path

import pytest

from vino_animals.storage import read_jsonl, sha256_file, write_json_atomic, write_jsonl_atomic


def test_json_writes_are_readable_and_hashable(tmp_path: Path) -> None:
    jsonl = tmp_path / "nested" / "records.jsonl"
    document = tmp_path / "nested" / "document.json"

    write_jsonl_atomic(jsonl, [{"id": "1"}, {"id": "2", "name": "räv"}])
    write_json_atomic(document, {"ok": True})

    assert list(read_jsonl(jsonl)) == [{"id": "1"}, {"id": "2", "name": "räv"}]
    assert document.read_text(encoding="utf-8").endswith("\n")
    assert len(sha256_file(document)) == 64


def test_read_jsonl_reports_line_number_for_invalid_data(tmp_path: Path) -> None:
    path = tmp_path / "bad.jsonl"
    path.write_text('{"ok": true}\nnot-json\n', encoding="utf-8")

    with pytest.raises(ValueError, match=r"bad\.jsonl:2"):
        list(read_jsonl(path))


def test_read_jsonl_rejects_non_object_values(tmp_path: Path) -> None:
    path = tmp_path / "list.jsonl"
    path.write_text("[]\n", encoding="utf-8")

    with pytest.raises(ValueError, match="Expected a JSON object"):
        list(read_jsonl(path))
