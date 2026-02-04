import { Suspense, lazy } from 'react'
import { PageTransition, GallerySkeleton } from '../components'
import { photos } from '../data/photography'
import { useDocumentTitle } from '../hooks'

const Gallery = lazy(() => import('../components/composites/Gallery'))

export default function HomePage() {
  useDocumentTitle()

  return (
    <PageTransition>
      <h1 className="sr-only">Photography Gallery</h1>
      <Suspense fallback={<GallerySkeleton count={photos.length} />}>
        <Gallery photos={photos} />
      </Suspense>
    </PageTransition>
  )
}
