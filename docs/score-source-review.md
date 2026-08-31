# External wine-score source review

Status: Vivino selected as the free operational source and full animal-cohort collection completed; not legal advice or approval to publish.

The Systembolaget product feed has no quality score. A usable external source must support defensible product/vintage matching, retain score provenance, permit the intended publication, and cover enough of the classified cohort to avoid unusably sparse animal groups. Vivino now supplies the project's real community-rating analysis, subject to the endpoint and publication caveats below.

## Vivino pilot result

The repository's conservative adapter was tested against a deterministic 50-product sample stratified across animal groups and wine types.

| Outcome | Initial query | Relevance query v1.2 |
|---|---:|---:|
| Automatically matched identity | 7 | 23 |
| Needs manual identity review | 11 | 24 |
| No match | 32 | 3 |
| Exportable exact-vintage score | 6 | 18 |
| Exportable with wine-level fallback | 6 | 23 |

The initial query over-specified legal producer and vintage and omitted parameters used by Vivino's server-rendered relevance search. Matcher v1.2 searches only the consumer-facing name and subtitle, requests relevance ordering, and keeps producer, country, and vintage as validation evidence. This raised conservative exact-vintage coverage from 12% to 36% without lowering the identity threshold.

The pilot established that the endpoint and provenance pipeline were viable for a free full-cohort collection. Across-vintage community averages remain a separately labeled sensitivity analysis rather than a silent substitute for current-vintage ratings.

## Completed full-cohort result

All 1,349 confirmed animal-label products were collected with matcher v1.2:

| Match/review outcome | Products |
|---|---:|
| Automatic identity match | 890 |
| Ambiguous candidate reviewed | 392 |
| No match | 67 |
| Retrieval error | 0 |
| Effective review acceptance | 190 |
| Effective review rejection | 202 |

The structured AI review did not use rating values as identity evidence. Every decision preserves matcher version, lookup-response SHA-256, candidate IDs/rank, model and prompt provenance, confidence, reason, and timestamp. A secondary image-assisted audit reversed five questionable acceptances.

The primary export contains 598 scored products (44.3% of the animal cohort): 509 exact-vintage records and 89 wine-scope records for products without a declared target vintage. The sensitivity export contains 1,033 scored products (76.6%): the same 509 vintage records plus 524 wine-scope records. The additional wine-scope records must not be presented as exact-vintage results.

## Candidate sources

### 1. Wine-Searcher Wine Check API

Official information:

- [API overview and pricing](https://www.wine-searcher.com/trade/api)
- [Developer documentation](https://www.wine-searcher.com/trade/ws-api)

Relevant properties:

- REST API intended for websites, applications, and market research;
- accepts a precise product name and required vintage (`YYYY`, `NV`, or any-vintage mode);
- returns Wine-Searcher's aggregated critic score on a 100-point scale;
- score is a mean of normalized critic scores for a specific vintage or all vintages;
- returns explicit no-match, ambiguous, access, and limit status codes;
- offers a trial of 100 calls/day for five days;
- published Wine Check pricing starts at USD 335/month for 500 calls/day.

Advantages:

- established, broad wine-search database;
- score is explicitly critic-based and already normalized to 100 points;
- exact-vintage query support;
- commercial API is designed for publication-facing integrations.

Limitations:

- a trial key must be requested;
- the response exposes the aggregate, not the full critic-level sample or uncertainty;
- the caller supplies the identity string, so a random manual match audit is still required;
- paid collection is materially more expensive than other candidates.

Assessment: **best first coverage pilot** because the free trial can test 50–100 Systembolaget products before purchase.

### 2. Wine Labs Core Data API

Official information:

- [API overview](https://winelabs.ai/api)
- [API documentation](https://winelabs.ai/api/docs)
- [Pricing](https://winelabs.ai/pricing)

Relevant properties:

- `/match_to_lwin` resolves free text to canonical LWIN identities;
- `/critic_scores` returns individual critic entries, scores, critic names, vintages, and source URLs;
- `/wine_info` returns canonical metadata useful for identity auditing;
- advertises 2.5M critic scores and 94.5% matching coverage against its source material;
- published Core Data pricing is USD 100/month for 10,000 calls.

Advantages:

- strongest provenance model among reviewed options;
- canonical LWIN matching and critic-level source records;
- one monthly plan is sufficient for a full animal-label cohort and retries.

Limitations:

- coverage claims appear oriented toward the fine-wine trade and may not transfer to inexpensive Systembolaget listings;
- an account and API access are required before a representative coverage pilot;
- source-specific critic scales and duplicate reviews need an explicit aggregation rule.

Assessment: **best analytical structure**, subject to a coverage pilot and terms review.

### 3. wineapi.io

Official information:

- [OpenAPI specification](https://api.wineapi.io/spec)
- [Terms](https://wineapi.io/terms)

Relevant properties:

- search results contain average rating, rating count, vintage, winery, country, and a match confidence;
- wine details can contain individual critic scores;
- Supporter plan is USD 25/month, permits business use, and allows 250 requests/day;
- raw API responses may not be redistributed as a standalone dataset.

Advantages:

- inexpensive;
- candidate-oriented search response is suitable for explicit matching;
- enough daily capacity for a staged collection.

Limitations:

- the terms describe scores as compiled from various sources without documenting a stable score panel;
- score provenance and conceptual meaning are less clear than Wine-Searcher or Wine Labs;
- the provider does not warrant completeness or currency.

Assessment: **technically promising but not preferred for the primary research outcome** until score provenance is clarified.

### 4. X-Wines open dataset

Official information:

- [Repository](https://github.com/rogerioxavier/X-Wines)
- [Research paper](https://doi.org/10.3390/bdcc7010020)

Relevant properties:

- CC0 dataset with 100,646 wines and 21M historical 1–5 user ratings;
- collected from the open web in 2022;
- publication requires citation of the X-Wines paper.

Limitations:

- the repository's current full-download link returns 404;
- it is a historical recommender-system dataset rather than a live product API;
- product/vintage matching and current Systembolaget coverage are unknown.

Assessment: **not presently operational as the main source**.

## Sources rejected or unavailable

- Global Wine Score's former primary domain is currently parked; it is not a dependable new integration target.
- Scraper marketplaces and unofficial Wine-Searcher scrapers were rejected because the official Wine-Searcher API exists.
- Static Wine Enthusiast/Kaggle review exports were not selected because current product coverage, redistribution rights, and exact-vintage matching are inadequate for this study without a separate legal and methodological review.

## Current recommendation

Retain `data/external/vivino_quality_scores.csv` as the strict exact-vintage research analysis. For the approachable editorial explorer, default to the explicitly described across-vintage `data/external/vivino_quality_scores_wine_level.csv` view and offer exact vintage as the stricter comparison. The frontend reports per-filter score coverage and suppresses means below the frozen threshold of 10 scored wines or 30% coverage. Do not display an animal-versus-no-animal score effect: no-animal products were not included in this score collection.

Before public deployment, verify current Vivino terms and independently audit a sample of identity decisions. Commercial sources remain fallback options if the undocumented endpoint becomes unavailable or publication terms are unsuitable.
