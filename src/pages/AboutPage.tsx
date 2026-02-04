import { useState } from 'react'
import { aboutData } from '../data/about'
import { PageTransition, Skeleton } from '../components'
import { cn } from '../lib/utils'
import { useDocumentTitle } from '../hooks'

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useDocumentTitle('About')

  return (
    <PageTransition>
      <div className="min-h-[60vh] flex items-center justify-center pt-16">
        <div className="flex flex-col md:flex-row items-center w-full max-w-[900px] px-6 md:px-0">
          {/* Text content - left side */}
          <div className="w-full md:w-1/2 text-left md:pr-12 order-2 md:order-1 mt-8 md:mt-0">
            {/* Location - p1 */}
            <p className="text-[19.5px] font-light tracking-[0.05em] leading-[1.4] mb-8">
              Currently based out of {aboutData.location}.
            </p>

            {/* Bio - h4 */}
            <h4 className="text-[22.6px] font-thin tracking-[0.02em] leading-[1.48] mt-0 mb-12">
              {aboutData.bio[0]}
            </h4>

            {/* Contact info - p2 */}
            <p className="text-[18px] font-light tracking-[0.05em] leading-[1.4] mt-4">
              For professional inquiries, reach out via email to{' '}
              <a
                href={`mailto:${aboutData.email}`}
                className="underline hover:opacity-50 transition-opacity duration-300"
              >
                {aboutData.email}
              </a>
              .
            </p>
          </div>

          {/* Image - right side */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div
              className="relative overflow-hidden"
              style={{
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                borderRadius: '10px',
              }}
            >
              {!isLoaded && !hasError && <Skeleton className="w-full aspect-square" />}
              {!hasError && (
                <>
                  <img
                    src={aboutData.image}
                    alt={aboutData.name}
                    className={cn(
                      'w-full h-auto transition-opacity duration-300',
                      isLoaded ? 'opacity-100' : 'opacity-0'
                    )}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                  />
                  <div className="absolute inset-0 bg-black opacity-10 pointer-events-none" />
                </>
              )}
              {hasError && (
                <div className="w-full aspect-square bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                  <span className="text-stone-400 dark:text-stone-500">Failed to load image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
