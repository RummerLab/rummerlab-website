import { FeaturedCoverImages } from '@/components/publications/FeaturedCoverImages';
import { OtherPublications } from '@/components/publications/OtherPublications';
import { PublicationsBrowser } from '@/components/publications/PublicationsBrowser';
import { PublicationsLinks } from '@/components/publications/PublicationsLinks';
import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { getPapersMetricsMapForPapers } from '@/lib/paper-metrics';
import { getJournalPapers, getOtherPapers, getPapers } from '@/lib/papers';
import { buildPublicationsListingSchema } from '@/lib/schema/publications';
import { getScholarProfileMetrics } from '@/lib/scholar-profile';
import type { Metadata } from 'next';

const PUBLICATIONS_URL = 'https://rummerlab.com/publications';
const DESCRIPTION =
  'Research papers and scientific publications from RummerLab at James Cook University — marine physiology, sharks, and climate change.';

export const metadata: Metadata = {
  title: 'Publications | RummerLab',
  description: DESCRIPTION,
  alternates: { canonical: PUBLICATIONS_URL },
  openGraph: {
    title: 'Publications | RummerLab',
    description: DESCRIPTION,
    url: PUBLICATIONS_URL,
    siteName: 'RummerLab',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Publications | RummerLab',
    description: DESCRIPTION,
    site: '@rummerlab',
    creator: '@rummerlab',
  },
};

/** Refresh Scholar profile metrics and paper listing daily. */
export const revalidate = 86400;

export default async function Publications() {
  const journalPapers = getJournalPapers();
  const otherPapers = getOtherPapers();
  const allPapers = getPapers();
  const [metrics, metricsByDoi] = await Promise.all([
    getScholarProfileMetrics(),
    getPapersMetricsMapForPapers(journalPapers),
  ]);

  const listingSchema = buildPublicationsListingSchema(allPapers);

  return (
    <PageShell>
      <JsonLd data={listingSchema} />
      <PageHeader
        title="Publications"
        subtitle="Research papers and scientific publications from RummerLab"
      />

      <PublicationsLinks
        metrics={metrics}
        paperCount={journalPapers.length + otherPapers.length}
      />

      <PublicationsBrowser papers={journalPapers} metricsByDoi={metricsByDoi} />
      <OtherPublications papers={otherPapers} />
      <FeaturedCoverImages />
    </PageShell>
  );
}
