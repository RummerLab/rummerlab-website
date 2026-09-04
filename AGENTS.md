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
pnpm run build
```

If you suspect a security issue, run `snyk test`.

## Conventions

- TypeScript everywhere. Prefer interfaces over types. Named exports.
- Directories: kebab-case. Components: PascalCase.
- Favor React Server Components. Add `'use client'` only when needed.
- Await `params` and `searchParams`. Use the platform `fetch` API (not `node-fetch`).
- Early returns, DRY, `handle` prefix on event handlers (`handleClick`).
- Style with Tailwind. Support light and dark classes already used on the site.
- Media cards live in `data/media.json`. Helpers stay in `data/media.ts`. `url` is optional. Use `sources` for syndications of the same story; the primary `source`/`url` should be the strongest public outlet. Clickable source tags open that outlet's URL.
- Hosted PDFs live in `public/papers/`. Listing and featured selection live in `lib/papers.ts`. Citation metadata (title, authors, journal, DOI, abstract) lives in `data/papers.json` keyed by PDF filename and is merged into API responses. Featured papers are the newest by year in the filename. Sister sites consume `GET /api/papers` and `GET /api/papers/featured`.
- Mailbox catch-up for Google Alerts / digests / Isentia PDFs: follow [`MEDIA-ALERTS.md`](MEDIA-ALERTS.md).
- Use `git mv` when moving files.
- Complete the change: no TODOs or placeholders. File a GitHub issue for follow-up work instead of leaving TODO comments or README notes.

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


## Pull requests

Before merging any pull request:

1. **Read all comments** on the PR — conversation comments, review comments (including those on specific lines), and bot comments. Address or acknowledge them. Do not merge while review feedback is unresolved.
2. **Wait for CI to complete successfully.** GitHub Actions (and other required checks) on the PR must finish and pass. Do not merge while checks are pending, failed, cancelled, or skipped when they are required. If CI fails, fix the cause and wait for a green run before merging.
