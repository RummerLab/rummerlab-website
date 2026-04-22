import { NextRequest, NextResponse } from "next/server";
import { getAllowedScholarIds, getNewsPage } from "@/lib/scholarly";

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  try {
    const id = decodeURIComponent(params.id);
    const allowedIds = await getAllowedScholarIds();

    if (!id || !allowedIds.includes(id)) {
      return NextResponse.json({ message: "Invalid scholar id" }, { status: 400 });
    }

    const limitParam = req.nextUrl.searchParams.get("limit");
    const offsetParam = req.nextUrl.searchParams.get("offset");
    const limit = limitParam ? Number(limitParam) : 100;
    const offset = offsetParam ? Number(offsetParam) : 0;

    const page = await getNewsPage({
      scholarId: id,
      limit: Number.isFinite(limit) ? limit : 100,
      offset: Number.isFinite(offset) ? offset : 0,
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
  }
}

