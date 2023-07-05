type BlogPost = {
    id: string,
    title: string,
    date: string,
}

export type Publication = {
    title: string;
    authors: string[];
    year: number;
    venue: string;
    url: string;
    citations: number;
    excerpt?: string;
  };
  