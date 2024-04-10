import { NextResponse } from 'next/server';
import { getScholarById } from '@/lib/scholarly';

export async function GET(req: any, res: any) {
  try {
    const scholar = await getScholarById("ynWS968AAAAJ"); // Jodie Rummer's Google Scholar ID

    return NextResponse.json(scholar);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}