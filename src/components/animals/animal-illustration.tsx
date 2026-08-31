import type { AnimalKey } from "@/lib/data/contracts";

interface AnimalIllustrationProps {
  animal: AnimalKey;
  className?: string;
  title?: string;
}

function AnimalDrawing({ animal }: { animal: AnimalKey }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (animal) {
    case "lion":
      return (
        <g {...common}>
          <path d="M31 34c-7 3-11 11-10 20 1 13 12 22 26 22s25-9 27-22c1-9-3-17-10-21-2-10-9-16-17-16-9 0-15 7-16 17Z" />
          <path d="M35 39c3-5 7-8 12-8s10 3 13 8l-2 19c-2 7-6 11-11 11s-10-4-12-11Z" />
          <path d="m34 37-8-8 2 13M60 37l8-8-1 13M40 49h1M53 49h1M43 58h8l-4 4Z" />
        </g>
      );
    case "pig":
      return (
        <g {...common}>
          <path d="M17 52c0-16 13-27 31-27 16 0 29 8 32 21l9 5-9 8c-4 13-15 20-31 20H30c-8 0-13-4-13-11Z" />
          <path d="m27 32-5-12 15 8M63 30l8-10 4 17M26 77v8M65 76v9M79 49h3M14 48c-7-5-8 4-3 5" />
          <ellipse cx="69" cy="51" rx="7" ry="5" />
          <path d="M66 51h.1M72 51h.1" />
        </g>
      );
    case "deer":
      return (
        <g {...common}>
          <path d="M37 41c0-9 5-15 11-15s12 6 12 15l-2 25c-2 9-6 14-10 14s-9-5-11-14Z" />
          <path d="m38 43-13-8 4 15M59 43l13-8-5 15M41 54h1M54 54h1M44 67h8M48 26V13M48 19l-8-8M48 19l8-8M40 23l-8-11M56 23l8-11M33 13l-2-7M63 13l2-7" />
        </g>
      );
    case "bird":
      return (
        <g {...common}>
          <path d="M18 66c15-3 22-13 27-30 7 5 12 11 14 18 8-1 15 1 21 8-9 2-17 7-23 15-11-6-24-9-39-11Z" />
          <path d="M46 37c2-9 8-15 17-19-1 8-4 15-8 21M43 50c-4 8-10 13-18 16M58 55l11 7M45 74l-2 10M51 76l3 8M40 85h7M51 85h7" />
          <path d="M61 31h.1" />
        </g>
      );
    case "horse":
      return (
        <g {...common}>
          <path d="M29 78c5-9 7-20 7-34l7-23 20 8 11 20-8 18-16 6-7 12" />
          <path d="m43 22 1-12 9 15M59 28l9-13 2 22M37 44c9 0 17 4 24 12M60 45h.1M66 60l8 3M32 54c-8 6-12 14-12 23M28 30c-5 4-8 9-9 15" />
        </g>
      );
    case "fox":
      return (
        <g {...common}>
          <path d="m25 21 19 12c3-2 6-2 9 0l19-12-5 29c0 16-8 28-19 28S29 66 29 50Z" />
          <path d="m29 49 14 4 5 20 6-20 13-4M39 46h1M57 46h1M44 65h8M25 21l5 28M72 21l-5 28" />
          <path d="M37 80c-5 5-12 7-20 5 5-1 9-5 11-11" />
        </g>
      );
  }
}

export function AnimalIllustration({ animal, className, title }: AnimalIllustrationProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <AnimalDrawing animal={animal} />
    </svg>
  );
}
