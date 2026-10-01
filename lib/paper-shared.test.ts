import { describe, expect, it } from 'vitest';
import {
  getPaperDetailPath,
  getPaperDoiUrl,
  getPaperSlug,
  getSafePaperPdfHref,
  getYearFromFilename,
} from '@/lib/paper-shared';

describe('getSafePaperPdfHref', () => {
  it('allows same-origin /papers paths', () => {
    expect(getSafePaperPdfHref('/papers/example.pdf')).toBe('/papers/example.pdf');
  });

  it('rejects external schemes and unsafe paths', () => {
    expect(getSafePaperPdfHref('https://evil.example/x.pdf')).toBeNull();
    expect(getSafePaperPdfHref('javascript:alert(1)')).toBeNull();
    expect(getSafePaperPdfHref('/papers/../etc/passwd')).toBe('/papers/../etc/passwd');
    // Colon / backslash / null byte blocked
    expect(getSafePaperPdfHref('/papers/bad:file.pdf')).toBeNull();
    expect(getSafePaperPdfHref('/papers\\escape.pdf')).toBeNull();
  });
});

describe('getPaperDoiUrl', () => {
  it('builds doi.org URLs for bare DOIs', () => {
    expect(getPaperDoiUrl('10.1000/xyz')).toBe('https://doi.org/10.1000/xyz');
  });

  it('accepts existing https DOI URLs', () => {
    expect(getPaperDoiUrl('https://doi.org/10.1000/xyz')).toBe('https://doi.org/10.1000/xyz');
  });

  it('rejects javascript and markup', () => {
    expect(getPaperDoiUrl('javascript:alert(1)')).toBeNull();
    expect(getPaperDoiUrl('<script>')).toBeNull();
    expect(getPaperDoiUrl('')).toBeNull();
  });
});

describe('getPaperSlug and getPaperDetailPath', () => {
  it('strips .pdf and URL-encodes the slug path', () => {
    expect(getPaperSlug('Spaet, Mourier, and Rummer 2026.pdf')).toBe(
      'Spaet, Mourier, and Rummer 2026',
    );
    expect(getPaperDetailPath('Spaet, Mourier, and Rummer 2026.pdf')).toBe(
      `/publications/${encodeURIComponent('Spaet, Mourier, and Rummer 2026')}`,
    );
  });
});

describe('getYearFromFilename', () => {
  it('extracts a four-digit year', () => {
    expect(getYearFromFilename('Peele et al., 2026 Brain.pdf')).toBe(2026);
    expect(getYearFromFilename('no-year.pdf')).toBeNull();
  });
});
