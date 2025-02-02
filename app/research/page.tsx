import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const researchAreas = [
  {
    title: "Marine Conservation Physiology",
    description: "Understanding how marine organisms function in their environment and respond to environmental change.",
    image: "/images/unsplash/conservation/conservation-marine-conservation-fqg4_mkblny.jpg",
    alt: "Sea urchin representing marine conservation research",
    projects: [
      "Physiological responses to climate change",
      "Adaptation mechanisms in marine species",
      "Conservation strategies for threatened species"
    ]
  },
  {
    title: "Shark Research",
    description: "Investigating shark nursery habitats and the impact of environmental changes on shark populations.",
    image: "/images/unsplash/sharks/sharks-reef-shark-njssdhiczyu.jpg",
    alt: "A large white shark swimming over a coral reef",
    projects: [
      "Shark nursery habitat mapping",
      "Environmental impacts on shark development",
      "Conservation of shark populations"
    ]
  },
  {
    title: "Coral Reef Ecosystems",
    description: "Studying the complex interactions between reef fish and their changing environment.",
    image: "/images/unsplash/ocean/ocean-coral-reef-woa0_arm-2u.jpg",
    alt: "Orange and white clown fish on green and white coral reef",
    projects: [
      "Reef fish physiology",
      "Climate change impacts on reef ecosystems",
      "Coral reef conservation"
    ]
  }
];

const featuredPublications = [
  {
    title: "Exposure of clownfish larvae to suspended sediment levels found on the Great Barrier Reef: Impacts on gill structure and microbiome",
    authors: "Hess, S., et al.",
    journal: "Scientific Reports",
    year: "2023",
    link: "#"
  },
  {
    title: "Behavioural thermoregulation in a temperature-sensitive coral reef fish",
    authors: "Nay, T., et al.",
    journal: "Coral Reefs",
    year: "2023",
    link: "#"
  }
];

export default function ResearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header with Background Image */}
      <div className="relative text-center mb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/unsplash/research/research-marine-research-lehac0gdys0.jpg"
            alt="Marine research background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Research</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The RummerLab focuses on understanding marine ecosystems and their response to environmental changes,
            with particular emphasis on fish physiology and conservation.
          </p>
        </div>
      </div>

      {/* Research Areas */}
      <div className="space-y-16">
        {researchAreas.map((area, index) => (
          <section key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={area.image}
                  alt={area.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{area.title}</h2>
                <p className="text-gray-600 mb-6">{area.description}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Projects:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {area.projects.map((project, projectIndex) => (
                    <li key={projectIndex} className="text-gray-600">{project}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Featured Publications with Background */}
      <section className="mt-16 relative rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/unsplash/research/research-laboratory-research-eo_4dqpusqa.jpg"
            alt="Research laboratory background"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="relative z-10 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Publications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPublications.map((pub, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  <Link href={pub.link} className="hover:text-blue-600">
                    {pub.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-2">{pub.authors}</p>
                <p className="text-sm text-gray-500">{pub.journal} ({pub.year})</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/publications"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              View All Publications
            </Link>
          </div>
        </div>
      </section>

      {/* Research Impact with Ocean Background */}
      <section className="mt-16 relative rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/unsplash/ocean/ocean-underwater-photography-xexawgzyobc.jpg"
            alt="Clear blue underwater scene"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Research Impact</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-800">
              Our research contributes to understanding and protecting marine ecosystems in the face of environmental change.
              Through our work, we aim to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-gray-800">Inform marine conservation policies</li>
              <li className="text-gray-800">Develop strategies for protecting vulnerable species</li>
              <li className="text-gray-800">Advance our understanding of marine ecosystem responses to climate change</li>
              <li className="text-gray-800">Train the next generation of marine scientists</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Collaborations with Conservation Image */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Research Collaborations</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-auto">
              <Image
                src="/images/unsplash/conservation/conservation-environmental-research-bflon4v0jgq.jpg"
                alt="Environmental research equipment"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-8">
              <p className="text-gray-600 mb-6">
                We actively collaborate with research institutions and organizations worldwide to advance marine science and conservation.
              </p>
              <div className="grid gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Academic Partners</h3>
                  <p className="text-gray-600">Leading universities and research institutions</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Conservation Organizations</h3>
                  <p className="text-gray-600">Environmental and marine conservation groups</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Government Agencies</h3>
                  <p className="text-gray-600">Environmental protection and marine resource management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 