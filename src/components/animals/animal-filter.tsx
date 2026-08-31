"use client";

import { AnimalIllustration } from "@/components/animals/animal-illustration";
import { animalKeys, animalMeta } from "@/components/animals/animal-meta";
import type { AnimalKey } from "@/lib/data/contracts";

export type AnimalFilterValue = AnimalKey | "all";

interface AnimalFilterProps {
  value: AnimalFilterValue;
  onValueChange: (value: AnimalFilterValue) => void;
  includeAll?: boolean;
  label?: string;
}

export function AnimalFilter({
  value,
  onValueChange,
  includeAll = true,
  label = "Välj djur",
}: AnimalFilterProps) {
  return (
    <div className="animal-filter" role="group" aria-label={label}>
      {includeAll ? (
        <button
          type="button"
          className="animal-filter__item animal-filter__item--all"
          data-state={value === "all" ? "active" : "inactive"}
          aria-pressed={value === "all"}
          onClick={() => onValueChange("all")}
        >
          <span className="animal-filter__all-mark" aria-hidden="true">06</span>
          <span>Alla</span>
        </button>
      ) : null}
      {animalKeys.map((animal) => (
        <button
          type="button"
          className="animal-filter__item"
          data-state={value === animal ? "active" : "inactive"}
          aria-pressed={value === animal}
          onClick={() => onValueChange(animal)}
          key={animal}
        >
          <AnimalIllustration animal={animal} className="animal-filter__icon" />
          <span>{animalMeta[animal].label}</span>
        </button>
      ))}
    </div>
  );
}
