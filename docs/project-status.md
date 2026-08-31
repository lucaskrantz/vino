# Project status

Status: real analysis artifacts are connected to the website as preliminary results.

## Completed data work

The frozen Systembolaget snapshot was retrieved on 2026-08-08 through upstream adapter v5.0.0. The current analysis contains:

- 11,383 included red, white, rosé, and sparkling wine products;
- 7,337 hash-bound image classifications from `openai/gpt-5.6-luna`;
- 635 validated manual image-review records applied by the analysis;
- 1,349 products with confirmed animal imagery;
- 5,976 products with confirmed absence;
- 4,058 uncertain products, predominantly listings without a usable image.

The free Vivino collection was completed for all 1,349 confirmed animal-label products. Matcher v1.2 produced 890 automatic identity matches, 392 ambiguous candidates, 67 no-matches, and no request errors. The conservative structured AI review of all ambiguous candidates, followed by a secondary image-assisted audit, left 190 accepted and 202 rejected decisions. The decisions are append-only and bound to the exact lookup response hash and matcher version.

Two score analyses are available:

| Analysis | Scored products | Coverage of animal cohort | Vintage scope | Wine scope |
|---|---:|---:|---:|---:|
| Primary conservative export | 598 | 44.3% | 509 | 89 |
| Across-vintage sensitivity | 1,033 | 76.6% | 509 | 524 |

The 89 wine-scope records in the primary export belong to products without a declared target vintage. For vintage-dated products, the primary export requires an exact vintage-level rating. The sensitivity export explicitly permits an across-vintage Vivino wine average.

Current canonical artifacts are:

- `data/manual/vivino_identity_reviews.jsonl`;
- `data/external/vivino_quality_scores.csv`;
- `data/external/vivino_quality_scores_wine_level.csv`;
- `data/processed/research_dataset.csv`;
- `data/processed/research_dataset_wine_level.csv`;
- `reports/summary.json` and `reports/report.md`;
- `reports/summary_wine_level.json` and `reports/report_wine_level.md`.

## Website integration

The website is generated from the primary and sensitivity research datasets by `npm run data:build`. The editorial explorer defaults to the higher-coverage across-vintage analysis, while the stricter exact-vintage analysis remains an explicit comparison view. Means are suppressed below 10 scored wines or 30% score coverage. Specific normalized animal names are preserved for exploration and mapped non-exclusively into six stable initial categories: lion, pig, deer, bird, horse, and fox.

The unsupported mock adjusted-score comparison has been removed because no-animal products were not scored. Real display is currently defensible for:

- cohort flow and animal-label prevalence;
- price summaries for confirmed present versus confirmed absent products;
- within-animal score distributions and rankings when sample size and coverage are shown;
- the primary score analysis, with the wine-level analysis labeled as sensitivity only;
- examples drawn from the classified Systembolaget images.

The present score collection covers only confirmed animal-label products. It therefore cannot support a quality-score comparison between animal and no-animal labels. Any website component implying such a comparison, including the current mock adjusted-score comparison, must be removed or redesigned rather than populated with unsupported values.

## Remaining publication gates

Before describing the website as publication-ready:

1. review or suppress residual non-animal classification anomalies before expanding the detailed-animal interface;
2. verify current Vivino and image-source terms for the intended public deployment;
3. complete the planned blinded/random validation standard for the vision classifications;
4. quantify identity-review error with an independent audit;
5. keep the generated source/hash manifest and full Python/TypeScript/build checks green after future data refreshes.

Until those gates are closed, the results are suitable for transparent preliminary display, not for causal or universal claims.
