const API_BASE = 'https://api.rummerlab.com';

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
  try {
    if (!id) {
      throw new Error('Id is empty.');
    }
    const url = `${API_BASE}/scholar/${encodeURIComponent(id)}`;
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
  const json = await getScholarById(scholarId);
  const publications = json?.publications;
  return Array.isArray(publications) ? publications : [];
}

export async function getCoAuthors(id: string) {
  if (!id) {
    return [];
  }
  const scholar = await getScholarById(id);
  return Array.isArray(scholar?.coauthors) ? scholar.coauthors : [];
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
