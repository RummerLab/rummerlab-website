import {
  getPaperDisplayName,
  getPaperDoiUrl,
  getPaperScholarUrl,
  getSafePaperPdfHref,
  JODIE_SCHOLAR_PROFILE_URL,
  PAPERS_ORIGIN,
  type Paper,
} from '@/lib/paper-shared';
import { getPaperDetailPath, getPaperDetailUrl } from '@/lib/paper-shared';
import type { PaperMetrics } from '@/lib/paper-metrics';

const LAB_NAME = 'RummerLab';
const LAB_URL = PAPERS_ORIGIN;
const PI_NAME = 'Jodie L. Rummer';

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: LAB_NAME,
  url: LAB_URL,
  logo: `${LAB_URL}/images/rummerlab_logo_transparent.png`,
  sameAs: [JODIE_SCHOLAR_PROFILE_URL, 'https://jodierummer.com/', 'https://physioshark.org/'],
  member: {
    '@type': 'Person',
    name: PI_NAME,
    jobTitle: 'Professor',
    affiliation: {
      '@type': 'Organization',
      name: 'James Cook University',
    },
    sameAs: JODIE_SCHOLAR_PROFILE_URL,
  },
});

const authorList = (authors: string[] | undefined) =>
  (authors ?? []).map((name) => ({
    '@type': 'Person' as const,
    name,
  }));

const citationInteraction = (metrics: PaperMetrics | undefined) => {
  const count = metrics?.gscholar ?? metrics?.crossref ?? 0;
  if (count <= 0) return undefined;
  return {
    '@type': 'InteractionCounter',
    interactionType: 'https://schema.org/CiteAction',
    userInteractionCount: count,
  };
};

export const buildScholarlyArticleSchema = (
  paper: Paper,
  metrics?: PaperMetrics | null,
): Record<string, unknown> => {
  const headline = getPaperDisplayName(paper);
  const detailUrl = getPaperDetailUrl(paper.filename);
  const pdfHref = getSafePaperPdfHref(paper.url);
  const pdfUrl = pdfHref ? `${PAPERS_ORIGIN}${pdfHref}` : undefined;
  const doiUrl = paper.doi ? getPaperDoiUrl(paper.doi) : null;
  const scholarUrl = paper.scholar_pub_id ? getPaperScholarUrl(paper.scholar_pub_id) : null;

  const sameAs = [doiUrl, scholarUrl].filter((u): u is string => Boolean(u));

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline,
    name: headline,
    url: detailUrl,
    isAccessibleForFree: true,
    author: authorList(paper.authors),
  };

  if (paper.published || paper.year) {
    schema.datePublished = paper.published ?? `${paper.year}-01-01`;
  }

  if (paper.abstract) {
    schema.abstract = paper.abstract;
  }

  if (paper.journal) {
    schema.isPartOf = {
      '@type': 'Periodical',
      name: paper.journal,
    };
  } else if (paper.book) {
    schema.isPartOf = {
      '@type': 'Book',
      name: paper.book,
    };
  }

  if (paper.doi) {
    schema.identifier = {
      '@type': 'PropertyValue',
      propertyID: 'DOI',
      value: paper.doi.replace(/^https?:\/\/doi\.org\//i, ''),
    };
  }

  if (sameAs.length > 0) {
    schema.sameAs = sameAs;
  }

  if (pdfUrl) {
    schema.encoding = {
      '@type': 'MediaObject',
      contentUrl: pdfUrl,
      encodingFormat: 'application/pdf',
    };
  }

  const interaction = citationInteraction(metrics ?? undefined);
  if (interaction) {
    schema.interactionStatistic = interaction;
  }

  return schema;
};

export const buildPublicationsListingSchema = (papers: Paper[]) => ({
  '@context': 'https://schema.org',
  '@graph': [
    buildOrganizationSchema(),
    {
      '@type': 'CollectionPage',
      name: 'Publications | RummerLab',
      url: `${LAB_URL}/publications`,
      description:
        'Research papers and scientific publications from RummerLab at James Cook University.',
      isPartOf: {
        '@type': 'WebSite',
        name: LAB_NAME,
        url: LAB_URL,
      },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: papers.length,
        itemListElement: papers.map((paper, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${LAB_URL}${getPaperDetailPath(paper.filename)}`,
          name: getPaperDisplayName(paper),
        })),
      },
    },
  ],
});
