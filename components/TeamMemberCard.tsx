"use client";

import { TeamMember } from '@/types/team';
import Image from 'next/image';
import { FaResearchgate, FaGlobe, FaGoogle, FaGithub, FaLinkedin, FaOrcid } from 'react-icons/fa';
import { SiBluesky } from "react-icons/si";

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xs overflow-hidden hover:shadow-md transition-shadow duration-200">
      {member.image && (
        <div className="relative aspect-w-16 aspect-h-9">
          <Image
            src={member.image}
            alt={member.alt}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">{member.name}</h3>
        {member.title && (
          <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">{member.title}</p>
        )}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-4">
          {member.description}
        </p>
        
        {member.email && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <a href={`mailto:${member.email}`} className="hover:text-gray-700 dark:hover:text-gray-200">
              {member.email}
            </a>
          </p>
        )}

        {member.links && (
          <div className="flex space-x-4">
            {member.links.bluesky && (
              <a
                href={member.links.bluesky}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                target="_blank"
                rel="noopener"
              >
                <SiBluesky className="h-5 w-5" />
              </a>
            )}
            {member.links.researchGateSlug && (
              <a
                href={`https://www.researchgate.net/profile/${member.links.researchGateSlug}`}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                target="_blank"
                rel="noopener"
              >
                <FaResearchgate className="h-5 w-5" />
              </a>
            )}
            {member.links.personalWebsite && (
              <a
                href={member.links.personalWebsite}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center"
                target="_blank"
                rel="noopener"
              >
                <FaGlobe className="h-5 w-5" />
              </a>
            )}
            {member.links.googleScholarId && (
              <a
                href={`https://scholar.google.com/citations?user=${member.links.googleScholarId}`}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                target="_blank"
                rel="noopener"
              >
                <FaGoogle className="h-5 w-5" />
              </a>
            )}
            {member.links.github && (
              <a
                href={member.links.github}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                target="_blank"
                rel="noopener"
              >
                <FaGithub className="h-5 w-5" />
              </a>
            )}
            {member.links.linkedin && (
              <a
                href={member.links.linkedin}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-600"
                target="_blank"
                rel="noopener"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            )}
            {member.links.orcid && (
              <a
                href={`https://orcid.org/${member.links.orcid}`}
                className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500"
                target="_blank"
                rel="noopener"
              >
                <FaOrcid className="h-5 w-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 