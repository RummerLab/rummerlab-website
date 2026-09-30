import fs from 'fs';
import path from 'path';
import { getPaperMetadata, type PaperMetadataRecord } from '@/data/papers';
import {
  DEFAULT_FEATURED_LIMIT,
  getPaperDisplayName,
  getYearFromFilename,
  type Paper,
  type PapersPage,
} from '@/lib/paper-shared';

export type { Paper, PapersPage } from '@/lib/paper-shared';
export {
  DEFAULT_FEATURED_LIMIT,
  getPaperDisplayName,
  getPaperDoiUrl,
  getPaperScholarUrl,
  getYearFromFilename,
  JODIE_SCHOLAR_ID,
  JODIE_SCHOLAR_PROFILE_URL,
  PAPERS_ORIGIN,
  RUMMERLAB_GITHUB_URL,
} from '@/lib/paper-shared';

const comparePapers = (a: Paper, b: Paper): number => {
  const yearDiff = (b.year ?? 0) - (a.year ?? 0);
  if (yearDiff !== 0) {
    return yearDiff;
  }
  return getPaperDisplayName(a).localeCompare(getPaperDisplayName(b));
};

const toPaperUrl = (filename: string, origin?: string): string => {
  const encoded = encodeURIComponent(filename);
  if (origin) {
    return `${origin}/papers/${encoded}`;
  }
  return `/papers/${encoded}`;
};

const mergePaperMetadata = (
  filename: string,
  metadata: PaperMetadataRecord | undefined,
  options?: { origin?: string },
): Paper => {
  const name = filename.replace(/\.pdf$/i, '');
  const year = metadata?.year ?? getYearFromFilename(filename);

  return {
    filename,
    name,
    year,
    url: toPaperUrl(filename, options?.origin),
    ...(metadata?.title ? { title: metadata.title } : {}),
    ...(metadata?.authors?.length ? { authors: metadata.authors } : {}),
    ...(metadata?.journal ? { journal: metadata.journal } : {}),
    ...(metadata?.book ? { book: metadata.book } : {}),
    ...(metadata?.doi ? { doi: metadata.doi } : {}),
    ...(metadata?.abstract ? { abstract: metadata.abstract } : {}),
    ...(metadata?.published ? { published: metadata.published } : {}),
    ...(metadata?.volume ? { volume: metadata.volume } : {}),
    ...(metadata?.issue ? { issue: metadata.issue } : {}),
    ...(metadata?.pages ? { pages: metadata.pages } : {}),
    ...(metadata?.scholar_pub_id ? { scholar_pub_id: metadata.scholar_pub_id } : {}),
    ...(typeof metadata?.scholar_citations === 'number'
      ? { scholar_citations: metadata.scholar_citations }
      : {}),
  };
};

export const getPapers = (options?: { origin?: string }): Paper[] => {
  const papersDirectory = path.join(process.cwd(), 'public', 'papers');

  if (!fs.existsSync(papersDirectory)) {
    return [];
  }

  return fs
    .readdirSync(papersDirectory)
    .filter((file) => file.toLowerCase().endsWith('.pdf'))
    .map((filename) => mergePaperMetadata(filename, getPaperMetadata(filename), options))
    .sort(comparePapers);
};

/** Peer-reviewed journal articles (excludes book chapters / encyclopedia entries). */
export const getJournalPapers = (options?: { origin?: string }): Paper[] =>
  getPapers(options).filter((paper) => !paper.book);

/** Book chapters, encyclopedia entries, and other non-journal publications. */
export const getOtherPapers = (options?: { origin?: string }): Paper[] =>
  getPapers(options).filter((paper) => Boolean(paper.book));

export const getFeaturedPapersPage = (
  limit = DEFAULT_FEATURED_LIMIT,
  options?: { origin?: string },
): PapersPage => {
  const papers = getPapers(options);
  const parsedLimit = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : DEFAULT_FEATURED_LIMIT;
  const featured = papers.slice(0, parsedLimit);

  return {
    total: papers.length,
    limit: parsedLimit,
    papers: featured,
  };
};

export const getFeaturedPapers = (
  limit = DEFAULT_FEATURED_LIMIT,
  options?: { origin?: string },
): Paper[] => {
  return getFeaturedPapersPage(limit, options).papers;
};
