import Image from "next/image";

export const metadata = {
    title: "Gallery | RummerLab",
    description: 'Photo gallery showcasing marine research, conservation efforts, and life in the RummerLab.',
}

interface GallerySection {
    title: string;
    description: string;
    images: {
        src: string;
        alt: string;
        caption?: string;
    }[];
}

const gallerySections: GallerySection[] = [
    {
        title: "Conservation",
        description: "Images showcasing our marine conservation efforts and research",
        images: [
            {
                src: "/images/unsplash/conservation/conservation-environmental-research-3_oggbdpida.jpg",
                alt: "Environmental research in marine conservation",
                caption: "Environmental research and monitoring"
            },
            {
                src: "/images/unsplash/conservation/conservation-marine-conservation-xqgm43fyvzk.jpg",
                alt: "Marine conservation efforts",
                caption: "Marine conservation initiatives"
            },
            {
                src: "/images/unsplash/conservation/conservation-ocean-conservation-g0qdolm3k14.jpg",
                alt: "Ocean conservation",
                caption: "Protecting ocean ecosystems"
            },
            {
                src: "/images/unsplash/conservation/conservation-ocean-conservation-9k9ipjhddks.jpg",
                alt: "Ocean conservation research",
                caption: "Studying marine ecosystems"
            }
        ]
    },
    {
        title: "Sharks",
        description: "Our work with sharks and the Physioshark project",
        images: [
            {
                src: "/images/unsplash/sharks/sharks-marine-biology-qsaedeorqf8.jpg",
                alt: "Marine biology research with sharks",
                caption: "Shark research in marine biology"
            },
            {
                src: "/images/unsplash/sharks/sharks-reef-shark-njssdhiczyu.jpg",
                alt: "Reef shark research",
                caption: "Studying reef sharks in their natural habitat"
            },
            {
                src: "/images/unsplash/sharks/sharks-shark-rm1ynzdhkp8.jpg",
                alt: "Shark research",
                caption: "Understanding shark behavior"
            },
            {
                src: "/images/unsplash/sharks/sharks-shark-sxlju_ydkt8.jpg",
                alt: "Shark conservation",
                caption: "Shark conservation efforts"
            }
        ]
    },
    {
        title: "Ocean Life",
        description: "The diverse marine life we study",
        images: [
            {
                src: "/images/unsplash/ocean/ocean-marine-life-dwkd_epw2ge.jpg",
                alt: "Marine life diversity",
                caption: "Exploring marine biodiversity"
            },
            {
                src: "/images/unsplash/ocean/ocean-underwater-photography-iu5xvyvdcow.jpg",
                alt: "Underwater photography",
                caption: "Documenting marine life"
            },
            {
                src: "/images/unsplash/ocean/ocean-coral-reef-btpfx4ifbyg.jpg",
                alt: "Coral reef ecosystem",
                caption: "Studying coral reef ecosystems"
            },
            {
                src: "/images/unsplash/ocean/ocean-coral-reef-woa0_arm-2u.jpg",
                alt: "Coral reef research",
                caption: "Coral reef conservation"
            }
        ]
    },
    {
        title: "Research",
        description: "Our research activities and fieldwork",
        images: [
            {
                src: "/images/unsplash/research/research-scientific-equipment-eqjfamwcdge.jpg",
                alt: "Scientific equipment",
                caption: "Advanced research equipment"
            },
            {
                src: "/images/unsplash/research/research-laboratory-research-eo_4dqpusqa.jpg",
                alt: "Laboratory research",
                caption: "Laboratory studies and analysis"
            },
            {
                src: "/images/unsplash/research/research-marine-research-wwvd4wxrx38.jpg",
                alt: "Marine research",
                caption: "Field research in marine biology"
            },
            {
                src: "/images/unsplash/research/research-marine-research-lehac0gdys0.jpg",
                alt: "Marine research activities",
                caption: "Marine research in action"
            }
        ]
    }
];

export default function GalleryPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Photo Gallery</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Exploring marine life through our lens
                </p>
            </div>

            {/* Gallery Sections */}
            <div className="space-y-16">
                {gallerySections.map((section, sectionIndex) => (
                    <section key={sectionIndex} className="space-y-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                {section.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                {section.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {section.images.map((image, imageIndex) => (
                                <div 
                                    key={imageIndex} 
                                    className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {image.caption && (
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                            <p className="text-white p-4 text-sm">
                                                {image.caption}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
} 