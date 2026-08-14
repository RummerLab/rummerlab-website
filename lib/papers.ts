import fs from 'fs';
import path from 'path';

export interface Paper {
  filename: string;
  name: string;
  year: number | null;
  url: string;
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

const comparePapers = (a: Paper, b: Paper): number => {
  const yearDiff = (b.year ?? 0) - (a.year ?? 0);
  if (yearDiff !== 0) {
    return yearDiff;
  }
  return a.name.localeCompare(b.name);
};

const toPaperUrl = (filename: string, origin?: string): string => {
  const encoded = encodeURIComponent(filename);
  if (origin) {
    return `${origin}/papers/${encoded}`;
  }
  return `/papers/${encoded}`;
};

export const getPapers = (options?: { origin?: string }): Paper[] => {
  const papersDirectory = path.join(process.cwd(), 'public', 'papers');

  if (!fs.existsSync(papersDirectory)) {
    return [];
  }

  return fs
    .readdirSync(papersDirectory)
    .filter((file) => file.toLowerCase().endsWith('.pdf'))
    .map((filename) => ({
      filename,
      name: filename.replace(/\.pdf$/i, ''),
      year: getYearFromFilename(filename),
      url: toPaperUrl(filename, options?.origin),
    }))
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
