import teamMembers from './team.json';

interface TeamMember {
  name: string;
  title: string;
  role: string;
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

interface TeamSection {
  title: string;
  members: TeamMember[];
}

export const teamSections: TeamSection[] = [
  {
    title: "Principal Investigator",
    members: teamMembers.filter(member => member.role === "Chief Investigator")
  },
  {
    title: "Partner Researchers",
    members: teamMembers.filter(member => member.role === "Partner Researcher")
  },
  {
    title: "Postdoctoral Researchers",
    members: teamMembers.filter(member => member.role === "Postdoctoral Researcher")
  },
  {
    title: "PhD Candidates",
    members: teamMembers.filter(member => member.role === "PhD Candidate")
  },
  {
    title: "Masters Students",
    members: teamMembers.filter(member => member.role === "Masters Student")
  },
  {
    title: "Undergraduate Researchers",
    members: teamMembers.filter(member => member.role === "Undergraduate Researcher")
  },
  {
    title: "Lab Volunteers",
    members: teamMembers.filter(member => member.role === "Volunteer")
  }
].filter(section => section.members.length > 0);

export const physiosharkProject = {
  title: "The Physioshark Project",
  description: "The Physioshark Project is a long-term research initiative studying how sharks respond to environmental change. Based in French Polynesia, we focus on understanding shark physiology and behavior in the face of climate change.",
  links: {
    instagram: "https://www.instagram.com/physioshark",
    facebook: "https://www.facebook.com/physioshark"
  }
}; 