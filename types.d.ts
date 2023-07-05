export type Publication = {
    title: string;
    authors: string[];
    year: number;
    venue: string;
    url: string;
    citations: number;
    excerpt?: string;
};
