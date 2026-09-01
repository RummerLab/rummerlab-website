import type { Metadata } from 'next';
import { DEFAULT_SCHOLAR_ID, fetchNewsPage } from '@/lib/news';
import { MediaCoverageList } from './MediaCoverageList';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Media | Dr. Jodie Rummer',
  description:
    "Media appearances, interviews, and news coverage featuring Dr. Jodie Rummer's research and expertise in marine biology and conservation.",
};

export default function MediaPage() {
  const page = fetchNewsPage({ scholarId: DEFAULT_SCHOLAR_ID, limit: 100, offset: 0 });

  return (
    <PageShell>
      <PageHeader
        title="Media Coverage"
        subtitle="Featured interviews, news coverage, and public engagement in marine science and conservation."
      />

      <section className="mx-auto max-w-4xl" aria-labelledby="latest-articles">
        <h2
          id="latest-articles"
          className="view-reveal mb-8 text-2xl font-semibold text-gray-900 dark:text-gray-100"
        >
          Latest Media Coverage
        </h2>
        <MediaCoverageList
          initialItems={page.media}
          initialTotal={page.total}
          initialLimit={page.limit}
          initialOffset={page.offset}
        />
      </section>
    </PageShell>
  );
}
