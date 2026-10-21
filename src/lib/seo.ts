import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ogLocales, routing, type Locale } from '@/i18n/routing'
import { site } from './site'

const hreflang: Record<Locale, string> = { fr: 'fr-DZ', en: 'en', ar: 'ar-DZ' }

/** Absolute URL of a page in a given locale. `path` starts with "/" ("/" is the home page). */
export function localizedUrl(locale: Locale, path = '/') {
  return `${site.url}/${locale}${path === '/' ? '' : path}`
}

export function languageAlternates(path = '/') {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [hreflang[l], localizedUrl(l, path)])),
    'x-default': localizedUrl(routing.defaultLocale, path),
  }
}

type PageMeta = { locale: Locale; path: string; title: string; description: string; noIndex?: boolean }

export function pageMetadata({ locale, path, title, description, noIndex }: PageMeta): Metadata {
  const url = localizedUrl(locale, path)
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url,
      locale: ogLocales[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
    },
    twitter: { card: 'summary_large_image', title, description },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  }
}

type MetaKey =
  | 'home'
  | 'services'
  | 'about'
  | 'portfolio'
  | 'contact'
  | 'photo'
  | 'design'
  | 'wedding'
  | 'dev'
  | 'sound'
  | 'ads'
  | 'shop'
  | 'checkout'
  | 'blog'
  | 'testimonials'
  | 'terms'
  | 'privacy'
  | 'werewolf'

/** Metadata for a static page whose title/description live under `Metadata.<key>` in the messages. */
export async function staticPageMetadata(locale: Locale, key: MetaKey, path: string, noIndex = false) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return pageMetadata({ locale, path, title: t(`${key}.title`), description: t(`${key}.description`), noIndex })
}
