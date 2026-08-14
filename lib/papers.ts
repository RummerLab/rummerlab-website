import fs from 'fs';
import path from 'path';
import { getPaperMetadata, type PaperMetadataRecord } from '@/data/papers';

export interface Paper {
  filename: string;
  name: string;
  year: number | null;
  url: string;
  title?: string;
  authors?: string[];
  journal?: string;
  book?: string;
  doi?: string;
  abstract?: string;
  published?: string;
  volume?: string;
  issue?: string;
  pages?: string;
}

export interface PapersPage {
  total: number;
  limit: number;
  papers: Paper[];
}

export const PAPERS_ORIGIN = 'https://rummerlab.com';
export const DEFAULT_FEATURED_LIMIT = 5;

export const getYearFromFilename = (filename: string): number | null => {
  const match = filename.match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : null;
};

export const getPaperDisplayName = (paper: Pick<Paper, 'title' | 'name'>): string =>
  paper.title ?? paper.name;

export const getPaperDoiUrl = (doi: string): string =>
  doi.startsWith('http') ? doi : `https://doi.org/${doi}`;

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
