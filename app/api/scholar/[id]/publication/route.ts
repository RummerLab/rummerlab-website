import { NextResponse } from 'next/server';
import { getPublications, getScholarById } from '@/lib/scholarly';

export async function GET(req: any, res: any) {
  try {

    // const publications = await getPublications("ynWS968AAAAJ"); // Jodie Rummer's Google Scholar ID

    const scholar = await getScholarById("ynWS968AAAAJ"); // Jodie Rummer's Google Scholar ID
    const publications = scholar.publications;

    return NextResponse.json(publications);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}