// SHARED CATALOG: source of truth lives in the website repo (pixel/src/shared/catalog).
// The mobile app gets a copy with `npm run sync:catalog`; edit here, never in the app copy.
/**
 * Quote building blocks shared by every service page. Catalog data lives next to its labels
 * (`L10n`: French, English, Arabic) so the backend can later serve the same objects as-is.
 */
/** App and website languages. */
export type Lang = 'fr' | 'en' | 'ar'

/** A label in the three app languages. */
export type L10n = Readonly<Record<Lang, string>>

/** Builds an `L10n` in fr / en / ar order. */
export const l = (fr: string, en: string, ar: string): L10n => ({ fr, en, ar })

/** Unit price in DA, or `null` when the docs say "À définir" / "Sur devis". */
export type Price = number | null

/** 29000 → "29 000" (non-breaking spaces; digits stay Latin like the price lists). */
export const formatDA = (amount: number) =>
  String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

/** Area of `qty` pieces of `w` × `h` cm, in m² (Creative.pdf: largeur × hauteur ÷ 10 000 × quantité). */
export const areaM2 = (wCm: number, hCm: number, qty = 1) => (wCm * hCm * qty) / 10000

/** 1.2345 → "1,23" style area for display (2 decimals, locale separator). */
export const formatM2 = (m2: number, lang: Lang) =>
  m2.toLocaleString(lang === 'en' ? 'en-US' : 'fr-FR', { maximumFractionDigits: 2 })

/** Numeric input text → number (empty or invalid → 0). Accepts "1,5" and "1.5". */
export const parseNum = (text: string) => {
  const n = Number(text.replace(',', '.').replace(/\s/g, ''))
  return Number.isFinite(n) && n > 0 ? n : 0
}

/** One priced line of a quote: shown in the ticket and sent in the request. */
export type QuoteLine = {
  label: string
  /** Extra detail: format, size, colour… */
  detail?: string
  /** Line amount in DA, or `null` when on quote. */
  amount: Price
}

/** Lines → estimated total and whether some lines are still on quote. */
export function summarize(lines: readonly QuoteLine[]) {
  const amount = lines.reduce((sum, line) => sum + (line.amount ?? 0), 0)
  const onQuote = lines.some((line) => line.amount === null)
  return { amount, onQuote }
}

/** A colour chip of a material chart. */
export type Swatch = { id: string; name: L10n; hex: string; code?: string }
