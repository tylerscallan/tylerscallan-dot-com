import { useParams, Link, Navigate } from 'react-router-dom'
import { software } from '../data/software'
import { Gallery } from '../components'
import { ArrowLeft } from 'lucide-react'
import { useDocumentTitle } from '../hooks'

export default function SoftwareDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const item = software.find((s) => s.slug === slug)

  useDocumentTitle(item?.title)

  if (!item) {
    return <Navigate to="/software" replace />
  }

  return (
    <div className="fade-in">
      <Link
        to="/software"
        className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-6"
      >
        <ArrowLeft size={18} />
        <span>Back to Software</span>
      </Link>
      <h1 className="text-3xl font-light tracking-wide mb-2">{item.title}</h1>
      <p className="text-neutral-500 mb-8">
        {new Date(item.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <Gallery photos={item.images} />
    </div>
  )
}
