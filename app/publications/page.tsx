import type { Metadata } from 'next';
import { PublicationsCards } from '@/components/PublicationsCards';
import { PaperCitation } from '@/components/PaperCitation';
import Link from 'next/link';
import { getPaperDisplayName, getPapers } from '@/lib/papers';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentCard } from '@/components/layout/ContentCard';

export const metadata: Metadata = {
  title: 'Publications | RummerLab',
  description: 'Research papers and publications from RummerLab',
};

export const dynamic = 'force-dynamic';

export default async function Publications() {
  const papers = getPapers();

  return (
    <PageShell>
      <PageHeader
        title="Publications"
        subtitle="Research papers and scientific publications from RummerLab"
      />

      <PublicationsCards />

      {papers.length > 0 && (
        <ContentCard reveal className="mt-12">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">PDF Papers</h2>
            <div className="mx-auto mb-4 h-1 w-20 rounded-full bg-blue-500" />
            <p className="text-lg text-muted">{papers.length} PDF Papers Available</p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="space-y-3">
              {papers.map((paper, index) => {
                const displayName = getPaperDisplayName(paper);
                return (
                  <div
                    key={paper.filename}
                    className="view-reveal rounded-xl border border-gray-200/60 bg-gray-50/50 p-4 transition-all duration-300 hover-lift dark:border-gray-800/60 dark:bg-gray-800/50 md:p-6"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="group flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        {paper.title ? (
                          <PaperCitation
                            paper={paper}
                            headingLevel="h3"
                            linkClassName="font-medium text-gray-900 dark:text-gray-100"
                          />
                        ) : (
                          <Link
                            href={paper.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400"
                          >
                            {displayName}
                          </Link>
                        )}
                      </div>
                      <span className="ml-4 shrink-0 text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ContentCard>
      )}
    </PageShell>
  );
}
