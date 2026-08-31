import type { AnimalKey } from "@/lib/data/contracts";

export interface AnimalMeta {
  key: AnimalKey;
  label: string;
  definiteLabel: string;
}

export const animalMeta: Record<AnimalKey, AnimalMeta> = {
  lion: { key: "lion", label: "Lejon", definiteLabel: "lejonet" },
  pig: { key: "pig", label: "Gris / vildsvin", definiteLabel: "svinmotivet" },
  deer: { key: "deer", label: "Hjortdjur", definiteLabel: "hjortdjuret" },
  bird: { key: "bird", label: "Fågel", definiteLabel: "fågeln" },
  horse: { key: "horse", label: "Häst", definiteLabel: "hästen" },
  fox: { key: "fox", label: "Räv", definiteLabel: "räven" },
};

export const animalKeys = Object.keys(animalMeta) as AnimalKey[];
