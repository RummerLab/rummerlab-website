import {
  getPaperDisplayName,
  getPaperDoiUrl,
  getSafePaperPdfHref,
  type Paper,
} from '@/lib/paper-shared';
import { sanitizePaperTitleHtml } from '@/lib/paper-title';

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
  const titleHtml = sanitizePaperTitleHtml(paper.title ?? displayName);
  const pdfHref = getSafePaperPdfHref(paper.url);
  const doiHref = paper.doi ? getPaperDoiUrl(paper.doi) : null;
  const citationParts = [
    paper.journal ? paper.journal : paper.book,
    paper.year ? String(paper.year) : null,
  ].filter(Boolean);

  return (
    <div>
      <Heading>
        {pdfHref ? (
          <a
            href={pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:text-blue-600 dark:hover:text-blue-400${linkClassName ? ` ${linkClassName}` : ''}`}
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />
        ) : (
          <span
            className={linkClassName || undefined}
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />
        )}
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
      {doiHref ? (
        <p className="mt-2 text-sm">
          <a
            href={doiHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            DOI
          </a>
        </p>
      ) : null}
    </div>
  );
};
