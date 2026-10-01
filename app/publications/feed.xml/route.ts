import { buildPublicationsRss } from '@/lib/publications-feed';
import { PAPERS_ORIGIN } from '@/lib/paper-shared';

export const revalidate = 86400;

export async function GET() {
  const body = buildPublicationsRss(PAPERS_ORIGIN);

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
