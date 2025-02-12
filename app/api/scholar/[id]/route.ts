import { NextResponse } from 'next/server';
import { getCoAuthors, getScholarById } from '@/lib/scholarly';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = decodeURIComponent(params.id);
    
    const jodie = "ynWS968AAAAJ";
    // allowed at Jodie's coauthors/collaborators
    const coAuthors = await getCoAuthors(jodie);
    const allowedIds = coAuthors.map((author: any) => author.scholar_id)
    allowedIds.push(jodie);
    allowedIds.push("g9B1IoQAAAAJ"); // Brock Bergseth

    if (!id || !allowedIds.includes(id)) {
      return NextResponse.json({ message: "Invalid scholar id" });
    }
    const scholar = await getScholarById(id);

    return NextResponse.json(scholar);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}