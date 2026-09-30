'use client';

import { useMemo, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';
import { sanitizePaperTitleHtml } from '@/lib/paper-title';
import {
  getPaperDoiUrl,
  getPaperScholarUrl,
  type Paper,
} from '@/lib/paper-shared';
import { PaperMetrics } from '@/components/publications/PaperMetrics';

interface PublicationsBrowserProps {
  papers: Paper[];
}

const formatAuthors = (authors: string[]): string => {
  if (authors.length === 0) return 'Unknown authors';
  if (authors.length <= 4) return authors.join(', ');

  const matchesRummer = (name: string) => /rummer/i.test(name);
  const rummerIndex = authors.findIndex(matchesRummer);
  const keep = new Set<number>([0, authors.length - 1]);
  if (rummerIndex > 0) keep.add(rummerIndex);

  const first = authors.slice(0, 2);
  const rest = [...keep]
    .filter((index) => index >= 2)
    .sort((a, b) => a - b)
    .map((index) => authors[index])
    .filter((name) => !first.includes(name));

  if (rest.length === 0) return `${first.join(', ')}, et al.`;
  return `${first.join(', ')}, … ${rest.join(', ')}`;
};

export const PublicationsBrowser = ({ papers }: PublicationsBrowserProps) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const years = useMemo(() => {
    const unique = Array.from(
      new Set(papers.map((paper) => paper.year).filter((year): year is number => year != null)),
    ).sort((a, b) => b - a);
    return ['all', ...unique.map(String)];
  }, [papers]);

  const filtered = useMemo(() => {
    if (selectedYear === 'all') return papers;
    const year = Number(selectedYear);
    return papers.filter((paper) => paper.year === year);
  }, [papers, selectedYear]);

  const byYear = useMemo(() => {
    const groups = new Map<number, Paper[]>();
    for (const paper of filtered) {
      const year = paper.year ?? 0;
      const list = groups.get(year) ?? [];
      list.push(paper);
      groups.set(year, list);
    }
    return [...groups.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([year, yearPapers]) => ({ year, papers: yearPapers }));
  }, [filtered]);

  const handleYearClick = (year: string) => {
    setSelectedYear(year);
  };

  const handleYearKeyDown = (event: KeyboardEvent<HTMLButtonElement>, year: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleYearClick(year);
    }
  };

  return (
    <section>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {years.map((year) => {
          const isActive = selectedYear === year;
          return (
            <button
              key={year}
              type="button"
              onClick={() => handleYearClick(year)}
              onKeyDown={(event) => handleYearKeyDown(event, year)}
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={year === 'all' ? 'Show all years' : `Filter year ${year}`}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {year === 'all' ? 'All Years' : year}
            </button>
          );
        })}
      </div>

      <div className="space-y-10">
        {byYear.map((group) => (
          <div key={group.year || 'unknown'}>
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {group.year || 'Undated'}
              </h2>
              <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-blue-500" />
            </div>

            <div className="space-y-4">
              {group.papers.map((paper) => {
                const titleHtml = sanitizePaperTitleHtml(paper.title ?? paper.name);
                const venue = paper.journal || paper.book;
                const viewUrl = paper.doi
                  ? getPaperDoiUrl(paper.doi)
                  : paper.url;
                const scholarUrl = paper.scholar_pub_id
                  ? getPaperScholarUrl(paper.scholar_pub_id)
                  : null;

                return (
                  <article
                    key={paper.filename}
                    className="hover-lift view-reveal rounded-2xl border border-gray-200/70 bg-white/90 p-5 dark:border-gray-800 dark:bg-gray-900/80 md:p-6"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                      <div className="min-w-0 flex-1 space-y-2">
                        <p className="text-sm text-muted">
                          {formatAuthors(paper.authors ?? [])}
                        </p>

                        <h3 className="text-base font-semibold leading-relaxed text-gray-900 dark:text-gray-50">
                          <Link
                            href={paper.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 dark:hover:text-blue-400"
                            dangerouslySetInnerHTML={{ __html: titleHtml }}
                          />
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          {venue ? (
                            <span className="font-medium italic text-blue-600 dark:text-blue-400">
                              {venue}
                            </span>
                          ) : null}
                          {paper.volume ? (
                            <>
                              <span className="text-muted">,</span>
                              <span className="font-semibold text-gray-800 dark:text-gray-200">
                                {paper.volume}
                              </span>
                            </>
                          ) : null}
                          {paper.pages ? (
                            <>
                              <span className="text-muted">,</span>
                              <span className="text-muted">{paper.pages}</span>
                            </>
                          ) : null}
                          {paper.year ? (
                            <span className="text-muted">({paper.year})</span>
                          ) : null}

                          <Link
                            href={viewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/40"
                          >
                            View
                            <HiExternalLink className="h-3 w-3" aria-hidden="true" />
                          </Link>

                          <Link
                            href={paper.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            PDF
                          </Link>

                          {scholarUrl ? (
                            <Link
                              href={scholarUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 hover:bg-orange-100 dark:bg-orange-950/30 dark:text-orange-300 dark:hover:bg-orange-900/40"
                            >
                              Scholar
                            </Link>
                          ) : null}
                        </div>
                      </div>

                      <PaperMetrics
                        doi={paper.doi}
                        scholarCitationsFallback={paper.scholar_citations ?? 0}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
