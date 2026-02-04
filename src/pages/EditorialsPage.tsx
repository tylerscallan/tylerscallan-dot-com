import { Link } from 'react-router-dom'
import { editorials } from '../data/editorials'
import { EditorialCard, PageTransition } from '../components'
import { useDocumentTitle } from '../hooks'

export default function EditorialsPage() {
  useDocumentTitle('Editorials')

  return (
    <PageTransition>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {editorials.map((editorial) => (
          <Link key={editorial.slug} to={`/editorials/${editorial.slug}`} className="block">
            <EditorialCard editorial={editorial} />
          </Link>
        ))}
      </div>
    </PageTransition>
  )
}
