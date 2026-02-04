import { NavLink, Outlet } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems, ROUTES } from '../../config/routes'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../hooks'
import ErrorBoundary from './ErrorBoundary'

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMenuAnimating, setIsMenuAnimating] = useState(false)
  const reducedMotion = useReducedMotion()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clear timeout on unmount to prevent memory leak
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMenuToggle = () => {
    if (mobileMenuOpen) {
      // Start exit animation
      setIsMenuAnimating(true)
      timeoutRef.current = setTimeout(
        () => {
          setMobileMenuOpen(false)
          setIsMenuAnimating(false)
        },
        reducedMotion ? 0 : 150
      )
    } else {
      setMobileMenuOpen(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-stone-900 focus:text-stone-50 dark:focus:bg-stone-50 dark:focus:text-stone-900 focus:rounded focus:outline-none"
      >
        Skip to main content
      </a>

      <div className="max-w-[2000px] mx-auto px-[5vw] w-full flex flex-col flex-1">
        <header className="relative z-50 px-4 py-[clamp(10px,2.5vw,40px)] mt-[clamp(8px,1.8vw,28px)] flex items-center">
          <div className="flex items-center justify-between w-full">
            <NavLink to={ROUTES.home} className="site-title">
              tyler s. callan
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === ROUTES.home}
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -mr-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 rounded"
              onClick={handleMenuToggle}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen && !isMenuAnimating ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Full Screen Mobile Menu */}
        {(mobileMenuOpen || isMenuAnimating) && (
          <div
            className={cn(
              'md:hidden fixed inset-0 z-40 bg-stone-50/95 dark:bg-stone-900/95 backdrop-blur-sm flex flex-col',
              !reducedMotion &&
                (isMenuAnimating ? 'animate-mobile-menu-exit' : 'animate-mobile-menu-enter')
            )}
          >
            {/* Menu Header */}
            <div className="px-[5vw]">
              <div className="px-4 py-[clamp(12px,3vw,48px)] mt-[clamp(8px,2vw,32px)] flex items-center justify-between">
                <NavLink
                  to={ROUTES.home}
                  className="site-title"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setIsMenuAnimating(false)
                  }}
                >
                  tyler s. callan
                </NavLink>
                <button
                  className="p-2 -mr-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 rounded"
                  onClick={handleMenuToggle}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-10">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === ROUTES.home}
                  className={cn(
                    'text-4xl tracking-wide text-stone-900 dark:text-stone-100 focus-visible:underline focus-visible:underline-offset-4',
                    !reducedMotion && 'animate-menu-item-enter'
                  )}
                  style={{
                    fontWeight: 300,
                    animationDelay: reducedMotion ? '0ms' : `${index * 50}ms`,
                  }}
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setIsMenuAnimating(false)
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        <main id="main-content" className="flex-1">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>

        <footer className="py-8 text-right text-sm text-stone-500 dark:text-stone-400 opacity-0 animate-[fadeIn_0.5s_ease-out_1s_forwards]">
          © {new Date().getFullYear()} Tyler S. Callan. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
