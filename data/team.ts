import { TeamMember, TeamSection } from '@/types/team';
import teamMembers from './team.json';

// Type assertion to ensure the imported data matches our type
const typedTeamMembers = teamMembers as TeamMember[];

export const teamSections: TeamSection[] = [
  {
    title: "Principal Investigator",
    members: typedTeamMembers.filter(member => member.role === "Chief Investigator")
  },
  {
    title: "Partner Researchers",
    members: typedTeamMembers.filter(member => member.role === "Partner Researcher")
  },
  {
    title: "Postdoctoral Researchers",
    members: typedTeamMembers.filter(member => member.role === "Postdoctoral Researcher")
  },
  {
    title: "PhD Candidates",
    members: typedTeamMembers.filter(member => member.role === "PhD Candidate")
  },
  {
    title: "Masters Students",
    members: typedTeamMembers.filter(member => member.role === "Masters Student")
  },
  {
    title: "Undergraduate Researchers",
    members: typedTeamMembers.filter(member => member.role === "Undergraduate Researcher")
  },
  {
    title: "Lab Volunteers",
    members: typedTeamMembers.filter(member => member.role === "Volunteer")
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