import { type MediaItem } from '@/types/media';
import mediaData from './media.json';

export type { MediaItem, MediaSource } from '@/types/media';
export { getMediaSources } from '@/types/media';

const mediaItems = mediaData as MediaItem[];

const sortMediaByDateDesc = (items: MediaItem[]): MediaItem[] => {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const getSortedMediaItems = (): MediaItem[] => {
  return sortMediaByDateDesc(mediaItems);
};

export const getMediaByType = (type: MediaItem['type']) => {
  return mediaItems.filter((item) => item.type === type);
};

export const getFeaturedMedia = (count: number = 3) => {
  return getSortedMediaItems().slice(0, count);
};

export type MediaPage = {
  total: number;
  limit: number;
  offset: number;
  media: MediaItem[];
};

export const getMediaPage = (params: {
  limit?: number;
  offset?: number;
}): MediaPage => {
  const limit = Math.max(0, params.limit ?? 100);
  const offset = Math.max(0, params.offset ?? 0);
  const sorted = getSortedMediaItems();

  return {
    total: sorted.length,
    limit,
    offset,
    media: sorted.slice(offset, offset + limit),
  };
};
