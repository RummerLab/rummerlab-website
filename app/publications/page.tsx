import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { PublicationsBrowser } from '@/components/publications/PublicationsBrowser';
import { PublicationsLinks } from '@/components/publications/PublicationsLinks';
import { getPapers } from '@/lib/papers';
import { getScholarProfileMetrics } from '@/lib/scholar-profile';

export const metadata: Metadata = {
  title: 'Publications | RummerLab',
  description: 'Research papers and publications from RummerLab',
};

/** Refresh Scholar profile metrics and paper listing daily. */
export const revalidate = 86400;

export default async function Publications() {
  const papers = getPapers();
  const metrics = await getScholarProfileMetrics();

  return (
    <PageShell>
      <PageHeader
        title="Publications"
        subtitle="Research papers and scientific publications from RummerLab"
      />

      <PublicationsLinks metrics={metrics} paperCount={papers.length} />

      <PublicationsBrowser papers={papers} />
    </PageShell>
  );
}
