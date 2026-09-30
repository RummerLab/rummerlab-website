export interface PublicationCover {
  journal: string;
  issue: string;
  description: string;
  year: number;
  url: string;
  /** Optional local cover image under /public. */
  image?: string;
  accent: string;
}

/**
 * Featured journal covers. Add `image` paths under public/images/covers/
 * when cover artwork is available for display.
 */
export const publicationCovers: PublicationCover[] = [
  {
    journal: 'Science',
    issue: 'Vol 340, Issue 6138',
    description:
      'Root Effect Hemoglobin May Have Evolved to Enhance General Tissue Oxygen Delivery',
    year: 2013,
    url: 'https://doi.org/10.1126/science.1233692',
    accent: 'from-red-700 to-red-900',
  },
  {
    journal: 'Nature Climate Change',
    issue: 'Vol 4',
    description:
      'Behavioural impairment in reef fishes caused by ocean acidification at current CO₂ levels',
    year: 2014,
    url: 'https://doi.org/10.1038/nclimate2195',
    accent: 'from-emerald-700 to-teal-900',
  },
  {
    journal: 'Nature Ecology & Evolution',
    issue: 'Vol 1',
    description:
      'Oil exposure disrupts early life-history stages of coral reef fishes via DNA methylation',
    year: 2017,
    url: 'https://doi.org/10.1038/s41559-017-0232-5',
    accent: 'from-violet-800 to-indigo-950',
  },
  {
    journal: 'Global Change Biology',
    issue: 'Vol 20, Issue 7',
    description:
      'Life on the edge: thermal optima for aerobic scope of equatorial reef fishes are close to current warming thresholds',
    year: 2014,
    url: 'https://doi.org/10.1111/gcb.12455',
    accent: 'from-cyan-700 to-blue-900',
  },
];
