import type { Metadata } from "next";
import { Suspense } from "react";
import { ExplorerShell } from "@/components/explorer/explorer-shell";
import { SectionLabel } from "@/components/story/primitives";

export const metadata: Metadata = {
  title: "Utforska",
  description: "Utforska viner efter djuret på etiketten, vintyp och pris.",
};

export default function ExplorePage() {
  return (
    <article className="explore-page">
      <header className="route-hero route-hero--explore">
        <SectionLabel>Interaktivt urval · Preliminära resultat</SectionLabel>
        <h1>Utforska djuren<br />i vinhyllan.</h1>
        <p>
          Välj djurgrupp, vintyp, pris och analysläge. Betygstäckning och visningsgräns följer
          varje urval, och inställningarna sparas i adressen.
        </p>
      </header>
      <Suspense fallback={<div className="explorer-loading">Förbereder utforskaren…</div>}>
        <ExplorerShell />
      </Suspense>
    </article>
  );
}
