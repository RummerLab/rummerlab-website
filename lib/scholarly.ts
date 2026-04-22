const API_BASE = 'https://api.rummerlab.com';
const DEV_NEWS_BASE = 'http://localhost:5000';
const getNewsApiBase = () => (process.env.NODE_ENV === 'development' ? DEV_NEWS_BASE : API_BASE);

const FETCH_OPTIONS = {
  next: { revalidate: 604800 }, // 1 week
  signal: AbortSignal.timeout(15000),
} as const;

/** Safe default when external scholarly API is unreachable (e.g. at build time on Vercel). */
const EMPTY_SCHOLAR = {
  coauthors: [] as { scholar_id: string; name: string }[],
  publications: [],
};

export async function getScholarById(id: string) {
  return getScholarProfileById(id);
}

/** New split endpoint: profile only (no publications, no media). */
export async function getScholarProfileById(id: string) {
  try {
    if (!id) {
      throw new Error('Id is empty.');
    }
    const url = `${API_BASE}/scholar/${encodeURIComponent(id)}/gscholar`;
    const response = await fetch(url, FETCH_OPTIONS);

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      const errMsg = (errBody as { error?: string })?.error;
      console.error(
        `Scholarly API returned ${response.status} for ${url}`,
        errMsg ?? response.statusText
      );
      return EMPTY_SCHOLAR;
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching scholar data:', error);
    return EMPTY_SCHOLAR;
  }
}

/** Resolve scholar by name via GET /scholars then GET /scholar/<id> (no name-search on API). */
export async function getScholarByName(name: string) {
  if (!name) {
    throw new Error('Name is empty');
  }
  const listRes = await fetch(`${API_BASE}/scholars`, FETCH_OPTIONS);
  if (!listRes.ok) {
    const errBody = await listRes.json().catch(() => ({}));
    throw new Error(
      (errBody as { error?: string })?.error ?? `Could not list scholars (${listRes.status})`
    );
  }
  const { scholars } = (await listRes.json()) as { scholars: string[] };
  if (!Array.isArray(scholars)) {
    throw new Error('Invalid scholars response');
  }
  const normalizedName = name.trim().toLowerCase();
  for (const scholarId of scholars) {
    const scholar = await getScholarById(scholarId);
    if (!scholar || scholar === EMPTY_SCHOLAR) continue;
    const fullName =
      (scholar as { name?: string }).name ??
      (scholar as { full_name?: string }).full_name ??
      '';
    if (fullName.trim().toLowerCase() === normalizedName) {
      return scholar;
    }
  }
  throw new Error(`Author not found: ${name}`);
}

export async function getPublications(scholarId: string) {
  if (!scholarId) {
    throw new Error('Scholar ID is empty');
  }
  const page = await getPublicationsPage({ scholarId, limit: 50, offset: 0 });
  return Array.isArray(page.publications) ? page.publications : [];
}

export async function getCoAuthors(id: string) {
  if (!id) {
    return [];
  }
  const scholar = await getScholarById(id);
  return Array.isArray(scholar?.coauthors) ? scholar.coauthors : [];
}

export type ScholarNewsPage = {
  id: string;
  total: number;
  limit: number;
  offset: number;
  media: unknown[];
};

export async function getNewsPage(params: { scholarId: string; limit?: number; offset?: number }) {
  const { scholarId, limit = 100, offset = 0 } = params;
  if (!scholarId) {
    return { id: '', total: 0, limit, offset, media: [] } as const;
  }

  const base = getNewsApiBase();
  const url = `${base}/scholar/${encodeURIComponent(scholarId)}/news?limit=${encodeURIComponent(
    String(limit)
  )}&offset=${encodeURIComponent(String(offset))}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    if (!response.ok) {
      return { id: scholarId, total: 0, limit, offset, media: [] } as const;
    }
    const json = (await response.json()) as Partial<ScholarNewsPage>;
    return {
      id: typeof json.id === 'string' ? json.id : scholarId,
      total: typeof json.total === 'number' ? json.total : 0,
      limit: typeof json.limit === 'number' ? json.limit : limit,
      offset: typeof json.offset === 'number' ? json.offset : offset,
      media: Array.isArray(json.media) ? json.media : [],
    };
  } catch (error) {
    console.error('Error fetching scholar news:', error);
    return { id: scholarId, total: 0, limit, offset, media: [] } as const;
  }
}

export type ScholarPublicationsPage = {
  id: string;
  total: number;
  limit: number;
  offset: number;
  publications: unknown[];
};

export async function getPublicationsPage(params: { scholarId: string; limit?: number; offset?: number }) {
  const { scholarId, limit = 50, offset = 0 } = params;
  if (!scholarId) {
    return { id: '', total: 0, limit, offset, publications: [] } as const;
  }

  const url = `${API_BASE}/scholar/${encodeURIComponent(scholarId)}/publications?limit=${encodeURIComponent(
    String(limit)
  )}&offset=${encodeURIComponent(String(offset))}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    if (!response.ok) {
      return { id: scholarId, total: 0, limit, offset, publications: [] } as const;
    }
    const json = (await response.json()) as Partial<ScholarPublicationsPage>;
    return {
      id: typeof json.id === 'string' ? json.id : scholarId,
      total: typeof json.total === 'number' ? json.total : 0,
      limit: typeof json.limit === 'number' ? json.limit : limit,
      offset: typeof json.offset === 'number' ? json.offset : offset,
      publications: Array.isArray(json.publications) ? json.publications : [],
    };
  } catch (error) {
    console.error('Error fetching scholar publications:', error);
    return { id: scholarId, total: 0, limit, offset, publications: [] } as const;
  }
}

/** Scholar IDs from API (GET /scholars). */
export async function getAllowedScholarIds(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE}/scholars`, FETCH_OPTIONS);
    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      console.error(
        (errBody as { error?: string })?.error ?? `Scholars list failed: ${response.status}`
      );
      return [];
    }
    const json = (await response.json()) as { scholars?: string[] };
    const list = json?.scholars;
    return Array.isArray(list) ? list : [];
  } catch (error) {
    console.error('Error fetching scholar list:', error);
    return [];
  }
}

/** Not supported by api.rummerlab.com. */
export async function searchPublication(query: string) {
  void query;
  throw new Error('searchPublication is not supported by api.rummerlab.com');
}

/** Not supported by api.rummerlab.com. */
export async function publicationRelated(publicationId: string) {
  void publicationId;
  throw new Error('publicationRelated is not supported by api.rummerlab.com');
}

/** Not supported by api.rummerlab.com. */
export async function publicationCitedBy(publicationId: string) {
  void publicationId;
  throw new Error('publicationCitedBy is not supported by api.rummerlab.com');
}
