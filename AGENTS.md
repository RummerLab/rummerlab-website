# AGENTS.md

Agent instructions for the RummerLab website (`https://rummerlab.com`).

Always start every response with 🤖.

Treat this file as living documentation: update `AGENTS.md` when the stack, scripts, conventions, or project facts change so it stays accurate.

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Config is `next.config.ts`. Request middleware lives in `proxy.ts`.

## Project overview

Marine biology lab site for Professor Jodie Rummer at James Cook University: research, team, publications, media, podcast, blog, gallery, and Physioshark.

Podcast episodes live in `_podcast-episodes/` and render at `/podcast` and `/podcast/[slug]`. Lab blog posts live in `_blog/` and render at `/blog` and `/blog/[slug]`.

Sister sites: [jodierummer.com](https://jodierummer.com), [physioshark.org](https://physioshark.org). Spell **RummerLab** with no space.

Physioshark fieldwork is on Mo'orea, French Polynesia, with [science4reefs](https://www.science4reefs-cnrs.com/). Do not describe current fieldwork as based at CRIOBE.

## Setup

```bash
pnpm install
pnpm run dev
```

Helpers (only when needed): `pnpm run token`, `pnpm run check-token`, `pnpm run resize-images`.

## Checks

After code changes, run and fix:

```bash
pnpm run lint
pnpm run test
pnpm run build
```

Unit tests use Vitest (`lib/**/*.test.ts`). Prefer covering pure helpers that guard URLs, HTML sanitization, and machine-readable serialization.

If you suspect a security issue, run `snyk test`. Transitive CVEs with no npm release yet are remediated under `pnpm.patchedDependencies` (`patches/`) and documented in `.snyk` until upstream packages ship fixed versions.

## Conventions

- TypeScript everywhere. Prefer interfaces over types. Named exports.
- Directories: kebab-case. Components: PascalCase.
- Favor React Server Components. Add `'use client'` only when needed.
- Await `params` and `searchParams`. Use the platform `fetch` API (not `node-fetch`).
- Early returns, DRY, `handle` prefix on event handlers (`handleClick`).
- Style with Tailwind. Support light and dark classes already used on the site.
- Media cards live in `data/media.json`. Helpers stay in `data/media.ts`. `url` is optional. Use `sources` for syndications of the same story; the primary `source`/`url` should be the strongest public outlet. Clickable source tags open that outlet's URL.
- Hosted PDFs live in `public/papers/`. Listing and featured selection live in `lib/papers.ts` (`getJournalPapers` / `getOtherPapers`); detail pages at `/publications/[slug]` (slug = PDF filename without `.pdf`, URL-encoded in links via `getPaperDetailPath`). Citation metadata (title, authors, journal, DOI, abstract, `scholar_pub_id`) lives in `data/papers.json` keyed by PDF filename and is merged into API responses. Prefer author names like `Jodie L. Rummer`. Featured papers are the newest by year in the filename. Per-paper Crossref / Altmetric / Scholar metrics are fetched server-side in `lib/paper-metrics.ts` (daily revalidate, shared with `GET /api/papers/metrics`); `/publications` passes a metrics map into `PublicationsBrowser` / presentational `PaperMetrics`. Scholar profile header stats use `getScholarProfileMetrics` (daily cache). JSON-LD for publications lives in `lib/schema/publications.ts` (`CollectionPage` + `ItemList` on listing, `ScholarlyArticle` on detail). Machine-readable feeds: `GET /publications/feed.xml` (RSS), `public/llms.txt` documents APIs. Sister sites consume `GET /api/papers` and `GET /api/papers/featured` (daily revalidate; each paper includes `detailUrl`). Use plain `<a>` for static `/papers/*.pdf` and external DOI/Scholar URLs — not `next/link` (avoids RSC prefetch 404s on hover). After adding PDFs, run `pnpm run extract-paper-metadata` then `pnpm run enrich-papers-scholar` (Crossref + Scholar ID matching; preserves curated overrides). Featured journal covers live in `data/publication-covers.ts` (optional images under `public/images/covers/`).
- Team page sections are partitioned in `lib/team.ts` (PI, current members, collaborators, past/alumni). Collaborator map points live in `data/collaborator-locations.ts` (`maplibre-gl` flat mercator map on `/collaborators`, with a globe toggle). MapLibre GL JS v6 needs worker assets under `public/maplibre/` — `predev` / `prebuild` run `scripts/copy-maplibre-worker.mjs`. The regional collaborators directory on `/collaborators` is curated in `data/collaborators.json` (helpers in `data/collaborators.ts`); refresh affiliations / Scholar IDs with `pnpm run sync-collaborators-scholar` (add `-- --add` to append new Scholar coauthors).
- Mailbox catch-up for Google Alerts / digests / Isentia PDFs on `athletesofthereef@gmail.com`: follow [`MEDIA-ALERTS.md`](MEDIA-ALERTS.md). Primary Inbox subjects are `Google Alert - Daily Digest` (from `googlealerts-noreply@google.com`) and `Daily research watch` (from Alex Morgan / `athletesofthereef@gmail.com`); also process RummerLab media digests, Scholar alerts (media only), and Jodie/Luen forwards when present.
- Use `git mv` when moving files.
- Complete the change: no TODOs or placeholders. File a GitHub issue for follow-up work instead of leaving TODO comments or README notes.

## Asset filenames (SEO)

When adding media or downloads to the repo (audio, video, press PDFs, images from Downloads/WhatsApp/email, etc.), **always rename before committing**. Never keep generic client names (`WhatsApp Audio…`, `shark attacks.pdf`, `IMG_1234.jpg`).

- Use lowercase **kebab-case** with descriptive keywords: who/what, outlet or topic, and a date when known (`YYYY-MM-DD` or `YYYY-MM`).
- Prefer the correct extension for the content (e.g. `.m4a` for audio-only MP4/M4A).
- Press/media PDFs that are not journal papers: host under `public/media/` with SEO names (e.g. `bbc-wildlife-shark-attacks-australia-jodie-rummer-2026-09-16.pdf`) and point `data/media.json` `url` at the public URL when there is no stronger durable outlet link.
- Journal PDFs in `public/papers/` keep the existing author/year naming used by the publications pipeline; still avoid opaque or spaces-heavy dump names when adding new files.
- Examples: `bbc-wildlife-shark-attacks-australia-jodie-rummer-2026-09-16.pdf`, `jodie-rummer-abc-interview-2026-06-16.m4a`.

## Layout and styling

Theme tokens and animation utilities live in `app/globals.css` (`@theme`, `@plugin "@tailwindcss/typography"`, `@plugin "tailwindcss-animate"`).

Shared layout primitives in `components/layout/`:

- `PageShell` — page wrapper with gradient background (`narrow`, `wide` variants)
- `PageHeader` — centered title, subtitle, animated accent bar
- `ContentCard` — elevated card with `hover-lift` and optional `view-reveal` scroll animation
- `ArticleCard` — blog/podcast listing cards
- `ButtonLink` — primary, secondary, and outline-white CTA links

Prefer CSS animations (`animate-fade-in`, `animate-fade-in-up`, `view-reveal`, `hover-lift`, `link-underline`) over new JS animation libraries. Respect `prefers-reduced-motion`. Homepage plankton (`components/ui/plankton.tsx`) and existing framer-motion homepage effects stay as-is.

Use `cn()` from `lib/utils.ts` only.

## Images

Use `next/image`. Prefer WebP via the optimizer.

- `priority` only for above-the-fold images (hero, first 1–2 key photos).
- Prefer `fill` with a constrained `sizes` over large fixed dimensions.
- `quality={85}` unless there is a strong reason for higher.
- Do not add `deviceSizes` / `imageSizes` in `next.config.ts` without need.
- Gallery/lightbox: lazy thumbnails, bounded `sizes`, no `priority`.

## Security

- Never commit secrets or `.env*` files.
- Sanitize user input (`sanitize-html` is already used).
- Headers are defined in code and documented in `docs/security-headers.md`. Keep them in sync with Cloudflare.


## Package manager

This repo uses **pnpm** (`packageManager` in `package.json`).

- Install: `pnpm install` (do not use npm/yarn for installs in this repo).
- Scripts: `pnpm run <script>` / `pnpm exec <bin>`.
- Lockfile: `pnpm-lock.yaml` only â€” do not commit `package-lock.json` or `yarn.lock`.
- Local disk: pnpm's content-addressable store shares package contents across checkouts on the same machine.
## Dependency tooling (Next.js)

Follow current Next.js docs for ESLint and TypeScript — do **not** merge Dependabot majors that the Next.js / `typescript-eslint` stack does not support yet.

- **TypeScript**: stay on **5.9.x** (Next.js requires ≥5.1; `typescript-eslint` does not support TypeScript 7 yet).
- **ESLint**: stay on **9.x** with Next.js flat config (`eslint-config-next/core-web-vitals` + `typescript` via `defineConfig`). ESLint 10 still breaks plugins shipped through `eslint-config-next`.
- Before changing ESLint/TypeScript majors, read the Next.js ESLint docs, upgrading guide, and the target major migration guide.
- Prefer Dependabot `ignore` rules for `eslint` and `typescript` semver-major until official support lands.

### Framework upgrades

```bash
pnpm exec @next/codemod@canary upgrade latest
pnpm exec @tailwindcss/upgrade
```

After either upgrade: run `pnpm run lint` and `pnpm run build`, fix failures, and update this file if versions/scripts change.


## Git remotes and publishing

Canonical repo: **`RummerLab/rummerlab-website`** (`upstream`).

In this clone, remotes are typically:

- `upstream` → `https://github.com/RummerLab/rummerlab-website.git` (canonical)
- `origin` → `https://github.com/Luen/rummerlab-website.git` (personal fork)

**Always publish to upstream**, not only the Luen/`origin` fork:

- Prefer opening a pull request against `RummerLab/rummerlab-website`.
- Or commit/push directly to `upstream` when that is the agreed workflow.
- Do **not** treat a push to `origin` (Luen) as done — that commit will not appear on the RummerLab repo until it is pushed or PR’d upstream.

When creating branches for review: push them to `upstream` (or open a PR with base `RummerLab/rummerlab-website`), then share the RummerLab PR URL.

## Pull requests

Before merging any pull request:

1. **Read all comments** on the PR — conversation comments, review comments (including those on specific lines), and bot comments. Address or acknowledge them. Do not merge while review feedback is unresolved.
2. **Wait for CI to complete successfully.** GitHub Actions (and other required checks) on the PR must finish and pass. Do not merge while checks are pending, failed, cancelled, or skipped when they are required. If CI fails, fix the cause and wait for a green run before merging.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
