#!/usr/bin/env python3
"""Extract citation metadata from public/papers/*.pdf into data/papers.json.

Strategy:
1. Keep existing curated data/papers.json entries (never wipe title/authors/doi).
2. Read PDF info + first pages for DOI / title hints.
3. Enrich via Crossref when a DOI is found.
4. Fall back to filename year + PDF metadata for book chapters without DOI.

Usage:
  python scripts/extract-paper-metadata.py
  python scripts/extract-paper-metadata.py --dry-run
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PAPERS_DIR = ROOT / "public" / "papers"
OUT_PATH = ROOT / "data" / "papers.json"

DOI_RE = re.compile(
    r"\b(10\.\d{4,9}/[-._;()/:A-Z0-9]+)",
    re.IGNORECASE,
)
YEAR_RE = re.compile(r"\b((?:19|20)\d{2})\b")
CROSSREF_MAILTO = "webmaster@rummerlab.com"
USER_AGENT = f"RummerLabPaperCatalog/1.0 (mailto:{CROSSREF_MAILTO})"


def clean_doi(raw: str) -> str:
    doi = raw.strip().rstrip(".,;)")
    doi = re.sub(r"^https?://(dx\.)?doi\.org/", "", doi, flags=re.IGNORECASE)
    return doi


def year_from_filename(filename: str) -> int | None:
    match = YEAR_RE.search(filename)
    return int(match.group(1)) if match else None


def extract_from_pdf(path: Path) -> dict:
    """Return best-effort fields from PDF metadata + first pages."""
    result: dict = {}
    try:
        reader = PdfReader(str(path))
    except Exception as exc:  # noqa: BLE001
        result["error"] = f"open failed: {exc}"
        return result

    meta = reader.metadata
    if meta:
        title = getattr(meta, "title", None) or meta.get("/Title")
        author = getattr(meta, "author", None) or meta.get("/Author")
        subject = getattr(meta, "subject", None) or meta.get("/Subject")
        if title and str(title).strip():
            result["pdf_title"] = str(title).strip()
        if author and str(author).strip():
            # Often a single string; split later if needed
            result["pdf_author"] = str(author).strip()
        if subject and str(subject).strip():
            result["pdf_subject"] = str(subject).strip()

    texts: list[str] = []
    for i, page in enumerate(reader.pages[:3]):
        try:
            texts.append(page.extract_text() or "")
        except Exception:  # noqa: BLE001
            continue
        if i >= 2:
            break
    blob = "\n".join(texts)
    result["text_sample"] = blob[:8000]

    dois = [clean_doi(m.group(1)) for m in DOI_RE.finditer(blob)]
    # Prefer shorter plausible DOIs first; drop trailing junk variants
    uniq: list[str] = []
    for d in dois:
        d = d.split()[0]
        if d.lower() not in {u.lower() for u in uniq}:
            uniq.append(d)
    if uniq:
        # Prefer the first DOI that looks like a journal article DOI
        result["doi_candidates"] = uniq[:5]
        result["doi"] = uniq[0]

    return result


def crossref_lookup(doi: str) -> dict | None:
    url = f"https://api.crossref.org/works/{urllib.parse.quote(doi)}"
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        if exc.code == 404:
            return None
        print(f"  Crossref HTTP {exc.code} for {doi}", file=sys.stderr)
        return None
    except Exception as exc:  # noqa: BLE001
        print(f"  Crossref error for {doi}: {exc}", file=sys.stderr)
        return None

    msg = payload.get("message") or {}
    title_list = msg.get("title") or []
    title = title_list[0] if title_list else None

    authors: list[str] = []
    for a in msg.get("author") or []:
        given = (a.get("given") or "").strip()
        family = (a.get("family") or "").strip()
        name = f"{given} {family}".strip() or (a.get("name") or "").strip()
        if name:
            authors.append(name)

    container = (msg.get("container-title") or [None])[0]
    published = None
    for key in ("published-print", "published-online", "created"):
        parts = (msg.get(key) or {}).get("date-parts") or []
        if parts and parts[0]:
            ymd = parts[0]
            published = "-".join(f"{n:02d}" if i else str(n) for i, n in enumerate(ymd))
            if len(ymd) == 1:
                published = str(ymd[0])
            break

    year = None
    if published:
        year = int(str(published)[:4]) if str(published)[:4].isdigit() else None

    abstract = msg.get("abstract")
    if isinstance(abstract, str):
        abstract = re.sub(r"<[^>]+>", "", abstract).strip()
        if not abstract:
            abstract = None

    record: dict = {}
    if title:
        record["title"] = title
    if authors:
        record["authors"] = authors
    if year:
        record["year"] = year
    if container:
        # Book chapters use container-title for book; articles for journal
        typ = (msg.get("type") or "").lower()
        if "book" in typ or "chapter" in typ:
            record["book"] = container
        else:
            record["journal"] = container
    if doi:
        record["doi"] = clean_doi(doi)
    if published:
        record["published"] = published
    if msg.get("volume"):
        record["volume"] = str(msg["volume"])
    if msg.get("issue"):
        record["issue"] = str(msg["issue"])
    page = msg.get("page")
    if page:
        record["pages"] = str(page)
    if abstract:
        record["abstract"] = abstract
    return record or None


def authors_from_pdf_author(raw: str) -> list[str]:
    # "A; B; C" or "A, B, and C"
    if ";" in raw:
        parts = [p.strip() for p in raw.split(";") if p.strip()]
        if len(parts) > 1:
            return parts
    if " and " in raw.lower() and len(raw) < 200:
        # crude split
        chunks = re.split(r",\s*|\s+and\s+", raw, flags=re.IGNORECASE)
        parts = [c.strip() for c in chunks if c.strip()]
        if 1 < len(parts) <= 20:
            return parts
    return [raw]


def merge_record(existing: dict | None, extracted: dict, crossref: dict | None) -> dict:
    """Prefer curated existing fields, then Crossref, then PDF extraction."""
    out: dict = {}
    sources = [existing or {}, crossref or {}]

    def pick(key: str):
        for src in sources:
            val = src.get(key)
            if val not in (None, "", [], {}):
                return val
        return None

    title = pick("title") or extracted.get("pdf_title")
    authors = pick("authors")
    if not authors and extracted.get("pdf_author"):
        authors = authors_from_pdf_author(extracted["pdf_author"])

    doi = pick("doi") or extracted.get("doi")
    year = pick("year") or (crossref or {}).get("year")
    journal = pick("journal") or (crossref or {}).get("journal")
    book = pick("book") or (crossref or {}).get("book")
    abstract = pick("abstract") or (crossref or {}).get("abstract")
    published = pick("published") or (crossref or {}).get("published")
    volume = pick("volume") or (crossref or {}).get("volume")
    issue = pick("issue") or (crossref or {}).get("issue")
    pages = pick("pages") or (crossref or {}).get("pages")

    if title:
        out["title"] = title
    if authors:
        out["authors"] = authors
    if year:
        out["year"] = int(year)
    if journal:
        out["journal"] = journal
    if book:
        out["book"] = book
    if doi:
        out["doi"] = clean_doi(str(doi))
    if abstract:
        out["abstract"] = abstract
    if published:
        out["published"] = published
    if volume:
        out["volume"] = str(volume)
    if issue:
        out["issue"] = str(issue)
    if pages:
        out["pages"] = str(pages)

    return out


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--sleep", type=float, default=0.35, help="Delay between Crossref calls")
    args = parser.parse_args()

    existing: dict[str, dict] = {}
    if OUT_PATH.exists():
        existing = json.loads(OUT_PATH.read_text(encoding="utf-8"))

    pdfs = sorted(PAPERS_DIR.glob("*.pdf"), key=lambda p: p.name.lower())
    if not pdfs:
        print(f"No PDFs in {PAPERS_DIR}", file=sys.stderr)
        return 1

    catalog: dict[str, dict] = {}
    stats = {"total": len(pdfs), "with_doi": 0, "with_title": 0, "crossref": 0, "errors": 0}

    for path in pdfs:
        name = path.name
        print(f"Processing {name}...")
        extracted = extract_from_pdf(path)
        if extracted.get("error"):
            print(f"  ERROR: {extracted['error']}", file=sys.stderr)
            stats["errors"] += 1

        prev = existing.get(name)
        doi = (prev or {}).get("doi") or extracted.get("doi")
        crossref = None
        if doi:
            # Try primary + candidates until Crossref hits
            candidates = [doi] + [
                c for c in extracted.get("doi_candidates", []) if c.lower() != str(doi).lower()
            ]
            for candidate in candidates:
                crossref = crossref_lookup(candidate)
                time.sleep(args.sleep)
                if crossref:
                    doi = candidate
                    extracted["doi"] = candidate
                    stats["crossref"] += 1
                    break

        # Filename year fallback
        if not (prev or {}).get("year") and not (crossref or {}).get("year"):
            y = year_from_filename(name)
            if y:
                extracted["year_from_filename"] = y

        record = merge_record(prev, extracted, crossref)
        if "year" not in record and extracted.get("year_from_filename"):
            record["year"] = extracted["year_from_filename"]

        # Require at least a title for a useful catalog entry; use filename stem as last resort
        if "title" not in record:
            record["title"] = path.stem

        if "doi" in record:
            stats["with_doi"] += 1
        if "title" in record:
            stats["with_title"] += 1

        catalog[name] = record

    # Stable key order: newest year first, then filename
    def sort_key(item: tuple[str, dict]):
        filename, rec = item
        return (-(rec.get("year") or 0), filename.lower())

    ordered = dict(sorted(catalog.items(), key=sort_key))

    print(
        f"\nDone: {stats['total']} PDFs, "
        f"{stats['with_title']} titles, {stats['with_doi']} DOIs, "
        f"{stats['crossref']} Crossref hits, {stats['errors']} open errors"
    )

    if args.dry_run:
        print(json.dumps(ordered, indent=2, ensure_ascii=False)[:2000])
        return 0

    OUT_PATH.write_text(
        json.dumps(ordered, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {OUT_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
