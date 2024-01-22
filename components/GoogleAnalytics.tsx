import Script from 'next/script'

export default function GoogleAnalytics() {
  const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID; 
  
  // Check if GA_ID is not undefined, null, or empty
  if (!GA_PROPERTY_ID) {
    console.warn("Google Analytics ID is not set.");
    return null; // Return null to render nothing
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_PROPERTY_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_PROPERTY_ID}');
        `}
      </Script>
    </>
  );
};