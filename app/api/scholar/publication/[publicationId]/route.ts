import { NextResponse } from 'next/server';
import { searchPublication, getScholarById } from '@/lib/scholarly';

export async function GET(request: Request, props: { params: Promise<{ publicationId: string }> }) {
  const params = await props.params;
  try {
    const publicationId = params.publicationId.toLowerCase();

    const allowedPublications = ["ynWS968AAAAJ"];

    if (!publicationId || !allowedPublications.includes(publicationId)) {
      return NextResponse.json({ message: "Invalid publication ID" });
    }
    //const scholar = await searchPublication(publicationId);

    const temp = await getScholarById("ynWS968AAAAJ")
    const scholar = temp.publications;

    return NextResponse.json(scholar);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}