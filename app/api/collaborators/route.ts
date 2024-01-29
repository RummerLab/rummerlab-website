import { NextResponse } from 'next/server';

export async function GET(req: any, res: any) {
  try {
    const collaborators: any[] = [];
    return NextResponse.json(collaborators);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}