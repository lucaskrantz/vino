import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-identity" aria-label="Vin och Djur, startsida">
          <span className="site-identity__monogram" aria-hidden="true">V<span>&amp;</span>D</span>
          <span>
            <span className="site-identity__name">Vin &amp; Djur</span>
            <span className="site-identity__subtitle">Etikettzoologi sedan 2026</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Huvudnavigering">
          <Link href="/utforska">Utforska</Link>
          <Link href="/metod">Metod</Link>
        </nav>
      </div>
    </header>
  );
}
