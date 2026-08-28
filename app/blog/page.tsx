import { Metadata } from 'next';
import { getAllSiteBlogPosts } from '@/lib/site-blog';
import { sanitizeSlugForUrl } from '@/lib/utils';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { ArticleCard } from '@/components/layout/ArticleCard';

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
    <PageShell>
      <PageHeader
        title="RummerLab blog"
        subtitle="Notes from the lab: shark and reef physiology, Physioshark fieldwork on Mo'orea, and the public conversations that follow the science."
      />

      <div className="mx-auto max-w-5xl space-y-8">
        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted">No posts yet. Check back soon!</p>
          </div>
        ) : (
          posts.map((post, index) => (
            <ArticleCard
              key={post.slug}
              title={post.title}
              href={`/blog/${sanitizeSlugForUrl(post.slug)}`}
              date={post.date}
              formattedDate={formatDate(post.date)}
              excerpt={post.excerpt}
              coverImage={post.coverImage}
              coverImageAlt={post.coverImageAlt}
              imageAriaLabel={`Post image: ${post.title}`}
              index={index}
              extraLinks={
                post.spotify
                  ? [{ href: post.spotify, label: '🎧 Listen on Spotify', external: true }]
                  : []
              }
            />
          ))
        )}
      </div>
    </PageShell>
  );
}
