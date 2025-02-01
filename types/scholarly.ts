export type Author = {
    affiliation: string;
    citedby: number;
    citedby5y: number;
    cites_per_year: Record<string, number>;
    coauthors: CoAuthor[];
    container_type: string;
    email_domain: string;
    filled: string[];
    hindex: number;
    hindex5y: number;
    homepage: string;
    i10index: number;
    i10index5y: number;
    interests: string[];
    name: string;
    organization: number;
    public_access: PublicAccess;
    publications: Publication[];
    scholar_id: string;
    source: string;
    url_picture: string;
  };
  
  export type CoAuthor = {
    affiliation: string;
    container_type: string;
    filled: any[];
    name: string;
    scholar_id: string;
    source: string;
  };
  
  export type PublicAccess = {
    available: number;
    not_available: number;
  };
  
  export type Publication = {
    author_pub_id: string;
    bib: {
      citation: string;
      pub_year: string;
      title: string;
      author: string;
      journal?: string;
      booktitle?: string;
      volume?: string;
      number?: string;
      pages?: string;
    };
    citedby_url: string;
    cites_id: string[];
    container_type: string;
    filled: boolean;
    num_citations: number;
    source: string;
  };
  
    
      