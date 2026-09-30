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
  scholar_pub_id?: string;
  scholar_citations?: number;
}

export interface PapersPage {
  total: number;
  limit: number;
  papers: Paper[];
}

export const PAPERS_ORIGIN = 'https://rummerlab.com';
export const DEFAULT_FEATURED_LIMIT = 5;
export const JODIE_SCHOLAR_ID = 'ynWS968AAAAJ';
export const JODIE_SCHOLAR_PROFILE_URL =
  `https://scholar.google.com/citations?user=${JODIE_SCHOLAR_ID}&hl=en`;
export const RUMMERLAB_GITHUB_URL = 'https://github.com/RummerLab/';

export const getYearFromFilename = (filename: string): number | null => {
  const match = filename.match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : null;
};

export const getPaperDisplayName = (paper: Pick<Paper, 'title' | 'name'>): string =>
  paper.title ?? paper.name;

export const getPaperDoiUrl = (doi: string): string =>
  doi.startsWith('http') ? doi : `https://doi.org/${doi}`;

export const getPaperScholarUrl = (scholarPubId: string): string =>
  `https://scholar.google.com/citations?view_op=view_citation&hl=en&user=${JODIE_SCHOLAR_ID}&citation_for_view=${encodeURIComponent(scholarPubId)}`;
