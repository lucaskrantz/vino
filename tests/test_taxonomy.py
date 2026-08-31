from vino_animals.taxonomy import animal_categories, normalize_animal_name


def test_name_normalization_preserves_specific_animals() -> None:
    assert normalize_animal_name("Foxes") == "fox"
    assert normalize_animal_name("Red Fox") == "red fox"
    assert normalize_animal_name("Stags") == "stag"
    assert normalize_animal_name("Chreub") == "cherub"


def test_frontend_categories_group_names_without_replacing_them() -> None:
    names = {"red fox", "wild boar", "eagle"}

    assert animal_categories(names, {"mammal", "bird"}) == {"fox", "pig", "bird"}
    assert names == {"red fox", "wild boar", "eagle"}


def test_frontend_categories_include_cervids_and_equids() -> None:
    assert animal_categories({"moose", "donkey", "winged lion"}, {"mammal"}) == {
        "deer",
        "horse",
        "lion",
    }
