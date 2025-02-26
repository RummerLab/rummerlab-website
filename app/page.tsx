import Header from '@/components/Header';
import Research from '@/components/Research';
import JoinOurLab from '@/components/JoinOurLab';
import { AnimatedCollaborators } from '../components/AnimatedCollaborators';
import Donate from '@/components/Donate';
import Menu from '@/components/Menu';
export default function Home() {
  return (
    <>
      <main className="px-6 mx-auto">
        <Header />
        <JoinOurLab />
        <Donate />
        <Research />
        <div className="mt-12">
          <AnimatedCollaborators />
        </div>
        <Menu />
      </main>
    </>
  );
};