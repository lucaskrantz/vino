from pathlib import Path

from typer.testing import CliRunner

from vino_animals.cli import app

FIXTURE = Path("tests/fixtures/systembolaget.ndjson").resolve()


def test_offline_cli_demo_runs_end_to_end(tmp_path: Path) -> None:
    runner = CliRunner()
    raw = tmp_path / "raw.jsonl"
    products = tmp_path / "products.jsonl"
    manifest = tmp_path / "manifest.json"
    ingest = runner.invoke(
        app,
        [
            "ingest",
            "--source-file",
            str(FIXTURE),
            "--raw-output",
            str(raw),
            "--products-output",
            str(products),
            "--manifest-output",
            str(manifest),
        ],
    )

    assert ingest.exit_code == 0, ingest.output
    assert "Included 2/3 records" in ingest.output

    dataset = tmp_path / "dataset.csv"
    summary = tmp_path / "summary.json"
    report = tmp_path / "report.md"
    analyze = runner.invoke(
        app,
        [
            "analyze",
            "--products",
            str(products),
            "--vision",
            str(tmp_path / "missing-vision.jsonl"),
            "--images",
            str(tmp_path / "missing-images.jsonl"),
            "--scores",
            str(tmp_path / "missing-scores.csv"),
            "--reviews",
            str(tmp_path / "missing-reviews.csv"),
            "--dataset-output",
            str(dataset),
            "--summary-output",
            str(summary),
            "--report-output",
            str(report),
            "--iterations",
            "0",
        ],
    )

    assert analyze.exit_code == 0, analyze.output
    assert "Analyzed 2 products" in analyze.output
    assert dataset.exists() and summary.exists() and report.exists()


def test_vivino_cli_requires_explicit_terms_acknowledgement(tmp_path: Path) -> None:
    products = tmp_path / "products.jsonl"
    products.write_text("", encoding="utf-8")

    result = CliRunner().invoke(app, ["fetch-vivino", "--products", str(products)])

    assert result.exit_code != 0
    assert "acknowledge-unofficial-source" in result.output
