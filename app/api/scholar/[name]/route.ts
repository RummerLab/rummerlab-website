import { NextResponse } from 'next/server';
import { getScholarByName } from '@/lib/scholarly';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const name = params.slug.toLowerCase().replaceAll("-", " ");

    const allowedNames = ["jodie rummer", "philip munday", "brock bergseth"];

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