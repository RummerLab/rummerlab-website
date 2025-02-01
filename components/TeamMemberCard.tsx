"use client";

import { TeamMember } from '@/types/team';
import Image from 'next/image';
import { FaTwitter, FaResearchgate, FaGlobe, FaGoogle } from 'react-icons/fa';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-xs overflow-hidden hover:shadow-md transition-shadow duration-200">
      {member.image && (
        <div className="relative aspect-w-16 aspect-h-9">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      {!member.image && (
        <div className="w-full h-48 bg-gray-200" />
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
        {member.title && (
          <p className="text-gray-600 font-medium mb-2">{member.title}</p>
        )}
        <p className="text-gray-600 mb-4 line-clamp-4">
          {member.description}
        </p>
        
        {member.email && (
          <p className="text-sm text-gray-500 mb-4">
            <a href={`mailto:${member.email}`} className="hover:text-gray-700">
              {member.email}
            </a>
          </p>
        )}

        {member.publications && member.publications.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Publications</h4>
            {member.publications.map((pub, index) => (
              <a
                key={index}
                href={pub.url}
                className="text-sm text-blue-600 hover:text-blue-800 block mb-1"
              >
                {pub.title}
              </a>
            ))}
          </div>
        )}

        {member.links && (
          <div className="flex space-x-4">
            {member.links.twitter && (
              <a
                href={member.links.twitter}
                className="text-gray-500 hover:text-blue-400"
                target="_blank"
                rel="noopener"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
            )}
            {member.links.researchGate && (
              <a
                href={member.links.researchGate}
                className="text-gray-500 hover:text-blue-600"
                target="_blank"
                rel="noopener"
              >
                <FaResearchgate className="h-5 w-5" />
              </a>
            )}
            {member.links.website && (
              <a
                href={member.links.website}
                className="text-gray-500 hover:text-gray-700"
                target="_blank"
                rel="noopener"
              >
                <FaGlobe className="h-5 w-5" />
              </a>
            )}
            {member.links.googleScholar && (
              <a
                href={member.links.googleScholar}
                className="text-gray-500 hover:text-blue-500"
                target="_blank"
                rel="noopener"
              >
                <FaGoogle className="h-5 w-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 