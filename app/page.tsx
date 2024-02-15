import Link from 'next/link';
import Header from '@/components/Header';
import Research from '@/components/Research';

export default function Home() {
  return (
    <>
      <main className="px-6 mx-auto">
        <Header />
        <Research />
      </main>
    </>
  );
};