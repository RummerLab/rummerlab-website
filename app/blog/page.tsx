import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllSiteBlogPosts } from '@/lib/site-blog';
import { sanitizeSlugForUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog | RummerLab',
  description:
    'RummerLab notes on shark physiology, reef science, Physioshark fieldwork, and public conversations about a changing ocean.',
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

export default function BlogPage() {
  const posts = getAllSiteBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          RummerLab blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Notes from the lab: shark and reef physiology, Physioshark fieldwork on Mo&apos;orea,
          and the public conversations that follow the science.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No posts yet. Check back soon!
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
                    href={`/blog/${sanitizeSlugForUrl(post.slug)}`}
                    className="relative mx-auto w-full max-w-md shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-16/10 sm:mx-0 sm:max-w-none sm:w-52 md:w-60 lg:w-64 sm:aspect-4/5 outline-offset-2 focus-visible:outline-2 focus-visible:outline-blue-500"
                    aria-label={`Post image: ${post.title}`}
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
                      href={`/blog/${sanitizeSlugForUrl(post.slug)}`}
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
                      href={`/blog/${sanitizeSlugForUrl(post.slug)}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Read more →
                    </Link>
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
