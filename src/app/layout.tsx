import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vin & Djur — Vilket djur gör bäst vin?",
    template: "%s — Vin & Djur",
  },
  description:
    "En svensk redaktionell dataundersökning av djuren på vinetiketten, priset och vinets betyg.",
  openGraph: {
    title: "Vin & Djur",
    description: "Vilket djur gör bäst vin? En högst vetenskaplig undersökning.",
    locale: "sv_SE",
    type: "article",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Hoppa till innehållet</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
