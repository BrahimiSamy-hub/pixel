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
}

export const team: TeamMember[] = [
  { name: 'Mohamed Salah Bouzidi', role: 'owner' },
  { name: 'Ahmed Cheribet', role: 'photoLead', service: 'photo' },
  { name: 'Samy Brahimi', role: 'productDeveloper', service: 'dev' },
  { name: 'Abdelali Bougherara', role: 'soundDeveloper', service: 'sounds' },
]

/** First letters of the first and last words: "Mohamed Salah Bouzidi" → "MB". */
export const initials = (name: string) => {
  const words = name.split(' ')
  return `${words[0]?.[0] ?? ''}${words.length > 1 ? words[words.length - 1]![0] : ''}`
}
