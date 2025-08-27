import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter } from "next/font/google"
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  metadataBase: new URL('https://rummerlab.com'),
  title: "RummerLab",
  description: 'Dr Jodie Rummer\'s lab',
  openGraph: {
    title: "RummerLab - Dr Jodie Rummer's Marine Science Lab",
    description: "Researching fish physiology, marine conservation, and environmental stressors on the Great Barrier Reef and beyond.",
    url: "https://rummerlab.com",
    siteName: "RummerLab",
    images: [
      {
        url: "/images/rummerlab_logo_transparent.png",
        width: 1200,
        height: 630,
        alt: "RummerLab Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RummerLab - Dr Jodie Rummer's Marine Science Lab",
    description: "Researching fish physiology, marine conservation, and environmental stressors on the Great Barrier Reef and beyond.",
    images: ["/images/rummerlab_logo_transparent.png"],
    creator: "@rummerlab",
    site: "@rummerlab",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_PROPERTY_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_PROPERTY_ID} />
        )}
      </body>
    </html>
  )
}
