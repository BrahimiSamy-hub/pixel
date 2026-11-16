import { brandOgImage, ogSize } from '@/lib/og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Tapini — Pixel Creative Agency'

export default function Image() {
  return brandOgImage({ title: 'Tapini', kicker: 'NFC cards & supports', service: 'tapini' })
}
