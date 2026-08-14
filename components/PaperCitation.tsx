import Link from 'next/link';
import {
  getPaperDisplayName,
  getPaperDoiUrl,
  type Paper,
} from '@/lib/papers';

interface PaperCitationProps {
  paper: Paper;
  headingLevel?: 'h3' | 'span';
  linkClassName?: string;
}

export const PaperCitation = ({
  paper,
  headingLevel = 'span',
  linkClassName = '',
}: PaperCitationProps) => {
  const Heading = headingLevel;
  const displayName = getPaperDisplayName(paper);
  const citationParts = [
    paper.journal ? paper.journal : paper.book,
    paper.year ? String(paper.year) : null,
  ].filter(Boolean);

  return (
    <div>
      <Heading>
        <Link
          href={paper.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:text-blue-600 dark:hover:text-blue-400${linkClassName ? ` ${linkClassName}` : ''}`}
        >
          {displayName}
        </Link>
      </Heading>
      {paper.authors?.length ? (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {paper.authors.join(', ')}
        </p>
      ) : null}
      {citationParts.length > 0 ? (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {citationParts.join(', ')}
        </p>
      ) : null}
      {paper.doi ? (
        <p className="mt-2 text-sm">
          <Link
            href={getPaperDoiUrl(paper.doi)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            DOI
          </Link>
        </p>
      ) : null}
    </div>
  );
};
