import Image from 'next/image';
import Link from 'next/link';
import { getInstagramPosts, formatInstagramDate, getMediaUrl } from '@/lib/services/instagram';
import { FaInstagram } from 'react-icons/fa';
import type { InstagramMedia } from '@/types/instagram';

const MediaContent = ({ post }: { post: InstagramMedia }) => {
  if (post.media_type === 'CAROUSEL_ALBUM' && post.children?.data) {
    // Show first image from carousel
    const firstItem = post.children.data[0];
    return (
      <Image
        src={firstItem.media_type === 'VIDEO' && firstItem.thumbnail_url ? firstItem.thumbnail_url : firstItem.media_url}
        alt={post.caption || 'Instagram carousel post'}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
    );
  }

  return (
    <Image
      src={getMediaUrl(post)}
      alt={post.caption || 'Instagram post'}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
    />
  );
};

export default async function InstagramFeed() {
  const posts = await getInstagramPosts();

  if (!posts.length) {
    return (
      <div className="w-full p-6 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
        <FaInstagram className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No posts found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          We couldn&apos;t load the Instagram feed at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
        >
          <div className="aspect-square relative">
            <MediaContent post={post} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
              <div className="absolute inset-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                <p className="text-sm line-clamp-3">{post.caption}</p>
                <p className="text-xs mt-2">{formatInstagramDate(post.timestamp)}</p>
                {post.media_type === 'CAROUSEL_ALBUM' && (
                  <span className="absolute top-4 right-4 bg-white/20 px-2 py-1 rounded text-xs">
                    Multiple Photos
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 