import { unstable_cache } from 'next/cache';
import { InstagramMedia, InstagramResponse, InstagramError } from '@/types/instagram';

const INSTAGRAM_API_URL = 'https://graph.instagram.com/v19.0';
const CACHE_TAG = 'instagram-posts';
const REVALIDATE_TIME = 3600; // 1 hour

/**
 * Fetches Instagram posts with caching
 * @returns Promise<InstagramMedia[]>
 */
export const getInstagramPosts = unstable_cache(
  async (): Promise<InstagramMedia[]> => {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    
    if (!accessToken) {
      console.error('Instagram access token not found');
      return [];
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

      const response = await fetch(
        `${INSTAGRAM_API_URL}/me/media?fields=${fields}&access_token=${accessToken}`,
        {
          headers: {
            'Accept': 'application/json',
          },
          next: {
            revalidate: REVALIDATE_TIME
          }
        }
      );

      if (!response.ok) {
        const error = (await response.json()) as InstagramError;
        throw new Error(`Instagram API error: ${error.error.message}`);
      }

      const data = (await response.json()) as InstagramResponse;
      
      return data.data.map(post => ({
        ...post,
        caption: post.caption || '',
      }));
    } catch (error) {
      console.error('Failed to fetch Instagram posts:', error);
      return [];
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