import { useState } from 'react'
import { cn } from '../../../lib/utils'
import { IOS_ICON, ANIMATION } from '../../../constants'
import { Skeleton } from '../../primitives'

interface IOSIconProps {
  name: string
  image?: string
  url: string
  index?: number
  reducedMotion?: boolean
}

export default function IOSIcon({
  name,
  image,
  url,
  index = 0,
  reducedMotion = false,
}: IOSIconProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const animationDelay = reducedMotion ? 0 : index * ANIMATION.stagger.icons

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${name}`}
      className={cn(
        'flex flex-col items-center gap-1 group',
        'opacity-0 animate-ios-icon-fade-in',
        reducedMotion && 'opacity-100 animate-none'
      )}
      style={{
        animationDelay: `${animationDelay}ms`,
        animationFillMode: 'forwards',
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      <div
        className={cn(
          'relative',
          'w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[76px] lg:h-[76px]',
          'transition-transform duration-200',
          !reducedMotion && isPressed && 'scale-90',
          !reducedMotion && !isPressed && 'group-hover:scale-105 group-hover:rotate-[2deg]'
        )}
        style={{
          transitionTimingFunction: ANIMATION.easings.spring,
        }}
      >
        {/* Icon container with iOS styling */}
        <div
          className="w-full h-full overflow-hidden"
          style={{
            borderRadius: IOS_ICON.borderRadius,
          }}
        >
          {/* Loading skeleton */}
          {!isLoaded && !hasError && <Skeleton className="absolute inset-0 rounded-[22.37%]" />}

          {/* Icon image */}
          {image && !hasError && (
            <img
              src={image}
              alt={name}
              loading="lazy"
              className={cn(
                'w-full h-full object-cover',
                'transition-opacity duration-300',
                isLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
            />
          )}

          {/* Fallback for no image or error */}
          {(!image || hasError) && (
            <div className="w-full h-full flex items-center justify-center bg-stone-200 dark:bg-stone-700">
              <span className="text-xs text-stone-500 dark:text-stone-400 text-center px-1 truncate">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Label */}
      <span className="text-[11px] text-stone-600 dark:text-stone-400 text-center truncate max-w-[70px] sm:max-w-[80px]">
        {name}
      </span>
    </a>
  )
}
