import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | RummerLab',
  description: 'Latest blog posts and research updates from the RummerLab team',
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
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Latest research updates, insights, and stories from the RummerLab team
        </p>
      </div>

      {/* Blog Posts List */}
      <div className="max-w-4xl mx-auto space-y-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 md:p-8"
            >
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
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>

              {post.excerpt && (
                <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
                  <p className="text-gray-600 dark:text-gray-300">
                    {post.excerpt}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  href={`/blog/${post.slug}`}
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
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

