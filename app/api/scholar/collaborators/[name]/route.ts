import { NextResponse } from 'next/server';
import { getCoAuthors, getScholarByName } from '@/lib/scholarly';

export async function GET(request: Request, props: { params: Promise<{ name: string }> }) {
  const params = await props.params;
  try {
    const name = decodeURIComponent(params.name).toLowerCase().replaceAll("-", " ");
    
    // allowed at Jodie's coauthors/collaborators
    const coAuthors = await getCoAuthors("ynWS968AAAAJ");
    const allowedNames = coAuthors.map((author: any) => author.name.toLowerCase())
    allowedNames.push("jodie rummer");
    allowedNames.push("brock bergseth");

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