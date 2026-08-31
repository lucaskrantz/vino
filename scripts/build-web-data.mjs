import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const primaryPath = resolve(root, "data/processed/research_dataset.csv");
const sensitivityPath = resolve(root, "data/processed/research_dataset_wine_level.csv");
const sourceManifestPath = resolve(root, "data/raw/systembolaget/manifest.json");
const outputPath = resolve(root, "src/data/generated/production-data.ts");
const manifestPath = resolve(root, "src/data/generated/build-manifest.json");
const minimumScoreCount = 10;
const minimumCoverage = 0.3;
const animalKeys = ["lion", "pig", "deer", "bird", "horse", "fox"];
const wineTypes = ["all", "red", "white", "rose", "sparkling"];
const wineTypeMap = {
  "Rött vin": "red",
  "Vitt vin": "white",
  "Rosévin": "rose",
  "Mousserande vin": "sparkling",
};

function parseCsv(source) {
  const records = [];
  let record = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (char === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      record.push(field);
      field = "";
    } else if (char === "\n") {
      record.push(field.replace(/\r$/, ""));
      records.push(record);
      record = [];
      field = "";
    } else field += char;
  }
  if (field || record.length) {
    record.push(field.replace(/\r$/, ""));
    records.push(record);
  }
  const [headers, ...rows] = records;
  return rows.filter((row) => row.some(Boolean)).map((row) =>
    Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])),
  );
}

const split = (value) => value ? value.split(";").filter(Boolean) : [];
const mean = (values) => values.reduce((total, value) => total + value, 0) / values.length;
const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
const round = (value, digits = 3) => Number(value.toFixed(digits));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function prepareRows(rows) {
  return rows.map((row) => ({
    ...row,
    categories: split(row.animal_categories),
    specificAnimals: split(row.animal_names),
    frontendWineType: wineTypeMap[row.wine_type],
    score: row.quality_score ? Number(row.quality_score) : null,
    priceSek: Number(row.price_sek),
    volumeMl: Number(row.volume_ml),
  }));
}

function select(rows, animal, wineType) {
  return rows.filter((row) =>
    row.categories.includes(animal) && (wineType === "all" || row.frontendWineType === wineType),
  );
}

function summarize(rows, animal, wineType) {
  const cohort = select(rows, animal, wineType);
  const scores = cohort.flatMap((row) => row.score === null ? [] : [row.score]);
  const coverage = cohort.length ? scores.length / cohort.length : 0;
  const eligible = scores.length >= minimumScoreCount && coverage >= minimumCoverage;
  let confidenceLow;
  let confidenceHigh;
  if (scores.length > 1) {
    const average = mean(scores);
    const variance = scores.reduce((total, score) => total + (score - average) ** 2, 0) / (scores.length - 1);
    const margin = 1.96 * Math.sqrt(variance / scores.length);
    confidenceLow = round(average - margin);
    confidenceHigh = round(average + margin);
  }
  return {
    animal,
    cohortWineCount: cohort.length,
    wineCount: scores.length,
    coverage: round(coverage, 4),
    eligible,
    averageScore: scores.length ? round(mean(scores)) : null,
    medianScore: scores.length ? round(median(scores)) : null,
    ...(confidenceLow === undefined ? {} : { confidenceLow, confidenceHigh }),
  };
}

function ranking(rows) {
  return animalKeys.map((animal) => ({
    animal,
    values: Object.fromEntries(wineTypes.map((wineType) => [wineType, summarize(rows, animal, wineType)])),
  }));
}

function referenceScores(rows) {
  return Object.fromEntries(wineTypes.map((wineType) => {
    const scores = rows
      .filter((row) => row.score !== null && (wineType === "all" || row.frontendWineType === wineType))
      .map((row) => row.score);
    return [wineType, round(mean(scores))];
  }));
}

const scoreEdges = [2.5, 3, 3.5, 4, 4.5, 5];
function distributions(rows) {
  return Object.fromEntries(animalKeys.map((animal) => [animal,
    Object.fromEntries(wineTypes.map((wineType) => {
      const scores = select(rows, animal, wineType).flatMap((row) => row.score === null ? [] : [row.score]);
      return [wineType, scoreEdges.slice(0, -1).map((x1, index) => ({
        x1,
        x2: scoreEdges[index + 1],
        count: scores.filter((score) => score >= x1 && (index === scoreEdges.length - 2 ? score <= scoreEdges[index + 1] : score < scoreEdges[index + 1])).length,
      }))];
    })),
  ]));
}

const [primarySource, sensitivitySource, sourceManifestSource] = await Promise.all([
  readFile(primaryPath, "utf8"),
  readFile(sensitivityPath, "utf8"),
  readFile(sourceManifestPath, "utf8"),
]);
const primaryRows = prepareRows(parseCsv(primarySource));
const sensitivityRows = prepareRows(parseCsv(sensitivitySource));
const sourceManifest = JSON.parse(sourceManifestSource);
if (primaryRows.length !== sensitivityRows.length || primaryRows.length !== sourceManifest.included_count) {
  throw new Error("Primary, sensitivity, and source-manifest cohort sizes do not agree.");
}
if (primaryRows.some((row) => !row.frontendWineType)) throw new Error("Unsupported wine type in primary dataset.");
if (primaryRows.some((row) => row.animal_presence === "present" && row.categories.some((category) => !animalKeys.includes(category)))) {
  throw new Error("Unknown frontend animal category.");
}
const sensitivityById = new Map(sensitivityRows.map((row) => [row.product_id, row]));

const labelDefinitions = [
  ["10331", "/labels/el-coto.webp", "Flaska El Coto med en tecknad hjort på etiketten.", "Hjort"],
  ["24555292", "/labels/the-fox.webp", "Flaska The Fox and the Grapes med en räv på etiketten.", "Räv"],
  ["58697741", "/labels/lab.webp", "Flaska LAB Reserva med ett svart djurmotiv på etiketten.", "Hund"],
  ["35720", "/labels/eaglehawk-white.webp", "Flaska Wolf Blass Eaglehawk med en flygande örn på etiketten.", "Örn"],
  ["31986597", "/labels/dark-horse-white.webp", "Förpackning Dark Horse Chardonnay med ett stiliserat hästhuvud.", "Häst"],
  ["63914626", "/labels/gato-negro-white.webp", "Flaska Gato Negro Sauvignon Blanc med en svart katt på etiketten.", "Katt"],
];
const primaryById = new Map(primaryRows.map((row) => [row.product_id, row]));
const wineLabels = labelDefinitions.map(([id, imageSrc, imageAlt, animalLabel]) => {
  const row = primaryById.get(id);
  if (!row) throw new Error(`Label example ${id} is absent from the research dataset.`);
  return {
    id,
    name: row.name,
    ...(row.subtitle ? { subtitle: row.subtitle } : {}),
    imageSrc,
    imageAlt,
    country: row.country,
    wineType: row.frontendWineType,
    priceSek: row.priceSek,
    volumeMl: row.volumeMl,
    animalLabel,
    animalCategories: row.categories,
    specificAnimals: row.specificAnimals,
  };
});

const explorerWines = primaryRows
  .filter((row) => row.categories.length > 0)
  .map((row) => {
    const sensitivity = sensitivityById.get(row.product_id);
    return {
      id: row.product_id,
      wineType: row.frontendWineType,
      priceSek: row.priceSek,
      animalCategories: row.categories,
      specificAnimals: row.specificAnimals,
      primaryScore: row.score,
      sensitivityScore: sensitivity?.score ?? null,
    };
  });

const scoredPrimary = primaryRows.filter((row) => row.score !== null);
const scoredSensitivity = sensitivityRows.filter((row) => row.score !== null);
const sourceDate = new Date(sourceManifest.retrieved_at).toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
const generated = `// GENERATED FILE — run npm run data:build.\n// Primary results require exact-vintage ratings for vintage-dated products.\n\nimport type {\n  AnimalRankingDatum,\n  DatasetOverview,\n  ExplorerWineDatum,\n  ScoreAnalysisKey,\n  ScoreBin,\n  WineLabelDatum,\n  WineTypeKey,\n  AnimalKey,\n} from "@/lib/data/contracts";\n\nexport const scoreDataNotice = ${JSON.stringify("Preliminära resultat · Vivinos användarbetyg · saknade betyg räknas inte som noll.")};\nexport const displayRule = { minimumScoreCount: ${minimumScoreCount}, minimumCoverage: ${minimumCoverage} } as const;\nexport const datasetOverview: DatasetOverview = ${JSON.stringify({
  sourceWineCount: primaryRows.length,
  scoredWineCount: scoredSensitivity.length,
  primaryScoredWineCount: scoredPrimary.length,
  animalWineCount: primaryRows.filter((row) => row.animal_presence === "present").length,
  animalCategoryCount: animalKeys.length,
  isDemo: false,
  snapshotLabel: `Systembolagets sortiment ${sourceDate}`,
}, null, 2)};\n\nexport const animalRankingData: Record<ScoreAnalysisKey, AnimalRankingDatum[]> = ${JSON.stringify({ primary: ranking(primaryRows), sensitivity: ranking(sensitivityRows) }, null, 2)};\n\nexport const referenceScores: Record<ScoreAnalysisKey, Record<WineTypeKey, number>> = ${JSON.stringify({ primary: referenceScores(primaryRows), sensitivity: referenceScores(sensitivityRows) }, null, 2)};\n\nexport const scoreDistributions: Record<ScoreAnalysisKey, Record<AnimalKey, Record<WineTypeKey, ScoreBin[]>>> = ${JSON.stringify({ primary: distributions(primaryRows), sensitivity: distributions(sensitivityRows) }, null, 2)};\n\nexport const explorerWines: ExplorerWineDatum[] = ${JSON.stringify(explorerWines, null, 2)};\n\nexport const wineLabels: WineLabelDatum[] = ${JSON.stringify(wineLabels, null, 2)};\n`;
await writeFile(outputPath, generated, "utf8");

const manifest = {
  schemaVersion: "2.0",
  dataset: "production-primary-with-sensitivity",
  generated: "src/data/generated/production-data.ts",
  sources: [
    { path: "data/processed/research_dataset.csv", sha256: sha256(primarySource) },
    { path: "data/processed/research_dataset_wine_level.csv", sha256: sha256(sensitivitySource) },
    { path: "data/raw/systembolaget/manifest.json", sha256: sha256(sourceManifestSource) },
  ],
  outputSha256: sha256(generated),
  displayRule: { minimumScoreCount, minimumCoverage },
};
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Generated real web data for ${primaryRows.length} wines (${scoredSensitivity.length} default, ${scoredPrimary.length} exact-vintage scores).`);
