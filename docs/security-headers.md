# Security Headers

HTTP security headers for rummerlab.com are set in two places. Values should stay aligned so a Cloudflare or host change does not silently drop protection.

## Responsibility split

| Header | Cloudflare (edge) | Next.js ([next.config.ts](../next.config.ts) via [lib/security-headers.ts](../lib/security-headers.ts)) |
|--------|-------------------|-----------------------------------------------------------------------------------------------------------|
| `Strict-Transport-Security` | `max-age=63072000` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `SAMEORIGIN` | `SAMEORIGIN` |
| `X-Content-Type-Options` | `nosniff` | `nosniff` (also on `/images/*` cache rule) |
| `Referrer-Policy` | `same-origin` | `same-origin` |
| `Permissions-Policy` | — | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | — | Enforcing policy (see below) |
| `X-XSS-Protection` | `1; mode=block` (legacy) | Not set (deprecated; CSP is preferred) |

Cloudflare also adds `expect-ct` and NEL/reporting headers. Those are edge-only and not duplicated in the app.

## Why both Cloudflare and Next.js?

Production currently receives core headers from **Cloudflare** (`Server: cloudflare`). The Next.js config **codifies the same policy in git** so headers survive infra changes and are reviewable in pull requests. Duplicate headers with identical values are harmless.

If Cloudflare Transform Rules or Security Headers are updated, update [lib/security-headers.ts](../lib/security-headers.ts) to match.

## Content-Security-Policy

The enforcing CSP covers:

- **Analytics:** Google Analytics (`@next/third-parties`), Vercel Analytics, Speed Insights
- **Embeds:** Google Maps (contact page), OpenStreetMap umap (Physioshark page)
- **Images:** All hostnames in `next.config.ts` `images.remotePatterns`
- **Styles/scripts:** `'unsafe-inline'` for Next.js hydration and Tailwind (nonce-based CSP is a future improvement)

The scholar embed widget (`/embed/scholar.js`) is loaded on **external** collaborator sites; their CSP applies there, not ours.

### CSP rollout

1. Policy was drafted against known third parties in the codebase.
2. Enforcing `Content-Security-Policy` is active by default in [lib/security-headers.ts](../lib/security-headers.ts).
3. To test without blocking, set `CSP_REPORT_ONLY=1` at build time to emit `Content-Security-Policy-Report-Only` instead.
4. If violations appear after deploy, temporarily switch to report-only, fix violations, then re-enable enforcement.

## Verification

After changing headers:

```bash
curl.exe -sI https://rummerlab.com
```

Check [securityheaders.com](https://securityheaders.com/?q=rummerlab.com) and smoke-test homepage, a podcast article, contact (Maps), Physioshark (map iframe), and `/api/scholar/ynWS968AAAAJ`.

## CORS (not a security-header audit item)

[proxy.ts](../proxy.ts) sets `Access-Control-Allow-Origin: *` on `/api/*` so collaborator sites can use the scholar embed API. This is intentional product behavior.
