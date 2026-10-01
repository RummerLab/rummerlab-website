import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { HiExternalLink } from 'react-icons/hi';
import { PageShell } from '@/components/layout/PageShell';
import { PaperMetrics } from '@/components/publications/PaperMetrics';
import { JsonLd } from '@/components/seo/JsonLd';
import { getPaperMetrics, resolvePaperMetrics } from '@/lib/paper-metrics';
import {
  getPaperDisplayName,
  getPaperDetailPath,
  getPaperDoiUrl,
  getPaperScholarUrl,
  getPaperSlug,
  getSafePaperPdfHref,
  PAPERS_ORIGIN,
} from '@/lib/paper-shared';
import { getPaperBySlug, getPapers } from '@/lib/papers';
import { buildScholarlyArticleSchema } from '@/lib/schema/publications';
import { sanitizePaperTitleHtml } from '@/lib/paper-title';

interface PublicationDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400;

export async function generateStaticParams() {
  return getPapers().map((paper) => ({
    slug: getPaperSlug(paper.filename),
  }));
}

export async function generateMetadata({
  params,
}: PublicationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) {
    return { title: 'Publication Not Found | RummerLab' };
  }

  const title = `${getPaperDisplayName(paper)} | RummerLab`;
  const description =
    paper.abstract?.slice(0, 160) ??
    `${getPaperDisplayName(paper)} — ${paper.journal ?? paper.book ?? 'RummerLab publication'}.`;
  const url = `${PAPERS_ORIGIN}${getPaperDetailPath(paper.filename)}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'RummerLab',
      type: 'article',
      locale: 'en_US',
      publishedTime: paper.published ?? (paper.year ? `${paper.year}-01-01` : undefined),
      authors: paper.authors,
    },
    twitter: {
      card: 'summary',
      title,
      description,
      site: '@rummerlab',
      creator: '@rummerlab',
    },
    other: paper.doi
      ? {
          citation_doi: paper.doi.replace(/^https?:\/\/doi\.org\//i, ''),
        }
      : undefined,
  };
}

const formatAuthors = (authors: string[] | undefined): string => {
  if (!authors?.length) return 'Unknown authors';
  return authors.join(', ');
};

export default async function PublicationDetailPage({ params }: PublicationDetailPageProps) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) notFound();

  const metricsRecord = paper.doi
    ? { [paper.doi.trim()]: await getPaperMetrics(paper.doi) }
    : {};
  const metrics = resolvePaperMetrics(
    metricsRecord,
    paper.doi,
    paper.scholar_citations ?? 0,
  );

  const titleHtml = sanitizePaperTitleHtml(paper.title ?? paper.name);
  const pdfHref = getSafePaperPdfHref(paper.url);
  const doiHref = paper.doi ? getPaperDoiUrl(paper.doi) : null;
  const scholarUrl = paper.scholar_pub_id ? getPaperScholarUrl(paper.scholar_pub_id) : null;
  const venue = paper.journal ?? paper.book;

  const jsonLd = buildScholarlyArticleSchema(paper, metrics);

  return (
    <PageShell narrow>
      <JsonLd data={jsonLd} />
      <article className="mx-auto max-w-3xl">
        <p className="text-sm">
          <Link
            href="/publications"
            className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← All publications
          </Link>
        </p>

        <header className="mt-6 space-y-4">
          <p className="text-sm text-muted">{formatAuthors(paper.authors)}</p>
          <h1
            className="text-2xl font-bold leading-snug text-gray-900 dark:text-gray-50 sm:text-3xl"
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />
          {venue ? (
            <p className="text-lg font-medium italic text-blue-600 dark:text-blue-400">{venue}</p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            {paper.year ? <span>{paper.year}</span> : null}
            {paper.volume ? <span>Vol. {paper.volume}</span> : null}
            {paper.pages ? <span>pp. {paper.pages}</span> : null}
          </div>

          <div className="flex flex-wrap gap-3">
            {doiHref ? (
              <a
                href={doiHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300"
              >
                DOI
                <HiExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            ) : null}
            {pdfHref ? (
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100"
              >
                PDF
              </a>
            ) : null}
            {scholarUrl ? (
              <a
                href={scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700 dark:bg-orange-950/30 dark:text-orange-300"
              >
                Google Scholar
              </a>
            ) : null}
          </div>

          <PaperMetrics metrics={metrics} />
        </header>

        {paper.abstract ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Abstract</h2>
            <p className="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">{paper.abstract}</p>
          </section>
        ) : null}
      </article>
    </PageShell>
  );
}
