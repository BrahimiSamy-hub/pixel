import { brandOgImage, ogSize } from '@/lib/og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Pixel Creative — Pixel Creative Agency'

export default function Image() {
  return brandOgImage({ title: 'Pixel Creative', kicker: 'Graphic design', tone: 'yellow' })
}
