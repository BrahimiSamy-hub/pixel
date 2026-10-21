import type { Metadata, Viewport } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { Readex_Pro, Sora, Source_Code_Pro, Space_Grotesk } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ClientProviders } from '@/components/layout/client-providers'
import { ConsentAndAnalytics } from '@/components/layout/cookie-consent'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { JsonLd } from '@/components/ui/json-ld'
import { getDirection, routing } from '@/i18n/routing'
import { localizedUrl } from '@/lib/seo'
import { site } from '@/lib/site'

const sora = Sora({ subsets: ['latin', 'latin-ext'], variable: '--font-sora', display: 'swap' })
const sourceCode = Source_Code_Pro({ subsets: ['latin'], variable: '--font-source-code', display: 'swap' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' })
// Arabic face. Not preloaded: only Arabic pages use it, and preloading would cost FR/EN visitors.
const readex = Readex_Pro({ subsets: ['arabic', 'latin'], variable: '--font-readex', display: 'swap', preload: false })

/** Only these namespaces are serialised to the browser for client components. */
const clientNamespaces = ['Common', 'Nav', 'LocaleNames', 'Cookie', 'Portfolio', 'Contact', 'Shop', 'Product', 'Checkout', 'Wedding', 'Ads'] as const

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: '#0e0c15',
  colorScheme: 'dark',
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: 'Metadata.default' })
  return {
    metadataBase: new URL(site.url),
    title: { default: t('title'), template: `%s | ${site.name}` },
    description: t('description'),
    applicationName: site.name,
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const messages = await getMessages()
  const clientMessages = Object.fromEntries(clientNamespaces.map((ns) => [ns, messages[ns]]))
  const t = await getTranslations('Common')
  const dir = getDirection(locale)

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${sora.variable} ${sourceCode.variable} ${spaceGrotesk.variable} ${readex.variable}`}
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
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <ConsentAndAnalytics />
          <ClientProviders dir={dir} />
        </NextIntlClientProvider>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': `${site.url}/#organization`,
            name: site.name,
            url: localizedUrl(locale),
            logo: `${site.url}/og-image.png`,
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
            sameAs: Object.values(site.socials).map((s) => s.href),
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '18:00',
            },
          }}
        />
      </body>
    </html>
  )
}
