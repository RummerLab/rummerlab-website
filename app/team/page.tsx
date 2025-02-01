import Image from 'next/image';
import Link from 'next/link';
import { teamMembers } from './data';

export default function TeamPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
        Our Team
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div 
            key={index}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="aspect-w-3 aspect-h-2">
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={300}
                className="object-cover"
              />
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {member.name}
              </h2>
              <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-4">
                {member.role}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {member.bio}
              </p>
              
              {member.links && (
                <div className="flex space-x-4">
                  {member.links.twitter && (
                    <Link 
                      href={member.links.twitter}
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </Link>
                  )}
                  {member.links.scholar && (
                    <Link 
                      href={member.links.scholar}
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 24a7 7 0 110-14 7 7 0 010 14zm0-24L0 9.5l4.838 3.94A8 8 0 0112 9a8 8 0 017.162 4.44L24 9.5z"/>
                      </svg>
                    </Link>
                  )}
                  {member.links.researchgate && (
                    <Link 
                      href={member.links.researchgate}
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.323-.306-.174-.517-.4-.67-.645-.154-.247-.277-.573-.353-.876-.074-.3-.135-.712-.135-1.175 0-.47.06-.883.135-1.183.076-.3.2-.624.354-.87.152-.246.363-.47.67-.645.308-.173.664-.324 1.209-.324.435 0 .808.4 1.11.283.301-.116.512-.276.657-.474.146-.198.23-.39.276-.587.047-.195.07-.335.07-.422 0-.162-.03-.307-.086-.435-.055-.127-.134-.228-.236-.303-.103-.075-.217-.134-.346-.176-.127-.042-.262-.063-.403-.063zM0 4.096v14.252h5.046v-4.512H9.59v4.512h5.046V4.096h-5.046v4.511H5.046V4.096z"/>
                      </svg>
                    </Link>
                  )}
                  {member.links.website && (
                    <Link 
                      href={member.links.website}
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                      </svg>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 