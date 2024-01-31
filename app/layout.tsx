import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Logo from '@/components/Logo'
import GoogleAnalytics from '@/components/GoogleAnalytics'

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
      <body className="dark:bg-slate-800">
        <Navbar />
        <Logo />
        {children}
        <Footer />
      </body>
    </html>
  )
}
