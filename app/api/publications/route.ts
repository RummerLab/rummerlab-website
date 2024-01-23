import { NextResponse } from 'next/server';

export async function GET(req: any, res: any) {
  try {
    const papers = {}
    return NextResponse.json(papers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}