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
npm install
npm run dev
```

Helpers (only when needed): `npm run token`, `npm run check-token`, `npm run resize-images`.

## Checks

After code changes, run and fix:

```bash
npm run lint
npm run build
```

If you suspect a security issue, run `snyk test`.

## Conventions

- TypeScript everywhere. Prefer interfaces over types. Named exports.
- Directories: kebab-case. Components: PascalCase.
- Favor React Server Components. Add `'use client'` only when needed.
- Await `params` and `searchParams`. Use the platform `fetch` API (not `node-fetch`).
- Early returns, DRY, `handle` prefix on event handlers (`handleClick`).
- Style with Tailwind. Support light and dark classes already used on the site.
- Media cards live in `data/media.ts`. `url` is optional. Use `sources` for syndications of the same story; the primary `source`/`url` should be the strongest public outlet. Clickable source tags open that outlet's URL.
- Use `git mv` when moving files.
- Complete the change: no TODOs or placeholders.

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
