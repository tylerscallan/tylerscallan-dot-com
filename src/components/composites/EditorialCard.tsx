import { useState } from 'react'
import type { Editorial } from '../../data/editorials'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../hooks'
import { Skeleton } from '../primitives'

interface EditorialCardProps {
  editorial: Editorial
}

export default function EditorialCard({ editorial }: EditorialCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <article className="group">
      <div
        className={cn(
          'relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800 mb-4 transition-shadow duration-300',
          !reducedMotion && 'group-hover:shadow-lg'
        )}
      >
        {/* Loading skeleton */}
        {!isLoaded && !hasError && <Skeleton className="absolute inset-0" />}

        {/* Image */}
        {!hasError && (
          <img
            src={editorial.coverThumb}
            alt={editorial.title}
            loading="lazy"
            className={cn(
              'w-full h-full object-cover transition-all duration-300',
              'group-hover:opacity-95',
              !reducedMotion && 'group-hover:scale-[1.02]',
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
      </div>
      <h2 className="text-lg font-light tracking-wide group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors">
        {editorial.title}
      </h2>
      <time
        dateTime={editorial.date}
        className="block text-sm text-stone-500 dark:text-stone-400 mt-1"
      >
        {new Date(editorial.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
        })}
      </time>
    </article>
  )
}
