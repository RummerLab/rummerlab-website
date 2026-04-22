import { NextResponse } from 'next/server';
import { getPublicationsPage } from '@/lib/scholarly';

export async function GET(request: Request, props: { params: Promise<{ publicationId: string }> }) {
  const params = await props.params;
  try {
    const publicationId = params.publicationId.toLowerCase();

    const allowedPublications = ["ynWS968AAAAJ"];

    if (!publicationId || !allowedPublications.includes(publicationId)) {
      return NextResponse.json({ message: "Invalid publication ID" });
    }

    const page = await getPublicationsPage({ scholarId: "ynWS968AAAAJ", limit: 50, offset: 0 });
    return NextResponse.json(page);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}