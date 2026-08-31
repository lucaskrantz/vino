import type { Metadata } from "next";
import { MethodologyContent } from "@/components/story/methodology-content";
import { SectionLabel } from "@/components/story/primitives";

export const metadata: Metadata = {
  title: "Metod",
  description: "Källor, etikettklassificering, validering och statistisk metod för Vin & Djur.",
};

export default function MethodPage() {
  return (
    <article className="method-page">
      <header className="route-hero route-hero--method">
        <SectionLabel>Metodbilaga · Version 0.1</SectionLabel>
        <h1>Metoden,<br /><em>utan genvägar.</em></h1>
        <p>
          En förhållandevis omständlig redogörelse för hur en vinetikett blir en observation,
          hur ett betyg får användas och varför den första rangordningen aldrig räcker.
        </p>
      </header>
      <div className="method-rule-meta" aria-label="Metodens principer">
        <span>Reproducerbart</span>
        <span>Bildbundet</span>
        <span>Observationellt</span>
      </div>
      <MethodologyContent />
    </article>
  );
}
