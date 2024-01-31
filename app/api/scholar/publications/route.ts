import { NextResponse } from 'next/server';
import { getPublications } from '@/lib/scholarly';

export async function GET(req: any, res: any) {
  try {
    const publications = await getPublications("ynWS968AAAAJ");
    
    return NextResponse.json(publications);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}