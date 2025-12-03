import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blog';
import BlogGallery from '@/components/BlogGallery';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | RummerLab',
    };
  }

  return {
    title: `${post.title} | RummerLab Blog`,
    description: post.excerpt || post.content.substring(0, 160),
  };
}

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        ← Back to Blog
      </Link>

      {/* Article Header */}
      <header className="mb-8">
        <time
          className="text-sm text-gray-500 dark:text-gray-400 block mb-4"
          dateTime={post.date}
        >
          {formatDate(post.date)}
        </time>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {post.title}
        </h1>

        {/* Journal and DOI */}
        {(post.journal || post.doi) && (
          <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            {post.journal && (
              <span className="font-medium">
                Published in:{' '}
                {post.journalUrl ? (
                  <a
                    href={post.journalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {post.journal}
                  </a>
                ) : (
                  post.journal
                )}
              </span>
            )}
            {post.journal && post.doi && <span className="mx-2">•</span>}
            {post.doi && (
              <span>
                DOI:{' '}
                <a
                  href={`https://doi.org/${post.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {post.doi}
                </a>
              </span>
            )}
          </div>
        )}

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Links */}
        {(post.paper || post.spotify) && (
          <div className="flex flex-wrap gap-4 mb-6">
            {post.paper && (
              <a
                href={post.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>📄</span>
                <span>Read Paper</span>
              </a>
            )}
            {post.spotify && (
              <a
                href={post.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <span>🎧</span>
                <span>Listen on Spotify</span>
              </a>
            )}
          </div>
        )}
      </header>

      {/* Article Content */}
      <article
        className="prose prose-lg prose-gray dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />

      {/* Gallery */}
      {post.gallery && post.gallery.length > 0 && (
        <BlogGallery images={post.gallery} />
      )}
    </div>
  );
}

