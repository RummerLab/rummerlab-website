import { unstable_cache } from 'next/cache';
import { InstagramMedia, InstagramResponse, InstagramError } from '@/types/instagram';

const INSTAGRAM_API_URL = 'https://graph.instagram.com/v19.0';
const CACHE_TAG = 'instagram-posts';
const REVALIDATE_TIME = 3600; // 1 hour
const DEFAULT_POST_LIMIT = 99; // Default number of posts to fetch

interface FetchPostsOptions {
  limit?: number;
  after?: string;
}

/**
 * Fetches Instagram posts with caching
 * @param options.limit - Number of posts to fetch (default: 9)
 * @param options.after - Pagination cursor for fetching next page
 * @returns Promise<{ posts: InstagramMedia[]; hasMore: boolean; nextCursor?: string }>
 */
export const getInstagramPosts = unstable_cache(
  async (options: FetchPostsOptions = {}) => {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const limit = options.limit || DEFAULT_POST_LIMIT;
    
    if (!accessToken) {
      console.error('Instagram access token not found');
      return { posts: [], hasMore: false };
    }

    try {
      const fields = [
        'id',
        'caption',
        'media_type',
        'media_url',
        'permalink',
        'thumbnail_url',
        'timestamp',
        'username',
        'children{id,media_type,media_url,thumbnail_url}'
      ].join(',');

      const url = new URL(`${INSTAGRAM_API_URL}/me/media`);
      url.searchParams.append('fields', fields);
      url.searchParams.append('access_token', accessToken);
      url.searchParams.append('limit', limit.toString());
      
      if (options.after) {
        url.searchParams.append('after', options.after);
      }

      const response = await fetch(url.toString(), {
        headers: {
          'Accept': 'application/json',
        },
        next: {
          revalidate: REVALIDATE_TIME
        }
      });

      if (!response.ok) {
        const error = (await response.json()) as InstagramError;
        throw new Error(`Instagram API error: ${error.error.message}`);
      }

      const data = (await response.json()) as InstagramResponse;
      
      return {
        posts: data.data.map(post => ({
          ...post,
          caption: post.caption || '',
        })),
        hasMore: !!data.paging?.next,
        nextCursor: data.paging?.cursors.after
      };
    } catch (error) {
      console.error('Failed to fetch Instagram posts:', error);
      return { posts: [], hasMore: false };
    }
  },
  ['instagram-posts'],
  {
    revalidate: REVALIDATE_TIME,
    tags: [CACHE_TAG],
  }
);

/**
 * Formats the Instagram post timestamp into a human-readable format
 */
export const formatInstagramDate = (timestamp: string): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Gets the appropriate media URL based on the media type
 */
export const getMediaUrl = (post: InstagramMedia): string => {
  if (post.media_type === 'VIDEO' && post.thumbnail_url) {
    return post.thumbnail_url;
  }
  return post.media_url;
}; 