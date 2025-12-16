'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface GalleryImage {
  url: string
  alt?: string
}

interface ImageGalleryProps {
  gallery: GalleryImage[]
  title?: string
}

export default function ImageGallery({ gallery, title = 'More Images' }: ImageGalleryProps) {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)

  const closeFullscreen = () => setFullscreenIndex(null)

  const showNext = () => {
    setFullscreenIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : null))
  }

  const showPrev = () => {
    setFullscreenIndex((prev) =>
      prev !== null ? (prev - 1 + gallery.length) % gallery.length : null,
    )
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (fullscreenIndex === null) return
      if (e.key === 'Escape') closeFullscreen()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [fullscreenIndex])

  if (!gallery || gallery.length === 0) return null

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      {/* --- Carousel --- */}
      <Carousel className="relative w-full">
        <CarouselContent>
          {gallery.map((image, index) => (
            <CarouselItem key={index}>
              <div
                className="relative w-full h-full aspect-square cursor-pointer"
                onClick={() => setFullscreenIndex(index)}
              >
                <Image
                  src={image.url}
                  alt={image.alt || 'Gallery image'}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* --- Fullscreen Modal --- */}
      {fullscreenIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 text-white p-2 bg-black/50 rounded-full z-100 cursor-pointer"
          >
            <X size={28} />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              showPrev()
            }}
            className="absolute left-6 text-white p-3 bg-black/50 rounded-full z-100 cursor-pointer"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              showNext()
            }}
            className="absolute right-6 text-white p-3 bg-black/50 rounded-full z-100 cursor-pointer"
          >
            <ChevronRight size={32} />
          </button>

          {/* Fullscreen Image */}
          <div className="relative w-[90vw] h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={gallery[fullscreenIndex].url}
              alt={gallery[fullscreenIndex].alt || ''}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
