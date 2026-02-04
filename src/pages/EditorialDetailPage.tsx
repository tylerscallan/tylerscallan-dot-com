import { useParams, Link, Navigate } from 'react-router-dom'
import { editorials } from '../data/editorials'
import { Gallery } from '../components'
import { ArrowLeft } from 'lucide-react'
import { useDocumentTitle } from '../hooks'

export default function EditorialDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const editorial = editorials.find((e) => e.slug === slug)

  useDocumentTitle(editorial?.title)

  if (!editorial) {
    return <Navigate to="/editorials" replace />
  }

  return (
    <div className="fade-in">
      <Link
        to="/editorials"
        className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-6"
      >
        <ArrowLeft size={18} />
        <span>Back to Editorials</span>
      </Link>
      <h1 className="text-3xl font-light tracking-wide mb-2">{editorial.title}</h1>
      <p className="text-neutral-500 mb-8">
        {new Date(editorial.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <Gallery photos={editorial.images} />
    </div>
  )
}
