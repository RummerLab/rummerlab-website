import { NextResponse } from 'next/server';
import { getAllowedScholarIds } from '@/lib/scholarly';

const CACHE_SECONDS = 86400; // 1 day

export const revalidate = CACHE_SECONDS;

export async function GET(
  _request: Request,
  props: { params: Promise<{ id: string; doi: string[] }> }
) {
  const params = await props.params;

  try {
    const id = decodeURIComponent(params.id);
    const doi = params.doi?.length ? params.doi.map(decodeURIComponent).join('/') : '';

    const allowedIds = await getAllowedScholarIds();
    if (!id || !allowedIds.includes(id)) {
      return NextResponse.json({ message: 'Invalid scholar id' }, { status: 400 });
    }
    if (!doi) {
      return NextResponse.json({ message: 'Missing doi' }, { status: 400 });
    }

    const url = `https://api.rummerlab.com/scholar-citations/${encodeURIComponent(doi)}`;
    const response = await fetch(url, {
      next: { revalidate: CACHE_SECONDS },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Upstream request failed', status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}
