import { Skeleton } from '../primitives'

interface IconGridSkeletonProps {
  count?: number
}

export default function IconGridSkeleton({ count = 20 }: IconGridSkeletonProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 sm:gap-5 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <Skeleton className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[76px] lg:h-[76px] rounded-[22.37%]" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  )
}
