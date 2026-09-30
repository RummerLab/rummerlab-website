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
