/**
 * Refresh curated collaborators.json from Google Scholar coauthors.
 *
 * Updates matching people (affiliation, scholarId, Scholar URL).
 * Prints Scholar coauthors not yet in the list.
 * Pass --add to append unmatched coauthors into a region by affiliation.
 *
 * Usage:
 *   pnpm run sync-collaborators-scholar
 *   pnpm run sync-collaborators-scholar -- --add
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SCHOLAR_ID = 'ynWS968AAAAJ';
const API_URL = `https://api.rummerlab.com/scholar/${SCHOLAR_ID}`;
const CATALOG_PATH = path.join(process.cwd(), 'data', 'collaborators.json');

interface CollaboratorPerson {
  name: string;
  affiliation: string;
  url?: string;
  scholarId?: string;
}

interface CollaboratorRegion {
  id: string;
  title: string;
  people: CollaboratorPerson[];
}

interface CollaboratorsCatalog {
  updatedFromScholarAt: string | null;
  note: string;
  regions: CollaboratorRegion[];
}

interface ScholarCoAuthor {
  name: string;
  affiliation?: string;
  scholar_id?: string;
}

const normalizeName = (name: string): string =>
  name
    .toLowerCase()
    .replace(/^(prof\.?|dr\.?|ms\.?|mr\.?)\s+/i, '')
    .replace(/,/g, ' ')
    .replace(/\bphd\b/g, '')
    .replace(/\./g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const nameKey = (name: string): string => {
  const parts = normalizeName(name).split(' ').filter(Boolean);
  if (parts.length === 0) return '';
  return `${parts[parts.length - 1]}|${parts[0][0]}`;
};

const regionForAffiliation = (affiliation: string): string => {
  const a = affiliation.toLowerCase();
  if (
    /hawaii|french polynesia|auckland|otago|james cook|queensland|sydney|macquarie|tasmania|griffith|deakin|aims|australian institute|unsw|new south wales|sardi|south australian|csiro|moorea|criobe|australia|new zealand/.test(
      a,
    )
  ) {
    return 'oceania';
  }
  if (
    /oslo|glasgow|copenhagen|montpellier|lisbon|fcul|liverpool|firenze|florence|neuch|perpignan|antwerp|exeter|portugal|denmark|norway|france|germany|switzerland|united kingdom|\buk\b/.test(
      a,
    )
  ) {
    return 'europe';
  }
  if (
    /british columbia|carleton|montreal|saskatchewan|dalhousie|miami|massachusetts|aquarium|texas|brown|florida|stanford|santa barbara|davis|delaware|alaska|west florida|desert botanical|canada|usa|united states|scripps|georgia|noaa|virginia|whitney|wilfrid/.test(
      a,
    )
  ) {
    return 'north-america';
  }
  if (/hong kong|china|jimei|abu dhabi|kaust|saudi|asia|japan|singapore/.test(a)) {
    return 'asia';
  }
  return 'oceania';
};

const main = async () => {
  const shouldAdd = process.argv.includes('--add');
  const catalog = JSON.parse(readFileSync(CATALOG_PATH, 'utf8')) as CollaboratorsCatalog;

  const response = await fetch(API_URL, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Scholar API failed: ${response.status}`);
  }
  const profile = (await response.json()) as { coauthors?: ScholarCoAuthor[] };
  const coauthors = Array.isArray(profile.coauthors) ? profile.coauthors : [];

  const byKey = new Map<string, ScholarCoAuthor>();
  for (const coauthor of coauthors) {
    byKey.set(nameKey(coauthor.name), coauthor);
    byKey.set(normalizeName(coauthor.name), coauthor);
  }

  let updated = 0;
  const matchedKeys = new Set<string>();

  for (const region of catalog.regions) {
    for (const person of region.people) {
      const match = byKey.get(nameKey(person.name)) || byKey.get(normalizeName(person.name));
      if (!match) continue;
      matchedKeys.add(nameKey(match.name));
      matchedKeys.add(normalizeName(match.name));

      let changed = false;
      if (match.affiliation && match.affiliation !== person.affiliation) {
        person.affiliation = match.affiliation;
        changed = true;
      }
      if (match.scholar_id && match.scholar_id !== person.scholarId) {
        person.scholarId = match.scholar_id;
        person.url = `https://scholar.google.com/citations?user=${match.scholar_id}`;
        changed = true;
      } else if (match.scholar_id && !person.url) {
        person.url = `https://scholar.google.com/citations?user=${match.scholar_id}`;
        changed = true;
      }
      if (changed) updated += 1;
    }
  }

  const unmatched = coauthors.filter((coauthor) => {
    if (/rummer/i.test(coauthor.name)) return false;
    const key = nameKey(coauthor.name);
    return !matchedKeys.has(key) && !matchedKeys.has(normalizeName(coauthor.name));
  });

  if (shouldAdd && unmatched.length > 0) {
    for (const coauthor of unmatched) {
      const regionId = regionForAffiliation(coauthor.affiliation || '');
      let region = catalog.regions.find((entry) => entry.id === regionId);
      if (!region) {
        region = catalog.regions[0];
      }
      region.people.push({
        name: coauthor.name,
        affiliation: coauthor.affiliation || '',
        url: coauthor.scholar_id
          ? `https://scholar.google.com/citations?user=${coauthor.scholar_id}`
          : undefined,
        scholarId: coauthor.scholar_id,
      });
    }
  }

  for (const region of catalog.regions) {
    region.people.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
  }

  catalog.updatedFromScholarAt = new Date().toISOString().slice(0, 10);
  writeFileSync(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');

  console.log(`Updated ${updated} existing collaborator(s) from Scholar.`);
  if (unmatched.length === 0) {
    console.log('All Scholar coauthors are already in the curated list.');
  } else {
    console.log(
      `${unmatched.length} Scholar coauthor(s) not in the curated list${shouldAdd ? ' (added)' : ''}:`,
    );
    for (const coauthor of unmatched) {
      console.log(`- ${coauthor.name} | ${coauthor.affiliation || '(no affiliation)'}`);
    }
    if (!shouldAdd) {
      console.log('Re-run with --add to append them into data/collaborators.json.');
    }
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
