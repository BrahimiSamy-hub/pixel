// Regenerates the favicons and app icons in public/ from the brand symbol (src/assets/brand/pixel-mark.svg).
// Run: node scripts/brand-icons.mjs
import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const INK = '#0f1010'
const mark = await readFile(new URL('../src/assets/brand/pixel-mark.svg', import.meta.url))
const out = (name) => new URL(`../public/${name}`, import.meta.url)

/** The P symbol (aspect ~0.885) centred in a square, `scale` = its height / the square side. */
async function icon(size, { scale, background }) {
  const h = Math.round(size * scale)
  const symbol = await sharp(mark, { density: Math.max(72, (h / 1154) * 72 * 4) })
    .resize({ height: h })
    .png()
    .toBuffer()
  const { width: w } = await sharp(symbol).metadata()
  return sharp({ create: { width: size, height: size, channels: 4, background: background ?? { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: symbol, left: Math.round((size - w) / 2), top: Math.round((size - h) / 2) }])
    .png()
    .toBuffer()
}

/** An .ico holding PNG images (supported by every current browser). */
function ico(pngs) {
  const header = Buffer.alloc(6 + 16 * pngs.length)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  let offset = header.length
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i
    header.writeUInt8(size >= 256 ? 0 : size, e)
    header.writeUInt8(size >= 256 ? 0 : size, e + 1)
    header.writeUInt16LE(1, e + 4)
    header.writeUInt16LE(32, e + 6)
    header.writeUInt32LE(data.length, e + 8)
    header.writeUInt32LE(offset, e + 12)
    offset += data.length
  })
  return Buffer.concat([header, ...pngs.map((p) => p.data)])
}

// Browser tabs: the gradient symbol alone, nearly full height.
const tab = { scale: 0.94 }
const fav = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await icon(size, tab) })))
await writeFile(out('favicon.ico'), ico(fav))
await writeFile(out('favicon-16x16.png'), fav[0].data)
await writeFile(out('favicon-32x32.png'), fav[1].data)
await writeFile(out('favicon.svg'), mark)

// Home screens: the symbol on the brand ink, with room around it.
const tile = { scale: 0.6, background: INK }
await writeFile(out('apple-touch-icon.png'), await icon(180, tile))
await writeFile(out('android-chrome-192x192.png'), await icon(192, tile))
await writeFile(out('android-chrome-512x512.png'), await icon(512, tile))
// Maskable: Android may crop to a circle, so the symbol stays inside the central 80 %.
await writeFile(out('android-chrome-maskable-512x512.png'), await icon(512, { scale: 0.46, background: INK }))

console.log('icons written to public/')
