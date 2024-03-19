import Link from 'next/link';
import { getPublications } from "@/lib/scholarly"
import { Publication } from "@/types/scholarly"

export const revalidate = 86400;
export const dynamic = "force-dynamic";

export async function PublicationsCards() {
  const publications = await getPublications("ynWS968AAAAJ");
  
  publications.sort((a: any, b: any) => b.bib.pub_year - a.bib.pub_year);

  return (
    <div className="max-w-2xl mx-auto my-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Publications</h2>
        <p className="text-gray-600">{publications.length} papers</p>
      </div>
      {publications.length > 0 && (
        <ul className="space-y-4">
          {publications.map((publication: Publication, index: number) => {
            const publicationId = publication.author_pub_id.split(':')[0];
            const publicationUrl = `https://scholar.google.com/citations?view_op=view_citation&hl=en&user=${publicationId}&citation_for_view=${publication.author_pub_id}`;
            return (
              // hide dot
              <li key={index} className="bg-white shadow rounded-lg p-4 list-none">
                <h3 className="text-lg font-semibold">
                  {publication.bib.title} ({publication.bib.pub_year})
                </h3>
                <p className="text-gray-500">{publication.bib.citation}</p>
                <div className="mt-2 flex items-center justify-between">
                  <Link href={publication.citedby_url || ''}>
                    {publication.num_citations} citations
                  </Link>
                  <Link className="text-blue-600 hover:underline" href={publicationUrl}>
                    [PDF] scholar.com
                  </Link>
                </div>
              </li>
            )
          }
        )}
        </ul>
      )}
    </div>
  )
}
