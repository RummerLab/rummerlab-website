import Image from 'next/image';
import Link from 'next/link';
import { type TeamMember } from '@/types/team';
import teamData from '@/data/team.json';

export default function TeamPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
        Our Team
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {(teamData as TeamMember[]).map((member, index) => (
          <div 
            key={member.name}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="aspect-w-3 aspect-h-2">
              <Image
                src={member.image}
                alt={member.alt}
                width={400}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="p-6">
              <div className="flex flex-col space-y-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {member.name}
                </h2>
                {member.title && (
                  <h3 className="text-lg text-gray-700 dark:text-gray-300">
                    {member.title}
                  </h3>
                )}
                <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">
                  {member.role}
                </h3>
                
                {member.affiliations && member.affiliations.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {member.affiliations.map((affiliation, i) => (
                      <div key={i} className="mb-1">
                        {affiliation.role} at {affiliation.institution}
                        {affiliation.department && `, ${affiliation.department}`}
                        {affiliation.location && ` - ${affiliation.location}`}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-4 prose dark:prose-invert prose-sm max-w-none">
                <p className="text-gray-700 dark:text-gray-300 line-clamp-4">
                  {member.description}
                </p>
              </div>
              
              {member.links && Object.keys(member.links).length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {member.links.personalWebsite && (
                    <Link 
                      href={`https://${member.links.personalWebsite}`}
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Personal Website"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                      </svg>
                    </Link>
                  )}
                  {member.links.googleScholarId && (
                    <Link 
                      href={`https://scholar.google.com/citations?user=${member.links.googleScholarId}`}
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Google Scholar"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 24a7 7 0 110-14 7 7 0 010 14zm0-24L0 9.5l4.838 3.94A8 8 0 0112 9a8 8 0 017.162 4.44L24 9.5z"/>
                      </svg>
                    </Link>
                  )}
                  {member.links.researchGateSlug && (
                    <Link 
                      href={`https://www.researchgate.net/profile/${member.links.researchGateSlug}`}
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="ResearchGate"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.323-.306-.174-.517-.4-.67-.645-.154-.247-.277-.573-.353-.876-.074-.3-.135-.712-.135-1.175 0-.47.06-.883.135-1.183.076-.3.2-.624.354-.87.152-.246.363-.47.67-.645.308-.173.664-.324 1.209-.324.435 0 .808.4 1.11.283.301-.116.512-.276.657-.474.146-.198.23-.39.276-.587.047-.195.07-.335.07-.422 0-.162-.03-.307-.086-.435-.055-.127-.134-.228-.236-.303-.103-.075-.217-.134-.346-.176-.127-.042-.262-.063-.403-.063zM0 4.096v14.252h5.046v-4.512H9.59v4.512h5.046V4.096h-5.046v4.511H5.046V4.096z"/>
                      </svg>
                    </Link>
                  )}
                  {member.links.x && (
                    <Link 
                      href={member.links.x}
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="X (Twitter)"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </Link>
                  )}
                  {member.links.linkedin && (
                    <Link 
                      href={member.links.linkedin}
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </Link>
                  )}
                  {member.links.github && (
                    <Link 
                      href={member.links.github}
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </Link>
                  )}
                  {member.links.orcid && (
                    <Link 
                      href={`https://orcid.org/${member.links.orcid}`}
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="ORCID"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm.14 4.895l.772-.016a.704.704 0 01-.772.016zm-3.621.154a7.93 7.93 0 013.621-.154.704.704 0 00.772-.016 8.184 8.184 0 014.925 1.266 8.166 8.166 0 012.853 3.274 8.172 8.172 0 01.749 4.439 8.168 8.168 0 01-1.436 4.192 8.174 8.174 0 01-3.255 2.87 8.18 8.18 0 01-4.425.75 8.176 8.176 0 01-4.194-1.434 8.174 8.174 0 01-2.872-3.253 8.172 8.172 0 01-.751-4.423 8.168 8.168 0 011.436-4.192 8.174 8.174 0 013.255-2.87 7.93 7.93 0 01.044-.449z"/>
                      </svg>
                    </Link>
                  )}
                </div>
              )}
              
              {member.education && member.education.length > 0 && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <h4 className="font-semibold mb-1">Education</h4>
                  {member.education.map((edu, i) => (
                    <div key={i} className="mb-1">
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''} - {edu.institution}
                      {edu.year ? ` (${edu.year})` : ''}
                    </div>
                  ))}
                </div>
              )}
              
              {member.awards && member.awards.length > 0 && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <h4 className="font-semibold mb-1">Awards</h4>
                  {member.awards.map((award, i) => (
                    <div key={i} className="mb-1">
                      {award.name}
                      {award.year ? ` (${award.year})` : ''}
                      {award.description && <p className="text-xs mt-0.5">{award.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 