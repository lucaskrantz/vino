import type { Metadata } from "next";
import { BodegaPlayground, type CategorySummary } from "@/components/playground/bodega-playground";
import type { MotifSummary, OverallSummary } from "@/components/playground/animal-challenge";
import { animalRankingData, displayRule, explorerWines } from "@/data/generated/production-data";
import { featuredWines, type FeaturedAnimal } from "@/data/featured-wines";
import { motifDefinitions } from "@/data/motif-taxonomy";

export const metadata: Metadata = {
  title: "Vad säger djuret om vinet?",
  description: "Kliv in i en interaktiv vinhylla och undersök sambandet mellan djur på etiketten, pris och användarbetyg.",
};

const animals: FeaturedAnimal[] = ["lion", "pig", "deer", "bird", "horse", "fox"];

export default function HomePage() {
  const summaries: CategorySummary[] = animals.map((animal) => {
    const ranking = animalRankingData.sensitivity.find((item) => item.animal === animal)?.values.all;
    const prices = explorerWines
      .filter((wine) => wine.animalCategories.includes(animal))
      .map((wine) => wine.priceSek)
      .sort((a, b) => a - b);
    const middle = Math.floor(prices.length / 2);
    const medianPrice = prices.length % 2 ? prices[middle] : Math.round((prices[middle - 1] + prices[middle]) / 2);
    return {
      animal,
      wineCount: ranking?.cohortWineCount ?? prices.length,
      scoredCount: ranking?.wineCount ?? 0,
      coverage: ranking?.coverage ?? 0,
      averageScore: ranking?.eligible ? ranking.averageScore : null,
      medianPrice,
    };
  });

  const motifs: MotifSummary[] = motifDefinitions.map((definition) => {
    const cohort = explorerWines.filter((wine) => definition.category
      ? wine.animalCategories.includes(definition.category)
      : definition.sourceCodes?.some((code) => wine.specificAnimals.includes(code)),
    );
    const scores = cohort.flatMap((wine) => wine.sensitivityScore === null ? [] : [wine.sensitivityScore]);
    const prices = cohort.map((wine) => wine.priceSek).sort((a, b) => a - b);
    const middle = Math.floor(prices.length / 2);
    const medianPrice = prices.length
      ? prices.length % 2 ? prices[middle] : Math.round((prices[middle - 1] + prices[middle]) / 2)
      : 0;
    const coverage = cohort.length ? scores.length / cohort.length : 0;
    const eligible = scores.length >= displayRule.minimumScoreCount && coverage >= displayRule.minimumCoverage;
    return {
      key: definition.key,
      label: definition.label,
      aliases: definition.aliases,
      wineCount: cohort.length,
      scoredCount: scores.length,
      coverage,
      averageScore: eligible ? scores.reduce((sum, score) => sum + score, 0) / scores.length : null,
      medianPrice,
      eligible,
    };
  });

  const overallScores = explorerWines.flatMap((wine) => wine.sensitivityScore === null ? [] : [wine.sensitivityScore]);
  const overall: OverallSummary = {
    wineCount: explorerWines.length,
    scoredCount: overallScores.length,
    coverage: overallScores.length / explorerWines.length,
    averageScore: overallScores.reduce((sum, score) => sum + score, 0) / overallScores.length,
  };

  return <BodegaPlayground wines={featuredWines} summaries={summaries} motifs={motifs} overall={overall} />;
}
