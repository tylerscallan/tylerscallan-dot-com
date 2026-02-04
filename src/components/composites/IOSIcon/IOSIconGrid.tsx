import IOSIcon from './IOSIcon'
import { useReducedMotion } from '../../../hooks'
import type { Social } from '../../../types'

interface IOSIconGridProps {
  socials: Social[]
}

export default function IOSIconGrid({ socials }: IOSIconGridProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-5 justify-items-center w-fit mx-auto">
      {socials.map((social, index) => (
        <IOSIcon
          key={social.name}
          name={social.name}
          image={social.image}
          url={social.url}
          index={index}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  )
}
