# Research decisions and remaining questions

Decisions should be fixed without looking at group outcome differences where possible.

## Resolved scope decisions

- **“Swedish wine”** means a wine listed by Systembolaget, not a wine produced in Sweden. Country of origin is unrestricted.
- **Included wine types** are exactly `Rött vin`, `Vitt vin`, `Rosévin`, and `Mousserande vin` under the API's top-level `Vin` category.
- **Excluded wine types** include glögg, fruit/flavoured wine, vermouth, aperitifs, mixed drinks, and every other non-core subcategory.
- **Imagery exposure** is the primary front-label artwork. Logo imagery and other label artwork are treated identically.
- **Ranking categories** include both individually identified animals and broad taxonomic groups.
- **Operational score source** is Vivino community ratings for the confirmed animal-label cohort, using matcher v1.2 and hash-bound identity adjudication.
- **Primary score scope** requires exact vintage-level ratings for vintage-dated products; wine-level ratings are accepted only when the listing has no declared vintage.
- **Sensitivity score scope** explicitly permits across-vintage wine averages and remains separate from the primary analysis.
- **Identity review** is conservative and provenance-preserving: 190 of 392 ambiguous candidates are currently accepted and 202 rejected after secondary audit.

## Resolved animal-coding rules

- Only clearly recognizable, intentionally depicted animal figures, heads, or bodies in the primary front-label artwork count.
- Crest, coat-of-arms, shield, crown, mantling, scrollwork, decorative border, tiny emblem, seal, and ambiguous heraldic ornament do not count; isolated wings over a crest or shield are not animal depictions.
- A standalone unmistakable animal may be stylized or heraldic; style alone does not qualify an ornamental crest component.
- Bottle embossing, caps, back-label artwork, official seals, recycling marks, and food-pairing icons do not count.
- Mythical animals, insects, shellfish, silhouettes, and identifiable animal heads count when they meet the strict recognizability rule and retain their specific category.
- Every distinct qualifying animal type is recorded; a multi-animal label contributes to every applicable imagery group.
- Humans, plants, animal names without an image, and animal-derived objects do not count.

Freeze representative examples in a coding guide before human review.

## Which score-display rules remain unresolved?

The source API has no wine-quality outcome. Vivino has been selected as the free operational source, identity matching has been completed, and primary versus sensitivity scope is resolved. Remaining publication decisions are:

- verify current Vivino terms for the intended public deployment;
- the frontend display rule is frozen at at least 10 scored wines and 30% score coverage for each filtered result;
- decide whether to add a higher minimum Vivino review-count threshold;
- quantify the identity-review error rate with an independent human audit if the results are presented as publication-ready;
- define how uncertainty and selective score availability are shown in charts and copy.

A missing score is missing data, not zero. Scores were collected only for confirmed animal-label products, so the current dataset cannot test or display animal-versus-no-animal quality differences. Consumer and critic scores are not combined. Across-vintage `score_scope=wine` records for vintage-dated products appear only in the separately labeled sensitivity analysis.

## Can the image support an absence judgment?

Product photos can have small, curved, occluded, or non-front labels. Should images be cropped/rectified before classification? Is the maximum current CDN rendition enough? How should multipacks and package redesigns be dated? Build a labeled validation set before selecting model and confidence threshold.

## What is the independent unit?

The API unit is a product ID, but one design may appear across volumes, vintages, colours, or box/bottle SKUs. Decide whether inference is at SKU, label design, brand, or producer level and how duplicates/clustering are handled.

## Which price is comparable?

The pipeline uses SEK per 750 ml. Validate volume semantics for boxes, cans, multi-item packs, and concentrated aperitifs. Decide whether price should be inflation-adjusted across snapshots or log-transformed.

## How will confounding and sparse groups be handled?

Likely confounders include wine type, country, vintage, producer, assortment, packaging, alcohol, and organic status. Individual-animal groups may be small, particularly after score matching. Fix adjustment variables, category-collapsing rules, and minimum group sizes before confirmatory testing.

## What time period is represented?

Assortment, image, price, and external scores change. Is the question about one cross-section or repeated snapshots? If repeated, define cadence, product entry/exit, image changes, and temporal alignment of scores.

## What validation standard is sufficient?

Set the human audit sample, number of reviewers, adjudication method, agreement metric, and acceptable class-specific error rates. Reviewers should be blinded to price and score.
