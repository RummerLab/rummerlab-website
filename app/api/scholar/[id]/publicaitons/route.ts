import { NextRequest, NextResponse } from "next/server";

/**
 * Legacy typo path. Redirects to `/publications` so validation and pagination
 * live in one handler. Supports old callers that passed `?id=` (uses that id
 * when present, otherwise the `[id]` path segment).
 */
export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const pathId = decodeURIComponent(params.id);
  const queryId = req.nextUrl.searchParams.get("id");
  const scholarId = queryId?.trim() || pathId;

  const next = new URLSearchParams();
  const limit = req.nextUrl.searchParams.get("limit");
  const offset = req.nextUrl.searchParams.get("offset");
  if (limit) next.set("limit", limit);
  if (offset) next.set("offset", offset);

  const qs = next.toString();
  const dest = `/api/scholar/${encodeURIComponent(scholarId)}/publications${qs ? `?${qs}` : ""}`;
  return NextResponse.redirect(new URL(dest, req.url), 308);
}
