import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blog';
import BlogGallery from '@/components/BlogGallery';
import { sanitizeSlugForUrl } from '@/lib/utils';
import { sanitizeHtml } from '@/lib/sanitize';

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

  const title = `${post.title} | RummerLab Blog`;
  const description = post.excerpt || post.content.substring(0, 160);
  const url = `https://rummerlab.com/blog/${sanitizeSlugForUrl(slug)}`;
  const coverImageUrl = post.coverImage 
    ? `https://rummerlab.com${post.coverImage}`
    : 'https://rummerlab.com/images/rummerlab_logo_transparent.png';
  const coverImageAlt = post.coverImageAlt || post.title;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'RummerLab',
      images: [
        {
          url: coverImageUrl,
          width: 1200,
          height: 630,
          alt: coverImageAlt,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: ['RummerLab'],
      ...(post.journal && {
        section: post.journal,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [coverImageUrl],
      creator: '@rummerlab',
      site: '@rummerlab',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...(post.doi && {
      other: {
        'citation_doi': post.doi,
        ...(post.journal && {
          'citation_journal_title': post.journal,
        }),
      },
    }),
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

        {/* Journal, DOI, and Podcast */}
        {(post.journal || post.doi || post.podcast) && (
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
            {(post.journal || post.doi) && post.podcast && <span className="mx-2">•</span>}
            {post.podcast && (
              <span className="font-medium">
                Featured on: {post.podcast}
              </span>
            )}
          </div>
        )}

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Links */}
        {(post.paper || post.spotify || post.youtube) && (
          <div className="flex flex-wrap gap-3 mb-6">
            {post.paper && (
              <a
                href={post.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 font-medium"
              >
                <span className="text-lg" aria-hidden="true">📄</span>
                <span>Read Paper</span>
              </a>
            )}
            {post.spotify && (
              <a
                href={post.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 font-medium"
              >
                <span className="text-lg" aria-hidden="true">🎧</span>
                <span>Listen on Spotify</span>
              </a>
            )}
            {post.youtube && (
              <a
                href={post.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-400/30 transform hover:-translate-y-0.5 focus:outline-hidden focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 font-medium"
              >
                <span className="text-lg" aria-hidden="true">▶️</span>
                <span>Watch on YouTube</span>
              </a>
            )}
          </div>
        )}
      </header>

      {/* Article Content */}
      <article
        className="prose prose-lg prose-gray dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.htmlContent) }}
      />

      {/* Gallery */}
      {post.gallery && post.gallery.length > 0 && (
        <BlogGallery images={post.gallery} />
      )}
    </div>
  );
}

