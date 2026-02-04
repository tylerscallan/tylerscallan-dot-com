import { Skeleton } from '../primitives'

interface GallerySkeletonProps {
  count?: number
}

export default function GallerySkeleton({ count = 12 }: GallerySkeletonProps) {
  return (
    <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-8">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="aspect-[4/3]" />
      ))}
    </div>
  )
}
