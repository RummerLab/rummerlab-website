export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  links?: {
    twitter?: string;
    scholar?: string;
    researchgate?: string;
    website?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    name: "Dr. Jodie Rummer",
    role: "Principal Investigator",
    image: "/team/jodie-rummer.jpg",
    bio: "Dr. Jodie Rummer is a Professor at James Cook University. Her research focuses on fish physiological and behavioural ecology, including the effects of climate change on fish performance.",
    links: {
      twitter: "https://twitter.com/physioshark",
      scholar: "https://scholar.google.com/citations?user=ynWS968AAAAJ",
      researchgate: "https://www.researchgate.net/profile/Jodie-Rummer",
      website: "https://physioshark.org"
    }
  },
  {
    name: "Current Lab Members",
    role: "PhD Students & Postdocs",
    image: "/team/lab-group.jpg",
    bio: "Our lab consists of passionate researchers studying various aspects of fish physiology and conservation. The team includes PhD students, postdoctoral researchers, and research assistants.",
  },
  {
    name: "Join Our Team",
    role: "Open Positions",
    image: "/team/join-us.jpg",
    bio: "We're always looking for motivated researchers to join our team. If you're interested in fish physiology, climate change, and conservation, check out our opportunities.",
    links: {
      website: "/join"
    }
  }
]; 