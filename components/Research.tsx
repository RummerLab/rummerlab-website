import Link from 'next/link';

export default function Research() {
  return (
    <>
        <h2 className="mt-12 mb-12 text-3xl text-center">Research Areas</h2>
        <p className="mb-2 text-xl text-center">
          Our main research areas focus lies in the ecological, evolutionary, and conservation physiology in fishes.
        </p>
        <ul className="text-l text-center list-disc list-inside">
          <li><Link href="/environmental-stressors" className="text-blue-500 hover:underline cursor-pointer">Physiological responses to environmental stressors</Link></li>
          <li><Link href="/in-vivo-protocols" className="text-blue-500 hover:underline cursor-pointer">Novel in vitro and in vivo protocols</Link></li>
          <li><Link href="/" className="text-blue-500 hover:underline cursor-pointer">Adaptations to climate change and ocean acidification</Link></li>
          <li><Link href="/" className="text-blue-500 hover:underline cursor-pointer">Conservation of aquatic species and ecosystems</Link></li>
          <li><Link href="/future-environments" className="text-blue-500 hover:underline cursor-pointer">Harnessing geographic gradients and local extreme environment as analogues for future change</Link></li>
        </ul>
    </>
  );
};