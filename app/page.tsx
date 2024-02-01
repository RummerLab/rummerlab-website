import Link from 'next/link';
import Header from '@/components/Header';
import Research from '@/components/Research';
import Publications from '@/components/Publications';
import InstagramPosts from "@/components/Instagram";

export default function Home() {
  return (
    <>
      <main className="px-6 mx-auto">
        <Header />
        <Research />
        <InstagramPosts />
      </main>
    </>
  );
};