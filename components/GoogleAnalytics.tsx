import { GoogleAnalytics } from '@next/third-parties/google'
 
export default function GoogleAnalyticsCode() {
  const NEXT_PUBLIC_GA_PROPERTY_ID = process.env.NEXT_PUBLIC_GA_PROPERTY_ID; 
  
  // Check if GA_ID is not undefined, null, or empty
  if (!NEXT_PUBLIC_GA_PROPERTY_ID) {
    console.warn("Google Analytics ID is not set.");
    return null; // Return null to render nothing
  }

  return <GoogleAnalytics gaId={NEXT_PUBLIC_GA_PROPERTY_ID} />
};