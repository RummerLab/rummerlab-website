import Link from 'next/link';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { ContentCard } from '@/components/layout/ContentCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { externalLinks } from '@/data/links';
import teamData from '@/data/team.json';
import { partitionTeamMembers } from '@/lib/team';
import type { TeamMember } from '@/types/team';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team | RummerLab',
  description:
    'Meet the dedicated researchers, students, and staff of the RummerLab, where we conduct cutting-edge research in marine biology and conservation.',
};

interface TeamSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  members: TeamMember[];
  priorityCount?: number;
  compact?: boolean;
  featured?: boolean;
}

const TeamSection = ({
  id,
  title,
  subtitle,
  members,
  priorityCount = 0,
  compact = false,
  featured = false,
}: TeamSectionProps) => {
  if (members.length === 0) return null;

  return (
    <section id={id} className="mt-16 scroll-mt-24" aria-labelledby={`${id}-heading`}>
      <div className="mb-8 text-center">
        <h2
          id={`${id}-heading`}
          className="text-3xl font-bold tracking-[0.12em] text-gray-900 dark:text-gray-100 sm:text-4xl"
        >
          {title}
        </h2>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-muted">{subtitle}</p>}
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
      </div>

      <div
        className={
          featured
            ? 'grid grid-cols-1 gap-8'
            : compact
              ? 'grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'
              : 'grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3'
        }
      >
        {members.map((member, index) => (
          <TeamMemberCard
            key={member.name}
            member={member}
            index={index}
            priority={index < priorityCount}
            featured={featured}
          />
        ))}
      </div>
    </section>
  );
};

export default function TeamPage() {
  const members = teamData as TeamMember[];
  const { chiefInvestigators, currentMembers, collaborators, pastMembers } =
    partitionTeamMembers(members);

  return (
    <PageShell>
      <PageHeader
        title="Our Team"
        subtitle="Meet the dedicated researchers, students, and staff of the RummerLab."
        logoSrc="/images/rummerlab_logo_transparent.png"
        logoAlt="RummerLab Logo"
        invertLogoInDark
      />

      <div className="mx-auto mb-8 max-w-3xl">
        <ContentCard reveal className="bg-blue-50/50 dark:bg-blue-900/10">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Potential students, a little advice…
          </h2>
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-muted">
              Prof. Scott Keogh has compiled an excellent list of resources and advice for students
              and postdoctoral fellows{' '}
              <a
                href={externalLinks.studentResources}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                here
              </a>
              .
            </p>
            <p className="text-muted">
              And if you&apos;re about to contact me to inquire about graduate school (MSc, PhD),{' '}
              <a
                href={externalLinks.graduateSchool}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                check this out
              </a>
              !
            </p>
            <p className="text-muted">
              Interested in joining? See{' '}
              <Link
                href="/join"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                opportunities
              </Link>
              .
            </p>
          </div>
        </ContentCard>
      </div>

      <TeamSection
        id="principal-investigator"
        title="Principal Investigator"
        members={chiefInvestigators}
        priorityCount={1}
        featured
      />

      <TeamSection
        id="current-members"
        title="Current Members"
        subtitle="Students, postdocs, and staff currently working with the lab."
        members={currentMembers}
        priorityCount={1}
      />

      <section id="collaborators" className="mt-16 scroll-mt-24" aria-labelledby="collaborators-heading">
        <div className="mb-8 text-center">
          <h2
            id="collaborators-heading"
            className="text-3xl font-bold tracking-[0.12em] text-gray-900 dark:text-gray-100 sm:text-4xl"
          >
            Collaborators
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Partner researchers working closely with the lab. Explore the full network and map on
            our{' '}
            <Link
              href="/collaborators"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              collaborators page
            </Link>
            .
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
        </div>

        {collaborators.length > 0 && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {collaborators.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        )}
      </section>

      <TeamSection
        id="past-members"
        title="Past Members"
        subtitle="Alumni and former lab members — proud of everyone who has been part of RummerLab."
        members={pastMembers}
      />
    </PageShell>
  );
}
