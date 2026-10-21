import { brandOgImage, ogSize } from '@/lib/og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Pixel Development — Pixel Creative Agency'

export default function Image() {
  return brandOgImage({ title: 'Pixel Development', kicker: 'Web & mobile', tone: 'lime' })
}
