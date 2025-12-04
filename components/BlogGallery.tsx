'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { BlogGalleryImage } from '@/lib/blog';

interface BlogGalleryProps {
  images: BlogGalleryImage[];
}

export default function BlogGallery({ images }: BlogGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrevious();
    }
  };

  return (
    <>
      <div className="my-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Photo Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-900 cursor-pointer flex flex-col"
              onClick={() => handleImageClick(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleImageClick(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${image.alt} in fullscreen`}
            >
              <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-start">
                {image.caption && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">{image.caption}</p>
                )}
                {image.credit && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{image.credit}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={handleCloseModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold z-10"
            aria-label="Close gallery"
          >
            ×
          </button>
          {selectedImage > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 text-white hover:text-gray-300 text-4xl font-bold z-10"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}
          {selectedImage < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 text-white hover:text-gray-300 text-4xl font-bold z-10"
              aria-label="Next image"
            >
              ›
            </button>
          )}
          <div
            className="relative max-w-7xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={2000}
              height={1334}
              className="max-w-full max-h-[90vh] object-contain"
              priority
            />
            {(images[selectedImage].caption || images[selectedImage].credit) && (
              <div className="mt-4 text-center text-white">
                {images[selectedImage].caption && (
                  <p className="text-lg">{images[selectedImage].caption}</p>
                )}
                {images[selectedImage].credit && (
                  <p className="text-sm text-gray-300 mt-1">{images[selectedImage].credit}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

