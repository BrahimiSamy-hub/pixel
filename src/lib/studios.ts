import type { StaticImageData } from 'next/image'
import photoImg from '@/assets/portfolio/Shooting/shooting12.jpg'
import designImg from '@/assets/portfolio/logo/logo4.jpg'
import weddingImg from '@/assets/portfolio/wedding/wedding7.jpg'
import devImg from '@/assets/portfolio/landingPage/BeleghniMockup.jpg'
import soundImg from '@/assets/services/audio.png'
import adsImg from '@/assets/portfolio/wall/wall6.jpg'
import tapiniImg from '@/assets/portfolio/carte-visite/carte5.jpg'
import creativeLogo from '@/assets/services/logos/creative.svg'
import devLogo from '@/assets/services/logos/dev.svg'
import enseigneLogo from '@/assets/services/logos/enseigne.svg'
import eventsLogo from '@/assets/services/logos/events.svg'
import photoLogo from '@/assets/services/logos/photo.svg'
import soundsLogo from '@/assets/services/logos/sounds.svg'

export const studioKeys = ['photo', 'design', 'wedding', 'dev', 'sound', 'ads', 'tapini'] as const
export type StudioKey = (typeof studioKeys)[number]

/** Pixel sub-brands, as in the mobile app; each has its colour tokens in globals.css. */
export type ServiceId = 'creative' | 'photo' | 'dev' | 'events' | 'sounds' | 'enseigne' | 'tapini'

export type Tone = 'teal' | 'yellow' | 'red' | 'lime' | 'violet' | 'orange' | ServiceId

// Full class strings (not interpolated) so Tailwind can see them at build time.
export const toneClasses: Record<Tone, { text: string; bg: string; border: string; soft: string }> = {
  teal: { text: 'text-teal', bg: 'bg-teal', border: 'border-teal', soft: 'bg-teal/15' },
  yellow: { text: 'text-yellow', bg: 'bg-yellow', border: 'border-yellow', soft: 'bg-yellow/15' },
  red: { text: 'text-red', bg: 'bg-red', border: 'border-red', soft: 'bg-red/15' },
  lime: { text: 'text-lime', bg: 'bg-lime', border: 'border-lime', soft: 'bg-lime/15' },
  violet: { text: 'text-violet', bg: 'bg-violet', border: 'border-violet', soft: 'bg-violet/15' },
  orange: { text: 'text-orange', bg: 'bg-orange', border: 'border-orange', soft: 'bg-orange/15' },
  creative: { text: 'text-creative', bg: 'bg-creative', border: 'border-creative', soft: 'bg-creative/15' },
  photo: { text: 'text-photo', bg: 'bg-photo', border: 'border-photo', soft: 'bg-photo/15' },
  dev: { text: 'text-dev', bg: 'bg-dev', border: 'border-dev', soft: 'bg-dev/15' },
  events: { text: 'text-events', bg: 'bg-events', border: 'border-events', soft: 'bg-events/15' },
  sounds: { text: 'text-sounds', bg: 'bg-sounds', border: 'border-sounds', soft: 'bg-sounds/15' },
  enseigne: { text: 'text-enseigne', bg: 'bg-enseigne', border: 'border-enseigne', soft: 'bg-enseigne/15' },
  tapini: { text: 'text-tapini', bg: 'bg-tapini', border: 'border-tapini', soft: 'bg-tapini/15' },
}

/** Wraps a service page so its accents, buttons and dots take the sub-brand colour (globals.css). */
export const serviceThemeClass: Record<ServiceId, string> = {
  creative: 'service-creative',
  photo: 'service-photo',
  dev: 'service-dev',
  events: 'service-events',
  sounds: 'service-sounds',
  enseigne: 'service-enseigne',
  tapini: 'service-tapini',
}

/** The sub-brand logos from the app, wordmark recoloured for dark backgrounds. */
export const serviceLogos: Partial<Record<ServiceId, StaticImageData>> = {
  creative: creativeLogo,
  photo: photoLogo,
  dev: devLogo,
  events: eventsLogo,
  sounds: soundsLogo,
  enseigne: enseigneLogo,
}

export type Studio = {
  key: StudioKey
  href: string
  /** The sub-brand: its colour is the studio's tone. */
  tone: ServiceId
  image: StaticImageData
  logo?: StaticImageData
  /** Starting price in DZD, or null when the studio works on quote only. */
  priceFrom: number | null
}

export const studios: Record<StudioKey, Studio> = {
  photo: { key: 'photo', href: '/photo-lab', tone: 'photo', image: photoImg, logo: serviceLogos.photo, priceFrom: 4000 },
  design: { key: 'design', href: '/design-graphique', tone: 'creative', image: designImg, logo: serviceLogos.creative, priceFrom: 1000 },
  wedding: { key: 'wedding', href: '/mariage', tone: 'events', image: weddingImg, logo: serviceLogos.events, priceFrom: 29000 },
  dev: { key: 'dev', href: '/developpement', tone: 'dev', image: devImg, logo: serviceLogos.dev, priceFrom: null },
  // VoiceOver from 5 000 DA (Sounds.pdf).
  sound: { key: 'sound', href: '/sons', tone: 'sounds', image: soundImg, logo: serviceLogos.sounds, priceFrom: 5000 },
  ads: { key: 'ads', href: '/publicite', tone: 'enseigne', image: adsImg, logo: serviceLogos.enseigne, priceFrom: null },
  // NFC sticker from 2 000 DA (Tapini.pdf).
  tapini: { key: 'tapini', href: '/tapini', tone: 'tapini', image: tapiniImg, logo: serviceLogos.tapini, priceFrom: 2000 },
}

export const studioList = studioKeys.map((k) => studios[k])
