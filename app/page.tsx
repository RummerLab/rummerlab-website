import Header from '@/components/Header';
import Research from '@/components/Research';
import JoinOurLab from '@/components/JoinOurLab';
import { AnimatedCollaborators } from '../components/AnimatedCollaborators';

export default function Home() {
  return (
    <>
      <main className="px-6 mx-auto">
        <Header />
        <JoinOurLab />
        <Research />
        <div className="mt-12">
          <AnimatedCollaborators />
        </div>
      </main>
    </>
  );
};