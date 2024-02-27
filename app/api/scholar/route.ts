import { NextResponse } from 'next/server';
import { getScholar } from '@/lib/scholarly';

export async function GET(req: any, res: any) {
  try {
    const scholar = await getScholar("Jodie Rummer");

    return NextResponse.json(scholar);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}