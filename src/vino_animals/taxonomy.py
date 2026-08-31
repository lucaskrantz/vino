"""Deterministic cleanup layered on top of model-proposed animal labels."""

from __future__ import annotations

import re

_ALIASES = {
    "birds": "bird",
    "butterflies": "butterfly",
    "cats": "cat",
    "cattle": "cow",
    "dogs": "dog",
    "fishes": "fish",
    "foxes": "fox",
    "geese": "goose",
    "horses": "horse",
    "lions": "lion",
    "owls": "owl",
    "pigs": "pig",
    "rabbits": "rabbit",
    "roosters": "rooster",
    "stags": "stag",
    "wolves": "wolf",
    "chreub": "cherub",
}

# Presentation categories intentionally sit beside, rather than replace, the
# specific normalized animal name. This keeps distinctions such as red fox and
# eagle available for later exploration while providing stable top-level views.
_ANIMAL_CATEGORY_NAMES = {
    "lion": {"lion", "winged lion"},
    "pig": {"pig", "boar", "wild boar", "warthog"},
    "deer": {"deer", "red deer", "stag", "moose"},
    "horse": {"horse", "donkey", "zebra"},
    "fox": {"fox", "red fox"},
}


def normalize_animal_name(value: str) -> str:
    """Normalize spelling and plurality without erasing specific-animal detail."""
    name = value.casefold().strip()
    name = re.sub(r"[_/]+", " ", name)
    name = re.sub(r"[^a-z0-9 -]", "", name)
    name = re.sub(r"\s+", " ", name).strip(" -")
    return _ALIASES.get(name, name or "unknown")


def animal_categories(animal_names: set[str], taxon_groups: set[str]) -> set[str]:
    """Return stable frontend categories while preserving the supplied names."""
    categories = {
        category
        for category, category_names in _ANIMAL_CATEGORY_NAMES.items()
        if animal_names & category_names
    }
    if "bird" in taxon_groups:
        categories.add("bird")
    return categories
