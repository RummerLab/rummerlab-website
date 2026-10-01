import { NextRequest, NextResponse } from 'next/server';
import { getPaperMetrics, PAPER_METRICS_REVALIDATE_SECONDS } from '@/lib/paper-metrics';

export const revalidate = 86400;

export async function GET(request: NextRequest) {
  const doiParam = request.nextUrl.searchParams.get('doi');
  const doi = doiParam?.trim() ?? '';

  if (!doi) {
    return NextResponse.json({ message: 'Missing doi' }, { status: 400 });
  }

  const payload = await getPaperMetrics(doi);

  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': `public, s-maxage=${PAPER_METRICS_REVALIDATE_SECONDS}, stale-while-revalidate=${PAPER_METRICS_REVALIDATE_SECONDS}`,
    },
  });
}
