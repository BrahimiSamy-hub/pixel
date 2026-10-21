import { brandOgImage, ogSize } from '@/lib/og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Pixel Photo Lab — Pixel Creative Agency'

export default function Image() {
  return brandOgImage({ title: 'Pixel Photo Lab', kicker: 'Photo & video', tone: 'teal' })
}
