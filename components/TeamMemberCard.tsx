'use client';

import Image from 'next/image';
import { useState } from 'react';
import { type TeamMember } from '@/types/team';
import { MemberSocialLinks, TeamMemberModal } from '@/components/TeamMemberModal';
import { cn } from '@/lib/utils';

interface TeamMemberCardProps {
  member: TeamMember;
  index?: number;
  priority?: boolean;
  featured?: boolean;
}

export function TeamMemberCard({
  member,
  index = 0,
  priority = false,
  featured = false,
}: TeamMemberCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <article
        className={cn(
          'view-reveal cursor-pointer overflow-hidden rounded-xl border border-gray-200/60 bg-surface-elevated shadow-lg',
          'hover-lift transition-all duration-300 dark:border-gray-800/60',
          featured && 'md:grid md:grid-cols-[minmax(280px,2fr)_minmax(0,3fr)]',
        )}
        style={{ animationDelay: `${index * 80}ms` }}
        onClick={handleOpenModal}
      >
        <div className={cn('relative h-[300px]', featured && 'md:h-full md:min-h-[420px]')}>
          {member.image ? (
            <Image
              src={member.image}
              alt={member.alt || `Photo of ${member.name}`}
              fill
              sizes={
                featured
                  ? '(max-width: 768px) 100vw, 40vw'
                  : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              }
              className="object-cover"
              style={{ objectPosition: '50% 10%' }}
              priority={priority}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
              <svg
                className="h-20 w-20 text-gray-400 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8c0 2.208-1.79 4-3.998 4-2.208 0-3.998-1.792-3.998-4s1.79-4 3.998-4c2.208 0 3.998 1.792 3.998 4z" />
              </svg>
            </div>
          )}
        </div>

        <div className={cn('p-6', featured && 'md:p-8 lg:p-10')}>
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{member.name}</h2>
            {member.title &&
              member.title.trim().toLowerCase() !== member.role.trim().toLowerCase() && (
                <h3 className="text-lg text-gray-700 dark:text-gray-300">{member.title}</h3>
              )}
            <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">{member.role}</h3>

            {member.affiliations && member.affiliations.length > 0 && (
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {member.affiliations.map((affiliation, affiliationIndex) => (
                  <div key={affiliationIndex} className="mb-1">
                    {affiliation.role} at {affiliation.institution}
                    {affiliation.department && `, ${affiliation.department}`}
                    {affiliation.location && ` - ${affiliation.location}`}
                  </div>
                ))}
              </div>
            )}
          </div>

          {member.description && (
            <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {member.description}
            </p>
          )}

          <MemberSocialLinks member={member} className="mt-6" />

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleOpenModal();
            }}
            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View full profile
          </button>
        </div>
      </article>

      <TeamMemberModal member={member} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
