import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllSiteBlogSlugs, getSiteBlogPostBySlug } from '@/lib/site-blog';
import BlogGallery from '@/components/BlogGallery';
import { sanitizeSlugForUrl } from '@/lib/utils';
import { sanitizeHtml } from '@/lib/sanitize';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSiteBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getSiteBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | RummerLab',
    };
  }

  const title = `${post.title} | RummerLab`;
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
  };
}

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getSiteBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        ← Back to RummerLab blog
      </Link>

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

        {post.podcast && (
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Featured on: {post.podcast}
          </p>
        )}

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

        {post.spotify && (
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href={post.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 font-medium"
            >
              <span className="text-lg" aria-hidden="true">🎧</span>
              <span>Listen on Spotify</span>
            </a>
          </div>
        )}
      </header>

      <article
        className="prose prose-lg prose-gray dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.htmlContent) }}
      />

      {post.gallery && post.gallery.length > 0 && (
        <BlogGallery images={post.gallery} />
      )}
    </div>
  );
}
