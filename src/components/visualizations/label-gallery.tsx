import Image from "next/image";
import type { WineLabelDatum } from "@/lib/data/contracts";
import { formatSek } from "@/lib/formatting/swedish";

interface LabelGalleryProps {
  labels: readonly WineLabelDatum[];
  heading?: string;
  compact?: boolean;
}

const wineTypeLabels: Record<WineLabelDatum["wineType"], string> = {
  red: "Rött",
  white: "Vitt",
  rose: "Rosé",
  sparkling: "Mousserande",
};

export function LabelGallery({ labels, heading, compact = false }: LabelGalleryProps) {
  return (
    <div className="label-gallery" data-compact={compact ? "true" : "false"}>
      {heading ? <h3 className="sr-only">{heading}</h3> : null}
      <div className="label-gallery__grid">
        {labels.map((label) => (
          <figure className="wine-label" key={label.id}>
            <div className="wine-label__image-wrap">
              <Image
                src={label.imageSrc}
                alt={label.imageAlt}
                fill
                sizes={compact ? "(max-width: 700px) 42vw, 18vw" : "(max-width: 700px) 46vw, 28vw"}
                className="wine-label__image"
              />
              <span className="wine-label__animal">{label.animalLabel}</span>
            </div>
            <figcaption>
              <div>
                <strong>{label.name}</strong>
                {label.subtitle ? <span>{label.subtitle}</span> : null}
              </div>
              <p>
                {label.country} · {wineTypeLabels[label.wineType]} · {formatSek(label.priceSek)}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
