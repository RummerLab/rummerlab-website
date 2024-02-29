import { NextResponse } from 'next/server';
import { getScholar } from '@/lib/scholarly';

export async function GET(req: any) {
  try {
    const publicationId = req.url.split('/').pop().toLowerCase();

    const allowedPublications = ["ynWS968AAAAJ", "ynWS968AAAAJ", "ynWS968AAAAJ"];

    if (!publicationId || !allowedPublications.includes(publicationId)) {
      return NextResponse.json({ message: "Invalid publication ID" });
    }
    const scholar = await getScholar(publicationId);

    return NextResponse.json(scholar);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}