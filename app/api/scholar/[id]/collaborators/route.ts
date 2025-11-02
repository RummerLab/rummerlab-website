import { NextResponse } from 'next/server';
import { getCoAuthors } from '@/lib/scholarly';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: "Missing 'id' parameter" }, { status: 400 });
    }

    const coauthors = await getCoAuthors(id);

    return NextResponse.json(coauthors);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}