import papersJson from './papers.json';

export interface PaperMetadataRecord {
  title: string;
  authors: string[];
  year?: number;
  journal?: string;
  book?: string;
  doi?: string;
  abstract?: string;
  published?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  /** Google Scholar author_pub_id, e.g. ynWS968AAAAJ:XXXX */
  scholar_pub_id?: string;
  /** Citation count from Scholar at last enrichment (UI may refresh live). */
  scholar_citations?: number;
}

export type PaperMetadataByFilename = Record<string, PaperMetadataRecord>;

const paperMetadata = papersJson as PaperMetadataByFilename;

export const getPaperMetadataByFilename = (): PaperMetadataByFilename => paperMetadata;

export const getPaperMetadata = (filename: string): PaperMetadataRecord | undefined =>
  paperMetadata[filename];
