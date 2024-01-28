import { NextResponse } from 'next/server';
//import { Scholar } from '@/lib/scholarly';

export async function GET(req: any, res: any) {
  try {
    const { query } = req;
    const { author } = query;
    const papers: any[] = [];
    return NextResponse.json(papers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}