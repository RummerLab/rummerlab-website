import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ORIGINS = [
  'https://rummerlab.com',
  'https://jodierummer.com',
  'https://physioshark.org',
  'http://localhost:3000',
];

const CACHE_CONTROL_ASSETS = 'public, max-age=31536000, stale-while-revalidate=86400, immutable';

function getOriginFromReferer(referer: string | null): string | null {
  if (!referer) return null;
  try {
    const url = new URL(referer);
    return url.origin;
  } catch {
    return null;
  }
}

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

function getCorsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !isAllowedOrigin(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
  };
}

const CORS_HEADERS_ALLOW_ALL: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
};

function computeWeakEtag(pathname: string, search: string): string {
  const value = pathname + search;
  const encoded = btoa(encodeURIComponent(value));
  return `W/"${encoded}"`;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const origin = request.headers.get('Origin') ?? getOriginFromReferer(request.headers.get('Referer'));
  const isAssetRoute = pathname.startsWith('/images/') || pathname === '/_next/image';
  const isApiRoute = pathname.startsWith('/api/');

  // OPTIONS preflight: API allows all origins; assets use allowlist
  if (request.method === 'OPTIONS') {
    const cors = isApiRoute
      ? CORS_HEADERS_ALLOW_ALL
      : getCorsHeaders(origin || request.headers.get('Origin'));
    return new NextResponse(null, {
      status: 204,
      headers: {
        ...cors,
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Hotlink protection for assets: block if Referer/Origin present and not allowed
  if (isAssetRoute && request.method === 'GET') {
    if (origin && !isAllowedOrigin(origin)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // ETag and 304 for GET assets
    const etag = computeWeakEtag(pathname, search);
    const ifNoneMatch = request.headers.get('If-None-Match');
    const etagMatch = ifNoneMatch && (ifNoneMatch === etag || ifNoneMatch.includes(etag));
    if (etagMatch) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          ETag: etag,
          'Cache-Control': CACHE_CONTROL_ASSETS,
        },
      });
    }

    const res = NextResponse.next();
    res.headers.set('ETag', etag);
    res.headers.set('Cache-Control', CACHE_CONTROL_ASSETS);
    const cors = getCorsHeaders(request.headers.get('Origin'));
    Object.entries(cors).forEach(([k, v]) => res.headers.set(k, v));
    return res;
  }

  // API routes: add CORS allow-all (no hotlink check)
  // For Brock's website
  if (isApiRoute) {
    const res = NextResponse.next();
    Object.entries(CORS_HEADERS_ALLOW_ALL).forEach(([k, v]) => res.headers.set(k, v));
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/images/:path*', '/_next/image'],
};
