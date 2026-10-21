import { brandOgImage, ogSize } from '@/lib/og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Pixel Weddings — Pixel Creative Agency'

export default function Image() {
  return brandOgImage({ title: 'Pixel Weddings', kicker: 'Wedding photo & film', tone: 'red' })
}
