'use client';

import { useMemo, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';
import { sanitizePaperTitleHtml } from '@/lib/paper-title';
import {
  getPaperDoiUrl,
  getSafePaperPdfHref,
  getPaperScholarUrl,
  type Paper,
} from '@/lib/paper-shared';
import { getPaperDetailPath } from '@/lib/paper-shared';
import { PaperMetrics } from '@/components/publications/PaperMetrics';
import { resolvePaperMetrics, type PaperMetrics as PaperMetricsData } from '@/lib/paper-metrics';

interface PublicationsBrowserProps {
  papers: Paper[];
  metricsByDoi: Record<string, PaperMetricsData>;
}

interface YearFilterOption {
  id: string;
  label: string;
  /** Inclusive year range; omitted for "all". */
  minYear?: number;
  maxYear?: number;
}

/** Years at or above this stay as individual filter chips; older years group by decade. */
const RECENT_YEAR_FLOOR = 2020;

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

const buildYearFilters = (paperYears: number[]): YearFilterOption[] => {
  const unique = Array.from(new Set(paperYears)).sort((a, b) => b - a);
  const recent = unique.filter((year) => year >= RECENT_YEAR_FLOOR);
  const older = unique.filter((year) => year < RECENT_YEAR_FLOOR);

  const decadeRanges = new Map<number, { min: number; max: number }>();
  for (const year of older) {
    const decadeStart = Math.floor(year / 10) * 10;
    const existing = decadeRanges.get(decadeStart);
    if (existing) {
      existing.min = Math.min(existing.min, year);
      existing.max = Math.max(existing.max, year);
    } else {
      decadeRanges.set(decadeStart, { min: year, max: year });
    }
  }

  const decades = [...decadeRanges.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([, range]) => ({
      id: `${range.min}-${range.max}`,
      label: `${range.min}–${range.max}`,
      minYear: range.min,
      maxYear: range.max,
    }));

  return [
    { id: 'all', label: 'All Years' },
    ...recent.map((year) => ({
      id: String(year),
      label: String(year),
      minYear: year,
      maxYear: year,
    })),
    ...decades,
  ];
};

const paperMatchesFilter = (paper: Paper, filter: YearFilterOption): boolean => {
  if (filter.id === 'all') return true;
  if (paper.year == null || filter.minYear == null || filter.maxYear == null) return false;
  return paper.year >= filter.minYear && paper.year <= filter.maxYear;
};

export const PublicationsBrowser = ({ papers, metricsByDoi }: PublicationsBrowserProps) => {
  const [selectedFilterId, setSelectedFilterId] = useState<string>('all');

  const yearFilters = useMemo(() => {
    const years = papers
      .map((paper) => paper.year)
      .filter((year): year is number => year != null);
    return buildYearFilters(years);
  }, [papers]);

  const activeFilter = useMemo(
    () => yearFilters.find((filter) => filter.id === selectedFilterId) ?? yearFilters[0],
    [yearFilters, selectedFilterId],
  );

  const filtered = useMemo(
    () => papers.filter((paper) => paperMatchesFilter(paper, activeFilter)),
    [papers, activeFilter],
  );

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

  const handleFilterClick = (filterId: string) => {
    setSelectedFilterId(filterId);
  };

  const handleFilterKeyDown = (event: KeyboardEvent<HTMLButtonElement>, filterId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleFilterClick(filterId);
    }
  };

  return (
    <section>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {yearFilters.map((filter) => {
          const isActive = selectedFilterId === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => handleFilterClick(filter.id)}
              onKeyDown={(event) => handleFilterKeyDown(event, filter.id)}
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={
                filter.id === 'all' ? 'Show all years' : `Filter years ${filter.label}`
              }
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label}
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
                const pdfHref = getSafePaperPdfHref(paper.url);
                const doiHref = paper.doi ? getPaperDoiUrl(paper.doi) : null;
                const viewUrl = doiHref ?? pdfHref;
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
                            href={getPaperDetailPath(paper.filename)}
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

                          {viewUrl ? (
                            <a
                              href={viewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/40"
                            >
                              View
                              <HiExternalLink className="h-3 w-3" aria-hidden="true" />
                            </a>
                          ) : null}

                          {pdfHref ? (
                            <a
                              href={pdfHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                              PDF
                            </a>
                          ) : null}

                          {scholarUrl ? (
                            <a
                              href={scholarUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 hover:bg-orange-100 dark:bg-orange-950/30 dark:text-orange-300 dark:hover:bg-orange-900/40"
                            >
                              Scholar
                            </a>
                          ) : null}
                        </div>
                      </div>

                      <PaperMetrics
                        metrics={resolvePaperMetrics(
                          metricsByDoi,
                          paper.doi,
                          paper.scholar_citations ?? 0,
                        )}
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
