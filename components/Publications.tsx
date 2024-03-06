import Link from 'next/link';
import { getPublications } from '@/lib/scholarly';

export async function PublicationsList() {
    const publications = await getPublications("ynWS968AAAAJ");

    publications.sort((a: any, b: any) => {
        return b.bib.pub_year - a.bib.pub_year;
    });
  
    return (
      <>
        <h2 className="mt-12 mb-2 text-3xl text-center dark:text-white">Publications</h2>
        <p className="text-xl text-center dark:text-white">
          A list of our&nbsp;
          <Link href="https://scholar.google.com/citations?user=ynWS968AAAAJ&hl=en&oi=ao" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">publications</Link>:
        </p>
        {publications.length > 0 && (
          <div className="flex flex-col items-start max-w-4xl mx-auto">
            {publications.map((publication: Publication, index: number) => (
              <div key={index} className="w-full mb-4">
                <h3 className="text-xl dark:text-white text-left">{publication.bib.title} ({publication.bib.pub_year})</h3>
                <p className="dark:text-white text-left">{publication.bib.citation}</p>
                <a href={publication.citedby_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-left">
                  View Citations
                </a>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };
  
  // List publications like this: https://tailwindui.com/components/application-ui/lists/stacked-lists
  // Showing the title, authors as avatars, and publication date and impact factor
  
  // v0.dev