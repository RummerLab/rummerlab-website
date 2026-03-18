import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | RummerLab',
  description:
    'Learn about RummerLab — Dr. Jodie Rummer\'s marine science laboratory at James Cook University, pioneering research in fish physiology, shark biology, and climate change impacts on ocean ecosystems.',
  openGraph: {
    title: 'About RummerLab',
    description:
      'Discover the story of RummerLab, our mission, and how we study the physiological responses of marine life to a changing ocean.',
    images: [{ url: '/images/gallery/sea-eagle-catch-rummer.jpg' }],
  },
};

const values = [
  {
    title: 'Curiosity-Driven Science',
    description:
      'We ask fundamental questions about how fish and other aquatic animals work — at the cellular level and across entire ecosystems — and let the biology guide us.',
    icon: '🔬',
  },
  {
    title: 'Conservation Impact',
    description:
      'Every experiment is motivated by a desire to protect the oceans. Our findings feed directly into management and policy decisions for threatened species and habitats.',
    icon: '🐠',
  },
  {
    title: 'Inclusive Research Culture',
    description:
      'We foster a collaborative, inclusive environment where students, postdocs, and visiting scientists from around the world are empowered to do their best work.',
    icon: '🌏',
  },
  {
    title: 'Open & Reproducible',
    description:
      'We are committed to rigorous, transparent science — sharing data, protocols, and findings openly so the wider community can build on our work.',
    icon: '📖',
  },
];

const researchHighlights = [
  {
    title: 'Shark Physiology',
    description:
      'From embryos in egg cases on the seafloor to free-swimming reef sharks in French Polynesia, we study how sharks cope with warming, acidifying oceans — and what that means for their survival.',
    link: '/physioshark-project',
    linkLabel: 'Physioshark Project',
    image: '/images/gallery/blacktip-reef-shark-nursery-habitat-french-polynesia-huertas.jpg',
    imageAlt: 'Blacktip reef shark in a nursery habitat in French Polynesia',
  },
  {
    title: 'Climate Change & Fish Physiology',
    description:
      'Rising temperatures and ocean acidification are not abstract threats — they alter blood chemistry, gill function, and behaviour in ways that can determine whether a fish lives or dies. We quantify these effects across hundreds of species.',
    link: '/climate-change',
    linkLabel: 'Climate Change Research',
    image: '/images/gallery/outer-great-barrier-reef-healthy-corals-rummer.jpg',
    imageAlt: 'Healthy coral formations on the outer Great Barrier Reef',
  },
  {
    title: 'Great Barrier Reef Conservation',
    description:
      'The Great Barrier Reef is our field laboratory and our responsibility. We monitor fish populations, test restoration approaches, and communicate findings to reef managers and the public.',
    link: '/conservation',
    linkLabel: 'Conservation',
    image: '/images/gallery/healthy-reef-great-barrier-reef-rummer.jpg',
    imageAlt: 'A healthy section of the Great Barrier Reef',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-gray-950 min-h-screen text-gray-100">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src="/images/gallery/sea-eagle-catch-rummer.jpg"
          alt="A sea eagle diving to catch a fish over calm ocean water, photo by Australian Geographic"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-950" />

        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 px-6 text-center">
          <span className="inline-block px-3 py-1 bg-blue-900/40 text-blue-300 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            About RummerLab
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            Decoding Life in a{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Changing Ocean
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow">
            Dr. Jodie Rummer&apos;s lab at James Cook University, exploring the
            physiology of marine animals from the Great Barrier Reef to the open sea.
          </p>
        </div>

        {/* Photo credit */}
        <p className="absolute bottom-3 right-4 text-xs text-white/50 z-10">
          Photo is by Australian Geographic
        </p>
      </section>

      {/* ── Who We Are ────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Who We Are</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto" />
          </div>

          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              RummerLab is a marine science research group led by{' '}
              <strong className="text-white">Professor Jodie Rummer</strong> at the{' '}
              <strong className="text-white">
                ARC Centre of Excellence for Coral Reef Studies, James Cook University
              </strong>
              , Townsville, Australia. Our team spans PhD students, postdoctoral researchers,
              honours students, and international collaborators united by a shared fascination
              with how aquatic animals function — and how they might (or might not) cope with
              the rapid environmental changes underway in today&apos;s oceans.
            </p>
            <p>
              Jodie&apos;s path to the tropics began with a deep curiosity about fish blood. Her
              doctoral work uncovered a remarkable oxygen-transport mechanism in trout — a
              discovery that set the tone for a career defined by elegant physiology and urgent
              conservation questions. From high-altitude Andean rivers to the warm shallows of
              French Polynesia and the iconic reefs of the Coral Sea, she has spent decades
              eavesdropping on the biochemical conversations inside living fish.
            </p>
            <p>
              Today, RummerLab investigates everything from the molecular machinery of gill
              function to the population-level consequences of ocean warming. We are particularly
              known for our work on{' '}
              <strong className="text-white">elasmobranch (shark and ray) physiology</strong>,
              coral reef fish responses to{' '}
              <strong className="text-white">climate change and ocean acidification</strong>, and
              the development of{' '}
              <strong className="text-white">
                minimally invasive in-vivo and in-vitro protocols
              </strong>{' '}
              for studying live animals in the field.
            </p>
          </div>
        </div>
      </section>

      {/* ── Research Highlights ───────────────────────────────── */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What We Study</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto mb-6" />
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our research threads together physiology, ecology, and conservation across three
              interconnected themes.
            </p>
          </div>

          <div className="space-y-12">
            {researchHighlights.map((item, i) => (
              <div
                key={item.title}
                className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
              >
                <div className="relative w-full md:w-1/2 h-64 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-blue-900/20" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">{item.description}</p>
                  <Link
                    href={item.link}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    {item.linkLabel}
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 hover:border-blue-700/50 transition-colors duration-200"
              >
                <span className="text-4xl mb-4 block">{v.icon}</span>
                <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-gray-300 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to Action ────────────────────────────────────── */}
      <section className="py-20 bg-gray-950 border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Explore Our World
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Dive deeper into our science, meet the team, or find out how you can get involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/research"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-blue-500/30"
            >
              Our Research
            </Link>
            <Link
              href="/team"
              className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium rounded-lg transition-colors duration-200"
            >
              Meet the Team
            </Link>
            <Link
              href="/join"
              className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium rounded-lg transition-colors duration-200"
            >
              Join Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
