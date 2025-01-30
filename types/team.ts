export interface TeamMember {
  name: string;
  title?: string;
  role: 'postdoc' | 'phd' | 'msc' | 'honours' | 'undergraduate' | 'technical' | 'alumni';
  email: string;
  description: string;
  image?: string;
  links?: {
    twitter?: string;
    researchGate?: string;
    website?: string;
    googleScholar?: string;
  };
  publications?: {
    title: string;
    url: string;
  }[];
}

export interface TeamSection {
  title: string;
  members: TeamMember[];
} 