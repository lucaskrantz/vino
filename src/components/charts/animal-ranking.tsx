"use client";

import { scaleLinear } from "d3-scale";
import { motion, useReducedMotion } from "motion/react";
import { useId, useMemo } from "react";
import { animalMeta } from "@/components/animals/animal-meta";
import type { AnimalFilterValue } from "@/components/animals/animal-filter";
import type { AnimalRankingDatum, WineTypeKey } from "@/lib/data/contracts";
import { formatScore, formatWineCount } from "@/lib/formatting/swedish";

interface AnimalRankingProps {
  data: readonly AnimalRankingDatum[];
  wineType: WineTypeKey;
  referenceValue: number;
  highlightAnimal?: AnimalFilterValue;
  summary: string;
}

const scoreDomain: [number, number] = [3.5, 4.3];
const chartWidth = 960;
const chartLeft = 224;
const chartRight = 886;
const rowHeight = 72;
const chartTop = 50;

export function AnimalRanking({
  data,
  wineType,
  referenceValue,
  highlightAnimal = "all",
  summary,
}: AnimalRankingProps) {
  const reducedMotion = useReducedMotion();
  const titleId = useId();
  const descriptionId = useId();
  const sorted = useMemo(
    () => [...data].sort((a, b) => {
      const aValue = a.values[wineType];
      const bValue = b.values[wineType];
      if (aValue.eligible !== bValue.eligible) return aValue.eligible ? -1 : 1;
      return (bValue.averageScore ?? 0) - (aValue.averageScore ?? 0);
    }),
    [data, wineType],
  );
  const x = scaleLinear().domain(scoreDomain).range([chartLeft, chartRight]).clamp(true);
  const percent = scaleLinear().domain(scoreDomain).range([4, 100]).clamp(true);
  const chartHeight = chartTop + data.length * rowHeight + 38;
  const transition = reducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 155, damping: 24, mass: 0.8 };

  return (
    <figure className="animal-ranking">
      <svg
        className="animal-ranking__desktop"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
      >
        <title id={titleId}>Djurens genomsnittliga betyg, rangordnade</title>
        <desc id={descriptionId}>{summary}</desc>
        <line
          className="animal-ranking__reference"
          x1={x(referenceValue)}
          x2={x(referenceValue)}
          y1={26}
          y2={chartHeight - 30}
        />
        <text className="animal-ranking__reference-label" x={x(referenceValue)} y={16} textAnchor="middle">
          HELA BETYGSGRUNDEN {formatScore(referenceValue)}
        </text>
        {sorted.map((datum, index) => {
          const value = datum.values[wineType];
          const rowY = chartTop + index * rowHeight;
          const isFocused = highlightAnimal === "all" || highlightAnimal === datum.animal;
          const averageScore = value.averageScore;
          const confidenceLow = value.confidenceLow ?? averageScore;
          const confidenceHigh = value.confidenceHigh ?? averageScore;

          return (
            <motion.g
              key={datum.animal}
              initial={false}
              animate={{ translateY: rowY, opacity: isFocused ? 1 : 0.24 }}
              transition={transition}
            >
              <text className="animal-ranking__animal" x={0} y={16}>
                {animalMeta[datum.animal].label.toUpperCase()}
              </text>
              <text className="animal-ranking__count" x={0} y={37}>
                {value.wineCount} BETYG AV {value.cohortWineCount}
              </text>
              <line className="animal-ranking__track" x1={chartLeft} x2={chartRight} y1={20} y2={20} />
              {value.eligible && averageScore !== null && confidenceLow !== null && confidenceHigh !== null ? (
                <>
                  <motion.rect
                    className="animal-ranking__bar"
                    x={chartLeft}
                    y={12}
                    height={16}
                    initial={false}
                    animate={{ width: Math.max(0, x(averageScore) - chartLeft) }}
                    transition={transition}
                    data-focused={highlightAnimal === datum.animal ? "true" : "false"}
                  />
                  <line className="animal-ranking__confidence" x1={x(confidenceLow)} x2={x(confidenceHigh)} y1={20} y2={20} />
                  <line className="animal-ranking__confidence-cap" x1={x(confidenceLow)} x2={x(confidenceLow)} y1={14} y2={26} />
                  <line className="animal-ranking__confidence-cap" x1={x(confidenceHigh)} x2={x(confidenceHigh)} y1={14} y2={26} />
                  <motion.text
                    className="animal-ranking__score"
                    y={26}
                    initial={false}
                    animate={{ x: Math.min(chartRight + 18, x(averageScore) + 14) }}
                    transition={transition}
                  >
                    {formatScore(averageScore)}
                  </motion.text>
                </>
              ) : (
                <text className="animal-ranking__score" x={chartLeft + 14} y={26}>VISAS EJ · FÖR LITET UNDERLAG</text>
              )}
            </motion.g>
          );
        })}
      </svg>

      <ol className="animal-ranking__mobile" aria-label="Djurens rangordning">
        {sorted.map((datum, index) => {
          const value = datum.values[wineType];
          const isFocused = highlightAnimal === "all" || highlightAnimal === datum.animal;
          return (
            <motion.li
              layout={!reducedMotion}
              key={datum.animal}
              className="animal-ranking-mobile-row"
              animate={{ opacity: isFocused ? 1 : 0.3 }}
              transition={transition}
            >
              <div className="animal-ranking-mobile-row__meta">
                <span>
                  {String(index + 1).padStart(2, "0")} · {animalMeta[datum.animal].label}
                </span>
                <small>{value.wineCount} betyg av {formatWineCount(value.cohortWineCount)}</small>
              </div>
              <strong>{value.eligible && value.averageScore !== null ? formatScore(value.averageScore) : "Visas ej"}</strong>
              <div className="animal-ranking-mobile-row__track" aria-hidden="true">
                {value.eligible && value.averageScore !== null ? (
                  <motion.span
                    initial={false}
                    animate={{ width: `${percent(value.averageScore)}%` }}
                    transition={transition}
                    data-focused={highlightAnimal === datum.animal ? "true" : "false"}
                  />
                ) : null}
              </div>
            </motion.li>
          );
        })}
      </ol>
      <figcaption className="chart-caption">
        <span>{summary}</span>
        <span>Streck visar ett approximativt 95-procentigt medelvärdesintervall.</span>
      </figcaption>
    </figure>
  );
}
