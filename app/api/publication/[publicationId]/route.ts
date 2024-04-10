import { NextResponse } from 'next/server';
import { searchPublication } from '@/lib/scholarly';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const publicationId = params.slug.toLowerCase();

    const allowedPublications = ["ynWS968AAAAJ"];

    if (!publicationId || !allowedPublications.includes(publicationId)) {
      return NextResponse.json({ message: "Invalid publication ID" });
    }
    const scholar = await searchPublication(publicationId);

    return NextResponse.json(scholar);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}