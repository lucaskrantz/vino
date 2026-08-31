import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimalIllustration } from "@/components/animals/animal-illustration";
import { LabelGallery } from "@/components/visualizations/label-gallery";
import {
  datasetOverview,
  displayRule,
  scoreDataNotice,
  wineLabels,
} from "@/data/generated/production-data";
import { formatInteger } from "@/lib/formatting/swedish";
import {
  Annotation,
  FullBleedSection,
  MethodologyNote,
  SectionLabel,
  StatCallout,
  StoryIntro,
  StorySection,
} from "@/components/story/primitives";

export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="home-hero__meta">
        <span>Data: Systembolaget</span>
        <span>Preliminär analys · 01</span>
      </div>
      <div className="home-hero__grid">
        <div className="home-hero__copy">
          <p className="home-hero__kicker">Vin &amp; Djur undersöker</p>
          <h1 id="hero-title">
            Vilket djur
            <br />
            <em>gör bäst vin?</em>
          </h1>
          <p>
            Vi sorterar viner på Systembolaget efter djuret på etiketten och jämför dem med
            Vivinos användarbetyg. Över {formatInteger(datasetOverview.scoredWineCount)}
            djurviner senare har vi en rangordning — och fler frågor.
          </p>
        </div>
        <div className="home-hero__animals" aria-hidden="true">
          <AnimalIllustration animal="lion" className="home-hero__animal home-hero__animal--lion" />
          <AnimalIllustration animal="bird" className="home-hero__animal home-hero__animal--bird" />
          <AnimalIllustration animal="pig" className="home-hero__animal home-hero__animal--pig" />
          <span className="home-hero__index">01—06</span>
        </div>
      </div>
      <a className="home-hero__continue" href="#premiss">
        Läs undersökningen <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}

export function PremiseSection() {
  return (
    <StorySection id="premiss">
      <StoryIntro eyebrow="Premiss" title="Etiketten lovar inget. Ändå tittar vi.">
        <p>
          Ett lejon kan signalera tradition. En fågel kan antyda lätthet. En gris kan mest vara
          en gris. Vi vill veta om motiven råkar samvariera med hur vinerna bedöms — inte om
          illustrationen påverkar smaken i glaset.
        </p>
        <p>
          Berättelsen börjar därför med en naiv rangordning och lägger sedan till pris,
          vintyp och osäkerhet. Varje steg gör svaret något mindre bekvämt och mer användbart.
        </p>
      </StoryIntro>
      <Annotation label="Definition">
        Ett djur räknas när det är tydligt igenkännbart i den primära etikettbilden. Små heraldiska
        ornament behandlas separat i klassificeringen.
      </Annotation>
    </StorySection>
  );
}

export function DatasetSection() {
  return (
    <StorySection width="medium" className="dataset-section">
      <div className="dataset-section__heading">
        <div>
          <SectionLabel>02 · Underlaget</SectionLabel>
          <h2>Först gör vi en zoologisk inventering av vinhyllan.</h2>
        </div>
        <p>
          Produktdata kopplas till bildbunden etikettklassificering och Vivinos användarbetyg.
          Betyg saknas för många produkter och täckningen visas därför tillsammans med varje
          resultat.
        </p>
      </div>
      <div className="dataset-stats" aria-label="Mått för det analyserade underlaget">
        <StatCallout
          value={formatInteger(datasetOverview.sourceWineCount)}
          label="vinprodukter"
          note={datasetOverview.snapshotLabel}
        />
        <StatCallout
          value={formatInteger(datasetOverview.animalWineCount)}
          label="etiketter med djur"
          note="bekräftade djurmotiv"
        />
        <StatCallout
          value={formatInteger(datasetOverview.scoredWineCount)}
          label="viner med betyg"
          note={`${formatInteger(datasetOverview.scoredWineCount)} av ${formatInteger(datasetOverview.animalWineCount)} djurviner`}
        />
      </div>
      <p className="demo-notice">{scoreDataNotice}</p>
    </StorySection>
  );
}

export function InitialReadingSection() {
  return (
    <StorySection className="initial-reading">
      <SectionLabel>Resultat 01 · Första läsningen</SectionLabel>
      <h2>Det ser tydligt ut. Det är inte samma sak som att det är sant.</h2>
      <p>
        Rangordningen beskriver de observerade Vivino-betygen. Men ett högt medelvärde kan bero
        på selektiv betygstäckning, vintyp eller ett litet underlag. Därför döljs medelvärden
        under den förutbestämda gränsen och en första plats är en ledtråd, inte ett facit.
      </p>
      <div className="not-equal-callout" aria-label="Rangordning är inte samma sak som djureffekt">
        <span>Rangordning</span>
        <strong>≠</strong>
        <span>djureffekt</span>
      </div>
    </StorySection>
  );
}

export function PriceQuestionSection() {
  return (
    <FullBleedSection tone="ink" className="price-question">
      <div className="price-question__inner">
        <div className="price-question__header">
          <div>
            <SectionLabel>03 · Analytisk vändpunkt</SectionLabel>
            <h2>Det som saknas kan ändra ordningen.</h2>
          </div>
          <p>
            Betyg samlades bara in för bekräftade djuretiketter. Därför kan materialet jämföra
            djurkategorier, men inte påstå att djurviner är bättre än viner utan djur.
          </p>
        </div>
        <div className="dataset-stats" aria-label="Regler för betygsvisning">
          <StatCallout value={String(displayRule.minimumScoreCount)} label="minsta antal betyg" note="per djur och filter" />
          <StatCallout value={`${displayRule.minimumCoverage * 100} %`} label="minsta täckning" note="saknat är aldrig noll" />
          <StatCallout value="2" label="analyslägen" note="större urval och exakt årgång" />
        </div>
        <div className="price-question__foot">
          <p>
            Standardvyn använder samlade vinbetyg över tillgängliga årgångar. Den ger{" "}
            {formatInteger(datasetOverview.scoredWineCount)} betygsatta djurviner; en strikt vy
            med {formatInteger(datasetOverview.primaryScoredWineCount)} årgångsmatchade betyg
            finns som kontroll.
          </p>
          <span>{scoreDataNotice}</span>
        </div>
      </div>
    </FullBleedSection>
  );
}

export function LabelSection() {
  return (
    <StorySection width="medium" className="labels-section">
      <div className="labels-section__header">
        <div>
          <SectionLabel>04 · Etiketterna</SectionLabel>
          <h2>Djuren är data. Etiketterna får ändå vara etiketter.</h2>
        </div>
        <p>
          Klassificeringen utgår från produktbilderna, men den färdiga analysen arbetar med
          validerade motivkoder. Bilderna nedan är konkreta exempel på den visuella variationen,
          inte en topplista eller ett köpurval.
        </p>
      </div>
      <LabelGallery labels={wineLabels} heading="Exempel på vinetiketter med djurmotiv" />
      <p className="source-note">Produktbilder: Systembolagets produktflöde · Exemplen ingår i det klassificerade underlaget</p>
    </StorySection>
  );
}

export function ExplorerTransitionSection() {
  return (
    <>
      <StorySection className="explorer-transition">
        <SectionLabel>05 · Din tur</SectionLabel>
        <h2>Byt djur. Byt vintyp. Flytta priset.</h2>
        <p>
          I utforskaren kan samma visuella språk användas för att jämföra urval utan att lämna
          berättelsens metodiska ramar. Filtervalen går att dela via webbadressen.
        </p>
        <Link href="/utforska?typ=alla&djur=lejon&pris=50-500" className="editorial-link">
          Öppna utforskaren <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </StorySection>
      <StorySection width="medium" className="method-teaser">
        <div>
          <SectionLabel>Metodbilaga</SectionLabel>
          <h2>Vad räknas som ett djur?</h2>
        </div>
        <MethodologyNote title="Kort svar">
          <p>
            En igenkännbar avbildning i den primära etikettgrafiken. Osäkra fall granskas
            manuellt, varje mätning binds till bildens hash och kvalitetspoängen kommer från en
            separat källa — aldrig från pris eller Systembolagets söksortering.
          </p>
          <Link href="/metod">Läs hela metoden</Link>
        </MethodologyNote>
      </StorySection>
    </>
  );
}
