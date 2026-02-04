// Image base paths
export const IMAGE_PATHS = {
  photography: '/images/photography',
  editorials: '/images/editorials',
  profile: '/images/profile',
} as const

// Aspect ratios used in galleries
export const ASPECT_RATIOS = {
  landscape: '4/3',
  portrait: '2/3',
  square: '1/1',
} as const

// Animation configuration
export const ANIMATION = {
  durations: {
    fast: 200,
    normal: 400,
    slow: 600,
    pageTransition: 500,
  },
  easings: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    elegant: 'cubic-bezier(0.16, 1, 0.3, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Keep for iOS icons
  },
  stagger: {
    gallery: 0, // Remove stagger
    icons: 50, // Keep for iOS icons (unchanged)
  },
} as const

// iOS icon styling configuration
export const IOS_ICON = {
  borderRadius: '22.37%',
  shadow: {
    default: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.06)',
    hover: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
    pressed: '0 1px 2px rgba(0,0,0,0.1)',
  },
  sizes: {
    mobile: 60,
    tablet: 70,
    desktop: 76,
  },
} as const

// Responsive breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const
