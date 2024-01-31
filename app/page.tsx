import Header from '@/components/Header';
import Research from '@/components/Research';
import Publications from '@/components/Publications';
import InstagramPosts from "@/components/Instagram";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className="px-6 mx-auto">
        <Header />
        <div className="text-center">
          <p><Link href="/collaborators" className="text-blue-500 hover:underline cursor-pointer">Collaborators</Link></p>
          <p><Link href="/physioshark-project" className="text-blue-500 hover:underline cursor-pointer">Physioshark Project</Link></p>
          <p><Link href="/rummerlab" className="text-blue-500 hover:underline cursor-pointer">Rummerlab</Link></p>
          <p><Link href="/posts" className="text-blue-500 hover:underline cursor-pointer">Posts</Link></p>
        </div>
        <Research />
        <InstagramPosts />
      </main>
    </>
  );
};