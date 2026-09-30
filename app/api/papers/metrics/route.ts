import { NextRequest, NextResponse } from 'next/server';

const CACHE_SECONDS = 86400; // 1 day
const API_BASE = 'https://api.rummerlab.com';

export const revalidate = 86400;

interface PaperMetricsResponse {
  doi: string;
  crossref: number;
  altmetric: number;
  gscholar: number;
}

const fetchJson = async (url: string): Promise<unknown | null> => {
  try {
    const response = await fetch(url, {
      next: { revalidate: CACHE_SECONDS },
      signal: AbortSignal.timeout(20_000),
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
};

export async function GET(request: NextRequest) {
  const doiParam = request.nextUrl.searchParams.get('doi');
  const doi = doiParam?.trim() ?? '';

  if (!doi) {
    return NextResponse.json({ message: 'Missing doi' }, { status: 400 });
  }

  const encoded = encodeURIComponent(doi);

  const [crossrefBody, altmetricBody, gscholarBody] = await Promise.all([
    fetchJson(`https://api.crossref.org/works/${encoded}`),
    fetchJson(`${API_BASE}/altmetric/${encoded}`),
    fetchJson(`${API_BASE}/google-citations/${encoded}`),
  ]);

  const crossref =
    typeof (crossrefBody as { message?: { 'is-referenced-by-count'?: number } } | null)?.message?.[
      'is-referenced-by-count'
    ] === 'number'
      ? (crossrefBody as { message: { 'is-referenced-by-count': number } }).message[
          'is-referenced-by-count'
        ]
      : 0;

  const altmetricRaw = (altmetricBody as { score?: number } | null)?.score;
  const altmetric = typeof altmetricRaw === 'number' ? Math.round(altmetricRaw) : 0;

  const gscholarRaw = (gscholarBody as { citations?: number } | null)?.citations;
  const gscholar = typeof gscholarRaw === 'number' ? gscholarRaw : 0;

  const payload: PaperMetricsResponse = {
    doi,
    crossref,
    altmetric,
    gscholar,
  };

  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`,
    },
  });
}
