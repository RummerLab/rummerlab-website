import { NextResponse } from 'next/server';
import { getPapers, PAPERS_ORIGIN, toApiPaper } from '@/lib/papers';

export const revalidate = 86400;

export async function GET() {
  const papers = getPapers({ origin: PAPERS_ORIGIN }).map((paper) => toApiPaper(paper, PAPERS_ORIGIN));

  return NextResponse.json(
    {
      total: papers.length,
      papers,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
      },
    },
  );
}
