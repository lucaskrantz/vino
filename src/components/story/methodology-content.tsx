import { MethodologyNote, SectionLabel } from "@/components/story/primitives";

interface MethodSectionData {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  points?: string[];
}

const methodSections: MethodSectionData[] = [
  {
    id: "kallor",
    number: "01",
    title: "Källdata och Systembolagets sortiment",
    paragraphs: [
      "Produktmetadata hämtas från Systembolagets offentligt återgivna produktflöde via en versionslåst adapter. Varje körning sparar en rå ögonblicksbild, proveniens och kontrollsummor innan normalisering.",
      "Populationen avser viner listade av Systembolaget, inte viner producerade i Sverige. Rött, vitt, rosé och mousserande ingår i forskningspipen; glögg, fruktvin, vermouth och andra närliggande kategorier utesluts enligt fasta regler.",
    ],
    points: ["Produkt-id och artikelnummer", "Pris och förpackningsvolym", "Land, vintyp och årgång", "Högsta tillgängliga produktbild"],
  },
  {
    id: "klassificering",
    number: "02",
    title: "Etikettklassificering",
    paragraphs: [
      "Varje primär produktbild klassificeras som djur närvarande, frånvarande eller osäkert. Modellen lämnar strukturerade djurnamn, taxonomisk grupp, avbildningstyp, evidens och konfidens — inte fri text som senare tolkas godtyckligt.",
      "En klassificering binds till bildfilens SHA-256. Om Systembolaget byter produktbild kan ett äldre svar därför inte överleva obemärkt i analysen.",
    ],
  },
  {
    id: "taxonomi",
    number: "03",
    title: "Vad räknas som ett djur?",
    paragraphs: [
      "En tydligt igenkännbar figur, ett huvud eller en kropp i den primära framsidesgrafiken räknas. Logotyp och etikettmotiv behandlas som samma exponering när djuret faktiskt är synligt.",
      "Den publika sajten använder breda motivgrupper, inte biologisk artbestämning. Små, stiliserade eller heraldiska bilder ger sällan stöd för att skilja exempelvis gris, galt och vildsvin. De samlas därför i gruppen ‘Gris / vildsvin’; motsvarande försiktighetsprincip gäller övriga grupper.",
      "Små vingar över en sköld, sigill, heraldiska fragment och dekorativa ornament räknas inte automatiskt. Djuret ska kunna kännas igen utan att motivet först måste tolkas som ett vapensystem.",
    ],
    points: ["Motivgrupp: exempelvis fågel eller hjortdjur", "Ingen exakt art hävdas från etiketten", "Källkoder bevaras endast för revision", "Flera motivgrupper kan registreras på samma vin"],
  },
  {
    id: "validering",
    number: "04",
    title: "Konfidens och manuell validering",
    paragraphs: [
      "AI-klassificeringen är en mätning, inte facit. I det aktuella underlaget har 635 hashbundna manuella bildgranskningar tillämpats på osäkra och flaggade fall.",
      "Den planerade blindade slumpvalideringen av både positiva och negativa fall är ännu inte klar. Resultaten märks därför som preliminära och ska inte beskrivas som färdigvaliderade fynd.",
    ],
  },
  {
    id: "betyg",
    number: "05",
    title: "Betygskällan",
    paragraphs: [
      "Systembolagets produktdata innehåller pris men inget oberoende kvalitetsbetyg. Fält som heter Score i sökgränssnitt är sökrelevans och får aldrig användas som vinpoäng.",
      "Webbplatsen använder Vivinos självselekterade användarbetyg. Standardvyn samlar 1 033 viner över tillgängliga årgångar eftersom berättelsen gäller vinet och etiketten; den striktare kontrollen har 598 betyg. Rå skala, observationsdatum, URL, antal omdömen, årgångsomfång och matchningssäkerhet bevaras.",
    ],
  },
  {
    id: "analys",
    number: "06",
    title: "Statistisk analys",
    paragraphs: [
      "Frontend visar det större flerårgångsurvalet som standard och låter användaren växla till exakt årgång. Klassificeringens mer detaljerade källkoder bevaras för revision, men visas inte som säkra artbestämningar; analysen använder stabila, breda motivgrupper.",
      "Ett medelvärde visas bara när filtret innehåller minst 10 betyg och minst 30 procents betygstäckning. Rangordningen är deskriptiv; någon djur-mot-icke-djur-jämförelse av kvalitet eller justerad djureffekt stöds inte av nuvarande poänginsamling.",
    ],
    points: ["Medelvärde och median", "Antal betyg och täckningsgrad", "Konfidensintervall", "Större urval och exakt årgång"],
  },
  {
    id: "forvaxling",
    number: "07",
    title: "Förväxlingsfaktorer",
    paragraphs: [
      "Ett djurmotiv är inte slumpmässigt tilldelat. Producenter, regioner och prissegment använder visuell identitet på olika sätt. En observerad skillnad kan därför tillhöra något annat än djuret.",
    ],
    points: ["Pris per 750 ml", "Rött, vitt, rosé eller mousserande", "Land, region och druva", "Årgång och produktkategori", "Betygskälla och antal omdömen"],
  },
  {
    id: "begransningar",
    number: "08",
    title: "Begränsningar",
    paragraphs: [
      "Studien är observationell och kan inte visa att ett motiv orsakar smak eller betyg. Sortimentet förändras över tid, produktbilder kan vara ofullständiga och externa betyg har egna urvalsproblem.",
      "Resultaten beskriver det frysta urvalet och den valda poängkällan. De är varken ett universellt omdöme om djurmotiv eller en rekommendation att köpa ett visst vin.",
    ],
  },
];

export function MethodologyContent() {
  return (
    <div className="method-layout">
      <aside className="method-index" aria-label="Innehåll">
        <span className="section-label">I denna bilaga</span>
        <ol>
          {methodSections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                <span>{section.number}</span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </aside>
      <div className="method-content">
        <MethodologyNote title="Publiceringsstatus">
          <p>
            Webbplatsen visar nu de verkliga Vivino-betygen som preliminära resultat. Kontroll
            av publiceringsvillkor, en oberoende identitetsrevision och den planerade blindade
            bildvalideringen återstår innan materialet kan beskrivas som publiceringsklart.
          </p>
        </MethodologyNote>
        {methodSections.map((section) => (
          <section className="method-section" id={section.id} key={section.id}>
            <SectionLabel>{section.number}</SectionLabel>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.points ? (
              <ul>
                {section.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}
