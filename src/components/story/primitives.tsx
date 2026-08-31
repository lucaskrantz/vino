import type { HTMLAttributes, ReactNode } from "react";

interface StorySectionProps extends HTMLAttributes<HTMLElement> {
  width?: "narrow" | "medium" | "wide";
  children: ReactNode;
}

export function StorySection({
  width = "narrow",
  className = "",
  children,
  ...props
}: StorySectionProps) {
  return (
    <section className={`story-section story-section--${width} ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}

interface StoryIntroProps {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
}

export function StoryIntro({ eyebrow, title, children }: StoryIntroProps) {
  return (
    <div className="story-intro">
      {eyebrow ? <SectionLabel>{eyebrow}</SectionLabel> : null}
      {title ? <h2>{title}</h2> : null}
      <div className="story-intro__body">{children}</div>
    </div>
  );
}

interface FullBleedSectionProps extends HTMLAttributes<HTMLElement> {
  tone?: "ink" | "paper-light" | "wine";
  children: ReactNode;
}

export function FullBleedSection({
  tone = "ink",
  className = "",
  children,
  ...props
}: FullBleedSectionProps) {
  return (
    <section className={`full-bleed full-bleed--${tone} ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return <p className={`section-label ${className}`.trim()}>{children}</p>;
}

interface StatCalloutProps {
  value: string;
  label: string;
  note?: string;
  accent?: boolean;
}

export function StatCallout({ value, label, note, accent = false }: StatCalloutProps) {
  return (
    <div className="stat-callout" data-accent={accent ? "true" : "false"}>
      <strong className="stat-callout__value">{value}</strong>
      <span className="stat-callout__label">{label}</span>
      {note ? <small>{note}</small> : null}
    </div>
  );
}

interface AnnotationProps {
  label?: string;
  children: ReactNode;
}

export function Annotation({ label, children }: AnnotationProps) {
  return (
    <aside className="annotation">
      {label ? <span className="annotation__label">{label}</span> : null}
      <p>{children}</p>
    </aside>
  );
}

interface MethodologyNoteProps {
  title?: string;
  children: ReactNode;
}

export function MethodologyNote({ title = "Metodnot", children }: MethodologyNoteProps) {
  return (
    <aside className="methodology-note">
      <span className="methodology-note__title">{title}</span>
      <div>{children}</div>
    </aside>
  );
}

interface StickyGraphicProps {
  narrative: ReactNode;
  graphic: ReactNode;
}

export function StickyGraphic({ narrative, graphic }: StickyGraphicProps) {
  return (
    <div className="sticky-graphic">
      <div className="sticky-graphic__narrative">{narrative}</div>
      <div className="sticky-graphic__visual">{graphic}</div>
    </div>
  );
}
