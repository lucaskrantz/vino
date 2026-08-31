"""Command-line entry points for each reproducible pipeline stage."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Annotated

import typer

from .analysis import run_analysis
from .images import download_images
from .review import create_review_queue
from .reviewer import serve_review_app
from .scores import read_manual_reviews, read_quality_scores
from .systembolaget import (
    DEFAULT_DOCKER_IMAGE,
    DEFAULT_UPSTREAM_VERSION,
    Runner,
    build_commands,
    fetch_records,
    read_source_records,
)
from .systembolaget import (
    ingest as ingest_records,
)
from .vision import (
    DEFAULT_OPENAI_MODEL,
    DEFAULT_OPENROUTER_MODEL,
    ImageDetail,
    VisionProvider,
    classify_images,
)
from .vivino import export_vivino_scores, fetch_vivino

app = typer.Typer(
    name="vino",
    no_args_is_help=True,
    help="Research pipeline for animal imagery on wines listed by Systembolaget.",
)


@app.command()
def ingest(
    runner: Annotated[
        Runner, typer.Option(help="Run the pinned upstream CLI locally or through Docker.")
    ] = Runner.DOCKER,
    source_file: Annotated[
        Path | None,
        typer.Option(
            exists=True,
            dir_okay=False,
            help="Read an existing upstream NDJSON snapshot instead of making a network request.",
        ),
    ] = None,
    raw_output: Annotated[Path, typer.Option()] = Path("data/raw/systembolaget/products.ndjson"),
    products_output: Annotated[Path, typer.Option()] = Path("data/interim/products.jsonl"),
    manifest_output: Annotated[Path, typer.Option()] = Path("data/raw/systembolaget/manifest.json"),
    local_binary: Annotated[str, typer.Option(help="Path/name of the upstream CLI.")] = (
        "systembolaget"
    ),
    docker_image: Annotated[str, typer.Option()] = DEFAULT_DOCKER_IMAGE,
    upstream_version: Annotated[str, typer.Option()] = DEFAULT_UPSTREAM_VERSION,
    page_delay: Annotated[str, typer.Option(help="Delay passed to the upstream CLI.")] = "250ms",
    limit: Annotated[
        int,
        typer.Option(min=0, help="Maximum records per core wine type; 0 fetches all."),
    ] = 0,
) -> None:
    """Fetch and normalize red, white, rosé, and sparkling Systembolaget wines."""
    commands: list[list[str]] | None = None
    if source_file is not None:
        records = read_source_records(source_file)
    else:
        commands = build_commands(
            runner,
            local_binary=local_binary,
            docker_image=docker_image,
            limit_per_type=limit,
            page_delay=page_delay,
        )
        records = []
        for index, command in enumerate(commands, start=1):
            typer.echo(
                f"Running pinned Systembolaget adapter ({index}/{len(commands)})...",
                err=True,
            )
            records.extend(fetch_records(command))
    summary = ingest_records(
        records,
        raw_output=raw_output,
        products_output=products_output,
        manifest_output=manifest_output,
        commands=commands,
        upstream_version=upstream_version,
    )
    typer.echo(
        f"Included {summary.included_count}/{summary.raw_count} records; "
        f"exclusions={summary.exclusion_counts}"
    )


@app.command("download-images")
def download_images_command(
    products: Annotated[Path, typer.Option(exists=True, dir_okay=False)] = Path(
        "data/interim/products.jsonl"
    ),
    images_dir: Annotated[Path, typer.Option()] = Path("data/images"),
    manifest: Annotated[Path, typer.Option()] = Path("data/interim/images.jsonl"),
    errors: Annotated[Path, typer.Option()] = Path("data/interim/image_errors.jsonl"),
    width: Annotated[int, typer.Option(min=20, max=2000)] = 800,
    delay: Annotated[float, typer.Option(min=0, help="Polite delay between requests.")] = 0.1,
    limit: Annotated[int, typer.Option(min=0)] = 0,
    force: Annotated[bool, typer.Option(help="Redownload even when hashes match.")] = False,
    fail_fast: Annotated[bool, typer.Option(help="Stop at the first failed image.")] = False,
) -> None:
    """Download the highest available product-image rendition up to WIDTH."""
    available, downloaded, failed = download_images(
        products,
        images_dir=images_dir,
        manifest_path=manifest,
        errors_path=errors,
        requested_width=width,
        delay_seconds=delay,
        limit=limit,
        force=force,
        fail_fast=fail_fast,
    )
    typer.echo(
        f"Image manifest has {available} records ({downloaded} downloaded now; {failed} failed)."
    )
    if failed:
        typer.echo(f"Inspect failures in {errors}.", err=True)


@app.command()
def classify(
    manifest: Annotated[Path, typer.Option(exists=True, dir_okay=False)] = Path(
        "data/interim/images.jsonl"
    ),
    output: Annotated[Path, typer.Option()] = Path("data/interim/vision_results.jsonl"),
    errors: Annotated[Path, typer.Option()] = Path("data/interim/vision_errors.jsonl"),
    provider: Annotated[
        VisionProvider, typer.Option(help="Vision API provider.")
    ] = VisionProvider.OPENAI,
    model: Annotated[
        str | None,
        typer.Option(help="Pin a vision-capable structured-output model for reproducibility."),
    ] = None,
    detail: Annotated[
        ImageDetail,
        typer.Option(help="Image detail level; high is recommended for full-bottle images."),
    ] = ImageDetail.HIGH,
    limit: Annotated[int, typer.Option(min=0, help="0 classifies all unprocessed images.")] = 0,
    delay: Annotated[float, typer.Option(min=0)] = 0,
    force: Annotated[
        bool, typer.Option(help="Repeat calls even when an identical result exists.")
    ] = (False),
    fail_fast: Annotated[bool, typer.Option()] = False,
) -> None:
    """Classify visible front-label animal imagery with OpenAI vision."""
    default_model = (
        DEFAULT_OPENROUTER_MODEL if provider == VisionProvider.OPENROUTER else DEFAULT_OPENAI_MODEL
    )
    selected_model = model or os.environ.get("VINO_VISION_MODEL", default_model)
    attempted, succeeded, skipped = classify_images(
        manifest,
        output_path=output,
        errors_path=errors,
        provider_name=provider,
        model=selected_model,
        detail=detail,
        limit=limit,
        delay_seconds=delay,
        force=force,
        fail_fast=fail_fast,
    )
    typer.echo(f"Attempted {attempted}; succeeded {succeeded}; skipped {skipped}.")
    if attempted != succeeded:
        typer.echo(f"Inspect failures in {errors}.", err=True)


@app.command("review-queue")
def review_queue(
    manifest: Annotated[Path, typer.Option(exists=True, dir_okay=False)] = Path(
        "data/interim/images.jsonl"
    ),
    vision: Annotated[Path, typer.Option(exists=True, dir_okay=False)] = Path(
        "data/interim/vision_results.jsonl"
    ),
    output: Annotated[Path, typer.Option()] = Path("data/manual/review_queue.csv"),
    confidence_threshold: Annotated[float, typer.Option(min=0, max=1)] = 0.8,
    vision_model: Annotated[
        str | None, typer.Option(help="Optionally restrict the queue to one vision model.")
    ] = None,
    include_all: Annotated[
        bool, typer.Option(help="Queue every result, useful for drawing an audit sample.")
    ] = False,
) -> None:
    """Export uncertain, flagged, and low-confidence classifications for blinded review."""
    count = create_review_queue(
        manifest,
        vision,
        output,
        confidence_threshold=confidence_threshold,
        model_filter=vision_model,
        include_all=include_all,
    )
    typer.echo(f"Wrote {count} review rows to {output}.")


@app.command("review-app")
def review_app(
    queue: Annotated[Path, typer.Option(exists=True, dir_okay=False)] = Path(
        "data/manual/luna-v1.3-review-queue.csv"
    ),
    reviews: Annotated[Path, typer.Option()] = Path("data/manual/reviews.csv"),
    host: Annotated[str, typer.Option(help="Bind address; localhost is safest.")] = "127.0.0.1",
    port: Annotated[int, typer.Option(min=1, max=65535)] = 8765,
    open_browser: Annotated[
        bool, typer.Option("--open/--no-open", help="Open the review page automatically.")
    ] = False,
) -> None:
    """Review queued images in a resumable local browser app."""
    serve_review_app(queue, reviews, host=host, port=port, open_browser=open_browser)


@app.command("fetch-vivino")
def fetch_vivino_command(
    products: Annotated[Path, typer.Option(exists=True, dir_okay=False)] = Path(
        "data/interim/products.jsonl"
    ),
    output: Annotated[Path, typer.Option()] = Path("data/external/vivino_lookups.jsonl"),
    match_threshold: Annotated[float, typer.Option(min=0, max=1)] = 0.82,
    delay: Annotated[
        float, typer.Option(min=1, help="Delay between requests; values below 1s are refused.")
    ] = 1.0,
    limit: Annotated[int, typer.Option(min=0)] = 0,
    force: Annotated[bool, typer.Option()] = False,
    acknowledge_unofficial_source: Annotated[
        bool,
        typer.Option(
            "--acknowledge-unofficial-source",
            help="Confirm this is an undocumented source and you have checked applicable terms.",
        ),
    ] = False,
) -> None:
    """Fetch Vivino candidates and ratings without assuming the first result is correct."""
    if not acknowledge_unofficial_source:
        raise typer.BadParameter(
            "Pass --acknowledge-unofficial-source after reviewing Vivino's current terms."
        )
    counts = fetch_vivino(
        products,
        output,
        match_threshold=match_threshold,
        delay_seconds=delay,
        limit=limit,
        force=force,
    )
    typer.echo(f"Vivino lookup outcomes: {dict(sorted(counts.items()))}; output={output}")


@app.command("export-vivino-scores")
def export_vivino_scores_command(
    lookups: Annotated[Path, typer.Option(exists=True, dir_okay=False)] = Path(
        "data/external/vivino_lookups.jsonl"
    ),
    output: Annotated[Path, typer.Option()] = Path("data/external/vivino_quality_scores.csv"),
    min_match_confidence: Annotated[float, typer.Option(min=0, max=1)] = 0.82,
    min_review_count: Annotated[int, typer.Option(min=1)] = 5,
    allow_wine_level: Annotated[
        bool,
        typer.Option(
            help="Allow across-vintage wine averages when an exact vintage score is unavailable."
        ),
    ] = False,
    identity_reviews: Annotated[
        Path | None,
        typer.Option(
            exists=True,
            dir_okay=False,
            help="Optional hash-bound JSONL decisions for ambiguous Vivino identities.",
        ),
    ] = None,
) -> None:
    """Export conservative, analysis-compatible scores from matched Vivino lookups."""
    exported, rejected = export_vivino_scores(
        lookups,
        output,
        min_match_confidence=min_match_confidence,
        min_review_count=min_review_count,
        allow_wine_level=allow_wine_level,
        identity_reviews_path=identity_reviews,
    )
    typer.echo(f"Exported {exported} scores; excluded {rejected}; output={output}")


@app.command()
def analyze(
    products: Annotated[Path, typer.Option(exists=True, dir_okay=False)] = Path(
        "data/interim/products.jsonl"
    ),
    vision: Annotated[Path, typer.Option()] = Path("data/interim/vision_results.jsonl"),
    images: Annotated[
        Path,
        typer.Option(
            help="Current image manifest used to verify every classification and review hash."
        ),
    ] = Path("data/interim/images.jsonl"),
    scores: Annotated[Path, typer.Option()] = Path("data/external/quality_scores.csv"),
    reviews: Annotated[Path, typer.Option()] = Path("data/manual/reviews.csv"),
    dataset_output: Annotated[Path, typer.Option()] = Path("data/processed/research_dataset.csv"),
    summary_output: Annotated[Path, typer.Option()] = Path("reports/summary.json"),
    report_output: Annotated[Path, typer.Option()] = Path("reports/report.md"),
    vision_model: Annotated[
        str | None, typer.Option(help="Optionally restrict analysis to one vision model.")
    ] = None,
    iterations: Annotated[int, typer.Option(min=0)] = 5000,
    seed: Annotated[int, typer.Option()] = 20250308,
) -> None:
    """Join classifications, prices, and external quality scores; write an exploratory report."""
    quality_scores = read_quality_scores(scores)
    manual_reviews = read_manual_reviews(reviews)
    summary = run_analysis(
        products,
        vision,
        quality_scores,
        manual_reviews,
        dataset_output=dataset_output,
        summary_output=summary_output,
        report_output=report_output,
        image_manifest_path=images,
        model_filter=vision_model,
        iterations=iterations,
        seed=seed,
    )
    typer.echo(
        f"Analyzed {summary['cohort']['product_n']} products; report written to {report_output}."
    )


if __name__ == "__main__":
    app()
