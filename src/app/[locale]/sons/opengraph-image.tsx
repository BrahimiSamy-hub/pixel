import { brandOgImage, ogSize } from '@/lib/og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Pixel Sounds — Pixel Creative Agency'

export default function Image() {
  return brandOgImage({ title: 'Pixel Sounds', kicker: 'Audio production', tone: 'violet' })
}
