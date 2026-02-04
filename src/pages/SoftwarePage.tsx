import { Link } from 'react-router-dom'
import { software } from '../data/software'
import { EditorialCard, PageTransition } from '../components'
import { useDocumentTitle } from '../hooks'

export default function SoftwarePage() {
  useDocumentTitle('Software')

  return (
    <PageTransition>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {software.map((item) => (
          <Link key={item.slug} to={`/software/${item.slug}`} className="block">
            <EditorialCard editorial={item} />
          </Link>
        ))}
      </div>
    </PageTransition>
  )
}
