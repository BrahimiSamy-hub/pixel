import { brandOgImage, ogSize } from '@/lib/og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Pixel Advertisement — Pixel Creative Agency'

export default function Image() {
  return brandOgImage({ title: 'Pixel Advertisement', kicker: 'Advertising & print', tone: 'orange' })
}
