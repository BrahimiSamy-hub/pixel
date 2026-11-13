// SHARED CATALOG: source of truth lives in the website repo (pixel/src/shared/catalog).
// The mobile app gets a copy with `npm run sync:catalog`; edit here, never in the app copy.
/**
 * Pixel Events: wedding packs, extras and the selection rules from "Events.pdf" (prototype n° 7,
 * 9 Nov 2026). Prices in DA. The rules live here so the screen only renders.
 *
 * Rules (PDF p. 4):
 * 1. The client picks a wedding pack.
 * 2. What the pack includes stays visible in its summary.
 * 3. Extras the pack already includes are hidden from the extras list.
 * 4. When the pack changes, an extra that became included drops out of the total.
 * 5. Available extras the client picked are added to the pack price.
 * 6. Travel outside the wilaya is added separately, amount on quote.
 * Total = pack + eligible extras (+ travel on quote). Each service is counted once.
 */

export type PackId = 'rose' | 'jasmin' | 'iris' | 'lilas' | 'tulip' | 'orchidee'
type VideoRes = 'FHD' | '4K' | '6K'
/** Wedding preparation included: none, one person (groom or bride), both. */
type Prep = 'none' | 'one' | 'both'

export type Pack = {
  id: PackId
  /** Pack names are proper names, shown as-is in every language. */
  name: string
  price: number
  photographers: number
  prep: Prep
  studio: boolean
  video: VideoRes
  shortMovie?: VideoRes
  retouch: boolean
  photobook: boolean
  frames: number
  usb: number
  drone: boolean
}

export const packs: readonly Pack[] = [
  { id: 'rose', name: 'Rose', price: 29000, photographers: 2, prep: 'none', studio: false, video: 'FHD', retouch: false, photobook: false, frames: 0, usb: 16, drone: false },
  { id: 'jasmin', name: 'Jasmin', price: 39000, photographers: 4, prep: 'none', studio: false, video: 'FHD', retouch: true, photobook: true, frames: 0, usb: 16, drone: false },
  { id: 'iris', name: 'Iris', price: 48000, photographers: 4, prep: 'one', studio: false, video: 'FHD', retouch: true, photobook: true, frames: 2, usb: 32, drone: false },
  { id: 'lilas', name: 'Lilas', price: 68000, photographers: 4, prep: 'one', studio: false, video: '4K', retouch: true, photobook: true, frames: 2, usb: 32, drone: true },
  { id: 'tulip', name: 'Tulip', price: 99000, photographers: 6, prep: 'both', studio: true, video: '4K', retouch: true, photobook: true, frames: 3, usb: 64, drone: true },
  { id: 'orchidee', name: 'Orchidée', price: 130000, photographers: 6, prep: 'both', studio: true, video: '6K', shortMovie: '6K', retouch: true, photobook: true, frames: 4, usb: 64, drone: true },
]

export type ExtraId = 'drone' | 'shooting' | 'prep'
export type PhotobookFormat = 'A4' | 'A5'

export const extraPrices: Record<ExtraId, number> = { drone: 14000, shooting: 5000, prep: 3000 }
export const photobookPrices: Record<PhotobookFormat, number> = { A4: 7000, A5: 4800 }

/** Extras offered with this pack: only what it doesn't already include (rule 3). */
export function availableExtras(pack: Pack): ExtraId[] {
  const out: ExtraId[] = []
  if (!pack.drone) out.push('drone')
  // The studio shoot in Tulip and Orchidée replaces the standard shooting extra.
  if (!pack.studio) out.push('shooting')
  if (pack.prep === 'none') out.push('prep')
  return out
}

/** Everything the pack includes, as message keys + values, in the PDF's order (rule 2). */
export function packIncludes(pack: Pack) {
  type Line = { key: 'photographers' | 'coverage' | 'prepOne' | 'prepBoth' | 'studio' | 'video' | 'shortMovie' | 'retouch' | 'photobook' | 'frames' | 'usb' | 'drone'; values?: Record<string, string | number> }
  const lines: Line[] = [{ key: 'photographers', values: { n: pack.photographers } }, { key: 'coverage' }]
  if (pack.prep === 'one') lines.push({ key: 'prepOne' })
  if (pack.prep === 'both') lines.push({ key: 'prepBoth' })
  if (pack.studio) lines.push({ key: 'studio' })
  lines.push({ key: 'video', values: { res: pack.video } })
  if (pack.shortMovie) lines.push({ key: 'shortMovie', values: { res: pack.shortMovie } })
  if (pack.retouch) lines.push({ key: 'retouch' })
  if (pack.photobook) lines.push({ key: 'photobook' })
  if (pack.frames) lines.push({ key: 'frames', values: { n: pack.frames } })
  lines.push({ key: 'usb', values: { n: pack.usb } })
  if (pack.drone) lines.push({ key: 'drone' })
  return lines
}

export type Selection = {
  extras: ReadonlySet<ExtraId>
  /** Photobook as an extra (packs without one), or the free format choice (packs with one). */
  photobook: PhotobookFormat | null
  travel: boolean
}

/**
 * Total in DA. Extras the pack includes are ignored even if still selected (rule 4), and an
 * included photobook's format is a free change, never billed twice.
 */
export function total(pack: Pack, sel: Selection) {
  const extras = availableExtras(pack).filter((e) => sel.extras.has(e))
  const photobook = !pack.photobook && sel.photobook ? photobookPrices[sel.photobook] : 0
  return { extras, photobook, amount: pack.price + photobook + extras.reduce((sum, e) => sum + extraPrices[e], 0) }
}

/** Other events Pixel covers; prices on quote. */
export const otherEvents = ['soutenance', 'media', 'concert', 'thara', 'henna'] as const
export type OtherEvent = (typeof otherEvents)[number]

/** Re-exported for older imports. */
export { formatDA } from './core'
