import Link from 'next/link';
import { getCoAuthors } from '@/lib/scholarly';
import { CoAuthor } from '@/types/scholarly';

export const metadata = {
    title: "Embedding your Google Scholar Profile on your website",
    description: "A guide for collaborators of Dr. Jodie Rummer on how to embed their Google Scholar profile onto their website."
};

export default async function Embed() {
    const jodie = "ynWS968AAAAJ";
    const coAuthors = await getCoAuthors(jodie);
    const coAuthorDetails = coAuthors.map((author: CoAuthor) => `${author.scholar_id} - ${author.name}`);
    coAuthorDetails.push("g9B1IoQAAAAJ - Brock Bergseth");
    const coAuthorsFormatted = coAuthorDetails.join('\n');

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
                <pre><code>{coAuthorsFormatted}</code></pre>
            </div>
        );

}
