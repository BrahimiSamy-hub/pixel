import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'en', 'ar'],
  defaultLocale: 'fr',
})

export type Locale = (typeof routing.locales)[number]

/** BCP 47 tags used for Intl formatting, hreflang and Open Graph. */
export const localeTags: Record<Locale, string> = {
  fr: 'fr-DZ',
  en: 'en-DZ',
  ar: 'ar-DZ',
}

export const ogLocales: Record<Locale, string> = {
  fr: 'fr_DZ',
  en: 'en_US',
  ar: 'ar_DZ',
}

export const rtlLocales: ReadonlySet<Locale> = new Set(['ar'])

export function getDirection(locale: Locale): 'rtl' | 'ltr' {
  return rtlLocales.has(locale) ? 'rtl' : 'ltr'
}
