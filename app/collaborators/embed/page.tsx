import Link from 'next/link';
import { getCoAuthors } from '@/lib/scholarly';
import { CoAuthor } from '@/types/scholarly';

export const metadata = {
    title: "Embedding your Google Scholar Profile on your website",
    description: "A guide for collaborators of Dr. Jodie Rummer on how to embed their Google Scholar profile onto their website."
};

const JODIE_SCHOLAR_ID = "ynWS968AAAAJ";
const STATIC_COAUTHORS_FALLBACK = ["g9B1IoQAAAAJ - Brock Bergseth"];

export default async function Embed() {
    const coAuthors = await getCoAuthors(JODIE_SCHOLAR_ID);
    const coAuthorDetails = coAuthors.map((author: CoAuthor) => `${author.scholar_id} - ${author.name}`);
    coAuthorDetails.push(...STATIC_COAUTHORS_FALLBACK);
    const coAuthorsFormatted = coAuthorDetails.join('\n');
    const isPartialList = coAuthors.length === 0;

        const embedCode = `<script src="https://rummerlab.com/embed/scholar.js"></script>
    <div id="scholar-embed" scholar-id="YOUR_SCHOLAR_ID"></div>`;

        return (
            <div>
                <h1>Hello Collaborators</h1>
                <p>This guide is exclusively for collaborators of Dr. Jodie Rummer. It outlines a straightforward process to embed your Google Scholar profile onto your website, enhancing its academic relevance and showcasing your publications directly to your audience.</p>
                <p>These Google Scholar data is updated once a week.</p>
                <p>Copy and paste the following embed code into the HTML of your website:</p>
                <pre><code>{embedCode}</code></pre>
                <br></br>
                <p>Replace &quot;YOUR_SCHOLAR_ID&quot; with your Google Scholar ID found below or in the URL when on your Google Scholar - e.g., <Link href="https://scholar.google.com/citations?user=ynWS968AAAAJ&hl=en&oi=ao">https://scholar.google.com/citations?user=<strong>ynWS968AAAAJ</strong>&hl=en&oi=ao</Link></p>
                <p>Here are the Google Scholar IDs of Dr. Jodie Rummer&apos;s collaborators:</p>
                {isPartialList && (
                    <p className="text-amber-600 dark:text-amber-400 text-sm mb-2">Collaborator list is temporarily unavailable; showing known IDs. The full list will appear when the data source is reachable.</p>
                )}
                <pre><code>{coAuthorsFormatted}</code></pre>
            </div>
        );

}
