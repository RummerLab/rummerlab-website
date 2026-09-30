import type { TeamMember } from '@/types/team';

const COLLABORATOR_ROLES = new Set(['Partner Researcher', 'Research collaborator']);

const isPastMember = (member: TeamMember, now = new Date()): boolean => {
  if (member.role === 'Alumni') return true;
  if (!member.endDate) return false;

  const end = new Date(member.endDate);
  if (Number.isNaN(end.getTime())) return false;
  return end.getTime() < now.getTime();
};

export const partitionTeamMembers = (members: TeamMember[]) => {
  const past = members.filter((member) => isPastMember(member));
  const active = members.filter((member) => !isPastMember(member));

  const chiefInvestigators = active.filter((member) => member.role === 'Chief Investigator');
  const collaborators = active.filter((member) => COLLABORATOR_ROLES.has(member.role));
  const currentMembers = active.filter(
    (member) => member.role !== 'Chief Investigator' && !COLLABORATOR_ROLES.has(member.role),
  );

  const sortByName = (a: TeamMember, b: TeamMember) => a.name.localeCompare(b.name);

  return {
    chiefInvestigators: [...chiefInvestigators].sort(sortByName),
    currentMembers: [...currentMembers].sort(sortByName),
    collaborators: [...collaborators].sort(sortByName),
    pastMembers: [...past].sort(sortByName),
  };
};
