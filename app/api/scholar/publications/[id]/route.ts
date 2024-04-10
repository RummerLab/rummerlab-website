import { NextResponse } from 'next/server';
import { getPublications } from '@/lib/scholarly';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {

  try {
    const authorId = params.slug

    const publications = await getPublications(authorId);

    return NextResponse.json(publications);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}