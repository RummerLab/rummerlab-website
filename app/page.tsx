import Script from 'next/script'

export default function Home() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID; 
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <main className="px-6 mx-auto">
        <h1 className="text-center text-4xl font-bold text-gray-800 my-4">RummerLab</h1>
        <p className="mt-12 mb-12 text-xl text-center dark:text-white">
          Rummerlab, led by Dr Jodie Rummer, focuses on researching the physiological
          processes and adaptations of aquatic animals in response to environmental
          stressors. Our research aims to understand how these organisms cope with
          changing conditions and contribute to the conservation of aquatic ecosystems.
        </p>
        <h2 className="mt-12 mb-12 text-3xl text-center dark:text-white">Research Areas</h2>
        <p className="mt-12 mb-12 text-xl text-center dark:text-white">
          Our main research areas include:
        </p>
        <ul className="mt-12 mb-12 text-xl text-center dark:text-white">
          <li>Physiological responses to environmental stressors</li>
          <li>Adaptations to climate change and ocean acidification</li>
          <li>Conservation of aquatic species and ecosystems</li>
        </ul>
        <h2 className="mt-12 mb-12 text-3xl text-center dark:text-white">Publications</h2>
        <p className="mt-12 mb-12 text-xl text-center dark:text-white">
          To view a list of our publications, please visit the&nbsp;
          <a href="https://scholar.google.com/citations?user=ynWS968AAAAJ&hl=en&oi=ao" target="_blank" rel="noopener noreferrer">publications page</a>.
        </p>
        <h2 className="mt-12 mb-12 text-3xl text-center dark:text-white">Contact Us</h2>
        <p className="mt-12 mb-12 text-xl text-center dark:text-white">
          If you want to reach out, please feel free
          to reach out at <a href="mailto:jodierummer@rummerlab.com">jodierummer@rummerlab.com</a>.
        </p>
        <h2 className="mt-12 mb-12 text-3xl text-center dark:text-white">Jodie L. Rummer&apos;s Papers</h2>
        <div className="mt-12 mb-12 text-xl text-center dark:text-white">
          <a href="https://scholar.google.com/citations?user=ynWS968AAAAJ&hl=en&oi=ao" target="_blank" rel="noopener noreferrer">Google Scholar profile</a>
        </div>
      </main>
    </>
  );
};