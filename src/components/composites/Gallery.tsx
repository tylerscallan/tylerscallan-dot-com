import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { Photo } from '../../types'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../hooks'

interface GalleryProps {
  photos: Photo[]
}

interface GalleryImageProps {
  photo: Photo
  onClick: () => void
  reducedMotion: boolean
}

function GalleryImage({ photo, onClick, reducedMotion }: GalleryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <button
      onClick={onClick}
      aria-label="View photo in full size"
      className={cn(
        'relative aspect-square overflow-hidden cursor-pointer',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 focus-visible:ring-offset-2',
        reducedMotion ? 'opacity-100' : 'animate-gallery-item'
      )}
    >
      {/* Image */}
      {!hasError && (
        <img
          src={photo.thumb}
          alt={photo.alt}
          loading="lazy"
          className={cn(
            'w-full h-full object-cover transition-all duration-300',
            'hover:opacity-95',
            !reducedMotion && 'hover:scale-[1.02]',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-100 dark:bg-stone-800">
          <span className="text-sm text-stone-400 dark:text-stone-500">Failed to load</span>
        </div>
      )}
    </button>
  )
}

export default function Gallery({ photos }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px">
        {photos.map((photo, index) => (
          <GalleryImage
            key={photo.src}
            photo={photo}
            onClick={() => openLightbox(index)}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        controller={{ closeOnBackdropClick: true }}
        slides={photos.map((photo) => ({
          src: photo.src,
          alt: photo.alt,
          width: photo.width,
          height: photo.height,
        }))}
        render={{
          iconClose: () => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              aria-hidden="true"
              focusable="false"
              className="yarl__icon"
            >
              <g fill="currentColor">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </g>
            </svg>
          ),
        }}
      />
    </>
  )
}
