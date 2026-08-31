# Vin & Djur — Website Product & Design Specification

## 1. Purpose

Vin & Djur is an interactive Swedish editorial data project that investigates whether wines featuring different animals on their labels differ systematically in wine score.

The core premise is intentionally playful:

> Smakar ett vin med ett lejon på etiketten generellt bättre än ett vin med en gris?

The site should treat this question with disproportionate analytical seriousness. The contrast between rigorous presentation and an inherently amusing research question is an important part of the product identity.

The website is not intended to behave primarily as a dashboard. It should function as an interactive data story that gradually introduces the dataset, presents notable findings, tests obvious alternative explanations, and ultimately gives the reader tools to explore the data independently.

The primary audience is Swedish. All interface text, editorial content, number formatting, terminology and examples should therefore be designed for Swedish readers and the Systembolaget context.

---

## 2. Product principles

The site should follow five fundamental principles.

### 2.1 Story first, explorer second

Readers should encounter a deliberately constructed narrative before they encounter the full dataset.

The site should first answer questions, reveal interesting results and explain the visual language. More advanced filtering and exploration should appear later.

The initial experience should never resemble an analytics dashboard.

### 2.2 Data is part of the visual design

Charts should not feel embedded into the article as separate widgets. Rankings, distributions, labels, wine bottles, animal illustrations and numbers should function as primary visual elements of the page.

Where appropriate, the visualization itself should become the interface.

### 2.3 Progressive complexity

The reader should not need to understand every control or statistical concept immediately.

A visualization can first appear in a simplified state and later gain additional controls, comparisons or variables.

The progression should roughly follow:

```text
observation
→ explanation
→ complication
→ deeper analysis
→ exploration
```

### 2.4 Bespoke where valuable, conventional where sufficient

Ordinary statistical graphics should use reliable high-level visualization tools.

Custom D3 work should be reserved for interactions or representations that contribute materially to the identity of the project.

A conventional bar chart should not require bespoke rendering merely for the sake of using D3.

### 2.5 Editorial character over application chrome

Whitespace, typography, rules, scale and composition should create hierarchy.

Cards, shadows, rounded containers and dashboard patterns should be used sparingly.

---

# 3. Technical architecture

## 3.1 Core web stack

The website should use:

```text
Next.js
React
TypeScript
Tailwind CSS
CSS custom properties
```

Next.js App Router should provide routing, server rendering, metadata, static generation and the server/client component boundary.

TypeScript should be used throughout the frontend codebase.

React should own application state and rendered interface elements.

Tailwind should primarily handle layout, responsive behavior, typography utilities and component styling.

CSS variables should contain the shared visual design tokens.

---

## 3.2 Visualization stack

Visualization responsibilities should be divided according to complexity.

### Observable Plot

Use Observable Plot for conventional statistical graphics such as:

* horizontal and vertical bar charts;
* dot plots;
* distributions;
* histograms;
* scatter plots;
* price-versus-score comparisons;
* confidence intervals;
* grouped comparisons;
* simple categorical rankings.

### D3

Use individual D3 modules for:

* scales;
* axes;
* statistical transformations;
* interpolation;
* custom layouts;
* force simulations;
* geometry;
* custom SVG positioning.

D3 should usually calculate geometry rather than directly manipulate the DOM.

React should remain responsible for rendering SVG elements wherever practical.

### SVG

SVG should be the default rendering technology for custom visualizations.

Use SVG for:

* interactive animal rankings;
* dot distributions;
* annotations;
* custom charts;
* label layouts;
* moderate-sized node visualizations;
* interactive diagrams.

### Canvas

Canvas should only be introduced when the number of simultaneously rendered or animated objects makes SVG inefficient.

Potential examples include several thousand wine observations moving simultaneously.

Canvas should not be introduced pre-emptively.

### WebGL

WebGL should not be part of the initial architecture.

It should only be considered if a future visualization genuinely requires GPU rendering.

---

## 3.3 Animation

Use Motion for React for interface and visualization transitions.

Animation should encode information rather than function as decoration.

Valid animation purposes include:

* showing how observations reorganize after a filter change;
* transitioning between red and white wine subsets;
* moving ranking positions when variables change;
* transforming individual wines into grouped animal categories;
* preserving spatial continuity between analytical states;
* revealing additional dimensions of the same dataset.

Generic scroll-triggered fade-and-rise effects should not become a recurring design pattern.

Reduced-motion preferences must be respected.

---

# 4. Data architecture

## 4.1 Separation from classification infrastructure

The public website should not depend directly on the live animal-classification worker or background service.

The classification system should produce or update the canonical dataset independently.

The conceptual pipeline should be:

```text
Systembolaget source data
        ↓
wine ingestion
        ↓
label classification
        ↓
canonical classification dataset
        ↓
validation
        ↓
statistical analysis
        ↓
generated web datasets
        ↓
Next.js application
```

Failure or downtime in the classification pipeline should not affect an already deployed version of the website.

---

## 4.2 Canonical versus presentation data

The canonical dataset may contain all available information about each wine.

The frontend should receive purpose-built datasets rather than repeatedly calculate complex statistics in the browser.

Example generated assets:

```text
data/generated/
  overview.json
  animal-summary.json
  animal-scores.json
  animal-price-summary.json
  animal-by-wine-type.json
  score-distributions.json
  country-summary.json
  wine-labels.json
  wines-lite.json
```

These datasets should be treated as a versioned frontend data contract.

---

## 4.3 Analysis layer

Statistical analysis and preprocessing should primarily take place outside the frontend.

Python is the preferred environment for:

* dataset cleaning;
* grouping;
* significance testing;
* confidence intervals;
* regression or adjusted comparisons;
* price normalization;
* country/grape/type controls;
* generating frontend-ready JSON.

The website should display analytical results rather than become the primary analytical engine.

---

## 4.4 Reproducible data build

The repository should expose a deterministic build command, conceptually:

```bash
pnpm data:build
```

This command should regenerate all datasets required by the web application from an approved source dataset.

A production deployment should therefore be reproducible from:

```text
source dataset
+
analysis code
+
frontend code
```

---

# 5. Application structure

A recommended component structure is:

```text
src/
  app/
  components/
    ui/
    charts/
    visualizations/
    story/
  lib/
    data/
    formatting/
    statistics/
    visualization/
  styles/
  data/
    generated/
```

### UI components

Generic reusable primitives:

```text
Button
SegmentedControl
Select
Sheet
Dialog
Tooltip
Popover
Toggle
RangeSlider
Badge
```

These components must remain domain-agnostic.

A segmented control must not know what a wine type is.

---

### Chart components

Reusable statistical graphics:

```text
AnimalRanking
ScoreDistribution
PriceScorePlot
AnimalComparison
ConfidenceIntervalPlot
WineTypeComparison
```

---

### Visualization components

Bespoke editorial experiences:

```text
AnimalCloud
BottleExplorer
LabelGallery
AnimalRace
AnimalClusters
ScrollyAnimalStory
```

---

### Story components

Editorial composition primitives:

```text
StorySection
StoryIntro
StickyGraphic
Annotation
StatCallout
SectionLabel
MethodologyNote
FullBleedSection
```

---

# 6. State management

Use local React state by default.

Do not introduce Redux.

URL state should be used for meaningful explorer settings that readers may want to share.

Example:

```text
/utforska?typ=rott&djur=lejon&pris=100-250
```

Potential URL-backed state includes:

* selected animal;
* wine type;
* price range;
* country;
* score range;
* selected comparison.

A small state library such as Zustand may be introduced only if multiple independent visualizations later require substantial shared state.

It should not be a baseline dependency.

---

# 7. UI primitives

Accessibility-heavy UI behavior should rely on established primitives rather than bespoke implementations.

Radix UI primitives are suitable foundations for elements such as:

* dialogs;
* sheets;
* dropdowns;
* popovers;
* sliders;
* accessible menus.

Their default visual identity should not determine the appearance of the project.

The project should maintain its own styling layer.

Avoid allowing the site to acquire the characteristic appearance of a generic component-library application.

---

# 8. Visual identity

## 8.1 Direction

The established visual direction is:

**modern Scandinavian wine editorial**

The design should combine:

* contemporary editorial typography;
* warm paper surfaces;
* restrained wine-derived colors;
* generous whitespace;
* large statistical typography;
* fine rules;
* authentic wine-label imagery;
* monochrome animal illustrations;
* occasional dark or burgundy full-width sections.

The result should feel closer to a contemporary magazine, cultural publication or data feature than a product dashboard.

---

# 9. Color system

The baseline palette is:

```css
:root {
  --paper: #F3F0E8;
  --paper-light: #FAF8F3;

  --ink: #191918;
  --ink-soft: #55534E;
  --line: #D7D1C5;

  --wine-red: #712F3B;
  --wine-dark: #3F1F28;

  --white-wine: #D4B85C;
  --white-wine-light: #E7D998;

  --sage: #6F7862;
  --blue: #63798A;

  --rose: #C9857A;
}
```

`--rose` should remain unused unless rosé becomes a meaningful analytical category.

---

## 9.1 Surface hierarchy

The primary surfaces are:

### Paper

```text
#F3F0E8
```

Default editorial background.

### Light paper

```text
#FAF8F3
```

Used for dense exploration views, detailed data sections or subtle surface differentiation.

### Ink

```text
#191918
```

Used for major analytical pivots and high-contrast sections.

### Wine

```text
#712F3B
```

Used sparingly for high-impact conclusions or particularly important findings.

Burgundy should not become the general page background.

Its rarity is part of its visual value.

---

# 10. Semantic color usage

Color should convey meaning or attention.

It should not be assigned arbitrarily to every animal.

Animal identity should primarily be established through:

```text
illustration
+
name
```

not permanent categorical color.

Highlighting should usually use burgundy.

Wine type may use semantic color consistently:

```text
red wine   → burgundy
white wine → muted straw
rosé       → muted rose, if introduced
```

Most charts should remain primarily monochrome.

---

# 11. Typography

## 11.1 Typeface system

Use:

```text
Instrument Serif
```

for editorial display typography.

Use:

```text
Inter
```

for interface, explanatory and data typography.

### Instrument Serif responsibilities

Use for:

* hero titles;
* major section statements;
* editorial pull quotes;
* oversized conclusions;
* occasional large statistical values.

### Inter responsibilities

Use for:

* body copy;
* UI;
* filters;
* buttons;
* chart labels;
* axes;
* tooltips;
* captions;
* methodology;
* navigation;
* metadata;
* small statistical labels.

---

## 11.2 Typographic personality

Large type should be treated as a graphical element.

Hero headings may occupy a significant percentage of the viewport.

Desktop display sizes can exceed conventional product-interface typography.

Example visual hierarchy:

```text
Vilket djur
gör bäst vin?

4,18

LEJON

147 VINER
```

The first two lines may be very large serif typography.

Metadata and labels should use small, precise sans-serif typography.

---

## 11.3 Swedish formatting

The UI must use Swedish formatting conventions.

Examples:

```text
4,18
1 284 viner
149 kr
12,5 %
```

Do not render English-formatted equivalents such as:

```text
4.18
1,284 wines
SEK 149
```

---

# 12. Editorial labels and metadata

Small uppercase metadata should be a recurring stylistic element.

Examples:

```text
RESULTAT 01
```

```text
DATA: SYSTEMBOLAGET
```

```text
N = 7 214
```

```text
AUG 2026
```

```text
03
ÄR DET BARA PRISET?
```

These elements should resemble publication metadata rather than app badges.

They should generally use Inter, uppercase lettering and increased letter spacing.

---

# 13. Layout system

The website should use three principal content widths.

## 13.1 Narrow

Approximately:

```text
650–750 px
```

Use for:

* article prose;
* explanations;
* methodology;
* narrative transitions.

---

## 13.2 Medium

Approximately:

```text
900–1100 px
```

Use for:

* rankings;
* comparisons;
* moderate visualizations;
* label galleries.

---

## 13.3 Full bleed

Approximately:

```text
100% viewport width
```

Use for:

* major interactive visualizations;
* dark analytical sections;
* high-impact conclusions;
* large scrollytelling experiences.

---

## 13.4 Editorial rhythm

Sections should alternate width and density.

Example:

```text
narrow explanation

full-width visualization

narrow interpretation

medium ranking

narrow transition

dark full-width analysis

narrow conclusion
```

The page should not be built from a repeated grid of cards.

---

# 14. Containers and hierarchy

Prefer:

* whitespace;
* thin rules;
* typography;
* surface changes;
* alignment.

Avoid relying on:

* shadows;
* large border radii;
* nested cards;
* boxed sections.

Filters may use understated rounded controls when their shape clearly communicates interaction.

Charts and article sections should generally not sit inside conventional cards.

---

# 15. Interface controls

## 15.1 Segmented controls

Use for small mutually exclusive selections such as:

```text
Alla   Rött   Vitt
```

Selected states may invert the default paper/ink color relationship.

---

## 15.2 Animal selectors

Animal selection should be more visually distinctive than standard form controls.

Conceptually:

```text
Alla     Lejon     Fågel     Hjort     Häst     Gris
          icon      icon      icon      icon      icon
```

The animal illustration and name should both be visible where space permits.

---

## 15.3 Range controls

Range sliders should be minimal and integrated into the page rather than placed inside heavy control panels.

Examples:

```text
Pris
100 kr ━━━━━━━━━●━━━━━━ 500 kr
```

Dense explorer screens may group controls in a dedicated sheet on smaller devices.

---

# 16. Animal illustration system

Core animal categories should use custom artwork.

Do not use emoji as production animal representations.

The illustration direction should combine:

```text
natural-history drawing
+
modern editorial iconography
```

Characteristics:

* monochrome;
* recognizable at small sizes;
* slightly organic;
* consistent stroke or fill language;
* not childish;
* not mascot-like;
* not hyper-realistic.

SVG should be the source format.

Animal SVGs should primarily inherit:

```css
currentColor
```

so they can be reused on light, dark and burgundy surfaces.

---

# 17. Functional iconography

Functional controls should use a restrained icon set such as Lucide.

Examples include:

* search;
* information;
* close;
* arrows;
* expand;
* filter;
* menu.

Functional icons and animal illustrations must remain visually distinct systems.

---

# 18. Wine-label imagery

Real wine labels are data and should be treated as such.

The site should avoid decorating them excessively.

Images should generally appear against the neutral paper environment without large shadows or e-commerce-style product cards.

Wine label imagery may be used in:

* label galleries;
* individual wine examples;
* animal-category examples;
* hover or detail states;
* exploratory filtering interfaces.

Original label colors should remain intact.

The surrounding interface should remain restrained enough that the labels can introduce visual variation.

---

# 19. Chart design system

All charts should follow a shared visual language.

Default characteristics:

* no enclosing border;
* minimal grid lines;
* no unnecessary legend box;
* restrained axes;
* Swedish number formatting;
* direct labels where practical;
* dark ink as the default data color;
* burgundy for emphasis;
* semantic red/white wine colors only when relevant.

Avoid generic multi-color categorical palettes.

---

## 19.1 Direct labeling

Prefer:

```text
Lejon   ━━━━━━━━━━━━━━━━━━━ 4,18
Hjort   ━━━━━━━━━━━━━━━━━   4,05
Fågel   ━━━━━━━━━━━━━━━━    3,97
```

over requiring the reader to repeatedly consult a legend.

---

## 19.2 Reference values

Important baselines should be visible where relevant.

Examples:

```text
Alla viner
3,89
```

or a clearly annotated reference line.

---

## 19.3 Uncertainty

Where claims are inferential, charts should be capable of displaying:

* sample size;
* confidence intervals;
* uncertainty;
* statistical significance where appropriate.

Do not allow visually dramatic small-sample categories to appear equivalent to well-supported categories without communicating their uncertainty.

---

# 20. Statistical integrity

The website should distinguish between descriptive and adjusted findings.

A high average score for one animal does not automatically imply an animal effect.

Potential confounders include:

* price;
* red versus white wine;
* country;
* region;
* grape;
* vintage;
* product category;
* rating source;
* number of observations.

The narrative should deliberately test important alternative explanations.

A potential analytical progression is:

```text
raw animal ranking
        ↓
price distribution
        ↓
price-adjusted comparison
        ↓
wine-type comparison
        ↓
country or grape controls
        ↓
final adjusted ranking
```

This progression should become part of the editorial story rather than being hidden exclusively in methodology.

---

# 21. Number-as-visual treatment

Key statistics should regularly become compositional elements.

Examples:

```text
4,18
genomsnittligt betyg
```

```text
147
lejonviner
```

```text
+0,31
över genomsnittet
```

On desktop, major numerical callouts may use very large type.

The project should not reduce important findings to small KPI cards.

---

# 22. Responsive behavior

Mobile should be designed as a first-class format.

Do not build desktop visualizations and merely scale them down.

A visualization may use different composition at different breakpoints while preserving the same underlying data.

For example:

Desktop:

```text
Lejon   ━━━━━━━━━━━━━━━━━━━ 4,18
Hjort   ━━━━━━━━━━━━━━━━━   4,05
Gris    ━━━━━━━━━━━━━       3,67
```

Mobile:

```text
LEJON
4,18
━━━━━━━━━━━━━━━━

HJORT
4,05
━━━━━━━━━━━━━━

GRIS
3,67
━━━━━━━━━━
```

Complex desktop filter panels may become bottom sheets on mobile.

Annotations must be repositioned rather than simply reduced in size.

Touch targets must remain accessible.

---

# 23. Texture

A very subtle texture may be applied to large flat surfaces.

The effect should be close to imperceptible.

Avoid obvious paper images or vintage textures.

Texture should soften digital flatness without making the interface appear nostalgic or skeuomorphic.

The intended contrast is:

```text
precise data + typography
×
slightly organic illustration + surface texture
```

---

# 24. Navigation

Navigation should remain minimal.

Initial desktop concept:

```text
VIN & DJUR                         UTFORSKA   METOD
```

The project name should initially function as the primary identity rather than requiring a separate logo mark.

A small deadpan subtitle may be explored, for example:

```text
En högst vetenskaplig undersökning
```

This tone should be used sparingly.

---

# 25. Tone

The project should be witty without becoming comedic UI.

The data should be treated seriously.

The premise provides the humor.

The strongest tone is therefore:

```text
credible analysis
+
understated absurdity
```

Avoid excessive jokes, animal puns or novelty copy.

---

# 26. Story architecture

The first major experience should follow approximately this structure:

```text
Hero / research question

↓
Dataset introduction

↓
First animal ranking

↓
Strong initial finding

↓
Complication:
could price explain this?

↓
Adjusted comparison

↓
Additional variables:
wine type / country / grape

↓
Final or best-supported result

↓
Label gallery / examples

↓
Full interactive explorer

↓
Methodology
```

The exact editorial conclusions must remain dependent on the completed dataset.

The architecture should support this narrative without assuming beforehand which animal wins.

---

# 27. Explorer architecture

The full explorer should appear after the main narrative or exist as a dedicated secondary route.

Potential filters include:

```text
animal
wine type
price
score
country
grape
vintage
```

Potential outputs include:

* average score;
* median score;
* sample size;
* price distribution;
* score distribution;
* example labels;
* individual wines;
* relative comparison with the overall dataset.

The explorer should remain visually consistent with the editorial experience rather than becoming a conventional admin-style interface.

---

# 28. Accessibility

Accessibility is a baseline requirement.

The implementation should include:

* semantic HTML;
* keyboard-accessible controls;
* visible focus states;
* accessible Radix-based primitives where appropriate;
* sufficient contrast;
* reduced-motion support;
* meaningful alt text for label imagery where applicable;
* textual equivalents for important visual findings;
* screen-reader-compatible interactive controls.

Color should never be the sole carrier of analytical meaning.

---

# 29. Performance

The initial page should prioritize rapid rendering and progressive enhancement.

Default strategy:

```text
static/server-rendered editorial content
+
small precomputed datasets
+
client-side hydration only for interactive sections
```

Avoid marking large page sections as client components solely because a nested visualization is interactive.

Heavy visualization libraries should be loaded only where required.

Large image galleries should use responsive loading and lazy loading.

The project should avoid transferring the full canonical analytical dataset when a smaller purpose-built dataset is sufficient.

---

# 30. Initial route structure

A minimal route model is:

```text
/
```

Primary editorial data story.

```text
/utforska
```

Full interactive dataset explorer.

```text
/metod
```

Detailed methodology, classification explanation and statistical approach.

Optional future routes may include individual animal or wine pages, but these should not constrain the initial architecture.

---

# 31. Explicitly rejected visual directions

The project should not adopt:

* generic SaaS styling;
* glassmorphism;
* heavy gradients;
* purple/blue technology branding;
* Systembolaget-inspired green branding;
* abundant shadows;
* ubiquitous rounded cards;
* stock vineyard photography;
* emoji as final animal artwork;
* rainbow chart palettes;
* dashboard KPI tiles;
* decorative animation without informational purpose.

---

# 32. Explicitly rejected technical patterns

The initial implementation should avoid:

* Redux;
* unnecessary global state;
* frontend statistical computation that belongs in preprocessing;
* direct runtime dependency on the classification worker;
* D3 DOM manipulation for ordinary charts;
* bespoke accessibility implementations where mature primitives exist;
* Canvas for ordinary SVG-scale datasets;
* WebGL without a specific need;
* a monolithic visualization component containing data analysis, rendering and UI state.

---

# 33. Initial design tokens

The initial global token layer should conceptually include:

```css
:root {
  --paper: #F3F0E8;
  --paper-light: #FAF8F3;
  --ink: #191918;
  --ink-soft: #55534E;
  --line: #D7D1C5;

  --wine-red: #712F3B;
  --wine-dark: #3F1F28;
  --white-wine: #D4B85C;
  --white-wine-light: #E7D998;

  --sage: #6F7862;
  --blue: #63798A;

  --font-display: "Instrument Serif", serif;
  --font-sans: "Inter", sans-serif;
}
```

Additional spacing, typography and layout tokens should be formalized during implementation rather than creating an excessively large design-token system upfront.

---

# 34. Definition of the baseline product

The baseline project is considered architecturally complete when it supports:

```text
Swedish editorial storytelling
+
responsive interactive graphics
+
animal-based wine comparisons
+
statistically precomputed datasets
+
custom animal artwork
+
interactive filtering
+
shareable explorer state
+
accessible UI
+
mobile-specific visualization layouts
+
clear methodology
```

The completed site should feel like a purpose-built editorial investigation rather than a reusable analytics product.

Its visual and technical systems should nevertheless remain sufficiently modular that new findings and visualization ideas can be introduced without rebuilding the underlying interface.

The defining product character is:

> En visuellt ambitiös, statistiskt seriös och medvetet överarbetad undersökning av en fråga som egentligen är ganska löjlig.

