import { NextResponse } from 'next/server';
import { getPublications, getScholarById } from '@/lib/scholarly';

export async function GET(req: any, res: any) {
  try {
    const id = req.nextUrl.searchParams.get('id');  
    if (!id) {
      return NextResponse.json({ error: "Missing 'id' parameter" }, { status: 400 });
    }

    const scholar = await getScholarById(id);
    const publications = scholar.publications;

    return NextResponse.json(publications);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}