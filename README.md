# Vino Animals

A reproducible research pipeline for the question:

> Among core wine types listed by Systembolaget, how is animal imagery in the front-label artwork associated with price and independent quality score?

The project uses [AlexGustafsson/systembolaget-api](https://github.com/AlexGustafsson/systembolaget-api) for product metadata and images, then sends the images through a structured vision-classification stage. It creates an analysis-ready table rather than claiming a causal answer.

## Current analyzed state

The pipeline has been run on a frozen 11,383-product Systembolaget snapshot. It identified 1,349 confirmed animal-label products, 5,976 confirmed absences, and 4,058 uncertain products. The full 1,349-product animal cohort was queried against Vivino: matcher v1.2 automatically matched 890 identities and sent 392 through a conservative, provenance-preserving AI review. After a secondary image-assisted audit, the effective decisions are 190 accepted and 202 rejected, with 67 no-matches and no retrieval errors.

The current primary analysis contains 598 Vivino community scores: 509 exact-vintage ratings and 89 wine-level ratings for products without a declared vintage. A separately labeled across-vintage sensitivity analysis contains 1,033 scores. See [project status](docs/project-status.md) for the artifact inventory, website readiness, and remaining publication gates.

## Important score limitation

The Systembolaget product payload supplies price but **does not supply a critic/consumer wine-quality score**. Its API/CLI `Score` sort is search relevance, not wine quality. This project therefore:

- never invents a score from taste clocks or price;
- retains score source, scale, date, URL, review count, and identity provenance;
- normalizes declared scales to 0–100 while preserving raw values;
- treats Vivino as a self-selected community rating, not an objective or critic score;
- keeps across-vintage ratings separate from the primary matching rule.

Vivino was selected as the free operational source and collected through a conservative adapter developed after reviewing [`ha-wine-cellar`](docs/vivino-source-review.md). Its endpoint is undocumented and has no official public API contract, so terms must be checked for the intended deployment and the integration may stop working.

Scores were collected only for confirmed animal-label products. The current data support comparisons among sufficiently covered animal categories, but **not** a score comparison between animal and no-animal labels. A publishable study still requires frozen display thresholds, taxonomy cleanup, the planned random/blinded vision audit, and source-terms review. The program does not manufacture the missing measurements.

## Pipeline

```text
systembolaget-api CLI (Vin + red/white/rosé/sparkling)
        │
        ▼
raw NDJSON + immutable hashes ──► strict client-side cohort validation
        │
        ├──────────────► optional Vivino candidate matching ──► quality-score CSV
        ▼
normalized products ──► highest available product images
        │
        ▼
structured AI vision ──► optional hash-bound human corrections
        │
        ├──────────────► external quality-score CSV
        ▼
joined dataset + descriptive summaries + exploratory resampling tests
```

An image is `present`, `absent`, or `uncertain`. Missing and unreadable labels are never silently treated as “no animal.” The model records specific animal names, broad taxon groups, depiction style, evidence, and confidence.

## Quick start

Requirements: Python 3.11+, and either Docker or the upstream `systembolaget` v5.0.0 binary. Docker defaults to the published `ghcr.io/alexgustafsson/systembolaget-api:5.0.0` image (the container tag omits the release's leading `v`).

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e '.[vision,dev]'

# Fetch red, white, rosé, and sparkling wines currently listed by Systembolaget.
# The four queries avoid the upstream API's result-page ceiling.
vino ingest --runner docker

# Optional: test the unofficial Vivino source on ten products, inspect every match,
# then resume the complete retrieval. Check current terms before acknowledging.
vino fetch-vivino --limit 10 --acknowledge-unofficial-source
# Inspect data/external/vivino_lookups.jsonl before continuing.
vino fetch-vivino --acknowledge-unofficial-source

# Optional: adjudicate ambiguous identities without exposing ratings to the
# reviewer model. Requires OPENROUTER_API_KEY and remains AI-assisted, not human.
python scripts/ai_review_vivino.py

# Primary export: exact-vintage ratings for dated products. Apply the separately
# audited, hash-bound identity decisions for ambiguous matches.
vino export-vivino-scores \
  --identity-reviews data/manual/vivino_identity_reviews.jsonl

# Separately labeled sensitivity export with across-vintage fallback.
vino export-vivino-scores \
  --allow-wine-level \
  --identity-reviews data/manual/vivino_identity_reviews.jsonl \
  --output data/external/vivino_quality_scores_wine_level.csv

# Download product images, preferring the 800-pixel rendition.
vino download-images

# First run a small cost/quality check, then inspect results and errors.
export OPENAI_API_KEY='...'
vino classify --model gpt-4o-mini-2024-07-18 --limit 10
# Run again without --limit after approving the sample.
vino classify --model gpt-4o-mini-2024-07-18

# Alternatively, run GPT-5.6 Luna natively through OpenAI. Reasoning is disabled,
# high image detail is explicit, and token/cost usage is stored per result.
export OPENAI_API_KEY='...'
vino classify \
  --provider openai \
  --model gpt-5.6-luna \
  --detail high \
  --limit 100
# OpenRouter is also supported with --provider openrouter, model
# openai/gpt-5.6-luna, and OPENROUTER_API_KEY.
# Remove --limit only after reviewing the pilot.

# Export uncertain, model-flagged, and low-confidence rows for blinded review.
vino review-queue --vision-model gpt-4o-mini-2024-07-18
# Or open the resumable local browser reviewer (no extra dependency).
vino review-app --open
# Verify each queued image; the app saves full corrections to data/manual/reviews.csv.
# Stop with Ctrl-C; restarting the app resumes from the saved reviews.

# Alternatively, use the generic CSV template for another lawful score source:
# cp data/external/quality_scores.csv.example data/external/quality_scores.csv

vino analyze \
  --vision-model gpt-4o-mini-2024-07-18 \
  --scores data/external/vivino_quality_scores.csv
```

Outputs:

- `data/raw/systembolaget/`: source snapshot and provenance manifest;
- `data/interim/products.jsonl`: strictly filtered normalized cohort;
- `data/interim/images.jsonl`: image URLs, local paths, and SHA-256 hashes;
- `data/interim/image_errors.jsonl`: append-only image retrieval failures for retry/audit;
- `data/interim/vision_results.jsonl`: append-only structured AI results with provider, detail level, token usage, and reported cost;
- `data/external/vivino_lookups.jsonl`: matched candidates, alternatives, ratings, and provenance;
- `data/manual/vivino_identity_reviews.jsonl`: hash-bound ambiguous-identity decisions;
- `data/external/vivino_quality_scores.csv`: primary conservative community-score export;
- `data/external/vivino_quality_scores_wine_level.csv`: across-vintage sensitivity export;
- `data/processed/research_dataset.csv`: primary one-row-per-product dataset;
- `data/processed/research_dataset_wine_level.csv`: sensitivity dataset;
- `reports/summary.json` and `reports/report.md`: primary analysis;
- `reports/summary_wine_level.json` and `reports/report_wine_level.md`: sensitivity analysis.

Use an already archived upstream NDJSON snapshot without network access:

```bash
vino ingest --source-file path/to/products.ndjson
```

The repository includes a synthetic API-shaped smoke-test fixture:

```bash
make demo
vino analyze --iterations 0
```

## Cohort and imagery definitions

“Swedish wine” means wine listed by the Swedish retailer Systembolaget; it does not mean Swedish-origin wine. Country of origin is unrestricted. Both server-side and client-side filters enforce:

```text
categoryLevel1 == "Vin"
categoryLevel2 IN {"Rött vin", "Vitt vin", "Rosévin", "Mousserande vin"}
```

Glögg, fruit/flavoured wine, vermouth, aperitifs, mixed drinks, wine boxes as a separate category, and other non-core types are excluded. The four included types are queried separately to avoid the upstream API's result-page ceiling.

Logo imagery and label artwork are treated as one exposure: a clearly recognizable, intentionally depicted animal figure, head, or body in the primary front-label artwork counts. Crest components, coats of arms, decorative wings over shields, tiny emblems, seals, and ambiguous heraldic ornament do not count; the animal must be independently recognizable rather than inferred from heraldic convention. Results include rankings by individual animal imagery and broader taxonomic group. Products with multiple animal types contribute to each applicable imagery group.

Prices are analyzed primarily as SEK per 750 ml. The current listed price, original package volume, and nominal price are retained.

## Human validation

AI output is measurement, not ground truth. Before publication:

1. manually review all `uncertain` and `needs_review` cases;
2. review all low-confidence cases under a preregistered threshold (suggested: 0.80);
3. review a random sample of both `present` and `absent` cases;
4. report agreement and repeat the analysis with human-corrected labels.

`vino review-queue` exports uncertain, model-flagged, and low-confidence cases. Use `--include-all` to create a complete queue from which to draw a blinded random audit sample. The queue includes the input columns accepted by analysis plus AI context columns.

For convenient visual review, run `vino review-app --open`. The localhost-only browser app shows one image at a time with the AI proposal and evidence, supports `present`, `absent`, or `uncertain`, allows correction of animal names and taxonomic groups, and writes hash-bound completed rows to `data/manual/reviews.csv`. It is resumable: stopping and restarting preserves completed reviews. Keyboard shortcuts are `1`/`2`/`3` for the three decisions, `N`/`P` for navigation, and `S` to save. Use `--include-all` when creating the queue if a complete audit rather than only flagged rows is wanted.

Vision results and manual corrections are bound to the SHA-256 in the current image manifest. Analysis fails if a measurement has no current manifest record, points to a different image hash, has no matching AI result, or references a product outside the cohort. This prevents an old classification from surviving a changed product image unnoticed.

## Reproducibility and responsible use

- Pin the upstream adapter version, vision model, prompt version, and source snapshot.
- Preserve raw data privately; generated data and images are ignored by Git.
- Check Systembolaget/API/image terms and score-source licenses before collection or redistribution.
- Rate-limit retrieval and do not use results to encourage alcohol consumption or conflict with [Systembolaget's mission](https://www.omsystembolaget.se/english/systembolaget-explained/).
- Treat all statistical results as observational and exploratory.

## Website

The repository also contains the Next.js editorial frontend for **Vin & Djur**. It uses the App Router, strict TypeScript, Tailwind CSS, Radix primitives, Observable Plot, D3 scales, Motion, and responsive SVG visualizations.

```bash
npm install
npm run dev

# Production checks
npm run data:build
npm run typecheck
npm run lint
npm run build
```

Routes:

- `/` — the editorial data-story prototype;
- `/utforska` — a URL-backed explorer shell;
- `/metod` — the methodology appendix.

The website is generated from the real primary and sensitivity datasets by `npm run data:build`. The approachable explorer defaults to the higher-coverage, across-vintage view (1,033 wines); users can select the stricter exact-vintage view (598 wines). A mean is suppressed unless its current filter has at least 10 scored wines and 30% score coverage. Detailed classifier codes remain in the generated records for audit, but the public interface does not present them as biological species identifications; it uses six stable, broad motif groups. The unsupported mock animal-versus-no-animal adjusted-score comparison has been removed. Label examples are optimized local derivatives of the research pipeline's Systembolaget product images.

See [project status](docs/project-status.md) before treating the frontend as publication-ready.

## Development

```bash
pip install -e '.[vision,dev]'
ruff check .
pytest
python -m build
```

See [data dictionary](docs/data-dictionary.md) for schemas and [research protocol](docs/research-protocol.md) for hypotheses, exclusions, and analysis decisions.
