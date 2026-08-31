"use client";

import { Filter, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { AnimalFilter } from "@/components/animals/animal-filter";
import { AnimalIllustration } from "@/components/animals/animal-illustration";
import { animalKeys, animalMeta } from "@/components/animals/animal-meta";
import { ScoreDistribution } from "@/components/charts/score-distribution";
import { RangeSlider } from "@/components/ui/range-slider";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Sheet } from "@/components/ui/sheet";
import { LabelGallery } from "@/components/visualizations/label-gallery";
import {
  displayRule,
  explorerWines,
  scoreDataNotice,
  wineLabels,
} from "@/data/generated/production-data";
import type { AnimalKey, ScoreAnalysisKey, ScoreBin, WineTypeKey } from "@/lib/data/contracts";
import { formatScore, formatWineCount } from "@/lib/formatting/swedish";

const wineTypeOptions = [
  { value: "all", label: "Alla" },
  { value: "red", label: "Rött" },
  { value: "white", label: "Vitt" },
  { value: "rose", label: "Rosé" },
  { value: "sparkling", label: "Mousserande" },
] as const;
const analysisOptions = [
  { value: "sensitivity", label: "Större urval" },
  { value: "primary", label: "Exakt årgång" },
] as const;
const animalToParam: Record<AnimalKey, string> = {
  lion: "lejon", pig: "gris", deer: "hjort", bird: "fagel", horse: "hast", fox: "rav",
};
const paramToAnimal = Object.fromEntries(
  Object.entries(animalToParam).map(([animal, param]) => [param, animal]),
) as Record<string, AnimalKey>;
const typeToParam: Record<WineTypeKey, string> = {
  all: "alla", red: "rott", white: "vitt", rose: "rose", sparkling: "mousserande",
};
const typeLabels: Record<WineTypeKey, string> = {
  all: "alla vintyper", red: "röda viner", white: "vita viner", rose: "roséviner", sparkling: "mousserande viner",
};
const scoreEdges = [2.5, 3, 3.5, 4, 4.5, 5];

function parseAnimal(value: string | null): AnimalKey {
  const animal = value ? paramToAnimal[value] : undefined;
  return animal && animalKeys.includes(animal) ? animal : "lion";
}
function parseWineType(value: string | null): WineTypeKey {
  return (Object.entries(typeToParam).find(([, param]) => param === value)?.[0] as WineTypeKey | undefined) ?? "all";
}
function parseAnalysis(value: string | null): ScoreAnalysisKey {
  return value === "exakt" ? "primary" : "sensitivity";
}
function parsePrice(value: string | null): [number, number] {
  const [rawMin, rawMax] = value?.split("-") ?? [];
  const min = Number(rawMin);
  const max = Number(rawMax);
  return Number.isFinite(min) && Number.isFinite(max) && min >= 0 && max <= 500 && min < max
    ? [min, max]
    : [50, 500];
}

interface ExplorerControlsProps {
  animal: AnimalKey;
  wineType: WineTypeKey;
  analysis: ScoreAnalysisKey;
  priceRange: [number, number];
  onAnimalChange: (animal: AnimalKey) => void;
  onWineTypeChange: (wineType: WineTypeKey) => void;
  onAnalysisChange: (analysis: ScoreAnalysisKey) => void;
  onPriceChange: (range: [number, number]) => void;
  onPriceCommit: (range: [number, number]) => void;
}

function ExplorerControls(props: ExplorerControlsProps) {
  return (
    <div className="explorer-controls">
      <div className="explorer-control-group explorer-control-group--animals">
        <span className="control-label">Djur</span>
        <AnimalFilter value={props.animal} includeAll={false} onValueChange={(value) => {
          if (value !== "all") props.onAnimalChange(value);
        }} label="Välj djur för utforskaren" />
      </div>
      <div className="explorer-control-group">
        <span className="control-label">Vintyp</span>
        <SegmentedControl label="Vintyp" options={wineTypeOptions} value={props.wineType} onValueChange={props.onWineTypeChange} />
      </div>
      <div className="explorer-control-group">
        <span className="control-label">Analys</span>
        <SegmentedControl label="Analys" options={analysisOptions} value={props.analysis} onValueChange={props.onAnalysisChange} />
      </div>
      <div className="explorer-control-group explorer-control-group--price">
        <RangeSlider label="Pris per förpackning" min={0} max={500} step={10} value={props.priceRange} onValueChange={props.onPriceChange} onValueCommit={props.onPriceCommit} />
      </div>
    </div>
  );
}

export function ExplorerShell() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [sheetOpen, setSheetOpen] = useState(false);
  const animal = parseAnimal(searchParams.get("djur"));
  const wineType = parseWineType(searchParams.get("typ"));
  const analysis = parseAnalysis(searchParams.get("analys"));
  const urlPriceRange = parsePrice(searchParams.get("pris"));
  const [priceDraft, setPriceDraft] = useState<[number, number]>(urlPriceRange);

  function updateQuery(updates: Record<string, string>) {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => next.set(key, value));
    startTransition(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }));
  }

  const result = useMemo(() => {
    const cohort = explorerWines.filter((wine) =>
      wine.animalCategories.includes(animal)
      && (wineType === "all" || wine.wineType === wineType)
      && wine.priceSek >= priceDraft[0]
      && wine.priceSek <= priceDraft[1],
    );
    const scores = cohort.flatMap((wine) => {
      const score = analysis === "primary" ? wine.primaryScore : wine.sensitivityScore;
      return score === null ? [] : [score];
    });
    const coverage = cohort.length ? scores.length / cohort.length : 0;
    const eligible = scores.length >= displayRule.minimumScoreCount && coverage >= displayRule.minimumCoverage;
    const average = scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : null;
    const distribution: ScoreBin[] = scoreEdges.slice(0, -1).map((x1, index) => ({
      x1,
      x2: scoreEdges[index + 1],
      count: scores.filter((score) => score >= x1 && (index === scoreEdges.length - 2 ? score <= scoreEdges[index + 1] : score < scoreEdges[index + 1])).length,
    }));
    return { cohort, scores, coverage, eligible, average, distribution };
  }, [analysis, animal, priceDraft, wineType]);

  const sampleLabels = useMemo(() => wineLabels
    .filter((label) => label.animalCategories.includes(animal))
    .filter((label) => wineType === "all" || label.wineType === wineType)
    .filter((label) => label.priceSek >= priceDraft[0] && label.priceSek <= priceDraft[1])
    .slice(0, 4), [animal, priceDraft, wineType]);

  const controlsProps: ExplorerControlsProps = {
    animal, wineType, analysis, priceRange: priceDraft,
    onAnimalChange: (nextAnimal) => updateQuery({ djur: animalToParam[nextAnimal] }),
    onWineTypeChange: (nextType) => updateQuery({ typ: typeToParam[nextType] }),
    onAnalysisChange: (nextAnalysis) => updateQuery({ analys: nextAnalysis === "primary" ? "exakt" : "storre-urval" }),
    onPriceChange: setPriceDraft,
    onPriceCommit: (range) => updateQuery({ pris: `${range[0]}-${range[1]}` }),
  };
  const scopeText = analysis === "primary" ? "exakt årgång när årgång anges" : "Vivinos samlade betyg över tillgängliga årgångar";

  return (
    <div className="explorer-shell" data-pending={isPending ? "true" : "false"}>
      <div className="explorer-controls-desktop"><ExplorerControls {...controlsProps} /></div>
      <div className="explorer-controls-mobile">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen} title="Filtrera urvalet" description="Valen sparas i sidans webbadress." trigger={
          <button type="button" className="filter-sheet-trigger"><Filter size={18} aria-hidden="true" />Djur, vintyp &amp; pris</button>
        }>
          <ExplorerControls {...controlsProps} />
          <button type="button" className="button button--solid sheet-apply" onClick={() => setSheetOpen(false)}>Visa urvalet</button>
        </Sheet>
      </div>

      <section className="explorer-result" aria-live="polite" aria-busy={isPending}>
        <div className="explorer-result__identity">
          <span className="section-label">Valt djur · {typeLabels[wineType]}</span>
          <AnimalIllustration animal={animal} className="explorer-result__animal" title={`Valt djur: ${animalMeta[animal].label}`} />
          <h2>{animalMeta[animal].label}</h2>
          <p>
            En bred motivgrupp baserad på vad etiketten tydligt visar. Gruppen gör inte anspråk
            på att avgöra exakt biologisk art från små eller stiliserade illustrationer.
          </p>
        </div>
        <div className="explorer-result__analysis">
          <div className="explorer-result__stats">
            <div><strong>{formatWineCount(result.cohort.length)}</strong><span>i valt djur-, typ- och prisurval</span></div>
            <div><strong>{result.eligible && result.average !== null ? formatScore(result.average) : "Visas ej"}</strong><span>{result.scores.length} betyg · {Math.round(result.coverage * 100)} % täckning</span></div>
          </div>
          {result.eligible && result.average !== null ? (
            <ScoreDistribution data={result.distribution} average={result.average} label={`Betygsfördelning för ${animalMeta[animal].label}`} summary={`${scopeText}. ${scoreDataNotice}`} />
          ) : (
            <p className="explorer-empty">Minst {displayRule.minimumScoreCount} betyg och {displayRule.minimumCoverage * 100} procents täckning krävs för att visa ett medelvärde.</p>
          )}
        </div>
      </section>

      <section className="explorer-samples">
        <div className="explorer-samples__header">
          <div><span className="section-label">Etikettexempel</span><h2>Flaskor i samma djurgrupp, vintyp och prisintervall</h2></div>
          <p>Exemplen illustrerar klassificeringen och är inte rekommendationer eller en topplista.</p>
        </div>
        {sampleLabels.length > 0 ? <LabelGallery labels={sampleLabels} compact heading="Filtrerade vinetiketter" /> : <p className="explorer-empty">Inget av de utvalda bildexemplen finns i detta filter.</p>}
      </section>

      <div className="explorer-future-note"><SlidersHorizontal size={18} aria-hidden="true" /><p>Det större urvalet visas som standard eftersom sajten undersöker vinet och etiketten snarare än en enskild årgång. Välj exakt årgång för den striktare kontrollen.</p></div>
    </div>
  );
}
