import React from 'react';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { teamSections, physiosharkProject } from '@/data/team';
import { externalLinks } from '@/data/links';

export default function LabPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">The RummerLab</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Welcome to the RummerLab, where we conduct cutting-edge research in marine biology and conservation.
        </p>
      </div>

      {/* Advice for Potential Students */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="rounded-xl bg-blue-50/50 dark:bg-blue-900/10 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Potential students, a little advice…</h2>
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300">
              Prof. Scott Keogh has compiled an excellent list of resources and advice for students and postdoctoral fellows{' '}
              <a 
                href={externalLinks.studentResources}
                target="_blank"
                rel="noopener"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                here
              </a>.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              And if you&apos;re about to contact me to inquire about graduate school (MSc, PhD),{' '}
              <a 
                href={externalLinks.graduateSchool}
                target="_blank"
                rel="noopener"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                check this out
              </a>!
            </p>
          </div>
        </div>
      </div>

      {/* Team Sections */}
      <div className="space-y-16">
        {teamSections.map((section, index) => (
          <section key={index} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.members.map((member, memberIndex) => (
                <TeamMemberCard key={memberIndex} member={member} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Physioshark Project */}
      <section className="max-w-3xl mx-auto">
        <div className="rounded-xl bg-blue-50/50 dark:bg-blue-900/10 p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{physiosharkProject.title}</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300">{physiosharkProject.description}</p>
            <div className="flex space-x-4 mt-4">
              <a 
                href={physiosharkProject.links.instagram} 
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                target="_blank"
                rel="noopener"
              >
                Physioshark Instagram
              </a>
              <a 
                href={physiosharkProject.links.facebook} 
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                target="_blank"
                rel="noopener"
              >
                Physioshark Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
