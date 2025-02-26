import GalleryItem from "./GalleryItem";
import NoExtensionsWrapper from "../components/NoExtensionsWrapper";
import { gallerySections } from "./galleryData";

export const metadata = {
    title: "Gallery | RummerLab",
    description: 'Photo gallery showcasing marine research, conservation efforts, and life in the RummerLab.',
}

export default function GalleryPage() {
    return (
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <NoExtensionsWrapper>
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Photo Gallery
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Exploring marine life through our lens
                    </p>
                </div>
            </NoExtensionsWrapper>

            {/* Gallery Sections */}
            <div className="space-y-16">
                {gallerySections.map((section, sectionIndex) => (
                    <section key={`section-${sectionIndex}`} className="space-y-8">
                        <NoExtensionsWrapper>
                            <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    {section.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {section.description}
                                </p>
                            </div>
                        </NoExtensionsWrapper>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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
        </div>
    );
} 