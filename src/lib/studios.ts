import type { StaticImageData } from 'next/image'
import photoImg from '@/assets/portfolio/Shooting/shooting12.jpg'
import designImg from '@/assets/portfolio/logo/logo4.jpg'
import weddingImg from '@/assets/portfolio/wedding/wedding7.jpg'
import devImg from '@/assets/portfolio/landingPage/BeleghniMockup.jpg'
import soundImg from '@/assets/services/audio.png'
import adsImg from '@/assets/portfolio/wall/wall6.jpg'

export const studioKeys = ['photo', 'design', 'wedding', 'dev', 'sound', 'ads'] as const
export type StudioKey = (typeof studioKeys)[number]

export type Tone = 'teal' | 'yellow' | 'red' | 'lime' | 'violet' | 'orange'

// Full class strings (not interpolated) so Tailwind can see them at build time.
export const toneClasses: Record<Tone, { text: string; bg: string; border: string; soft: string }> = {
  teal: { text: 'text-teal', bg: 'bg-teal', border: 'border-teal', soft: 'bg-teal/15' },
  yellow: { text: 'text-yellow', bg: 'bg-yellow', border: 'border-yellow', soft: 'bg-yellow/15' },
  red: { text: 'text-red', bg: 'bg-red', border: 'border-red', soft: 'bg-red/15' },
  lime: { text: 'text-lime', bg: 'bg-lime', border: 'border-lime', soft: 'bg-lime/15' },
  violet: { text: 'text-violet', bg: 'bg-violet', border: 'border-violet', soft: 'bg-violet/15' },
  orange: { text: 'text-orange', bg: 'bg-orange', border: 'border-orange', soft: 'bg-orange/15' },
}

export type Studio = {
  key: StudioKey
  href: string
  tone: Tone
  image: StaticImageData
  /** Starting price in DZD, or null when the studio works on quote only. */
  priceFrom: number | null
}

export const studios: Record<StudioKey, Studio> = {
  photo: { key: 'photo', href: '/photo-lab', tone: 'teal', image: photoImg, priceFrom: 4000 },
  design: { key: 'design', href: '/design-graphique', tone: 'yellow', image: designImg, priceFrom: 1000 },
  wedding: { key: 'wedding', href: '/mariage', tone: 'red', image: weddingImg, priceFrom: 29000 },
  dev: { key: 'dev', href: '/developpement', tone: 'lime', image: devImg, priceFrom: null },
  sound: { key: 'sound', href: '/sons', tone: 'violet', image: soundImg, priceFrom: 4000 },
  ads: { key: 'ads', href: '/publicite', tone: 'orange', image: adsImg, priceFrom: null },
}

export const studioList = studioKeys.map((k) => studios[k])
