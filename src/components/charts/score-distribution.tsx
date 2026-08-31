"use client";

import * as Plot from "@observablehq/plot";
import { useEffect, useRef, useState } from "react";
import type { ScoreBin } from "@/lib/data/contracts";
import { formatScore } from "@/lib/formatting/swedish";

interface ScoreDistributionProps {
  data: readonly ScoreBin[];
  average: number;
  label: string;
  summary: string;
  theme?: "light" | "dark";
}

export function ScoreDistribution({
  data,
  average,
  label,
  summary,
  theme = "light",
}: ScoreDistributionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(Math.max(280, Math.floor(entry.contentRect.width)));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const foreground = theme === "dark" ? "var(--paper)" : "var(--ink)";
    const barColor = theme === "dark" ? "var(--white-wine)" : "var(--ink)";
    const baseline = theme === "dark" ? "rgba(243, 240, 232, 0.3)" : "var(--line)";
    const maxCount = Math.max(...data.map((bin) => bin.count));

    const chart = Plot.plot({
      width,
      height: width < 480 ? 250 : 320,
      marginTop: 32,
      marginRight: 18,
      marginBottom: 42,
      marginLeft: 10,
      style: {
        background: "transparent",
        color: foreground,
        fontFamily: "var(--font-sans)",
        fontSize: "12px",
      },
      x: {
        domain: [2.5, 5],
        nice: false,
        ticks: 6,
        tickFormat: (value: number) => value.toLocaleString("sv-SE", { maximumFractionDigits: 1 }),
        label: "Betyg",
        line: false,
      },
      y: { axis: null, domain: [0, maxCount * 1.12] },
      marks: [
        Plot.ruleY([0], { stroke: baseline }),
        Plot.rectY(data, {
          x1: "x1",
          x2: "x2",
          y: "count",
          insetLeft: 2,
          insetRight: 2,
          fill: barColor,
          title: (bin: ScoreBin) => `${formatScore(bin.x1)}–${formatScore(bin.x2)}: ${bin.count} viner`,
        }),
        Plot.ruleX([average], { stroke: "var(--wine-red)", strokeWidth: 2 }),
        Plot.text([{ x: average, y: maxCount * 1.07, text: `SNITT ${formatScore(average)}` }], {
          x: "x",
          y: "y",
          text: "text",
          fill: theme === "dark" ? "var(--white-wine-light)" : "var(--wine-red)",
          fontSize: 11,
          fontWeight: 700,
          textAnchor: average > 4.25 ? "end" : "start",
          dx: average > 4.25 ? -6 : 6,
        }),
      ],
    });

    chart.setAttribute("role", "img");
    chart.setAttribute("aria-label", `${label}. ${summary}`);
    container.replaceChildren(chart);
    return () => chart.remove();
  }, [average, data, label, summary, theme, width]);

  return (
    <figure className="score-distribution">
      <div ref={containerRef} className="score-distribution__plot" />
      <figcaption className={`chart-caption ${theme === "dark" ? "chart-caption--dark" : ""}`}>
        {summary}
      </figcaption>
    </figure>
  );
}
