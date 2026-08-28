import type { Metadata } from 'next';
import Image from 'next/image';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentCard } from '@/components/layout/ContentCard';
import { ButtonLink } from '@/components/layout/ButtonLink';

export const metadata: Metadata = {
  title: 'Physioshark Project',
  description:
    'The Physioshark Project - Conservation physiology research on shark nurseries in Moorea, French Polynesia',
};

export default function Physioshark() {
  return (
    <PageShell narrow>
      <PageHeader
        title="The Physioshark Project"
        subtitle="Conservation physiology research on shark nurseries in Mo'orea, French Polynesia"
        logoSrc="https://physioshark.org/images/logo-physioshark-project.png"
        logoAlt="Physioshark Project Logo"
        logoClassName="h-40 w-40"
      />

      <div className="relative mb-8 h-64 overflow-hidden rounded-xl shadow-lg view-reveal md:h-80">
        <Image
          src="/images/gallery/healthy-coral-seascape-outer-gbr-rummer.jpg"
          alt="Coral reef habitat in the Indo-Pacific"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>

      <ContentCard reveal className="mb-8">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-muted">
            In collaboration with the{' '}
            <a href="https://www.instagram.com/rummerlab/" target="_blank" rel="noopener noreferrer">
              RummerLab
            </a>{' '}
            and the{' '}
            <a href="http://www.criobe.pf/" target="_blank" rel="noopener noreferrer">
              Centre de Recherches Insulaires et Observatoire de l&apos;Environnement (CRIOBE)
            </a>
            , the{' '}
            <a href="https://www.physioshark.org/" target="_blank" rel="noopener noreferrer">
              Physioshark Project
            </a>{' '}
            was conceived in 2013.
          </p>
          <p className="text-muted">
            We work on Mo&apos;orea, French Polynesia, in collaboration with{' '}
            <a href="https://www.science4reefs-cnrs.com/" target="_blank" rel="noopener noreferrer">
              science4reefs
            </a>
            , where we have identified 11 potential shark nurseries. Here, mother sharks give birth to
            blacktip reef and sicklefin lemon sharks during the months of October - February every year.
            During these months, we perform surveys and studies in the field, largely conservation
            physiology based.
          </p>
          <p className="text-muted">
            Our overall aim with{' '}
            <a href="https://www.physioshark.org/" target="_blank" rel="noopener noreferrer">
              Physioshark
            </a>{' '}
            is to understand how newborn sharks are currently coping and how they will, in the future,
            cope with climate change and other human-induced stressors. French Polynesia is the{' '}
            <a
              href="https://www.pewtrusts.org/-/media/assets/2018/02/shark_sanctuaries_2018_issuebrief.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              largest shark sanctuary in the world
            </a>
            , as of 2019, and Mo&apos;orea, French Polynesia is really the perfect site to do
            conservation-minded research.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="https://www.physioshark.org/" target="_blank" rel="noopener noreferrer">
            Visit Physioshark.org
          </ButtonLink>
          <ButtonLink
            href="https://www.instagram.com/physioshark/"
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </ButtonLink>
        </div>
      </ContentCard>

      <ContentCard reveal className="overflow-hidden p-0">
        <iframe
          width="100%"
          height="450"
          src="https://umap.openstreetmap.fr/en/map/shark-nurseries-on-moorea-island-french-polynesia_295561?scaleControl=false&amp;miniMap=false&amp;scrollWheelZoom=true&amp;zoomControl=false&amp;allowEdit=false&amp;moreControl=false&amp;searchControl=false&amp;tilelayersControl=false&amp;embedControl=false&amp;datalayersControl=false&amp;onLoadPanel=undefined&amp;captionBar=false&amp;fullscreenControl=false&amp;locateControl=false&amp;measureControl=false&amp;editinosmControl=false"
          className="border-0"
          title="Shark nurseries on Mo'orea Island map"
        />
      </ContentCard>
    </PageShell>
  );
}
