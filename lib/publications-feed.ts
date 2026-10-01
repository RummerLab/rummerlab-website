import {
  getPaperDetailUrl,
  getPaperDisplayName,
  getSafePaperPdfHref,
  PAPERS_ORIGIN,
  type Paper,
} from '@/lib/paper-shared';
import { getPapers } from '@/lib/papers';

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const paperPubDate = (paper: Paper): string => {
  if (paper.published) {
    const parsed = Date.parse(paper.published);
    if (!Number.isNaN(parsed)) return new Date(parsed).toUTCString();
  }
  if (paper.year) return new Date(Date.UTC(paper.year, 0, 1)).toUTCString();
  return new Date().toUTCString();
};

export const buildPublicationsRss = (origin = PAPERS_ORIGIN): string => {
  const papers = getPapers({ origin });
  const feedUrl = `${origin}/publications/feed.xml`;
  const items = papers
    .map((paper) => {
      const title = escapeXml(getPaperDisplayName(paper));
      const link = escapeXml(getPaperDetailUrl(paper.filename, origin));
      const pdfPath = getSafePaperPdfHref(paper.url);
      const pdfUrl = pdfPath ? escapeXml(`${origin}${pdfPath}`) : '';
      const description = escapeXml(
        paper.abstract ??
          `${getPaperDisplayName(paper)}${paper.journal ? ` — ${paper.journal}` : ''}`,
      );
      const pubDate = paperPubDate(paper);
      const doi = paper.doi ? `<category domain="doi">${escapeXml(paper.doi)}</category>` : '';

      const enclosure = pdfUrl
        ? `<enclosure url="${pdfUrl}" type="application/pdf" length="0" />`
        : '';

      return `<item>
  <title>${title}</title>
  <link>${link}</link>
  <guid isPermaLink="true">${link}</guid>
  <pubDate>${pubDate}</pubDate>
  <description>${description}</description>
  ${doi}
  ${enclosure}
</item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RummerLab Publications</title>
    <link>${origin}/publications</link>
    <description>Research papers and publications from RummerLab at James Cook University.</description>
    <language>en-au</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
};
