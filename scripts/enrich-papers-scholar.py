#!/usr/bin/env python3
"""Enrich data/papers.json: clean titles, fix chem formulas, match Google Scholar pub IDs.

Usage:
  python scripts/enrich-papers-scholar.py
"""

from __future__ import annotations

import html
import json
import re
import sys
import urllib.request
from difflib import SequenceMatcher
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAPERS_PATH = ROOT / "data" / "papers.json"
SCHOLAR_ID = "ynWS968AAAAJ"
API = f"https://api.rummerlab.com/scholar/{SCHOLAR_ID}/publications?limit=500"
UA = "RummerLabPaperCatalog/1.0 (mailto:webmaster@rummerlab.com)"

CHEM_PATTERNS = [
    (re.compile(r"\bCO\s*2\b", re.I), "CO₂"),
    (re.compile(r"\bO\s*2\b"), "O₂"),
    (re.compile(r"\bN\s*2\b"), "N₂"),
    (re.compile(r"\bH\s*2\b"), "H₂"),
    (re.compile(r"\bPO\s*2\b", re.I), "PO₂"),
    (re.compile(r"\bPCO\s*2\b", re.I), "PCO₂"),
    (re.compile(r"\bNH\s*3\b", re.I), "NH₃"),
    (re.compile(r"\bCO<sub>\s*2\s*</sub>", re.I), "CO₂"),
    (re.compile(r"\bO<sub>\s*2\s*</sub>", re.I), "O₂"),
    (re.compile(r"\bN<sub>\s*2\s*</sub>", re.I), "N₂"),
    (re.compile(r"<sub>\s*2\s*</sub>", re.I), "₂"),
    (re.compile(r"<sub>\s*3\s*</sub>", re.I), "₃"),
]

# Known RummerLab taxa (longest first) for italicization when Crossref omitted <i>
KNOWN_SPECIES = sorted(
    {
        "Hemiscyllium ocellatum",
        "Carcharhinus melanopterus",
        "Chiloscyllium plagiosum",
        "Taeniura lymma",
        "Lates calcarifer",
        "Scolopsis bilineata",
        "Cheilodipterus quinquelineatus",
        "Chromis atripectoralis",
        "Oncorhynchus mykiss",
        "Danio rerio",
    },
    key=len,
    reverse=True,
)


def fetch_scholar_pubs() -> list[dict]:
    req = urllib.request.Request(API, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        payload = json.loads(resp.read().decode("utf-8"))
    return list(payload.get("publications") or [])


def strip_tags_keep_i(text: str) -> str:
    """Decode entities, keep only <i>/<em>, normalize to <i>, drop other tags."""
    text = html.unescape(text or "")
    # Normalize em → i
    text = re.sub(r"</?em\b[^>]*>", lambda m: "<i>" if not m.group(0).startswith("</") else "</i>", text, flags=re.I)
    # Convert existing <i ...> to <i>
    text = re.sub(r"<i\b[^>]*>", "<i>", text, flags=re.I)
    text = re.sub(r"</i\s*>", "</i>", text, flags=re.I)
    # Drop every other tag
    text = re.sub(r"<(?!/?i\b)[^>]+>", "", text)
    # Collapse whitespace around tags and generally
    text = re.sub(r"\s+</i>", "</i>", text)
    text = re.sub(r"<i>\s+", "<i>", text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\s+([,.;:!?])", r"\1", text)
    return text.strip()


def fix_chem(text: str) -> str:
    for pattern, repl in CHEM_PATTERNS:
        text = pattern.sub(repl, text)
    return text


def italicize_known_species(text: str) -> str:
    # Protect existing <i>...</i>
    placeholders: dict[str, str] = {}

    def stash(match: re.Match[str]) -> str:
        key = f"__I{len(placeholders)}__"
        placeholders[key] = match.group(0)
        return key

    protected = re.sub(r"<i>.*?</i>", stash, text, flags=re.I | re.S)

    for species in KNOWN_SPECIES:
        escaped = re.escape(species)
        pattern = re.compile(rf"(?<![A-Za-z])({escaped})(?![A-Za-z])", re.I)

        def wrap(m: re.Match[str]) -> str:
            return f"<i>{m.group(1)}</i>"

        protected = pattern.sub(wrap, protected)

    for key, original in placeholders.items():
        protected = protected.replace(key, original)
    return protected


def clean_title(title: str) -> str:
    title = strip_tags_keep_i(title)
    title = fix_chem(title)
    title = italicize_known_species(title)
    # Tidy spaces inside leftover tags after chem
    title = re.sub(r"\s{2,}", " ", title).strip()
    return title


def normalize_for_match(title: str) -> str:
    t = re.sub(r"<[^>]+>", "", title or "")
    t = html.unescape(t).lower()
    t = re.sub(r"[^a-z0-9]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def best_scholar_match(paper: dict, pubs: list[dict]) -> dict | None:
    doi = (paper.get("doi") or "").strip().lower()
    if doi:
        for pub in pubs:
            pub_doi = (pub.get("doi") or "").strip().lower()
            if pub_doi and pub_doi == doi:
                return pub

    target = normalize_for_match(paper.get("title") or "")
    if not target or len(target) < 12:
        return None

    best = None
    best_score = 0.0
    for pub in pubs:
        cand = normalize_for_match((pub.get("bib") or {}).get("title") or "")
        if not cand:
            continue
        score = SequenceMatcher(None, target, cand).ratio()
        if score > best_score:
            best_score = score
            best = pub
    if best_score >= 0.86:
        return best
    return None


def main() -> int:
    papers = json.loads(PAPERS_PATH.read_text(encoding="utf-8"))
    print(f"Loaded {len(papers)} papers; fetching Scholar publications...")
    pubs = fetch_scholar_pubs()
    print(f"Fetched {len(pubs)} Scholar publications")

    matched = 0
    for filename, rec in papers.items():
        if rec.get("title"):
            rec["title"] = clean_title(rec["title"])
        if rec.get("journal"):
            rec["journal"] = fix_chem(strip_tags_keep_i(rec["journal"]))
        if rec.get("book"):
            rec["book"] = fix_chem(strip_tags_keep_i(rec["book"]))
        if rec.get("abstract"):
            rec["abstract"] = fix_chem(strip_tags_keep_i(rec["abstract"]))

        pub = best_scholar_match(rec, pubs)
        if pub:
            matched += 1
            author_pub_id = pub.get("author_pub_id")
            if author_pub_id:
                rec["scholar_pub_id"] = author_pub_id
            cites = pub.get("num_citations")
            if isinstance(cites, int):
                rec["scholar_citations"] = cites
            # Prefer Scholar DOI when PDF lacked one
            if not rec.get("doi") and pub.get("doi"):
                rec["doi"] = pub["doi"]

    ordered = dict(
        sorted(papers.items(), key=lambda kv: (-(kv[1].get("year") or 0), kv[0].lower()))
    )
    PAPERS_PATH.write_text(json.dumps(ordered, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Matched {matched}/{len(papers)} PDFs to Scholar publications")
    print(f"Wrote {PAPERS_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
