import './globals.css'
import Navbar from '@/components/Navbar'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'
import Logo from '@/components/Logo'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "RummerLab",
  description: 'Dr Jodie Rummer\'s lab',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID; 
  return (
    <html lang="en">
      <GoogleAnalytics />
      <Analytics /><SpeedInsights />
      <body className="dark:bg-slate-800 dark:text-white text-center">
        <Navbar />
        <Menu />
        <Logo />
        {children}
        <Footer />
      </body>
    </html>
  )
}
