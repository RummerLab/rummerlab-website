import { FeaturedCoverImages } from '@/components/publications/FeaturedCoverImages';
import { OtherPublications } from '@/components/publications/OtherPublications';
import { PublicationsBrowser } from '@/components/publications/PublicationsBrowser';
import { PublicationsLinks } from '@/components/publications/PublicationsLinks';
import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { getJournalPapers, getOtherPapers } from '@/lib/papers';
import { getScholarProfileMetrics } from '@/lib/scholar-profile';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publications | RummerLab',
  description: 'Research papers and publications from RummerLab',
};

/** Refresh Scholar profile metrics and paper listing daily. */
export const revalidate = 86400;

export default async function Publications() {
  const journalPapers = getJournalPapers();
  const otherPapers = getOtherPapers();
  const metrics = await getScholarProfileMetrics();

  return (
    <PageShell>
      <PageHeader
        title="Publications"
        subtitle="Research papers and scientific publications from RummerLab"
      />

      <PublicationsLinks
        metrics={metrics}
        paperCount={journalPapers.length + otherPapers.length}
      />

      <PublicationsBrowser papers={journalPapers} />
      <OtherPublications papers={otherPapers} />
      <FeaturedCoverImages />
    </PageShell>
  );
}
