import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_FEATURED_LIMIT,
  getFeaturedPapersPage,
  PAPERS_ORIGIN,
  toApiPaper,
} from '@/lib/papers';

export const revalidate = 86400;

export async function GET(req: NextRequest) {
  const limitParam = req.nextUrl.searchParams.get('limit');
  const parsedLimit = limitParam ? Number(limitParam) : DEFAULT_FEATURED_LIMIT;
  const limit = Number.isFinite(parsedLimit) ? parsedLimit : DEFAULT_FEATURED_LIMIT;

  const page = getFeaturedPapersPage(limit, { origin: PAPERS_ORIGIN });

  return NextResponse.json(
    {
      ...page,
      papers: page.papers.map((paper) => toApiPaper(paper, PAPERS_ORIGIN)),
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
      },
    },
  );
}
