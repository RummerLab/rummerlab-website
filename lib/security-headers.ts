/**
 * Security headers applied site-wide via next.config.ts.
 * See docs/security-headers.md for Cloudflare vs Next.js responsibilities.
 */

/** Hostnames allowed in img-src (mirrors next.config.ts remotePatterns). */
const IMAGE_HOSTS = [
  'https://physioshark.org',
  'https://jodierummer.com',
  'https://scholar.googleusercontent.com',
  'https://*.cdninstagram.com',
  'https://platform-lookaside.fbsbx.com',
  'https://media.guim.co.uk',
  'https://imageio.forbes.com',
  'https://*.abc-cdn.net.au',
  'https://*.googleusercontent.com',
  'https://*.wp.com',
  'https://*.wordpress.com',
  'https://*.cloudfront.net',
  'https://*.amazonaws.com',
  'https://images.theconversation.com',
] as const;

const CSP_DIRECTIVES = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  [
    'script-src',
    "'self'",
    "'unsafe-inline'",
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://va.vercel-scripts.com',
  ].join(' '),
  ["style-src", "'self'", "'unsafe-inline'"].join(' '),
  ["font-src", "'self'", 'data:'].join(' '),
  [
    'img-src',
    "'self'",
    'data:',
    'blob:',
    ...IMAGE_HOSTS,
  ].join(' '),
  [
    'connect-src',
    "'self'",
    'https://www.google-analytics.com',
    'https://*.google-analytics.com',
    'https://vitals.vercel-insights.com',
    'https://va.vercel-insights.com',
  ].join(' '),
  [
    'frame-src',
    "'self'",
    'https://www.google.com',
    'https://umap.openstreetmap.fr',
  ].join(' '),
] as const;

export const CONTENT_SECURITY_POLICY = CSP_DIRECTIVES.join('; ');

const getCspHeader = () => {
  if (process.env.CSP_REPORT_ONLY === '1') {
    return {
      key: 'Content-Security-Policy-Report-Only',
      value: CONTENT_SECURITY_POLICY,
    } as const;
  }
  return {
    key: 'Content-Security-Policy',
    value: CONTENT_SECURITY_POLICY,
  } as const;
};

export const SECURITY_HEADERS = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'same-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  getCspHeader(),
] as const;
