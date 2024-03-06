import Header from '@/components/Header';
import Research from '@/components/Research';
import JoinOurLab from '@/components/JoinOurLab';
import { AnimatedCollaborators } from '../components/AnimatedCollaborators';
import Donate from '@/components/Donate';

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
      </main>
    </>
  );
};

// https://ui.aceternity.com/components/sparkles
// https://ui.aceternity.com/components/lamp-effect
// https://ui.aceternity.com/components/spotlight
// https://ui.aceternity.com/components/hero-parallax
// https://ui.aceternity.com/components/3d-pin
// https://ui.aceternity.com/components/3d-card-effect