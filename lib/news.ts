import { getMediaPage } from "@/data/media";
import type { MediaItem } from "@/types/media";

/** Default Scholar ID for Dr. Jodie Rummer (used for API shape compatibility). */
export const DEFAULT_SCHOLAR_ID = "ynWS968AAAAJ";

export type ScholarNewsPage = {
  id: string;
  total: number;
  limit: number;
  offset: number;
  media: MediaItem[];
};

/**
 * Local curated media page (replaces retired Scholar `/news` API).
 */
export const fetchNewsPage = (params: {
  scholarId?: string;
  limit?: number;
  offset?: number;
}): ScholarNewsPage => {
  const { scholarId = DEFAULT_SCHOLAR_ID, limit = 100, offset = 0 } = params;
  const page = getMediaPage({ limit, offset });

  return {
    id: scholarId,
    total: page.total,
    limit: page.limit,
    offset: page.offset,
    media: page.media,
  };
};
