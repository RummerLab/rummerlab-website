/**
 * Curated regional collaborators for /collaborators.
 * Keep this list hardcoded for display; refresh affiliations / Scholar IDs with:
 *   pnpm run sync-collaborators-scholar
 */
import catalog from '@/data/collaborators.json';

export interface CollaboratorPerson {
  /** Display name, including honorific when known */
  name: string;
  affiliation: string;
  /** Profile or Scholar URL (optional) */
  url?: string;
  /** Google Scholar user id when known */
  scholarId?: string;
}

export interface CollaboratorRegion {
  id: string;
  title: string;
  people: CollaboratorPerson[];
}

export interface CollaboratorsCatalog {
  /** ISO date of last Scholar-assisted refresh */
  updatedFromScholarAt: string | null;
  note: string;
  regions: CollaboratorRegion[];
}

export const collaboratorsCatalog = catalog as CollaboratorsCatalog;

export const getCollaboratorHref = (person: CollaboratorPerson): string | undefined => {
  if (person.url) return person.url;
  if (person.scholarId) {
    return `https://scholar.google.com/citations?user=${person.scholarId}`;
  }
  return undefined;
};

const normalizeInstitution = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b(university|universite|universidade|universidad|the|of|and|at)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Match curated collaborators whose affiliation relates to a map institution. */
export const getCollaboratorsForInstitution = (university: string): CollaboratorPerson[] => {
  const needle = normalizeInstitution(university);
  if (!needle) return [];

  const needleTokens = needle.split(' ').filter((token) => token.length > 2);
  const people = collaboratorsCatalog.regions.flatMap((region) => region.people);

  return people.filter((person) => {
    const haystack = normalizeInstitution(person.affiliation);
    if (!haystack) return false;
    if (haystack.includes(needle) || needle.includes(haystack)) return true;
    const matchedTokens = needleTokens.filter((token) => haystack.includes(token));
    return matchedTokens.length >= Math.min(2, needleTokens.length);
  });
};
