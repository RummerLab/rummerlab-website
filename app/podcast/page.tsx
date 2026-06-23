import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';
import { sanitizeSlugForUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Athletes of the Reef Podcast | RummerLab',
  description:
    'Athletes of the Reef brings you into the world of sharks and reef fishes pushing the limits of life in a changing ocean. Hosted by Dr Jodie Rummer and the RummerLab team.',
};

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export default function PodcastPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Athletes of the Reef podcast
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Athletes of the Reef brings you into the world of sharks and reef fishes pushing the
          limits of life in a changing ocean. Hosted by marine biologist Dr Jodie Rummer, along 
          with guest host Alex Morgan, and the RummerLab team, the series shares discoveries 
          from the Physioshark Project and collaborations across the Great Barrier Reef and Indo-Pacific.
          From heatwaves and low oxygen to surprising survival strategies, each episode reveals how these remarkable
          animals perform, adapt, and thrive — and what their stories mean for the future of our reefs.
        </p>
      </div>

      {/* Episode List */}
      <div className="max-w-5xl mx-auto space-y-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No episodes yet. Check back soon!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div
                className={`flex flex-col gap-6 p-6 md:p-8 ${post.coverImage ? 'sm:flex-row sm:items-stretch' : ''}`}
              >
                {post.coverImage && (
                  <Link
                    href={`/podcast/${sanitizeSlugForUrl(post.slug)}`}
                    className="relative mx-auto w-full max-w-md shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-16/10 sm:mx-0 sm:max-w-none sm:w-52 md:w-60 lg:w-64 sm:aspect-4/5 outline-offset-2 focus-visible:outline-2 focus-visible:outline-blue-500"
                    aria-label={`Episode artwork: ${post.title}`}
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt || post.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                      sizes="(max-width: 639px) 100vw, 256px"
                    />
                  </Link>
                )}

                <div className="min-w-0 flex-1 flex flex-col">
                  <div className="mb-4">
                    <time
                      className="text-sm text-gray-500 dark:text-gray-400"
                      dateTime={post.date}
                    >
                      {formatDate(post.date)}
                    </time>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    <Link
                      href={`/podcast/${sanitizeSlugForUrl(post.slug)}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {post.excerpt && (
                    <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
                      <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                    </div>
                  )}

                  <div className="mt-auto flex flex-wrap gap-4 items-center">
                    <Link
                      href={`/podcast/${sanitizeSlugForUrl(post.slug)}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Read more →
                    </Link>
                    {post.paper && (
                      <a
                        href={post.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
                      >
                        📄 Read Paper
                      </a>
                    )}
                    {post.spotify && (
                      <a
                        href={post.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
                      >
                        🎧 Listen on Spotify
                      </a>
                    )}
                    {post.youtube && (
                      <a
                        href={post.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
                      >
                        ▶️ Watch on YouTube
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
