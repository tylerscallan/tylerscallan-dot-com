import { Link } from 'react-router-dom'
import { PageTransition } from '../components'
import { useDocumentTitle } from '../hooks'

export default function NotFoundPage() {
  useDocumentTitle('Page Not Found')

  return (
    <PageTransition>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-light tracking-wide mb-4">404</h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 mb-8">Page not found</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 border border-stone-300 dark:border-stone-600 rounded hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}
