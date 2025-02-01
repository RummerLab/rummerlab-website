export interface TeamMember {
  name: string;
  title: string;
  role: 'Chief Investigator' | 'Partner Researcher' | 'Postdoctoral Researcher' | 'PhD Candidate' | 'Masters Student' | 'Undergraduate Researcher' | 'Volunteer';
  email: string;
  startDate: string;
  endDate: string | null;
  description: string;
  image: string;
  alt: string;
  links: {
    personalWebsite?: string;
    labWebsite?: string;
    projectWebsite?: string;
    researchGateSlug?: string;
    googleScholarId?: string;
    x?: string;
    bluesky?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    orcid?: string;
  };
  affiliations: Array<{
    institution: string;
    department: string;
    role: string;
    location: string;
  }>;
  education: Array<{
    degree: string;
    field: string;
    institution: string;
    year: string;
  }>;
  awards?: Array<{
    name: string;
    year: string;
    description: string;
  }>;
  languages?: string[];
}

export interface TeamSection {
  title: string;
  members: TeamMember[];
} 