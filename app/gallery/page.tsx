import type { Metadata } from 'next';
import GalleryItem from "./GalleryItem";
import NoExtensionsWrapper from "../components/NoExtensionsWrapper";
import { gallerySections } from "./galleryData";
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
    title: "Gallery | RummerLab",
    description: 'Photo gallery showcasing marine research, conservation efforts, and life in the RummerLab.',
}

export default function GalleryPage() {
    return (
        <PageShell wide>
            <NoExtensionsWrapper>
                <PageHeader
                    title="Photo Gallery"
                    subtitle="Exploring marine life through our lens"
                />
            </NoExtensionsWrapper>

            <div className="space-y-16">
                {gallerySections.map((section, sectionIndex) => (
                    <section key={`section-${sectionIndex}`} className="view-reveal space-y-8" style={{ animationDelay: `${sectionIndex * 100}ms` }}>
                        <NoExtensionsWrapper>
                            <div className="mx-auto max-w-3xl text-center">
                                <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                                    {section.title}
                                </h2>
                                <div className="mx-auto mb-4 h-1 w-20 rounded-full bg-blue-500" />
                                <p className="text-muted">
                                    {section.description}
                                </p>
                            </div>
                        </NoExtensionsWrapper>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
                            {section.images.map((image) => (
                                <GalleryItem 
                                    key={`gallery-item-${image.src}`} 
                                    image={image} 
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </PageShell>
    );
}
