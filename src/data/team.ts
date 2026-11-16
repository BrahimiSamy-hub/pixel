import type { StaticImageData } from 'next/image'
import type { ServiceId } from '@/lib/studios'

/**
 * The team on the About page. PLACEHOLDERS: these names are made up until the real team is sent.
 * To update: change name/role/studio, and add `photo` (a static import, portrait about 4:5) to
 * replace the initials tile. `role` is a key under About.team.roles in the messages.
 */
export type TeamMember = {
  name: string
  role: 'creativeDirector' | 'photographer' | 'developer' | 'videographer' | 'soundEngineer' | 'signMaker'
  service: ServiceId
  studio: 'algiers' | 'batna'
  photo?: StaticImageData
}

export const team: TeamMember[] = [
  { name: 'Yacine Benali', role: 'creativeDirector', service: 'creative', studio: 'batna' },
  { name: 'Lina Merabet', role: 'photographer', service: 'photo', studio: 'algiers' },
  { name: 'Amine Khelifi', role: 'developer', service: 'dev', studio: 'batna' },
  { name: 'Sarah Bouzid', role: 'videographer', service: 'events', studio: 'algiers' },
  { name: 'Karim Haddad', role: 'soundEngineer', service: 'sounds', studio: 'batna' },
  { name: 'Nour Saidi', role: 'signMaker', service: 'enseigne', studio: 'algiers' },
]

export const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
