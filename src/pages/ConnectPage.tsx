import { PageTransition, IOSIconGrid } from '../components'
import { socials } from '../data/socials'
import { useDocumentTitle } from '../hooks'

export default function ConnectPage() {
  useDocumentTitle('Connect')

  return (
    <PageTransition>
      <div className="py-8">
        <h1 className="sr-only">Connect</h1>
        <IOSIconGrid socials={socials} />
      </div>
    </PageTransition>
  )
}
