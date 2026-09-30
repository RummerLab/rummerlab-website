import { unstable_cache } from 'next/cache';
import { DEFAULT_SCHOLAR_ID, getScholarProfileById } from '@/lib/scholarly';

export interface ScholarProfileMetrics {
  name: string;
  citedby: number;
  citedby5y: number;
  hindex: number;
  hindex5y: number;
  i10index: number;
  i10index5y: number;
  profileUrl: string;
}

const EMPTY_METRICS: ScholarProfileMetrics = {
  name: 'Jodie L. Rummer',
  citedby: 0,
  citedby5y: 0,
  hindex: 0,
  hindex5y: 0,
  i10index: 0,
  i10index5y: 0,
  profileUrl: `https://scholar.google.com/citations?user=${DEFAULT_SCHOLAR_ID}&hl=en`,
};

const loadScholarProfileMetrics = async (
  scholarId: string,
): Promise<ScholarProfileMetrics> => {
  try {
    const profile = await getScholarProfileById(scholarId);
    if (!profile || Object.keys(profile).length === 0) {
      return EMPTY_METRICS;
    }

    return {
      name: typeof profile.name === 'string' ? profile.name : EMPTY_METRICS.name,
      citedby: Number(profile.citedby) || 0,
      citedby5y: Number(profile.citedby5y) || 0,
      hindex: Number(profile.hindex) || 0,
      hindex5y: Number(profile.hindex5y) || 0,
      i10index: Number(profile.i10index) || 0,
      i10index5y: Number(profile.i10index5y) || 0,
      profileUrl: EMPTY_METRICS.profileUrl,
    };
  } catch (error) {
    console.error('Error fetching scholar profile metrics:', error);
    return EMPTY_METRICS;
  }
};

/** Cached weekly — gscholar payload is large; avoid refetching every request. */
export const getScholarProfileMetrics = (
  scholarId = DEFAULT_SCHOLAR_ID,
): Promise<ScholarProfileMetrics> =>
  unstable_cache(
    () => loadScholarProfileMetrics(scholarId),
    ['scholar-profile-metrics', scholarId],
    { revalidate: 604800 },
  )();
