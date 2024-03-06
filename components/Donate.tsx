import Link from 'next/link';

export default function Donate() {
  return (
    <div>
      <h1 className="mt-12 mb-12 text-3xl text-center dark:text-white">Baby Sharks in a Changing World</h1>
      <p>The Physioshark Research Program at James Cook University is dedicated to understanding how climate change is impacting sharks and informing conservation efforts. The team investigates the effects of rising sea temperatures, ocean acidification, and declining oxygen on the physiology and behaviour of sharks. Sharks are an important element of healthy environments and without them entire ocean ecosystems can fall out of balance. Based on the Great Barrier Reef and in French Polynesia the Physioshark Research Program seeks to understand and protect sharks in a changing world. By working to safeguard these important predators, the team is contributing to the health and sustainability of marine ecosystems, which are essential to the well-being of our planet.</p>
      <p>To donate to the cause, JCU have set up <Link href="https://www.jcu.edu.au/give/give-to-innovation-and-discovery/baby-sharks-in-a-changing-world" className="text-blue-500 hover:underline cursor-pointer">non-U.S. donors page</Link> and a <Link href="https://jcuamerica.org/home/jcu-physioshark-research-program" className="text-blue-500 hover:underline cursor-pointer">page for U.S. donors</Link> (for U.S. specific tax deduction purposes).</p>
    </div>
  );
};