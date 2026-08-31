"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, RotateCcw, Search, Share2, Trophy, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import styles from "./animal-challenge.module.css";

export interface MotifSummary {
  key: string;
  label: string;
  aliases: string[];
  wineCount: number;
  scoredCount: number;
  coverage: number;
  averageScore: number | null;
  medianPrice: number;
  eligible: boolean;
}

export interface OverallSummary {
  wineCount: number;
  scoredCount: number;
  coverage: number;
  averageScore: number;
}

const quizKeys: [string, string][] = [
  ["fish", "horse"], ["insect", "lion"], ["bird", "canid"],
  ["feline", "deer"], ["cattle", "elephant"],
];

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("sv-SE").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function AnimalChallenge({ motifs, overall }: { motifs: MotifSummary[]; overall: OverallSummary }) {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [searchedKey, setSearchedKey] = useState<string | null>(null);
  const [searchError, setSearchError] = useState(false);
  const [round, setRound] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [shared, setShared] = useState(false);

  const motifMap = useMemo(() => new Map(motifs.map((motif) => [motif.key, motif])), [motifs]);
  const searched = searchedKey ? motifMap.get(searchedKey) ?? null : null;
  const pair = quizKeys[round] ?? quizKeys[0];
  const left = motifMap.get(pair[0]);
  const right = motifMap.get(pair[1]);
  const complete = round >= quizKeys.length;

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    const wanted = normalize(query);
    const match = motifs.find((motif) => [motif.label, ...motif.aliases].some((alias) => normalize(alias) === wanted));
    setSearchError(!match);
    setSearchedKey(match?.key ?? null);
  }

  function choose(key: string) {
    if (answer || !left || !right) return;
    setAnswer(key);
    const winner = (left.averageScore ?? -1) >= (right.averageScore ?? -1) ? left.key : right.key;
    if (key === winner) setScore((current) => current + 1);
  }

  function nextRound() {
    setRound((current) => current + 1);
    setAnswer(null);
    setShared(false);
  }

  function restart() {
    setRound(0); setAnswer(null); setScore(0); setShared(false);
  }

  async function shareResult() {
    const text = `Jag fick ${score} av ${quizKeys.length} rätt i Etikettdjursduellen på Vin & Djur.`;
    if (navigator.share) await navigator.share({ title: "Etikettdjursduellen", text, url: window.location.href });
    else await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    setShared(true);
  }

  const difference = searched?.averageScore === null || !searched ? null : searched.averageScore - overall.averageScore;

  return <section className={styles.challenge} id="duellen" aria-labelledby="challenge-title">
    <div className={styles.tiles} aria-hidden="true" />
    <header className={styles.header}>
      <div><p>Interaktiv utmaning · 5 frågor</p><h2 id="challenge-title">Etikett&shy;djursduellen</h2></div>
      <p>Gissa först. Se data sedan. Här jämförs bara viner med djurmotiv — aldrig hela vinsortimentet.</p>
    </header>

    <div className={styles.gameGrid}>
      <div className={styles.quizCard}>
        {!complete && left && right ? <>
          <div className={styles.quizTop}><span>Runda {round + 1} / {quizKeys.length}</span><strong>{score} rätt</strong></div>
          <h3>Vilken motivgrupp har högst användarbetyg?</h3>
          <div className={styles.duel} data-answered={answer ? "true" : "false"}>
            {[left, right].map((motif) => {
              const selected = answer === motif.key;
              const winner = answer && (motif.averageScore ?? -1) === Math.max(left.averageScore ?? -1, right.averageScore ?? -1);
              return <button type="button" key={motif.key} onClick={() => choose(motif.key)} data-selected={selected} data-winner={winner ? "true" : "false"}>
                <span>{motif.label}</span>
                <strong>{answer ? motif.averageScore?.toFixed(2) ?? "—" : "?"}</strong>
                <small>{answer ? `${motif.scoredCount} betyg · ${Math.round(motif.coverage * 100)} % täckning` : "Välj motivet"}</small>
              </button>;
            })}
            <i>VS</i>
          </div>
          <AnimatePresence>{answer ? <motion.div className={styles.reveal} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <p>{answer === ((left.averageScore ?? -1) >= (right.averageScore ?? -1) ? left.key : right.key) ? <><Check size={15} /> Rätt svar.</> : <><X size={15} /> Inte den här gången.</>} Skillnaden är deskriptiv, inte en djureffekt.</p>
            <button type="button" onClick={nextRound}>Nästa fråga <ArrowRight size={15} /></button>
          </motion.div> : null}</AnimatePresence>
        </> : <div className={styles.complete}>
          <Trophy size={38} /><p>Skiftet är över</p><h3>{score} av {quizKeys.length} rätt</h3>
          <span>{score >= 4 ? "Källarmästare" : score >= 2 ? "Etikettspanare" : "Nyfiken lärling"}</span>
          <div><button type="button" onClick={shareResult}><Share2 size={15} /> {shared ? "Delat" : "Dela resultat"}</button><button type="button" onClick={restart}><RotateCcw size={15} /> Spela igen</button></div>
        </div>}
      </div>

      <div className={styles.searchCard}>
        <span className={styles.searchKicker}>Fråga lagret</span>
        <h3>Skriv ett djurmotiv.</h3>
        <p>Prova fisk, fjäril, hund, katt eller björn. Vi matchar mot försiktigt sammanslagna motivgrupper.</p>
        <form onSubmit={submitSearch}>
          <label htmlFor="motif-search">Djurmotiv</label>
          <div><Search size={18} /><input id="motif-search" list="motif-options" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Till exempel fisk" autoComplete="off" /><button type="submit">Slå upp</button></div>
          <datalist id="motif-options">{motifs.map((motif) => <option key={motif.key} value={motif.label} />)}</datalist>
        </form>
        {searchError ? <p className={styles.searchError}>Det motivet finns inte i vår kontrollerade ordlista ännu. Prova ett av förslagen.</p> : null}
        <AnimatePresence mode="wait">{searched ? <motion.div className={styles.searchResult} key={searched.key} initial={reduceMotion ? false : { opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }}>
          <div><span>Motivgrupp</span><h4>{searched.label}</h4><small>{searched.wineCount} klassificerade etiketter</small></div>
          {searched.eligible && searched.averageScore !== null ? <>
            <strong>{searched.averageScore.toFixed(2)}<small>/ 5</small></strong>
            <dl><div><dt>Med betyg</dt><dd>{searched.scoredCount}</dd></div><div><dt>Täckning</dt><dd>{Math.round(searched.coverage * 100)} %</dd></div><div><dt>Medianpris</dt><dd>{searched.medianPrice} kr</dd></div></dl>
            <p>{difference !== null && difference >= 0 ? "+" : ""}{difference?.toFixed(2)} jämfört med snittet för alla betygsatta djurviner ({overall.averageScore.toFixed(2)}).</p>
          </> : <div className={styles.insufficient}><strong>För tunt underlag</strong><p>Minst 10 betyg och 30 % täckning krävs. Här finns {searched.scoredCount} betyg med {Math.round(searched.coverage * 100)} % täckning.</p></div>}
        </motion.div> : null}</AnimatePresence>
        <p className={styles.fineprint}>Sökningen avgör inte biologisk art. När etiketten är liten eller stiliserad slås närliggande koder ihop till en bred motivgrupp.</p>
      </div>
    </div>
  </section>;
}
