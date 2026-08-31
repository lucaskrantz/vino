import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__title">Vin &amp; Djur</p>
          <p className="site-footer__copy">
            En redaktionell studie av djurmotiv, pris och externa användarbetyg.
          </p>
        </div>
        <nav aria-label="Sidfot">
          <Link href="/utforska">Utforska data</Link>
          <Link href="/metod">Läs metoden</Link>
        </nav>
        <p className="site-footer__fineprint">
          Resultaten är observationsbaserade. Ett djur på etiketten är inte ett köpråd.
        </p>
      </div>
    </footer>
  );
}
