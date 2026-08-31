"use client";

import { Info } from "lucide-react";
import { useState } from "react";
import { AnimalFilter, type AnimalFilterValue } from "@/components/animals/animal-filter";
import { animalMeta } from "@/components/animals/animal-meta";
import { AnimalRanking } from "@/components/charts/animal-ranking";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Tooltip } from "@/components/ui/tooltip";
import {
  animalRankingData,
  displayRule,
  referenceScores,
  scoreDataNotice,
} from "@/data/generated/production-data";
import type { ScoreAnalysisKey, WineTypeKey } from "@/lib/data/contracts";

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

const typeLabels: Record<WineTypeKey, string> = {
  all: "alla vintyper",
  red: "röda viner",
  white: "vita viner",
  rose: "roséviner",
  sparkling: "mousserande viner",
};

export function RankingExperience() {
  const [wineType, setWineType] = useState<WineTypeKey>("all");
  const [analysis, setAnalysis] = useState<ScoreAnalysisKey>("sensitivity");
  const [animal, setAnimal] = useState<AnimalFilterValue>("all");
  const selectedText = animal === "all" ? "alla djur" : animalMeta[animal].definiteLabel;
  const scopeText = analysis === "primary"
    ? "Den strikta vyn kräver rätt årgång för årgångsmärkta produkter."
    : "Standardvyn använder Vivinos samlade betyg över tillgängliga årgångar för ett större urval.";
  const summary = `Rangordningen visar ${selectedText} bland ${typeLabels[wineType]}. ${scopeText} ${scoreDataNotice}`;

  return (
    <div className="ranking-experience">
      <div className="ranking-experience__controls">
        <SegmentedControl
          label="Vintyp"
          options={wineTypeOptions}
          value={wineType}
          onValueChange={setWineType}
        />
        <SegmentedControl
          label="Analys"
          options={analysisOptions}
          value={analysis}
          onValueChange={setAnalysis}
        />
        <Tooltip content={`Medelvärden visas först vid minst ${displayRule.minimumScoreCount} betyg och ${displayRule.minimumCoverage * 100} procents täckning.`}>
          <button className="chart-info-button" type="button" aria-label="Om visningsregeln">
            <Info size={17} aria-hidden="true" />
          </button>
        </Tooltip>
      </div>
      <AnimalFilter value={animal} onValueChange={setAnimal} />
      <AnimalRanking
        data={animalRankingData[analysis]}
        wineType={wineType}
        referenceValue={referenceScores[analysis][wineType]}
        highlightAnimal={animal}
        summary={summary}
      />
    </div>
  );
}
