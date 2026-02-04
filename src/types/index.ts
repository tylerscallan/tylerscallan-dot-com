export interface Photo {
  src: string
  thumb: string
  alt: string
  width: number
  height: number
}

export interface Editorial {
  slug: string
  title: string
  date: string
  cover: string
  coverThumb: string
  images: Photo[]
}

export interface Social {
  name: string
  icon: string
  url: string
  image?: string
  category?: SocialCategory
}

export interface AboutData {
  name: string
  location: string
  email: string
  image: string
  bio: string[]
}

// Social category types for grouping icons
export type SocialCategory = 'messaging' | 'social' | 'music' | 'professional' | 'gaming' | 'other'

// Animation configuration interface
export interface AnimationConfig {
  duration: number
  easing: string
  delay?: number
  stagger?: number
}

// Loading state interface
export interface LoadingState {
  isLoading: boolean
  hasError: boolean
  errorMessage?: string
}
