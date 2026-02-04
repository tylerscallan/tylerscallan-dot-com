import { socials, type Social } from '../../data/socials'

function SocialIcon({ social }: { social: Social }) {
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="aspect-square flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-200"
      title={social.name}
      aria-label={`Visit ${social.name}`}
    >
      {social.image ? (
        <img
          src={social.image}
          alt={social.name}
          className="w-full h-full object-contain rounded-[2px]"
        />
      ) : (
        <span className="text-neutral-600">{social.name}</span>
      )}
    </a>
  )
}

export default function SocialGrid() {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
      {socials.map((social) => (
        <SocialIcon key={social.name} social={social} />
      ))}
    </div>
  )
}
