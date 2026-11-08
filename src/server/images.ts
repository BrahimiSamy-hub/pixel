import 'server-only'
import sharp from 'sharp'

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024
const ACCEPTED = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/heif', 'image/avif'])

export type MediaKind = 'logo' | 'avatar' | 'cover'

export function isAcceptedImage(type: string) {
  return ACCEPTED.has(type)
}

/** Re-encodes uploads to WebP (strips metadata, normalises orientation, bounds the size).
 *  SVG is refused on purpose: it can carry scripts. */
export async function processImage(input: Buffer, kind: MediaKind) {
  const base = sharp(input, { limitInputPixels: 40_000_000 }).rotate()
  const pipeline =
    kind === 'logo'
      ? base.resize(640, 640, { fit: 'inside', withoutEnlargement: true })
      : kind === 'avatar'
        ? base.resize(640, 640, { fit: 'cover', position: 'attention' })
        : base.resize(1600, 640, { fit: 'cover', position: 'attention' })

  const { data, info } = await pipeline
    .webp({ quality: kind === 'logo' ? 92 : 82, alphaQuality: 100 })
    .toBuffer({ resolveWithObject: true })
  return { bytes: data, width: info.width, height: info.height, mime: 'image/webp' }
}

// ---------------------------------------------------------------------------
// Palette extraction: the client's brand colours, read from their logo.
// ---------------------------------------------------------------------------

type Rgb = [number, number, number]

const toHex = ([r, g, b]: Rgb) => `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`

function saturationAndLightness([r, g, b]: Rgb) {
  const max = Math.max(r, g, b) / 255
  const min = Math.min(r, g, b) / 255
  const l = (max + min) / 2
  const s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min)
  return { s, l }
}

const distance = (a: Rgb, b: Rgb) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])

/**
 * Returns up to 6 distinct colours, most "brand-like" first: frequent and saturated colours
 * rank above greys, and the near-white / transparent background of most logos is ignored.
 */
export async function extractPalette(input: Buffer): Promise<string[]> {
  const { data, info } = await sharp(input)
    .resize(72, 72, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const buckets = new Map<number, { sum: Rgb; count: number }>()
  for (let i = 0; i < data.length; i += info.channels) {
    const alpha = data[i + 3] ?? 255
    if (alpha < 128) continue
    const r = data[i] ?? 0
    const g = data[i + 1] ?? 0
    const b = data[i + 2] ?? 0
    const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4)
    const bucket = buckets.get(key) ?? { sum: [0, 0, 0], count: 0 }
    bucket.sum[0] += r
    bucket.sum[1] += g
    bucket.sum[2] += b
    bucket.count++
    buckets.set(key, bucket)
  }

  const candidates = [...buckets.values()]
    .map(({ sum, count }) => {
      const rgb: Rgb = [Math.round(sum[0] / count), Math.round(sum[1] / count), Math.round(sum[2] / count)]
      const { s, l } = saturationAndLightness(rgb)
      const nearWhite = l > 0.93
      // Saturated mid-tones are what people recognise as "the brand colour".
      const score = count * (0.25 + s * 1.5) * (l < 0.08 || nearWhite ? 0.3 : 1)
      return { rgb, score, nearWhite }
    })
    .filter((c) => !c.nearWhite)
    .sort((a, b) => b.score - a.score)

  const picked: Rgb[] = []
  for (const c of candidates) {
    if (picked.every((p) => distance(p, c.rgb) > 60)) picked.push(c.rgb)
    if (picked.length === 6) break
  }
  return picked.map(toHex)
}
