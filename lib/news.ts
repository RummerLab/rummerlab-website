import type { MediaItem } from "@/types/media";

const PRODUCTION_API_BASE = "https://api.rummerlab.com";
const DEV_NEWS_BASE = "http://localhost:5000";
const getNewsApiBase = () =>
  process.env.NODE_ENV === "development" ? DEV_NEWS_BASE : PRODUCTION_API_BASE;
const REVALIDATE_SECONDS = 7 * 24 * 60 * 60; // 1 week

export type ScholarNewsPage = {
  id: string;
  total: number;
  limit: number;
  offset: number;
  media: MediaItem[];
};

export const fetchNewsPage = async (params: {
  scholarId: string;
  limit?: number;
  offset?: number;
}): Promise<ScholarNewsPage> => {
  const { scholarId, limit = 100, offset = 0 } = params;
  const base = getNewsApiBase();
  const url = `${base}/scholar/${encodeURIComponent(scholarId)}/news?limit=${encodeURIComponent(
    String(limit)
  )}&offset=${encodeURIComponent(String(offset))}`;

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    return { id: scholarId, total: 0, limit, offset, media: [] };
  }

  const data = (await response.json()) as Partial<ScholarNewsPage>;
  const media = Array.isArray(data.media) ? data.media : [];

  return {
    id: typeof data.id === "string" ? data.id : scholarId,
    total: typeof data.total === "number" ? data.total : media.length,
    limit: typeof data.limit === "number" ? data.limit : limit,
    offset: typeof data.offset === "number" ? data.offset : offset,
    media,
  };
};

/** Back-compat: returns the first page's media array. */
export const fetchAllNews = async (): Promise<MediaItem[]> => {
  const page = await fetchNewsPage({ scholarId: "ynWS968AAAAJ", limit: 100, offset: 0 });
  return page.media;
};
