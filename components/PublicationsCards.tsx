import Link from 'next/link';
import { getPublications } from "@/lib/scholarly"
import { Publication } from "@/types/scholarly"

export const revalidate = 86400;
export const dynamic = "force-dynamic";

export async function PublicationsCards() {
  const publications = await getPublications("ynWS968AAAAJ");

  publications.sort((a: Publication, b: Publication) => {
    const yearA = Number(a?.bib?.pub_year) || 0;
    const yearB = Number(b?.bib?.pub_year) || 0;
    return yearB - yearA;
  });

  return (
    <div className="max-w-7xl mx-auto my-8">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Publications</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">{publications.length} Scientific Papers</p>
      </div>
      {publications.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((publication: Publication, index: number) => {
            const authorPubId = publication?.author_pub_id ?? '';
            const publicationId = authorPubId.split(':')[0] || `pub-${index}`;
            const publicationUrl = authorPubId
              ? `https://scholar.google.com/citations?view_op=view_citation&hl=en&user=${publicationId}&citation_for_view=${publication.author_pub_id}`
              : '#';

            // Construct the correct Google Scholar citations URL
            const citationsUrl = `https://scholar.google.com/scholar?cites=${publicationId}`;

            // Extract authors and format them (defensive for api.rummerlab.com shape)
            const authorStr = publication?.bib?.author ?? '';
            const authors = authorStr ? authorStr.split(' and ').map((a: string) => a.trim()) : [];
            const formattedAuthors = authors.length > 4
              ? `${authors[0]}, et al.`
              : authors.length > 0 ? authors.join(', ') : 'Unknown';

            const bib = publication?.bib ?? {};
            const title = bib.title ?? 'Untitled';
            const journalOrBook = bib.journal ?? bib.booktitle ?? 'Publication';
            const pubYear = bib.pub_year ?? '';

            return (
              <li key={publicationId || index} className="bg-gray-50 dark:bg-gray-800 shadow-lg rounded-xl p-6 list-none transition-all duration-200 hover:shadow-xl h-full flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {title}
                </h3>
                <div className="mb-3 grow">
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{formattedAuthors}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">{journalOrBook}</span>
                    {bib.volume && `, Volume ${bib.volume}`}
                    {bib.number && `, Issue ${bib.number}`}
                    {bib.pages && `, Pages ${bib.pages}`}
                    {pubYear ? ` (${pubYear})` : ''}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <Link 
                      href={citationsUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                      </svg>
                      {publication?.num_citations ?? 0} citations
                    </Link>
                  </div>
                  <Link 
                    href={publicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    View Publication
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
