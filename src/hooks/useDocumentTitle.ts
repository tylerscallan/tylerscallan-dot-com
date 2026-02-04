import { useEffect } from 'react'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Tyler S. Callan` : 'Tyler S. Callan'
  }, [title])
}
