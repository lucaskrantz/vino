# Draft research protocol

Status: foundation for discussion, not a completed preregistration. The pipeline has produced real primary and sensitivity analyses, but unresolved publication rules remain documented in [project status](project-status.md) and [open questions](open-questions.md).

Implementation note: Vivino scores were collected only for the 1,349 confirmed animal-label products. The current data can describe and compare sufficiently covered animal categories, but cannot evaluate H2's animal-versus-no-animal quality contrast. That contrast must remain unavailable unless a comparable no-animal score cohort is collected.

## Research question

Among red, white, rosé, and sparkling wines currently listed by Systembolaget, is visible animal imagery in the primary front-label artwork associated with:

1. current listed price in SEK per 750 ml; and
2. an independently sourced wine-quality score normalized to 0–100?

The estimand is a cross-sectional product-level association at the snapshot date. It is not the effect of putting an animal on a label.

## Hypotheses

- **H1 (price):** the mean price per 750 ml differs between products with confirmed animal imagery and products with confirmed absence.
- **H2 (quality):** the mean normalized independent quality score differs between those groups.
- **H3 (exploratory):** price and quality vary among individually identified animals and broad animal groups (mammal, bird, fish, and so on).

All directions are two-sided. H3 and individual-animal analyses are exploratory because sparse groups and multiple comparisons are expected.

## Population and unit of analysis

- **Source:** a dated snapshot collected through `AlexGustafsson/systembolaget-api`, pinned to a release.
- **Meaning of Swedish wine:** a wine listed by Systembolaget, regardless of country of origin.
- **Server queries:** four separate `category=Vin` queries with subcategory `Rött vin`, `Vitt vin`, `Rosévin`, or `Mousserande vin`. Splitting avoids the upstream API's result-page ceiling.
- **Required client-side fields:** `categoryLevel1 == "Vin"` and `categoryLevel2` is one of those four exact values.
- **Excluded types:** glögg/Glühwein, fruit or flavoured wine, vermouth, aperitifs, mixed-type drinks, and all other non-core subcategories.
- **Unit:** Systembolaget product ID/SKU, one row per current listing.
- **Deduplication:** duplicate product IDs are removed. Different SKUs/volumes remain separate in the foundational dataset and should be tested in a brand-level sensitivity analysis.

## Exposure: animal imagery

The relevant visual region is the primary front-label artwork in a supplied product image. Logo imagery and other label artwork are intentionally treated as the same exposure.

Count:

- a clearly recognizable, intentionally depicted animal figure, head, or body;
- a standalone real, stylized, silhouetted, heraldic, or mythical animal when the animal itself is unmistakable;
- a mythical animal, categorized separately when no biological group fits.

Do not count:

- a human;
- an animal word without visible animal artwork;
- plants, reflections, or scenery outside the package label;
- crest, coat-of-arms, shield, crown, mantling, scrollwork, decorative border, tiny emblem, or seal components;
- isolated wings over or behind a crest/shield, winged shields, or other ambiguous heraldic ornament;
- tiny recycling, certification, or food-pairing symbols.

Heraldic styling alone does not qualify an image: the animal must be independently recognizable and intentionally depicted, rather than inferred from the surrounding crest or emblem. If the label is readable and only excluded heraldic ornament is present, classify it as absent rather than uncertain.

Image-level states are `present`, `absent`, and `uncertain`. Product-level aggregation is:

1. `present` if any available image is confirmed present;
2. `uncertain` if no image is present and any expected image is missing/unclassified/uncertain;
3. `absent` only if every expected image is classified absent.

A product without an image is therefore uncertain, not absent. Binary comparisons exclude uncertain products.

### Categories

Each detection receives a normalized common name and one prespecified broad group:

- mammal, bird, fish, reptile, amphibian;
- insect, arachnid, crustacean, mollusk, other invertebrate;
- mythical/heraldic where no real taxon fits;
- unknown.

A qualifying heraldically drawn real animal retains its biological group; depiction style is stored separately. A product can belong to more than one animal group, so taxon summaries are non-exclusive.

## Outcomes

### Price

Primary price outcome:

```text
listed price SEK × 750 / package volume ml
```

Nominal listed price and package volume remain available. Multi-item packs need validation if they appear, because API volume semantics may not represent total package content.

### Quality score

No quality score is present in the Systembolaget product payload. `SortPropertyScore` is retrieval relevance and must not be analyzed as wine quality. A valid external score record requires:

- exact Systembolaget product ID match (preferably verified by name, vintage, and volume);
- raw score and declared minimum/maximum scale;
- source, observation date, and source URL;
- permission to collect and use the score.

The mechanical normalization is:

```text
100 × (score - scale minimum) / (scale maximum - scale minimum)
```

Normalization does not guarantee conceptual comparability. Report each score source separately; pool only with a defensible calibration plan. Never substitute taste-clock values, search rank, price, or model opinion for quality.

### Vivino community-rating implementation

The selected free Vivino adapter uses an undocumented endpoint and may be used only after checking applicable terms. It preserves candidate alternatives and requires explicit entity matching rather than selecting the first search result. For products with a declared vintage, the primary export accepts only a matching vintage with a vintage-level rating. Wine-level ratings are accepted in the primary export only when the target listing has no declared vintage. An across-vintage Vivino wine average for vintage-dated products is available only as an explicit sensitivity option and is labeled `score_scope=wine`.

The completed collection covers all 1,349 confirmed animal-label products. The primary dataset contains 598 scores (509 vintage, 89 wine scope); the sensitivity dataset contains 1,033 (509 vintage, 524 wine scope). Vivino outcomes must report score coverage, review-count distribution, exact-vintage coverage, entity-match audit error, and the number of no-match/ambiguous/error records. Community averages reflect self-selected users and popularity; they are not objective quality or interchangeable with critic scores. Freeze the minimum display sample and coverage threshold before comparing animal groups. See [the adapter review](vivino-source-review.md).

## Measurement quality

Use a pinned model and prompt. Store image hash, image rendition, model ID, prompt version, response ID, timestamp, confidence, evidence, and review flag.

Human audit before inferential reporting:

- all uncertain/model-review cases;
- all cases below a fixed confidence threshold;
- a random sample from both confirmed states;
- ideally double-code a subset and report agreement plus class-specific precision/recall.

Review corrections are hash-bound. Keep the raw model output and apply corrections as a later layer.

## Analysis plan

The implemented first pass produces:

1. cohort flow and missing-score counts;
2. count, mean, median, and standard deviation for listed price, price/750 ml, and normalized score;
3. summaries and rankings by animal presence, individual animal, taxon group, wine type, and country;
4. animal-minus-no-animal mean differences;
5. percentile bootstrap 95% intervals and two-sided permutation p-values with a fixed seed.

These tests are exploratory. A confirmatory model should be selected only after inspecting sample size and score coverage, then preregistered. Candidate adjustments include wine type, country/region, vintage, volume/packaging, alcohol level, organic status, assortment, and producer/brand clustering. Price may need log transformation. Sparse taxon groups should be collapsed by a rule fixed before outcome inspection.

### Sensitivity analyses to add

- analyze red, white, rosé, and sparkling strata separately;
- one SKU per label/brand or clustered standard errors;
- complete-case versus uncertainty bounds (all uncertain absent vs all present);
- human-only labels versus raw AI labels;
- same score source only;
- vintage-matched products;
- nominal price versus standardized price;
- collection-date snapshots to assess assortment churn.

## Interpretation

Animal artwork may correlate with style, producer, target market, packaging, or product category. Quality-score availability is also likely selective. Results describe this observed assortment and must not be framed as causal, universal, or as a recommendation to consume alcohol.
