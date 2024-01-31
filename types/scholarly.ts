type Author = {
    affiliation: string;
    citedby: number;
    citedby5y: number;
    cites_per_year: Record<string, number>;
    coauthors: Coauthor[];
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
  
  type Coauthor = {
    // Assuming a similar structure for coauthors, but the exact structure is not provided.
    // Replace the following with the actual structure if known.
    name: string;
    affiliation?: string;
  };
  
  type PublicAccess = {
    available: number;
    not_available: number;
  };
  
  type Publication = {
    author_pub_id: string;
    bib: {
      citation: string;
      pub_year: string;
      title: string;
    };
    citedby_url: string;
    cites_id: string[];
    container_type: string;
    filled: boolean;
    num_citations: number;
    source: string;
  };
  
    
      