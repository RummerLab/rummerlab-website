import sanitizeHtml from 'sanitize-html';

/** Species names italicized when titles lack explicit <i> markup. */
const SPECIES_NAMES = [
  'Hemiscyllium ocellatum',
  'Carcharhinus melanopterus',
  'Chiloscyllium plagiosum',
  'Taeniura lymma',
  'Lates calcarifer',
  'Scolopsis bilineata',
  'Cheilodipterus quinquelineatus',
  'Chromis atripectoralis',
  'Oncorhynchus mykiss',
  'Danio rerio',
].sort((a, b) => b.length - a.length);

const italicizeSpeciesNames = (text: string): string => {
  const placeholders = new Map<string, string>();
  let index = 0;

  let processed = text.replace(/<i>([\s\S]*?)<\/i>/gi, (match) => {
    const key = `__ITALIC_${index}__`;
    placeholders.set(key, match);
    index += 1;
    return key;
  });

  for (const species of SPECIES_NAMES) {
    const escaped = species.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(?<![A-Za-z])(${escaped})(?![A-Za-z])`, 'gi');
    processed = processed.replace(pattern, '<i>$1</i>');
  }

  placeholders.forEach((original, key) => {
    processed = processed.replaceAll(key, original);
  });

  return processed;
};

/** Allow only <i> for scientific names; strip other markup. */
export const sanitizePaperTitleHtml = (title: string): string => {
  const withSpecies = italicizeSpeciesNames(title);
  return sanitizeHtml(withSpecies, {
    allowedTags: ['i'],
    allowedAttributes: {},
  });
};
