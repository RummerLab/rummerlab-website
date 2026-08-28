import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import { sanitizeSlugForUrl } from '@/lib/utils';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { ArticleCard } from '@/components/layout/ArticleCard';

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
    <PageShell>
      <PageHeader
        title="Athletes of the Reef podcast"
        subtitle="Athletes of the Reef brings you into the world of sharks and reef fishes pushing the limits of life in a changing ocean. Hosted by marine biologist Dr Jodie Rummer, along with guest host Alex Morgan, and the RummerLab team."
      />

      <div className="mx-auto max-w-5xl space-y-8">
        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted">No episodes yet. Check back soon!</p>
          </div>
        ) : (
          posts.map((post, index) => {
            const extraLinks = [
              post.paper && { href: post.paper, label: '📄 Read Paper', external: true },
              post.spotify && { href: post.spotify, label: '🎧 Listen on Spotify', external: true },
              post.youtube && { href: post.youtube, label: '▶️ Watch on YouTube', external: true },
            ].filter(Boolean) as { href: string; label: string; external: boolean }[];

            return (
              <ArticleCard
                key={post.slug}
                title={post.title}
                href={`/podcast/${sanitizeSlugForUrl(post.slug)}`}
                date={post.date}
                formattedDate={formatDate(post.date)}
                excerpt={post.excerpt}
                coverImage={post.coverImage}
                coverImageAlt={post.coverImageAlt}
                imageAriaLabel={`Episode artwork: ${post.title}`}
                index={index}
                extraLinks={extraLinks}
              />
            );
          })
        )}
      </div>
    </PageShell>
  );
}
