"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, FlaskConical,
  GitCompareArrows, RotateCcw, Sparkles, X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { FeaturedAnimal, FeaturedWine, FeaturedWineType } from "@/data/featured-wines";
import { AnimalChallenge, type MotifSummary, type OverallSummary } from "./animal-challenge";
import styles from "./bodega-playground.module.css";

export interface CategorySummary {
  animal: FeaturedAnimal;
  wineCount: number;
  scoredCount: number;
  coverage: number;
  averageScore: number | null;
  medianPrice: number;
}

type WineTypeFilter = "all" | FeaturedWineType;
type SortKey = "curated" | "price" | "score";

const animalLabels: Record<FeaturedAnimal, string> = {
  lion: "Lejon", pig: "Gris / vildsvin", deer: "Hjortdjur", bird: "Fågel", horse: "Häst", fox: "Räv",
};
const typeLabels: Record<FeaturedWineType, string> = {
  red: "Rött vin", white: "Vitt vin", rose: "Rosé", sparkling: "Mousserande",
};
const typeOptions: { value: WineTypeFilter; label: string }[] = [
  { value: "all", label: "Alla" }, { value: "red", label: "Rött" },
  { value: "white", label: "Vitt" }, { value: "sparkling", label: "Bubbel" },
];

function ScoreDots({ score }: { score: number | null }) {
  if (score === null) return <span className={styles.missing}>Betyg saknas</span>;
  return <div className={styles.scoreDots} aria-label={`${score.toFixed(1)} av 5 i Vivino-betyg`}>
    {Array.from({ length: 5 }, (_, index) => <span key={index} data-filled={index < Math.round(score) ? "true" : "false"} />)}
    <strong>{score.toFixed(1)}</strong><small>/ 5</small>
  </div>;
}

function SummaryMetric({ label, value, width }: { label: string; value: string; width?: number }) {
  return <div className={styles.summaryMetric}>
    <span>{label}</span><strong>{value}</strong>
    {width !== undefined ? <i><b style={{ width: `${Math.max(4, width)}%` }} /></i> : null}
  </div>;
}

export function BodegaPlayground({ wines, summaries, motifs, overall }: { wines: FeaturedWine[]; summaries: CategorySummary[]; motifs: MotifSummary[]; overall: OverallSummary }) {
  const reduceMotion = useReducedMotion();
  const [animal, setAnimal] = useState<"all" | FeaturedAnimal>("all");
  const [wineType, setWineType] = useState<WineTypeFilter>("all");
  const [sort, setSort] = useState<SortKey>("curated");
  const [country, setCountry] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [scoredOnly, setScoredOnly] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [compare, setCompare] = useState<FeaturedAnimal[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("flaska");
    if (!id || !wines.some((wine) => wine.id === id)) return;
    const timer = window.setTimeout(() => setSelectedId(id), 0);
    return () => window.clearTimeout(timer);
  }, [wines]);

  const countries = useMemo(() => [...new Set(wines.map((wine) => wine.country))].sort((a, b) => a.localeCompare(b, "sv")), [wines]);
  const filtered = useMemo(() => {
    const result = wines.filter((wine) =>
      (animal === "all" || wine.animal === animal) &&
      (wineType === "all" || wine.wineType === wineType) &&
      (country === "all" || wine.country === country) &&
      wine.priceSek <= maxPrice && (!scoredOnly || wine.score !== null),
    );
    if (sort === "price") return [...result].sort((a, b) => a.priceSek - b.priceSek);
    if (sort === "score") return [...result].sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
    return result;
  }, [animal, country, maxPrice, scoredOnly, sort, wineType, wines]);

  const selected = wines.find((wine) => wine.id === selectedId) ?? null;
  const selectedSummary = selected ? summaries.find((summary) => summary.animal === selected.animal) : null;
  const selectedIndex = selected ? filtered.findIndex((wine) => wine.id === selected.id) : -1;
  const compareSummaries = compare.map((key) => summaries.find((summary) => summary.animal === key)).filter(Boolean) as CategorySummary[];
  const activeFilterCount = [animal !== "all", wineType !== "all", country !== "all", maxPrice < 1500, scoredOnly, sort !== "curated"].filter(Boolean).length;

  function reset() {
    setAnimal("all"); setWineType("all"); setCountry("all");
    setMaxPrice(1500); setScoredOnly(false); setSort("curated"); setCompare([]);
  }
  function selectWine(id: string) {
    setSelectedId(id); setCopied(false);
    window.history.replaceState(null, "", `${window.location.pathname}?flaska=${id}#hyllan`);
  }
  function closeWine() {
    setSelectedId(""); window.history.replaceState(null, "", `${window.location.pathname}#hyllan`);
  }
  function moveSelection(direction: -1 | 1) {
    if (!filtered.length) return;
    const next = filtered[(selectedIndex + direction + filtered.length) % filtered.length];
    selectWine(next.id);
  }
  async function copyWine() {
    await navigator.clipboard.writeText(window.location.href); setCopied(true);
  }
  function toggleCompare(key: FeaturedAnimal) {
    setCompare((current) => current.includes(key) ? current.filter((item) => item !== key) : current.length < 2 ? [...current, key] : [current[1], key]);
  }
  function runPrompt(prompt: "best" | "cheap" | "red" | "weak") {
    reset();
    if (prompt === "best") { setSort("score"); setScoredOnly(true); }
    if (prompt === "cheap") setSort("price");
    if (prompt === "red") setWineType("red");
    if (prompt === "weak") setCompare(["pig", "fox"]);
    document.querySelector("#hyllan")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  return <article className={styles.page}>
    <section className={styles.hero} aria-labelledby="bodega-title">
      <div className={styles.tileNoise} aria-hidden="true" />
      <div className={styles.heroIntro}>
        <p className={styles.issue}>Fältstudie № 01 · Systembolaget 2026</p>
        <h1 id="bodega-title">Vad säger djuret<br />om <em>vinet?</em></h1>
        <div className={styles.introBottom}>
          <p>En interaktiv inventering av djuren på vinhyllan — och vad som händer när vi jämför deras pris och användarbetyg med alldeles för stort allvar.</p>
          <a href="#duellen" className={styles.enterLink}>Ta utmaningen <ArrowDown size={16} /></a>
        </div>
      </div>
      <div className={styles.heroStamp} aria-hidden="true"><span>1 349</span><small>djurviner<br />hittade</small></div>
      <span className={styles.tileMarkOne} aria-hidden="true">VIN</span><span className={styles.tileMarkTwo} aria-hidden="true">&amp;</span><span className={styles.tileMarkThree} aria-hidden="true">DJUR</span>
    </section>

    <section className={styles.promptBar} aria-labelledby="prompt-title">
      <div><Sparkles size={17} /><span id="prompt-title">Fråga hyllan</span></div>
      <button type="button" onClick={() => runPrompt("best")}>Vilken flaska har högst betyg?</button>
      <button type="button" onClick={() => runPrompt("cheap")}>Visa den billigaste</button>
      <button type="button" onClick={() => runPrompt("red")}>Vad händer med bara rött?</button>
      <button type="button" onClick={() => runPrompt("weak")}>Visa det osäkraste fyndet</button>
    </section>

    <AnimalChallenge motifs={motifs} overall={overall} />

    <section className={styles.playground} id="hyllan" aria-labelledby="shelf-title">
      <header className={styles.playgroundHeader}>
        <div><p className={styles.eyebrow}>Den interaktiva hyllan</p><h2 id="shelf-title">Välj ditt <i>etikettdjur</i></h2></div>
        <p>Filtrera bland 24 riktiga etiketter, jämför två djurgrupper och tryck på en flaska för att syna innehållet.</p>
      </header>

      <div className={styles.mobileFilterStatus}>{activeFilterCount ? `${activeFilterCount} filter aktiva` : "Alla flaskor visas"}<a href="#filter">Ändra</a></div>
      <div className={styles.worktop} id="filter">
        <div className={styles.controls} aria-label="Filtrera vinhyllan">
          <fieldset className={styles.animalField}>
            <legend>Motivgrupp · välj en eller jämför två</legend>
            <div className={styles.chips}>
              <button type="button" aria-pressed={animal === "all"} onClick={() => setAnimal("all")}>Alla motiv</button>
              {(Object.keys(animalLabels) as FeaturedAnimal[]).map((key) => <span className={styles.animalChip} key={key}>
                <button type="button" aria-pressed={animal === key} onClick={() => setAnimal(key)}>{animalLabels[key]}</button>
                <button type="button" aria-label={`Lägg ${animalLabels[key]} i jämförelsen`} data-compare={compare.includes(key)} onClick={() => toggleCompare(key)}><GitCompareArrows size={12} /></button>
              </span>)}
            </div>
            <p className={styles.taxonomyNote}>Motivgrupper — inte artbestämning. ”Gris / vildsvin” samlar alla tydliga svinmotiv när etiketten inte säkert medger en mer precis tolkning.</p>
          </fieldset>
          <div className={styles.controlRow}>
            <fieldset><legend>Vintyp</legend><div className={styles.segmented}>{typeOptions.map((option) => <button key={option.value} type="button" aria-pressed={wineType === option.value} onClick={() => setWineType(option.value)}>{option.label}</button>)}</div></fieldset>
            <label className={styles.sortLabel}><span>Land</span><select value={country} onChange={(event) => setCountry(event.target.value)}><option value="all">Alla länder</option>{countries.map((value) => <option key={value}>{value}</option>)}</select></label>
            <label className={styles.sortLabel}><span>Ordna efter</span><select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}><option value="curated">Hyllordning</option><option value="price">Lägst pris</option><option value="score">Högst betyg</option></select></label>
            <label className={styles.priceRange}><span>Högst {maxPrice >= 1500 ? "1 500+" : maxPrice} kr</span><input type="range" min="100" max="1500" step="50" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /></label>
            <label className={styles.checkLabel}><input type="checkbox" checked={scoredOnly} onChange={(event) => setScoredOnly(event.target.checked)} /><span><Check size={12} /></span> Bara med betyg</label>
            {activeFilterCount ? <button type="button" className={styles.reset} onClick={reset}><RotateCcw size={14} /> Nollställ</button> : null}
          </div>
        </div>
        <div className={styles.resultCount} aria-live="polite"><span>{String(filtered.length).padStart(2, "0")}</span> flaskor på hyllan</div>
      </div>

      {compareSummaries.length ? <div className={styles.compareTray} aria-live="polite">
        <div className={styles.compareTitle}><GitCompareArrows size={17} /><div><strong>Jämförelsebrickan</strong><span>{compareSummaries.length < 2 ? "Välj ett djur till" : "Observerade gruppvärden"}</span></div><button type="button" onClick={() => setCompare([])}><X size={15} /> Rensa</button></div>
        <div className={styles.compareCards}>{compareSummaries.map((summary) => <article key={summary.animal}>
          <h3>{animalLabels[summary.animal]}</h3>
          <SummaryMetric label="Medelbetyg" value={summary.averageScore?.toFixed(2) ?? "Visas ej"} width={summary.averageScore ? summary.averageScore / 5 * 100 : 0} />
          <SummaryMetric label="Medianpris" value={`${summary.medianPrice} kr`} width={Math.min(100, summary.medianPrice / 6)} />
          <SummaryMetric label="Täckning" value={`${Math.round(summary.coverage * 100)} %`} width={summary.coverage * 100} />
          <small>{summary.scoredCount} betyg av {summary.wineCount} viner</small>
        </article>)}</div>
        {compareSummaries.length === 2 ? <p className={styles.compareCaution}>Skillnaden beskriver urvalet. Den visar inte att djuret orsakar betyget.</p> : null}
      </div> : null}

      <div className={styles.shelfArea}>
        <div className={styles.tileBackdrop} aria-hidden="true" />
        <div className={styles.shelfHint}><ArrowLeft size={13} /> Dra hyllan för fler flaskor <ArrowRight size={13} /></div>
        <div className={styles.bottles}>
          <AnimatePresence mode="popLayout">{filtered.map((wine, index) => <motion.button layout key={wine.id} type="button" className={styles.bottle} data-selected={selectedId === wine.id ? "true" : "false"} onClick={() => selectWine(wine.id)} initial={reduceMotion ? false : { opacity: 0, y: 25, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, y: 18, scale: .92 }} transition={{ duration: reduceMotion ? 0 : .28, delay: reduceMotion ? 0 : Math.min(index, 8) * .025 }} aria-label={`Visa ${wine.name}, ${animalLabels[wine.animal]} på etiketten`}>
            <span className={styles.bottleAnimal}>{animalLabels[wine.animal]}</span><span className={styles.imageFrame}><Image src={wine.imageSrc} alt="" fill sizes="150px" className={styles.bottleImage} /></span><span className={styles.bottleName}>{wine.name}<small>{wine.priceSek} kr</small></span>
          </motion.button>)}</AnimatePresence>
          {!filtered.length ? <div className={styles.emptyState}><FlaskConical size={30} /><strong>Tomt på den här hyllan.</strong><button type="button" onClick={reset}>Visa alla flaskor</button></div> : null}
        </div><div className={styles.shelf} aria-hidden="true"><span /></div>
      </div>
    </section>

    <AnimatePresence>{selected ? <motion.aside className={styles.detailPanel} aria-label={`Detaljer om ${selected.name}`} initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}>
      <div className={styles.detailActions}><button type="button" onClick={() => moveSelection(-1)} aria-label="Föregående flaska"><ArrowLeft size={17} /></button><button type="button" onClick={copyWine} aria-label="Kopiera länk">{copied ? <Check size={17} /> : <Copy size={17} />}</button><button type="button" onClick={closeWine} aria-label="Stäng flaskdetaljer"><X size={18} /></button></div>
      <p className={styles.detailIndex}>Flaska {wines.findIndex((wine) => wine.id === selected.id) + 1} / {wines.length}</p>
      <div className={styles.detailImage}><Image src={selected.imageSrc} alt={selected.imageAlt} fill sizes="180px" /></div>
      <div className={styles.detailCopy}><span className={styles.animalBadge}>Motivgrupp · {animalLabels[selected.animal]}</span><h3>{selected.name}</h3>{selected.subtitle ? <p className={styles.subtitle}>{selected.subtitle}</p> : null}
        <dl><div><dt>Från</dt><dd>{selected.country}</dd></div><div><dt>Typ</dt><dd>{typeLabels[selected.wineType]}</dd></div><div><dt>Pris</dt><dd>{selected.priceSek} kr</dd></div><div><dt>Volym</dt><dd>{selected.volumeMl} ml</dd></div></dl>
        <div className={styles.scoreBlock}><span>Vivino, användarbetyg</span><ScoreDots score={selected.score} />{selected.reviewCount ? <small>{selected.reviewCount.toLocaleString("sv-SE")} användaromdömen</small> : null}</div>
        {selectedSummary ? <div className={styles.categoryContext}><span>I sin djurgrupp</span><p>{animalLabels[selected.animal]}-viner har ett observerat snitt på <strong>{selectedSummary.averageScore?.toFixed(2) ?? "—"}</strong> med {Math.round(selectedSummary.coverage * 100)} % betygstäckning.</p></div> : null}
        <p className={styles.disclaimer}>Ett observerat användarbetyg — inte ett smaklöfte eller köpråd.</p>
      </div><button type="button" className={styles.nextBottle} onClick={() => moveSelection(1)}>Nästa flaska <ArrowRight size={15} /></button>
    </motion.aside> : null}</AnimatePresence>

    <section className={styles.findings} aria-labelledby="findings-title"><div className={styles.findingsLead}><p className={styles.eyebrow}>Antecknat bakom disken</p><h2 id="findings-title">Ett snyggt djur är<br />inte en <i>förklaring.</i></h2></div><div className={styles.findingGrid}>
      <article><span>01</span><strong>1 349</strong><h3>djurviner</h3><p>identifierades bland 11 383 produkter i den frysta Systembolaget-snapshoten.</p></article>
      <article><span>02</span><strong>1 033</strong><h3>har betyg</h3><p>i den bredare Vivino-vyn. Saknade betyg behandlas aldrig som noll.</p></article>
      <article><span>03</span><strong>6</strong><h3>stora djurgrupper</h3><p>jämförs i analysen. Pris, vintyp och täckning kan flytta hela rangordningen.</p></article>
    </div></section>

    <section className={styles.closing}><p>Vill du öppna hela lagret?</p><h2>Se alla viner.<br /><i>Testa din teori.</i></h2><div><Link href="/utforska">Öppna datautforskaren <ArrowUpRight size={18} /></Link><Link href="/metod" className={styles.secondaryLink}>Så gjorde vi studien</Link></div></section>
  </article>;
}
