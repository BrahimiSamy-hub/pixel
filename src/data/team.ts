import type { StaticImageData } from 'next/image'
import type { ServiceId } from '@/lib/studios'

/**
 * The team on the About page. `role` is a key under About.team.roles in the messages; `service`
 * colours the tile (none: Pixel orange). Add `photo` (a static import, portrait about 4:5) to
 * replace the initials tile, and `studio` to show the member's city.
 */
export type TeamMember = {
  name: string
  role: 'owner' | 'photoLead' | 'productDeveloper' | 'soundDeveloper'
  service?: ServiceId
  studio?: 'algiers' | 'batna'
  photo?: StaticImageData
  /** Profile URLs, shown as icons under the name (only the ones filled in). */
  links?: TeamLinks
}

export const teamLinkKeys = ['linkedin', 'github', 'behance', 'wasla'] as const
export type TeamLinks = Partial<Record<(typeof teamLinkKeys)[number], string>>

// Links: full URLs, e.g. links: { linkedin: 'https://www.linkedin.com/in/…', github: 'https://github.com/…' }.
export const team: TeamMember[] = [
  { name: 'Mohamed Salah Bouzidi', role: 'owner', links: {} },
  { name: 'Ahmed Cheribet', role: 'photoLead', service: 'photo', links: {} },
  {
    name: 'Samy Brahimi',
    role: 'productDeveloper',
    service: 'dev',
    links: {
      linkedin: 'https://dz.linkedin.com/in/samy-brahimi-754330243',
      github: 'https://github.com/BrahimiSamy-hub',
      wasla: 'https://waslanetwork.com/profile/e325d77b-5221-45dc-bd81-20978db9a8c1',
    },
  },
  { name: 'Abdelali Bougherara', role: 'soundDeveloper', service: 'sounds', links: {} },
]

/** First letters of the first and last words: "Mohamed Salah Bouzidi" → "MB". */
export const initials = (name: string) => {
  const words = name.split(' ')
  return `${words[0]?.[0] ?? ''}${words.length > 1 ? words[words.length - 1]![0] : ''}`
}
