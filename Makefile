.PHONY: install test lint format build demo

install:
	python -m pip install -e '.[vision,dev]'

test:
	pytest

lint:
	ruff check .
	python -m compileall -q src tests

format:
	ruff format .
	ruff check --fix .

build:
	python -m build

# Offline smoke test using one synthetic API-shaped fixture.
demo:
	vino ingest --source-file tests/fixtures/systembolaget.ndjson
