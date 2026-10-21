import { brandOgImage, ogSize } from '@/lib/og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Pixel Creative Agency — Creative agency in Algeria'

export default function Image() {
  return brandOgImage({ title: 'Creativity has no limits.', kicker: 'Creative agency · Algeria' })
}
