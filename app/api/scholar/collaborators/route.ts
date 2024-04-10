import { NextResponse } from 'next/server';
import { getCoAuthors } from '@/lib/scholarly';

export async function GET(req: any, res: any) {
  try {
    const coauthors = await getCoAuthors("ynWS968AAAAJ"); // Jodie Rummer's Google Scholar ID

    return NextResponse.json(coauthors);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}