import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PaperCitation } from '@/components/PaperCitation';
import { getFeaturedPapers } from '@/lib/papers';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentCard } from '@/components/layout/ContentCard';
import { ButtonLink } from '@/components/layout/ButtonLink';

const researchAreas = [
  {
    title: "Marine Conservation Physiology",
    description: "Understanding how marine organisms function in their environment and respond to environmental change.",
    image: "/images/gallery/healthy-reef-great-barrier-reef-rummer.jpg",
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
    image: "/images/gallery/blacktip-reef-shark-nursery-habitat-french-polynesia-huertas.jpg",
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
    image: "/images/gallery/outer-great-barrier-reef-healthy-corals-rummer.jpg",
    alt: "Orange and white clown fish on green and white coral reef",
    projects: [
      "Reef fish physiology",
      "Climate change impacts on reef ecosystems",
      "Coral reef conservation"
    ]
  }
];

export default function ResearchPage() {
  const featuredPublications = getFeaturedPapers(4);
  return (
    <PageShell>
      <PageHeader
        title="Our Research"
        subtitle="The RummerLab focuses on understanding marine ecosystems and their response to environmental changes, with particular emphasis on fish physiology and conservation."
      />

      <div className="space-y-12">
        {researchAreas.map((area, index) => (
          <ContentCard key={index} reveal className="overflow-hidden p-0" style={{ animationDelay: `${index * 100}ms` }}>
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{area.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{area.description}</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Current Projects:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {area.projects.map((project, projectIndex) => (
                    <li key={projectIndex} className="text-gray-600 dark:text-gray-300">{project}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ContentCard>
        ))}
      </div>

      {featuredPublications.length > 0 && (
        <ContentCard reveal className="mt-12">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">Featured Publications</h2>
          <div className="mx-auto mb-8 h-1 w-20 rounded-full bg-blue-500" />
          <div className="grid gap-8 md:grid-cols-2">
            {featuredPublications.map((pub) => (
              <div
                key={pub.filename}
                className="rounded-xl border border-gray-200/60 bg-gray-50/50 p-6 dark:border-gray-800/60 dark:bg-gray-800/50"
              >
                {pub.title ? (
                  <PaperCitation
                    paper={pub}
                    headingLevel="h3"
                    linkClassName="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2"
                  />
                ) : (
                  <>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                      <Link href={pub.url} className="hover:text-blue-600 dark:hover:text-blue-400">
                        {pub.name}
                      </Link>
                    </h3>
                    {pub.year ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{pub.year}</p>
                    ) : null}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/publications">View All Publications</ButtonLink>
          </div>
        </ContentCard>
      )}

      <ContentCard reveal className="mt-12">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">Research Impact</h2>
        <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-blue-500" />
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-gray-800 dark:text-gray-300">
            Our research contributes to understanding and protecting marine ecosystems in the face of environmental change.
            Through our work, we aim to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-800 dark:text-gray-300">Inform marine conservation policies</li>
            <li className="text-gray-800 dark:text-gray-300">Develop strategies for protecting vulnerable species</li>
            <li className="text-gray-800 dark:text-gray-300">Advance our understanding of marine ecosystem responses to climate change</li>
            <li className="text-gray-800 dark:text-gray-300">Train the next generation of marine scientists</li>
          </ul>
        </div>
      </ContentCard>

      <ContentCard reveal className="mt-12">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">Research Collaborations</h2>
        <div className="mx-auto mb-8 h-1 w-20 rounded-full bg-blue-500" />
        <div className="grid gap-6">
          <div className="rounded-xl border border-gray-200/60 bg-gray-50/50 p-4 dark:border-gray-800/60 dark:bg-gray-800/50">
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Academic Partners</h3>
            <p className="text-muted">Leading universities and research institutions</p>
          </div>
          <div className="rounded-xl border border-gray-200/60 bg-gray-50/50 p-4 dark:border-gray-800/60 dark:bg-gray-800/50">
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Conservation Organizations</h3>
            <p className="text-muted">Environmental and marine conservation groups</p>
          </div>
          <div className="rounded-xl border border-gray-200/60 bg-gray-50/50 p-4 dark:border-gray-800/60 dark:bg-gray-800/50">
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Government Agencies</h3>
            <p className="text-muted">Environmental protection and marine resource management</p>
          </div>
        </div>
      </ContentCard>
    </PageShell>
  );
}