import GoogleAnalytics from './components/GoogleAnalytics';
import Header from './components/Header';
import Research from './components/Research';
import Publications from './components/Publications';
import Contact from './components/Contact';

export default function Home() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID; 
  return (
    <>
      <GoogleAnalytics />
      <main className="px-6 mx-auto">
        <Header />
        <Research />
        <Publications />
        <Contact />
      </main>
    </>
  );
};