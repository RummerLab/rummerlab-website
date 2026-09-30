import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';
import { sanitizePaperTitleHtml } from '@/lib/paper-title';
import {
  getPaperDoiUrl,
  type Paper,
} from '@/lib/paper-shared';

interface OtherPublicationsProps {
  papers: Paper[];
}

const formatAuthors = (authors: string[]): string => {
  if (authors.length === 0) return 'Unknown authors';
  if (authors.length <= 4) return authors.join(', ');
  return `${authors.slice(0, 2).join(', ')}, et al.`;
};

export const OtherPublications = ({ papers }: OtherPublicationsProps) => {
  if (papers.length === 0) return null;

  return (
    <section className="mt-20" aria-labelledby="other-publications-heading">
      <div className="mb-8 text-center">
        <h2
          id="other-publications-heading"
          className="text-3xl font-bold tracking-wide text-gray-900 dark:text-gray-100 sm:text-4xl"
        >
          Other Publications
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted">
          Book chapters, encyclopedia entries, and other invited contributions.
        </p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
      </div>

      <ul className="mx-auto max-w-4xl space-y-6">
        {papers.map((paper) => {
          const titleHtml = sanitizePaperTitleHtml(paper.title ?? paper.name);
          const venue = paper.book ?? paper.journal ?? 'Publication';

          return (
            <li
              key={paper.filename}
              className="view-reveal rounded-xl border border-gray-200/60 bg-surface-elevated p-5 shadow-sm dark:border-gray-800/60"
            >
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {paper.year ? `${paper.year} · ` : ''}
                {venue}
              </p>
              <h3
                className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100"
                dangerouslySetInnerHTML={{ __html: titleHtml }}
              />
              {paper.authors && paper.authors.length > 0 && (
                <p className="mt-2 text-sm text-muted">{formatAuthors(paper.authors)}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                <Link
                  href={paper.url}
                  className="inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  aria-label={`Download PDF for ${paper.title ?? paper.name}`}
                >
                  PDF
                </Link>
                {paper.doi && (
                  <a
                    href={getPaperDoiUrl(paper.doi)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    aria-label={`Open DOI for ${paper.title ?? paper.name}`}
                  >
                    DOI
                    <HiExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
