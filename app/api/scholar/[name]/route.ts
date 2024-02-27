import { NextResponse } from 'next/server';
import { getScholar } from '@/lib/scholarly';

export async function GET(req: any) {
  try {
    const name = req.url.split('/').pop().toLowerCase().replaceAll("-", " ");

    const allowedNames = ["jodie rummer", "philip munday", "brock bergseth"];

    if (!name || !allowedNames.includes(name)) {
      return NextResponse.json({ message: "Invalid scholar name" });
    }
    const scholar = await getScholar(name);

    return NextResponse.json(scholar);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" });
  }
}