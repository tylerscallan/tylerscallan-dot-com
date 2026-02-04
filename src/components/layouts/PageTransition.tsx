import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../hooks'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export default function PageTransition({ children, className }: PageTransitionProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div className={cn(reducedMotion ? 'opacity-100' : 'animate-page-enter', className)}>
      {children}
    </div>
  )
}
