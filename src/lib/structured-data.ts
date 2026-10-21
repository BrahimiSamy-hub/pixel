import type { Locale } from '@/i18n/routing'
import { localizedUrl } from './seo'
import { site } from './site'

const provider = { '@id': `${site.url}/#organization` }

/** schema.org/Service for a studio page. `price` is the starting price in DZD, if public. */
export function serviceJsonLd({
  locale,
  path,
  name,
  description,
  price,
}: {
  locale: Locale
  path: string
  name: string
  description: string
  price?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: localizedUrl(locale, path),
    provider,
    areaServed: { '@type': 'Country', name: 'Algeria' },
    ...(price
      ? { offers: { '@type': 'AggregateOffer', priceCurrency: 'DZD', lowPrice: price, availability: 'https://schema.org/InStock' } }
      : {}),
  }
}

export function productJsonLd({
  locale,
  path,
  name,
  image,
  prices,
  inStock,
  description,
}: {
  locale: Locale
  path: string
  name: string
  image?: string | null
  prices: number[]
  inStock: boolean
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    ...(image ? { image } : {}),
    brand: { '@type': 'Brand', name: 'Pixel' },
    url: localizedUrl(locale, path),
    ...(prices.length
      ? {
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'DZD',
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: prices.length,
            availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            seller: provider,
          },
        }
      : {}),
  }
}
