import { unstable_cache } from 'next/cache';

export const PAPER_METRICS_REVALIDATE_SECONDS = 86400;

export interface PaperMetrics {
  doi: string;
  crossref: number;
  altmetric: number;
  gscholar: number;
}

const API_BASE = 'https://api.rummerlab.com';

const fetchJson = async (url: string): Promise<unknown | null> => {
  try {
    const response = await fetch(url, {
      next: { revalidate: PAPER_METRICS_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(20_000),
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
};

const parsePaperMetrics = (doi: string, bodies: [unknown, unknown, unknown]): PaperMetrics => {
  const [crossrefBody, altmetricBody, gscholarBody] = bodies;

  const crossref =
    typeof (crossrefBody as { message?: { 'is-referenced-by-count'?: number } } | null)?.message?.[
      'is-referenced-by-count'
    ] === 'number'
      ? (crossrefBody as { message: { 'is-referenced-by-count': number } }).message[
          'is-referenced-by-count'
        ]
      : 0;

  const altmetricRaw = (altmetricBody as { score?: number } | null)?.score;
  const altmetric = typeof altmetricRaw === 'number' ? Math.round(altmetricRaw) : 0;

  const gscholarRaw = (gscholarBody as { citations?: number } | null)?.citations;
  const gscholar = typeof gscholarRaw === 'number' ? gscholarRaw : 0;

  return { doi, crossref, altmetric, gscholar };
};

const loadPaperMetrics = async (doi: string): Promise<PaperMetrics> => {
  const trimmed = doi.trim();
  if (!trimmed) {
    return { doi: '', crossref: 0, altmetric: 0, gscholar: 0 };
  }

  const encoded = encodeURIComponent(trimmed);

  const bodies = await Promise.all([
    fetchJson(`https://api.crossref.org/works/${encoded}`),
    fetchJson(`${API_BASE}/altmetric/${encoded}`),
    fetchJson(`${API_BASE}/google-citations/${encoded}`),
  ]);

  return parsePaperMetrics(trimmed, bodies);
};

export const getPaperMetrics = (doi: string): Promise<PaperMetrics> => {
  const trimmed = doi.trim();
  if (!trimmed) {
    return Promise.resolve({ doi: '', crossref: 0, altmetric: 0, gscholar: 0 });
  }

  return unstable_cache(() => loadPaperMetrics(trimmed), ['paper-metrics', trimmed], {
    revalidate: PAPER_METRICS_REVALIDATE_SECONDS,
  })();
};

const METRICS_CONCURRENCY = 8;

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  const worker = async () => {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await fn(items[current]!);
    }
  };

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

export interface PaperMetricsLookupOptions {
  scholarCitationsFallback?: number;
}

/** Batch-fetch metrics keyed by DOI (daily cache per DOI). */
export const getPapersMetricsMap = async (
  dois: string[],
  options?: PaperMetricsLookupOptions,
): Promise<Record<string, PaperMetrics>> => {
  const unique = [...new Set(dois.map((d) => d.trim()).filter(Boolean))];
  if (unique.length === 0) return {};

  const entries = await mapWithConcurrency(unique, METRICS_CONCURRENCY, async (doi) => {
    const metrics = await getPaperMetrics(doi);
    const fallback = options?.scholarCitationsFallback;
    const gscholar =
      metrics.gscholar > 0
        ? metrics.gscholar
        : typeof fallback === 'number' && fallback > 0
          ? fallback
          : metrics.gscholar;
    return [doi, { ...metrics, gscholar }] as const;
  });

  return Object.fromEntries(entries);
};

export const getPapersMetricsMapForPapers = async (
  papers: { doi?: string; scholar_citations?: number }[],
): Promise<Record<string, PaperMetrics>> => {
  const dois = papers.map((p) => p.doi).filter((d): d is string => Boolean(d?.trim()));
  const map: Record<string, PaperMetrics> = {};

  const unique = [...new Set(dois.map((d) => d.trim()))];
  const entries = await mapWithConcurrency(unique, METRICS_CONCURRENCY, async (doi) => {
    const paper = papers.find((p) => p.doi?.trim() === doi);
    const metrics = await getPaperMetrics(doi);
    const fallback = paper?.scholar_citations ?? 0;
    const gscholar = metrics.gscholar > 0 ? metrics.gscholar : fallback > 0 ? fallback : 0;
    return [doi, { ...metrics, gscholar }] as const;
  });

  for (const [doi, metrics] of entries) {
    map[doi] = metrics;
  }
  return map;
};

export const resolvePaperMetrics = (
  metricsByDoi: Record<string, PaperMetrics>,
  doi: string | undefined,
  scholarCitationsFallback = 0,
): PaperMetrics | null => {
  if (!doi?.trim()) return null;
  const key = doi.trim();
  const live = metricsByDoi[key];
  if (live) {
    const gscholar =
      live.gscholar > 0
        ? live.gscholar
        : scholarCitationsFallback > 0
          ? scholarCitationsFallback
          : 0;
    return { ...live, gscholar };
  }
  if (scholarCitationsFallback > 0) {
    return {
      doi: key,
      crossref: 0,
      altmetric: 0,
      gscholar: scholarCitationsFallback,
    };
  }
  return null;
};
