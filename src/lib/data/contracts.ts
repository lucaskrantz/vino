export type AnimalKey = "lion" | "pig" | "deer" | "bird" | "horse" | "fox";

export type WineTypeKey = "all" | "red" | "white" | "rose" | "sparkling";

export type ScoreAnalysisKey = "primary" | "sensitivity";

export interface AnimalSummary {
  animal: AnimalKey;
  cohortWineCount: number;
  wineCount: number;
  coverage: number;
  eligible: boolean;
  averageScore: number | null;
  medianScore: number | null;
  confidenceLow?: number;
  confidenceHigh?: number;
}

export interface AnimalRankingDatum {
  animal: AnimalKey;
  values: Record<WineTypeKey, AnimalSummary>;
}

export interface AdjustedComparisonDatum {
  animal: AnimalKey;
  rawDifference: number;
  adjustedDifference: number;
  confidenceLow?: number;
  confidenceHigh?: number;
}

export interface ScoreBin {
  x1: number;
  x2: number;
  count: number;
}

export interface ExplorerWineDatum {
  id: string;
  wineType: Exclude<WineTypeKey, "all">;
  priceSek: number;
  animalCategories: AnimalKey[];
  specificAnimals: string[];
  primaryScore: number | null;
  sensitivityScore: number | null;
}

export interface WineLabelDatum {
  id: string;
  name: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  country: string;
  wineType: Exclude<WineTypeKey, "all">;
  priceSek: number;
  volumeMl: number;
  animalLabel: string;
  animalCategories: AnimalKey[];
  specificAnimals: string[];
}

export interface DatasetOverview {
  sourceWineCount: number;
  scoredWineCount: number;
  primaryScoredWineCount: number;
  animalWineCount: number;
  animalCategoryCount: number;
  isDemo: boolean;
  snapshotLabel: string;
}
