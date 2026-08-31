from pathlib import Path

import pytest

from vino_animals.scores import read_quality_scores


def test_score_is_normalized_from_declared_scale(tmp_path: Path) -> None:
    path = tmp_path / "scores.csv"
    path.write_text(
        "product_id,quality_score,scale_min,scale_max,score_source,observed_at,source_url\n"
        "123,4,1,5,Panel A,2025-03-08,https://example.test/123\n",
        encoding="utf-8",
    )
    score = read_quality_scores(path)["123"]
    assert score.normalized_score_0_100 == 75


def test_duplicate_score_ids_are_rejected(tmp_path: Path) -> None:
    path = tmp_path / "scores.csv"
    header = "product_id,quality_score,scale_min,scale_max,score_source,observed_at,source_url\n"
    row = "123,90,0,100,Panel A,2025-03-08,\n"
    path.write_text(header + row + row, encoding="utf-8")
    with pytest.raises(ValueError, match="Duplicate"):
        read_quality_scores(path)
