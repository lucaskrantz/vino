"""Local browser-based human review for vision classifications."""

# The embedded browser UI intentionally contains long CSS/JavaScript lines.
# ruff: noqa: E501

from __future__ import annotations

import csv
import json
import mimetypes
import threading
import webbrowser
from datetime import UTC, datetime
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from tempfile import NamedTemporaryFile
from typing import Any
from urllib.parse import parse_qs, quote, urlparse

from .models import AnimalPresence, ManualReview, TaxonGroup
from .review import REVIEW_QUEUE_FIELDS
from .scores import read_manual_reviews
from .taxonomy import normalize_animal_name

REVIEW_FIELDS = [
    "product_id",
    "image_index",
    "image_sha256",
    "animal_presence",
    "animal_names",
    "taxon_groups",
    "reviewer",
    "reviewed_at",
    "notes",
]

_REVIEW_HTML = r"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vino label review</title>
<style>
:root { color-scheme: light; font-family: ui-sans-serif, system-ui, sans-serif; }
* { box-sizing: border-box; }
body { margin: 0; color: #202124; background: #f4f1ed; }
header { padding: 16px 24px; background: #30241f; color: #fff; display: flex;
  justify-content: space-between; gap: 16px; align-items: center; }
h1 { margin: 0; font-size: 20px; font-weight: 650; }
#progress { font-variant-numeric: tabular-nums; color: #eadfd8; }
main { max-width: 1500px; margin: 0 auto; padding: 18px; }
.toolbar { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 14px; }
button, select, input, textarea { font: inherit; }
button { border: 1px solid #b9aaa2; border-radius: 7px; padding: 8px 12px; cursor: pointer;
  background: #fff; color: #30241f; }
button:hover { background: #f0e9e4; }
button.primary { background: #7d3f35; color: white; border-color: #7d3f35; }
button.primary:hover { background: #633029; }
button:disabled { opacity: .5; cursor: not-allowed; }
select, input, textarea { border: 1px solid #c9beb8; border-radius: 6px; padding: 8px; background: #fff; }
.layout { display: grid; grid-template-columns: minmax(300px, 1.15fr) minmax(320px, .85fr); gap: 18px; }
.card { background: #fff; border: 1px solid #ddd2cb; border-radius: 10px; padding: 16px; box-shadow: 0 2px 7px #321b1110; }
.image-card { min-height: 650px; display: flex; align-items: center; justify-content: center; background: #e8e2dd; }
#product-image { max-width: 100%; max-height: 78vh; object-fit: contain; border-radius: 5px; }
.placeholder { color: #766b65; text-align: center; padding: 30px; }
.section { margin: 0 0 16px; }
.section h2 { font-size: 14px; margin: 0 0 8px; color: #6b5b53; text-transform: uppercase; letter-spacing: .05em; }
.ai-box { background: #f7f3f0; border-radius: 7px; padding: 11px; line-height: 1.45; }
.ai-box p { margin: 4px 0; }
.muted { color: #756961; font-size: 13px; }
.presence { display: flex; gap: 8px; flex-wrap: wrap; }
.presence label { border: 1px solid #c9beb8; border-radius: 7px; padding: 8px 12px; cursor: pointer; }
.presence input { accent-color: #7d3f35; }
.presence label:has(input:checked) { background: #f0ddd8; border-color: #7d3f35; }
.field { display: block; margin-top: 12px; }
.field > span { display: block; font-weight: 600; font-size: 13px; margin-bottom: 5px; }
.field input, .field textarea { width: 100%; }
.field textarea { min-height: 72px; resize: vertical; }
.taxonomy { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 5px 12px; }
.taxonomy label { font-size: 13px; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
#message { min-height: 1.4em; margin: 8px 0; color: #633029; }
.help { color: #756961; font-size: 12px; margin-top: 10px; }
@media (max-width: 850px) { .layout { grid-template-columns: 1fr; } .image-card { min-height: 360px; }
  header { align-items: flex-start; flex-direction: column; } }
</style>
</head>
<body>
<header><h1>Vino label review</h1><div id="progress">Loading…</div></header>
<main>
  <div class="toolbar">
    <label>Show <select id="filter"><option value="unreviewed">Unreviewed</option>
      <option value="all">All queue rows</option><option value="present">AI present</option>
      <option value="uncertain">AI uncertain</option></select></label>
    <button id="previous">← Previous</button><button id="next">Next →</button>
    <span id="position" class="muted"></span>
  </div>
  <div class="layout">
    <section class="card image-card"><img id="product-image" alt="Wine product image"><div id="image-placeholder" class="placeholder">No image</div></section>
    <section class="card">
      <div class="section"><h2>AI proposal</h2><div id="ai-proposal" class="ai-box"></div></div>
      <div class="section"><h2>Your decision</h2>
        <div class="presence">
          <label><input type="radio" name="presence" value="present"> Present</label>
          <label><input type="radio" name="presence" value="absent"> Absent</label>
          <label><input type="radio" name="presence" value="uncertain"> Uncertain</label>
        </div>
        <label class="field"><span>Animal names (comma or semicolon separated)</span>
          <input id="animal-names" autocomplete="off" placeholder="e.g. lion; bird"></label>
        <div class="field"><span>Taxonomic groups</span><div id="taxonomy" class="taxonomy"></div></div>
        <label class="field"><span>Reviewer</span><input id="reviewer" autocomplete="name"></label>
        <label class="field"><span>Notes</span><textarea id="notes" placeholder="Optional review rationale"></textarea></label>
      </div>
      <div id="message"></div>
      <div class="actions"><button id="save" class="primary">Save review</button>
        <button id="save-next" class="primary">Save &amp; next →</button></div>
      <div class="help">Shortcuts: 1 = present, 2 = absent, 3 = uncertain, N = next, P = previous, S = save.</div>
    </section>
  </div>
</main>
<script>
const groups = ["mammal", "bird", "fish", "reptile", "amphibian", "insect", "arachnid", "crustacean", "mollusk", "other_invertebrate", "mythical_or_heraldic", "unknown"];
let rows = [], index = 0, filter = "unreviewed", defaultReviewer = "";
const $ = id => document.getElementById(id);
function esc(value) { const d = document.createElement("div"); d.textContent = value ?? ""; return d.innerHTML; }
function splitNames(value) { return (value || "").split(/[;,]/).map(x => x.trim()).filter(Boolean); }
function filtered() {
  return rows.filter(r => filter === "all" || (filter === "unreviewed" && !r.reviewed) ||
    (filter === "present" && r.animal_presence === "present") ||
    (filter === "uncertain" && r.animal_presence === "uncertain"));
}
function setMessage(text, error=false) { $("message").textContent = text || ""; $("message").style.color = error ? "#a12b20" : "#386641"; }
function current() { const list = filtered(); return list[index] || null; }
function renderGroups(selected) {
  $("taxonomy").innerHTML = groups.map(g => `<label><input type="checkbox" value="${g}" ${selected.includes(g) ? "checked" : ""}> ${g.replaceAll("_", " ")}</label>`).join("");
}
function render() {
  const list = filtered(); if (index >= list.length) index = Math.max(0, list.length - 1);
  const row = list[index]; $("progress").textContent = `${rows.filter(r => r.reviewed).length} / ${rows.length} reviewed`;
  $("position").textContent = row ? `${index + 1} / ${list.length}` : "Nothing in this view";
  $("previous").disabled = !row || index === 0; $("next").disabled = !row || index >= list.length - 1;
  if (!row) { $("product-image").style.display = "none"; $("image-placeholder").style.display = "block"; $("image-placeholder").textContent = "No rows in this view"; return; }
  $("product-image").src = row.image_url; $("product-image").style.display = "block"; $("image-placeholder").style.display = "none";
  const detections = row.animal_names || "none";
  $("ai-proposal").innerHTML = `<p><b>${esc(row.product_id)}</b> · image ${esc(row.image_index)}</p><p><b>Presence:</b> ${esc(row.animal_presence)} · <b>Confidence:</b> ${esc(row.ai_confidence)}</p><p><b>Names:</b> ${esc(detections)}</p><p><b>Reason:</b> ${esc(row.queue_reason)}</p><p><b>Evidence:</b> ${esc(row.ai_evidence || "none")}</p><p class="muted">Model ${esc(row.ai_model)} · prompt ${esc(row.ai_prompt_version)} · visibility ${esc(row.ai_label_visibility)}</p>`;
  const review = row.review || {};
  const presence = review.animal_presence || row.animal_presence || "uncertain";
  document.querySelectorAll('input[name="presence"]').forEach(x => x.checked = x.value === presence);
  $("animal-names").value = review.animal_names || row.animal_names || "";
  renderGroups(splitNames(review.taxon_groups || row.taxon_groups || ""));
  $("reviewer").value = review.reviewer || defaultReviewer;
  $("notes").value = review.notes || "";
  setMessage(row.reviewed ? `Previously reviewed ${review.reviewed_at || ""}` : "");
}
function move(delta) { const list = filtered(); index = Math.min(Math.max(index + delta, 0), Math.max(0, list.length - 1)); render(); }
async function save(andNext=false) {
  const row = current(); if (!row) return;
  const presence = document.querySelector('input[name="presence"]:checked')?.value;
  if (!presence) { setMessage("Choose present, absent, or uncertain.", true); return; }
  let names = splitNames($("animal-names").value);
  let taxon_groups = [...document.querySelectorAll("#taxonomy input:checked")].map(x => x.value);
  if (presence === "absent") { names = []; taxon_groups = []; }
  const payload = { product_id: row.product_id, image_index: Number(row.image_index), image_sha256: row.image_sha256,
    animal_presence: presence, animal_names: names, taxon_groups, reviewer: $("reviewer").value.trim(), notes: $("notes").value };
  setMessage("Saving…");
  try {
    const response = await fetch("/api/review", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(payload)});
    const data = await response.json(); if (!response.ok) throw new Error(data.error || "Save failed");
    row.review = data.review; row.reviewed = true; setMessage("Saved.");
    if (andNext) move(1); else render();
  } catch (e) { setMessage(e.message, true); }
}
$("filter").addEventListener("change", e => { filter = e.target.value; index = 0; render(); });
$("previous").addEventListener("click", () => move(-1)); $("next").addEventListener("click", () => move(1));
$("save").addEventListener("click", () => save(false)); $("save-next").addEventListener("click", () => save(true));
document.addEventListener("keydown", e => { if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;
  if (e.key === "1") document.querySelector('input[value="present"]').click();
  else if (e.key === "2") document.querySelector('input[value="absent"]').click();
  else if (e.key === "3") document.querySelector('input[value="uncertain"]').click();
  else if (e.key.toLowerCase() === "n") move(1); else if (e.key.toLowerCase() === "p") move(-1); else if (e.key.toLowerCase() === "s") save(false);
});
(async function init() { const response = await fetch("/api/queue"); const data = await response.json(); rows = data.rows; defaultReviewer = data.default_reviewer || ""; render(); })().catch(e => setMessage(e.message, true));
</script>
</body>
</html>"""


class ReviewStore:
    """Thread-safe queue and manual-review persistence for the local app."""

    def __init__(self, queue_path: Path, reviews_path: Path, root: Path) -> None:
        self.queue_path = queue_path
        self.reviews_path = reviews_path
        self.root = root.resolve()
        self._lock = threading.Lock()
        self.rows = self._read_queue()
        self.queue_keys = {(row["product_id"], int(row["image_index"])) for row in self.rows}
        self.reviews = read_manual_reviews(reviews_path)

    def _read_queue(self) -> list[dict[str, str]]:
        with self.queue_path.open(encoding="utf-8-sig", newline="") as handle:
            reader = csv.DictReader(handle)
            missing = set(REVIEW_QUEUE_FIELDS) - set(reader.fieldnames or [])
            if missing:
                raise ValueError(f"{self.queue_path} is missing columns: {', '.join(sorted(missing))}")
            rows = [dict(row) for row in reader]
        if not rows:
            raise ValueError(f"{self.queue_path} contains no review rows")
        return rows

    def _image_path(self, row: dict[str, str]) -> Path:
        path = Path(row["local_path"])
        resolved = (self.root / path).resolve() if not path.is_absolute() else path.resolve()
        if resolved != self.root and self.root not in resolved.parents:
            raise ValueError(f"Image path escapes project root: {path}")
        return resolved

    def snapshot(self) -> dict[str, Any]:
        with self._lock:
            rows: list[dict[str, Any]] = []
            for row in self.rows:
                key = (row["product_id"], int(row["image_index"]))
                review = self.reviews.get(key)
                item = dict(row)
                item["image_url"] = "/image?path=" + quote(row["local_path"], safe="")
                item["reviewed"] = review is not None
                item["review"] = _review_json(review) if review else None
                rows.append(item)
            return {
                "rows": rows,
                "default_reviewer": _default_reviewer(),
            }

    def image_bytes(self, requested_path: str) -> tuple[bytes, str]:
        requested = Path(requested_path)
        with self._lock:
            allowed = {self._image_path(row) for row in self.rows}
        resolved = (self.root / requested).resolve() if not requested.is_absolute() else requested.resolve()
        if resolved not in allowed:
            raise FileNotFoundError(requested_path)
        data = resolved.read_bytes()
        content_type = mimetypes.guess_type(resolved.name)[0] or "application/octet-stream"
        return data, content_type

    def save(self, payload: dict[str, Any]) -> ManualReview:
        try:
            key = (str(payload["product_id"]), int(payload["image_index"]))
            image_sha256 = str(payload["image_sha256"])
            presence = AnimalPresence(str(payload["animal_presence"]))
            names = [normalize_animal_name(str(value)) for value in payload.get("animal_names", [])]
            groups = [TaxonGroup(str(value)) for value in payload.get("taxon_groups", [])]
            reviewer = str(payload["reviewer"]).strip()
            notes = str(payload.get("notes", "")).strip()
        except (KeyError, TypeError, ValueError) as exc:
            raise ValueError(f"Invalid review fields: {exc}") from exc
        with self._lock:
            if key not in self.queue_keys:
                raise ValueError("This image is not in the loaded review queue")
            queue_row = next(
                row for row in self.rows
                if (row["product_id"], int(row["image_index"])) == key
            )
            if image_sha256 != queue_row["image_sha256"]:
                raise ValueError("Image hash does not match the review queue")
            review = ManualReview(
                product_id=key[0],
                image_index=key[1],
                image_sha256=image_sha256,
                animal_presence=presence,
                animal_names=list(dict.fromkeys(names)),
                taxon_groups=list(dict.fromkeys(groups)),
                reviewer=reviewer,
                reviewed_at=datetime.now(UTC),
                notes=notes,
            )
            self.reviews[key] = review
            self._write_reviews()
            return review

    def _write_reviews(self) -> None:
        self.reviews_path.parent.mkdir(parents=True, exist_ok=True)
        with NamedTemporaryFile(
            "w", encoding="utf-8", newline="", dir=self.reviews_path.parent,
            prefix=f".{self.reviews_path.name}.", delete=False,
        ) as handle:
            temporary = Path(handle.name)
            writer = csv.DictWriter(handle, fieldnames=REVIEW_FIELDS)
            writer.writeheader()
            for review in self.reviews.values():
                writer.writerow(_review_row(review))
        temporary.replace(self.reviews_path)


def _default_reviewer() -> str:
    import getpass

    return getpass.getuser()


def _review_row(review: ManualReview) -> dict[str, str]:
    return {
        "product_id": review.product_id,
        "image_index": str(review.image_index),
        "image_sha256": review.image_sha256,
        "animal_presence": str(review.animal_presence),
        "animal_names": ";".join(review.animal_names),
        "taxon_groups": ";".join(str(group) for group in review.taxon_groups),
        "reviewer": review.reviewer,
        "reviewed_at": review.reviewed_at.isoformat(),
        "notes": review.notes,
    }


def _review_json(review: ManualReview | None) -> dict[str, Any] | None:
    if review is None:
        return None
    return _review_row(review)


class _ReviewServer(HTTPServer):
    def __init__(self, address: tuple[str, int], store: ReviewStore) -> None:
        super().__init__(address, _ReviewHandler)
        self.store = store


class _ReviewHandler(BaseHTTPRequestHandler):
    server: _ReviewServer

    def log_message(self, format: str, *args: object) -> None:
        print(f"review-app: {format % args}")

    def _send_json(self, payload: Any, status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        if parsed.path == "/":
            body = _REVIEW_HTML.encode("utf-8")
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        if parsed.path == "/api/queue":
            self._send_json(self.server.store.snapshot())
            return
        if parsed.path == "/image":
            values = parse_qs(parsed.query).get("path", [])
            if not values:
                self._send_json({"error": "Missing image path"}, HTTPStatus.BAD_REQUEST)
                return
            try:
                body, content_type = self.server.store.image_bytes(values[0])
            except (FileNotFoundError, ValueError):
                self._send_json({"error": "Image not found"}, HTTPStatus.NOT_FOUND)
                return
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()
            self.wfile.write(body)
            return
        self._send_json({"error": "Not found"}, HTTPStatus.NOT_FOUND)

    def do_POST(self) -> None:  # noqa: N802
        if urlparse(self.path).path != "/api/review":
            self._send_json({"error": "Not found"}, HTTPStatus.NOT_FOUND)
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 64 * 1024:
                raise ValueError("Invalid request size")
            payload = json.loads(self.rfile.read(length))
            review = self.server.store.save(payload)
        except (ValueError, TypeError, json.JSONDecodeError) as exc:
            self._send_json({"error": str(exc)}, HTTPStatus.BAD_REQUEST)
            return
        self._send_json({"review": _review_json(review)})


def serve_review_app(
    queue_path: Path,
    reviews_path: Path,
    *,
    host: str = "127.0.0.1",
    port: int = 8765,
    open_browser: bool = False,
    root: Path = Path("."),
) -> None:
    """Serve the local review UI until interrupted."""
    store = ReviewStore(queue_path, reviews_path, root)
    server = _ReviewServer((host, port), store)
    url = f"http://{host}:{port}/"
    print(f"Review {len(store.rows)} queued images at {url}")
    print(f"Saving completed reviews to {reviews_path}")
    if open_browser:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nReview app stopped.")
    finally:
        server.server_close()