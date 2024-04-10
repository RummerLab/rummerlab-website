import { NextResponse } from 'next/server';
import { getCoAuthors, getScholarByName } from '@/lib/scholarly';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const name = decodeURIComponent(params.name).toLowerCase().replaceAll("-", " ");
    
    // allowed at Jodie's coauthors/collaborators
    const coAuthors = await getCoAuthors("ynWS968AAAAJ");
    const allowedNames = coAuthors.map((author: any) => author.name);
    allowedNames.push("jodie rummer");

    if (!name || !allowedNames.includes(name)) {
      return NextResponse.json({ message: "Invalid scholar name" });
    }
    const scholar = await getScholarByName(name);

    return NextResponse.json(scholar);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}