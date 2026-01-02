import { PublicationsCards } from "@/components/PublicationsCards"
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: "Publications | RummerLab",
  description: 'Research papers and publications from RummerLab',
}

const getPapers = (): string[] => {
  const papersDirectory = path.join(process.cwd(), 'public', 'papers');
  
  if (!fs.existsSync(papersDirectory)) {
    return [];
  }

  const files = fs.readdirSync(papersDirectory);
  return files
    .filter((file) => file.toLowerCase().endsWith('.pdf'))
    .sort();
};

const formatPaperName = (filename: string): string => {
  // Remove .pdf extension
  return filename.replace(/\.pdf$/i, '');
};

export default async function Publications() {
  const papers = getPapers();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <PublicationsCards />
      
      {/* Papers Section */}
      {papers.length > 0 && (
        <div className="max-w-7xl mx-auto my-12 pt-12 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Papers</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {papers.length} PDF Papers Available
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-3">
              {papers.map((paper) => {
                const paperName = formatPaperName(paper);
                const paperUrl = `/papers/${encodeURIComponent(paper)}`;

                return (
                  <div
                    key={paper}
                    className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 md:p-6"
                  >
                    <Link
                      href={paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group"
                    >
                      <span className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">
                        {paperName}
                      </span>
                      <span className="ml-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}