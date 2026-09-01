import type { Metadata } from 'next';
import { type TeamMember } from '@/types/team';
import teamData from '@/data/team.json';
import { externalLinks } from '@/data/links';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentCard } from '@/components/layout/ContentCard';
import { TeamMemberCard } from '@/components/TeamMemberCard';

export const metadata: Metadata = {
  title: 'Our Team | RummerLab',
  description:
    'Meet the dedicated researchers, students, and staff of the RummerLab, where we conduct cutting-edge research in marine biology and conservation.',
};

export default function TeamPage() {
  return (
    <PageShell>
      <PageHeader
        title="Our Team"
        subtitle="Meet the dedicated researchers, students, and staff of the RummerLab, where we conduct cutting-edge research in marine biology and conservation."
        logoSrc="/images/rummerlab_logo_transparent.png"
        logoAlt="RummerLab Logo"
      />

      <div className="mx-auto mb-16 max-w-3xl">
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
                rel="noopener"
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
                rel="noopener"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                check this out
              </a>
              !
            </p>
          </div>
        </ContentCard>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {(teamData as TeamMember[]).map((member, index) => (
          <TeamMemberCard
            key={member.name}
            member={member}
            index={index}
            priority={index < 2}
          />
        ))}
      </div>
    </PageShell>
  );
}
