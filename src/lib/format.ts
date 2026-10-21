import { localeTags, type Locale } from '@/i18n/routing'

// French groups digits with a narrow no-break space (U+202F) that Sora has no glyph for;
// a regular no-break space keeps "1 500" readable and still unbreakable.
const NARROW_NBSP = / /g

// Explicit DZ tags keep Western digits in Arabic (ar-DZ) and Algerian month names.
export function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(localeTags[locale], { maximumFractionDigits: 0 }).format(value).replace(NARROW_NBSP, ' ')
}

export function formatDecimal(value: number, locale: Locale, digits = 1) {
  return new Intl.NumberFormat(localeTags[locale], { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)
}

export function formatDate(value: string | Date, locale: Locale) {
  return new Intl.DateTimeFormat(localeTags[locale], { dateStyle: 'long', timeZone: 'Africa/Algiers' }).format(
    typeof value === 'string' ? new Date(value) : value,
  )
}
