import React from 'react';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { teamSections, physiosharkProject } from '@/data/team';
import { externalLinks } from '@/data/links';

export default function LabPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">The Rummer Lab</h1>
        <div className="prose prose-lg mx-auto">
          <p className="text-gray-600">
            Welcome to the Rummer Lab, where we conduct cutting-edge research in marine biology and conservation.
          </p>
        </div>
      </div>

      {/* Advice for Potential Students */}
      <div className="bg-white rounded-lg shadow-xs p-8 mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Potential students, a little advice…</h2>
        <div className="prose prose-lg">
          <p>
            Prof. Scott Keogh has compiled an excellent list of resources and advice for students and postdoctoral fellows{' '}
            <a 
              href={externalLinks.studentResources}
              target="_blank"
              rel="noopener"
              className="text-blue-600 hover:text-blue-800"
            >
              here
            </a>.
          </p>
          <p>
            And if you&apos;re about to contact me to inquire about graduate school (MSc, PhD),{' '}
            <a 
              href={externalLinks.graduateSchool}
              target="_blank"
              rel="noopener"
              className="text-blue-600 hover:text-blue-800"
            >
              check this out
            </a>!
          </p>
        </div>
      </div>

      {/* Team Sections */}
      {teamSections.map((section, index) => (
        <section key={index} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {section.members.map((member, memberIndex) => (
              <TeamMemberCard key={memberIndex} member={member} />
            ))}
          </div>
        </section>
      ))}

      {/* Physioshark Project */}
      <section className="bg-blue-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{physiosharkProject.title}</h2>
        <div className="prose prose-lg max-w-none">
          <p>{physiosharkProject.description}</p>
          <div className="flex space-x-4 mt-4">
            <a 
              href={physiosharkProject.links.instagram} 
              className="text-blue-600 hover:text-blue-800"
              target="_blank"
              rel="noopener"
            >
              Physioshark Instagram
            </a>
            <a 
              href={physiosharkProject.links.facebook} 
              className="text-blue-600 hover:text-blue-800"
              target="_blank"
              rel="noopener"
            >
              Physioshark Facebook
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 
