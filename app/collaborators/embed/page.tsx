export const metadata = {
    title: "Embedding your Google Scholar Profile on your website",
    description: "A guide for collaborators of Dr. Jodie Rummer on how to embed their Google Scholar profile onto their website."
};
  
export default function Embed() {
    const embedCode = `<script src="https://rummerlab.com/embed/scholar.js"></script>
<div id="scholar-embed" scholar-id="ynWS968AAAAJ"></div>`;

    return (
        <div>
            <h1>Hello Collaborators</h1>
            <p>This guide is exclusively for collaborators of Dr. Jodie Rummer. It outlines a straightforward process to embed your Google Scholar profile onto your website, enhancing its academic relevance and showcasing your publications directly to your audience.</p>
            <p>This Google Scholar data is updated once a week.</p>
            <p>Copy and paste the following embed code into the HTML of your website:</p>
            {/* Use pre and code tags to display the embed code */}
            <pre><code>{embedCode}</code></pre>
        </div>
    );

}
