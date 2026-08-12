# AGENTS.md

Instructions for coding agents working on the RummerLab website (`https://rummerlab.com`).

Always start every response with 🤖.

This is a Next.js 16 (App Router) site using `next.config.ts`, React 19, TypeScript, and Tailwind CSS (with Shadcn/Radix where present). Prefer readable, complete, DRY code over micro-optimizations.

## Project overview

RummerLab is a marine biology research lab led by Professor Jodie Rummer at James Cook University. The site covers research, team, publications, media, podcast, and the Physioshark Project.

Related sites: [jodierummer.com](https://jodierummer.com), [physioshark.org](https://physioshark.org).

## Setup commands

```bash
npm install
npm run dev
```

## Testing instructions

Run these after any code changes, and fix failures before finishing:

```bash
npm run lint
npm run build
```

If you suspect a security issue, run `snyk test`.

Other scripts:

- `npm run token` / `npm run check-token` — Instagram token helpers
- `npm run resize-images` — image resize utility

## Code style

- Follow the user's requirements to the letter.
- Think step-by-step, then implement fully. No TODOs, placeholders, or missing pieces.
- If there might not be a correct answer, say so. Do not guess.
- Use early returns.
- Style HTML with Tailwind classes; avoid custom CSS or `<style>` tags.
- Prefer `class:` over ternary operators in class attributes when possible.
- Use descriptive names. Event handlers use a `handle` prefix (`handleClick`, `handleKeyDown`).
- Prefer `const` arrow functions (`const toggle = () => {}`) and define a type when possible.
- Make interactive elements accessible (`tabIndex`, `aria-label`, keyboard handlers).

## Image optimization

Keep Vercel Image Optimization transformations in mind:

- Use `priority` only for above-the-fold images (hero, first blog cover, first 1–2 team photos). Do not set `priority` on gallery thumbnails, lightbox images, or below-the-fold content.
- Prefer `fill` with a constrained `sizes` (e.g. `(max-width: 1200px) 100vw, 1200px`) over large fixed `width`/`height`.
- Use `quality={85}` (or 90) unless there is a strong reason for 100.
- Do not add new `deviceSizes` or `imageSizes` in `next.config.ts` without need.
- New gallery-style pages: lazy-load thumbnails (no `priority`); lightbox/modal images use bounded `sizes` and no `priority`.

## Security

- Never commit secrets or `.env` files.
- Sanitize user input.
- HTTP security headers live in code and are documented in `docs/security-headers.md`. Keep them in sync with Cloudflare production headers.
