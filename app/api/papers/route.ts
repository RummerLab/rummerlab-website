import { NextResponse } from 'next/server';
import { getPapers, PAPERS_ORIGIN } from '@/lib/papers';

export const dynamic = 'force-dynamic';

export async function GET() {
  const papers = getPapers({ origin: PAPERS_ORIGIN });

  return NextResponse.json({
    total: papers.length,
    papers,
  });
}
