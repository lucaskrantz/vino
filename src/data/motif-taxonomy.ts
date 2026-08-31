import type { AnimalKey } from "@/lib/data/contracts";

export interface MotifDefinition {
  key: string;
  label: string;
  aliases: string[];
  category?: AnimalKey;
  sourceCodes?: string[];
}

/**
 * Public, intentionally broad visual motif groups. Source classifier codes are
 * combined where a small or stylised label cannot support species-level claims.
 */
export const motifDefinitions: MotifDefinition[] = [
  { key: "fish", label: "Fisk", aliases: ["fisk", "fiskar", "fish", "gädda", "abborre", "sjöhäst"], sourceCodes: ["fish", "pike", "perch", "seahorse"] },
  { key: "horse", label: "Häst", aliases: ["häst", "hast", "horse", "zebra"], category: "horse" },
  { key: "bird", label: "Fågel", aliases: ["fågel", "fagel", "bird", "örn", "uggla", "anka", "tupp", "svan", "pingvin"], category: "bird" },
  { key: "lion", label: "Lejon", aliases: ["lejon", "lion"], category: "lion" },
  { key: "pig", label: "Gris / vildsvin", aliases: ["gris", "svin", "vildsvin", "galt", "pig", "boar", "wild boar"], category: "pig" },
  { key: "deer", label: "Hjortdjur", aliases: ["hjort", "hjortdjur", "rådjur", "deer", "stag"], category: "deer" },
  { key: "fox", label: "Räv", aliases: ["räv", "rav", "fox"], category: "fox" },
  { key: "insect", label: "Insekt", aliases: ["insekt", "fjäril", "fjaril", "bi", "skalbagge", "butterfly", "bee", "moth"], sourceCodes: ["butterfly", "bee", "honey bee", "moth", "dragonfly", "beetle", "ladybug", "ant", "grasshopper", "caterpillar"] },
  { key: "canid", label: "Hunddjur", aliases: ["hund", "varg", "hunddjur", "dog", "wolf"], sourceCodes: ["dog", "wolf"] },
  { key: "feline", label: "Kattdjur", aliases: ["katt", "lodjur", "tiger", "kattdjur", "cat", "lynx"], sourceCodes: ["cat", "lynx", "tiger"] },
  { key: "rabbit", label: "Kanindjur", aliases: ["kanin", "hare", "kanindjur", "rabbit"], sourceCodes: ["rabbit"] },
  { key: "goat-sheep", label: "Get / får", aliases: ["get", "får", "far", "bagge", "goat", "sheep", "ram"], sourceCodes: ["goat", "sheep", "ram"] },
  { key: "cattle", label: "Nötkreatur", aliases: ["tjur", "ko", "oxe", "nötkreatur", "notkreatur", "bull", "cow", "ox"], sourceCodes: ["bull", "cow", "ox", "water buffalo"] },
  { key: "elephant", label: "Elefant", aliases: ["elefant", "elephant"], sourceCodes: ["elephant"] },
  { key: "frog", label: "Groddjur", aliases: ["groda", "groddjur", "frog"], sourceCodes: ["frog"] },
  { key: "octopus", label: "Bläckfisk", aliases: ["bläckfisk", "blackfisk", "octopus"], sourceCodes: ["octopus"] },
  { key: "snake", label: "Orm", aliases: ["orm", "snake"], sourceCodes: ["snake"] },
  { key: "bear", label: "Björndjur", aliases: ["björn", "bjorn", "björndjur", "bear"], sourceCodes: ["bear"] },
];
