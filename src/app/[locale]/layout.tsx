import type { Metadata, Viewport } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { Archivo, Barlow_Condensed, Readex_Pro } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ClientProviders } from '@/components/layout/client-providers'
import { ConsentAndAnalytics } from '@/components/layout/cookie-consent'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { RouteTheme } from '@/components/layout/route-theme'
import { JsonLd } from '@/components/ui/json-ld'
import { getDirection, routing } from '@/i18n/routing'
import { localizedUrl } from '@/lib/seo'
import { site } from '@/lib/site'

// Only the `latin` subset is loaded (it covers French and English): `latin-ext` was preloaded on
// every page (+110 kB) for characters the site never uses.
// Archivo with its width axis: ExtraBold at 112 % echoes the heavy, wide PIXEL wordmark.
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' })
// Condensed, wide-tracked capitals: the voice of the "CREATIVE AGENCY" tagline.
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-barlow', display: 'swap' })
// Arabic face. Not preloaded: only Arabic pages use it, and preloading would cost FR/EN visitors.
const readex = Readex_Pro({ subsets: ['arabic', 'latin'], variable: '--font-readex', display: 'swap', preload: false })

/** Only these namespaces are serialised to the browser for client components. */
const clientNamespaces = ['Common', 'Nav', 'LocaleNames', 'Cookie', 'Portfolio', 'Contact', 'Shop', 'Product', 'Checkout', 'Wedding', 'Ads'] as const

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: '#0f1010',
  colorScheme: 'dark',
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: 'Metadata.default' })
  return {
    metadataBase: new URL(site.url),
    title: { default: t('title'), template: '%s | Pixel' },
    description: t('description'),
    applicationName: site.name,
    robots: { index: true, follow: true },
    // Safari on iPhone shows the Smart App Banner ("Open" / "Get") for the Pixel app.
    itunes: { appId: site.apps.ios.id },
    appLinks: { ios: { url: site.apps.ios.url, app_store_id: site.apps.ios.id, app_name: site.name } },
    icons: {
      // Generated from the brand symbol by scripts/brand-icons.mjs.
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
  }
}

const openingHours = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
  opens: '09:00',
  closes: '18:00',
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const messages = await getMessages()
  const clientMessages = Object.fromEntries(clientNamespaces.map((ns) => [ns, messages[ns]]))
  const t = await getTranslations('Common')
  const tApp = await getTranslations('Home.projectsCarousel.pixelApp')
  const dir = getDirection(locale)

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${archivo.variable} ${barlow.variable} ${readex.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-lg bg-orange px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4"
        >
          {t('skipToContent')}
        </a>
        <NextIntlClientProvider messages={clientMessages}>
          <RouteTheme>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </RouteTheme>
          <ConsentAndAnalytics />
          <ClientProviders dir={dir} />
        </NextIntlClientProvider>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'MobileApplication',
            '@id': `${site.url}/#ios-app`,
            name: site.name,
            description: tApp('text'),
            url: site.apps.ios.url,
            installUrl: site.apps.ios.url,
            downloadUrl: site.apps.ios.url,
            image: `${site.url}/android-chrome-512x512.png`,
            operatingSystem: `iOS ${site.apps.ios.minOs} or later`,
            applicationCategory: 'BusinessApplication',
            inLanguage: ['fr', 'ar', 'en'],
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'DZD' },
            publisher: { '@id': `${site.url}/#organization` },
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': `${site.url}/#organization`,
            name: site.name,
            url: localizedUrl(locale),
            logo: `${site.url}/android-chrome-512x512.png`,
            image: `${site.url}/og-image.png`,
            telephone: site.phone.e164,
            email: site.email,
            foundingDate: String(site.foundingYear),
            address: {
              '@type': 'PostalAddress',
              addressLocality: site.address.city,
              addressRegion: site.address.region,
              addressCountry: site.address.country,
            },
            geo: { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude },
            areaServed: { '@type': 'Country', name: 'Algeria' },
            hasMap: site.mapsUrl,
            priceRange: 'DZD',
            knowsLanguage: ['fr', 'ar', 'en'],
            contactPoint: { '@type': 'ContactPoint', telephone: site.whatsapp.e164, contactType: 'sales', availableLanguage: ['French', 'Arabic', 'English'] },
            sameAs: Object.values(site.socials).map((s) => s.href),
            openingHoursSpecification: openingHours,
            // The Algiers studio (no street address published yet).
            department: {
              '@type': 'LocalBusiness',
              name: `${site.name} — Alger`,
              telephone: site.phone.e164,
              address: { '@type': 'PostalAddress', addressLocality: 'Alger', addressRegion: 'Alger', addressCountry: 'DZ' },
              openingHoursSpecification: openingHours,
            },
          }}
        />
      </body>
    </html>
  )
}
