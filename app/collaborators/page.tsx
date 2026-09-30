import type { Metadata } from 'next';
import { AnimatedCollaborators } from '@/components/AnimatedCollaborators';
import { CollaboratorsMap } from '@/components/collaborators/CollaboratorsMap';
import { ContentCard } from '@/components/layout/ContentCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import {
  collaboratorsCatalog,
  getCollaboratorHref,
  type CollaboratorPerson,
} from '@/data/collaborators';

export const metadata: Metadata = {
  title: 'Collaborators',
  description: 'Our research collaborators from around the world',
};

export const dynamic = 'force-dynamic';

const CollaboratorList = ({ people }: { people: CollaboratorPerson[] }) => (
  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
    {people.map((person) => {
      const href = getCollaboratorHref(person);
      return (
        <li key={`${person.name}-${person.affiliation}`}>
          {href ? (
            <a
              href={href}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {person.name}
            </a>
          ) : (
            <span className="font-medium text-gray-900 dark:text-gray-100">{person.name}</span>
          )}{' '}
          <span>({person.affiliation})</span>
        </li>
      );
    })}
  </ul>
);

export default function Collaborators() {
  return (
    <PageShell>
      <PageHeader
        title="Collaborators"
        subtitle="Our research collaborators from around the world"
      />

      <section className="mb-16" aria-labelledby="collaborators-map-heading">
        <div className="mb-8 text-center">
          <h2
            id="collaborators-map-heading"
            className="text-3xl font-bold tracking-[0.12em] text-gray-900 dark:text-gray-100 sm:text-4xl"
          >
            Global Network
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Institutions and partners collaborating with RummerLab worldwide.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
        </div>
        <CollaboratorsMap />
      </section>

      <div className="mb-12 view-reveal">
        <AnimatedCollaborators />
      </div>

      <div className="mx-auto max-w-3xl space-y-8">
        {collaboratorsCatalog.regions.map((region) => (
          <ContentCard key={region.id} reveal>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {region.title}
            </h2>
            <CollaboratorList people={region.people} />
          </ContentCard>
        ))}
        {collaboratorsCatalog.updatedFromScholarAt && (
          <p className="text-center text-sm text-muted">
            Affiliations last refreshed from Google Scholar on{' '}
            {collaboratorsCatalog.updatedFromScholarAt}.
          </p>
        )}
      </div>
    </PageShell>
  );
}
