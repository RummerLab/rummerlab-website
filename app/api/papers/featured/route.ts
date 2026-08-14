import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_FEATURED_LIMIT,
  getFeaturedPapersPage,
  PAPERS_ORIGIN,
} from '@/lib/papers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const limitParam = req.nextUrl.searchParams.get('limit');
  const parsedLimit = limitParam ? Number(limitParam) : DEFAULT_FEATURED_LIMIT;
  const limit = Number.isFinite(parsedLimit) ? parsedLimit : DEFAULT_FEATURED_LIMIT;

  return NextResponse.json(
    getFeaturedPapersPage(limit, { origin: PAPERS_ORIGIN }),
  );
}
