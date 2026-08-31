# Review of `ha-wine-cellar`'s Vivino integration

Reviewed repository: <https://github.com/BaconWappedBitcoin/ha-wine-cellar>  
Reviewed commit: `5d0b0d2dc1150332faa2eb366d6a8f1ca8833abf`  
Relevant file: `custom_components/wine_cellar/vivino.py`

## Reusable discovery

The project established several useful implementation facts:

- Vivino exposes an unauthenticated but undocumented explore endpoint at `/api/explore/explore`.
- Explore requests need one or more `wine_type_ids[]` filters.
- Responses contain Vivino wine/vintage identifiers, community averages, rating counts, winery, region/country, images, and market offers.
- Browser-compatible request headers are currently required.
- Batch calls should be delayed; the Home Assistant project uses one second.

This repository uses those discoveries with attribution, but implements a standalone `httpx` client and research-specific matching/provenance instead of copying Home Assistant code.

## Problems found in the reviewed implementation

The Home Assistant implementation is appropriate as a convenience dashboard but is unsafe as research matching logic in its current form:

1. **The explore query parameter is currently wrong.** It sends `q`. Live inspection showed that `q` was ignored and returned the unfiltered explore catalogue. The current parameter is `search_term`.
2. **It chooses `results[0]` without checking identity.** A fuzzy or ignored query can silently attach an unrelated wine's score.
3. **Current ratings are under `vintage.statistics`.** The reviewed parser reads `wine.statistics`, which was null in current responses. `vintage.statistics` also distinguishes vintage average/count from across-vintage wine average/count.
4. **Vintage mismatches are not detected.** A current Systembolaget listing may have only an older Vivino vintage available.
5. **The HTML fallback is brittle.** It depends on regexes over embedded frontend state and should not be a research data source without fixtures and monitoring.
6. **Errors are swallowed into empty results.** Research collection needs explicit error/no-match/review states and response provenance.

The new adapter therefore does not reuse the first-result behavior or HTML fallback.

## Implemented workflow

```bash
# Start with a small retrieval/matching audit.
vino fetch-vivino --limit 10 --acknowledge-unofficial-source

# Inspect data/external/vivino_lookups.jsonl, especially status, selected candidate,
# match_confidence, hard_conflicts, vintage_match, IDs, and candidate alternatives.

# Continue the resumable collection.
vino fetch-vivino --acknowledge-unofficial-source

# Optional structured review of hash-bound ambiguous identities. Ratings and
# review counts are omitted from the prompt; OPENROUTER_API_KEY is required.
python scripts/ai_review_vivino.py

# Conservative default: exact-vintage scores only for vintage-dated products.
vino export-vivino-scores \
  --identity-reviews data/manual/vivino_identity_reviews.jsonl

# Optional sensitivity dataset using Vivino's across-vintage wine average.
vino export-vivino-scores \
  --allow-wine-level \
  --identity-reviews data/manual/vivino_identity_reviews.jsonl \
  --output data/external/vivino_quality_scores_wine_level.csv

vino analyze --scores data/external/vivino_quality_scores.csv
```

The fetcher:

- uses `search_term`, a Swedish market context, and the product's wine-type filter;
- requests Vivino's relevance ordering with the same `grape_filter=varietal` behavior used by the server-rendered explore page;
- searches with only the consumer-facing Systembolaget name and subtitle; producer and vintage remain validation evidence rather than over-constraining search text;
- scores name, producer, and country agreement for every returned candidate, while allowing a complete title match when Systembolaget's legal producer differs from Vivino's consumer-facing winery brand;
- makes a candidate country that conflicts with Systembolaget's reported origin a hard conflict;
- records exact/missing/mismatched vintage separately from wine identity;
- stores candidate alternatives, Vivino IDs, rating counts, source URL, timestamp, endpoint, matcher version, and response SHA-256;
- sends brand-only product names to manual review instead of choosing a cuvée automatically;
- uses Vivino's relevance rank before rating popularity to break otherwise equal identity matches;
- appends each lookup immediately and resumes without repeating completed calls;
- versions matcher behavior so revised searches can coexist with earlier pilot records;
- respects retry responses and defaults to at least one second between products.

A frozen 50-wine pilot of matcher version 1.2 produced 23 automatic matches, 24 review candidates, and 3 no-matches. The conservative exporter yielded 18 exact-vintage scores (36%); allowing across-vintage wine averages yielded 23 scores (46%). This replaced an over-specified pilot query that yielded only six exact-vintage scores.

The completed 1,349-product animal-label collection produced 890 automatic matches, 392 review candidates, 67 no-matches, and no request errors. A conservative structured AI identity review initially accepted 195 and rejected 197 ambiguous candidates; a secondary image-assisted audit reversed five questionable acceptances, leaving 190 effective acceptances and 202 rejections. The primary export contains 598 scores: 509 exact-vintage records and 89 wine-level records for products without a declared vintage. The separately labeled sensitivity export contains 1,033 scores: 509 vintage-level and 524 wine-level records.

Ambiguous identities may be adjudicated in a separate append-only review layer. Decisions are bound to matcher version and response SHA-256; accepted candidates are additionally bound to rank and Vivino IDs. Stale decisions fail export. AI-assisted decisions preserve model/prompt provenance and remain explicitly distinct from human validation.

The exporter includes only automatic identity matches above a fixed threshold or explicitly accepted hash-bound reviews, plus scores meeting a minimum rating count. For dated products, its default requires the same vintage and a genuine vintage-level rating. Across-vintage wine ratings require `--allow-wine-level` and are marked `score_scope=wine` in the analysis dataset.

## Interpretation and terms

Vivino's endpoint is undocumented and can change or disappear without notice. It is not an official public API contract. Before using it, verify current Vivino terms, robots/rate-limit requirements, and whether the planned collection/publication is permitted. The CLI requires an explicit acknowledgement, uses no authentication bypass, and stops on access errors.

A Vivino rating is a self-selected **community average**, not an objective or critic quality measure. Coverage and review count are likely associated with popularity, availability, style, and age. Niche products may have sparse coverage, and current Systembolaget vintages may differ from rated vintages. Report coverage, rating counts, score scope, and matching audit results; do not relabel missing scores as low quality.
