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

/**
 * Only allow same-origin `/papers/...` PDF paths (blocks javascript: and external schemes).
 */
export const getSafePaperPdfHref = (url: string): string | null => {
  if (!url.startsWith('/papers/')) return null;
  if (url.includes(':') || url.includes('\\') || url.includes('\0')) return null;
  return url;
};

/** Build a DOI URL only when the value is a safe http(s) URL or bare DOI. */
export const getPaperDoiUrl = (doi: string): string | null => {
  const value = doi.trim();
  if (!value) return null;

  if (/^https?:\/\//i.test(value)) {
    try {
      const parsed = new URL(value);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
      return parsed.toString();
    } catch {
      return null;
    }
  }

  if (/[<>"']/.test(value) || /javascript:/i.test(value)) return null;
  return `https://doi.org/${encodeURI(value)}`;
};

export const getPaperScholarUrl = (scholarPubId: string): string =>
  `https://scholar.google.com/citations?view_op=view_citation&hl=en&user=${JODIE_SCHOLAR_ID}&citation_for_view=${encodeURIComponent(scholarPubId)}`;
