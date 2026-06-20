import { Sora, Source_Code_Pro, Space_Grotesk, Press_Start_2P } from 'next/font/google'
import '../globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['300', '400', '600'],
})

const code = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
  weight: ['400', '600', '700'],
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  weight: ['300'],
})

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  variable: '--font-pixel',
  weight: ['400'],
})

import Providers from '../../components/Providers'

export const metadata = {
  metadataBase: new URL('https://pixeldz.store'),
  title: {
    default: 'Pixel Creative Agency — Agence Créative en Algérie',
    template: '%s | Pixel Creative Agency',
  },
  description: 'Agence créative en Algérie depuis 2018 — développement site web, e-commerce, shooting photo, design graphique, panneau publicitaire, production audio. Devis gratuit.',
  keywords: 'agence créative algérie, agence web algérie, website algeria, développeur site web algérie, site ecommerce algérie, shooting photo algérie, panneau publicitaire algérie, design graphique algérie, cadre photo algérie, photographe professionnel algérie, production audio algérie, branding algérie',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: {
    canonical: 'https://pixeldz.store',
    languages: {
      'fr-DZ': 'https://pixeldz.store/fr',
      'en-US': 'https://pixeldz.store/en',
      'ar-DZ': 'https://pixeldz.store/ar',
      'x-default': 'https://pixeldz.store',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_DZ',
    url: 'https://pixeldz.store',
    siteName: 'Pixel Creative Agency',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pixel Creative Agency — Agence Créative en Algérie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixel Creative Agency — Agence Créative Algérie',
    description: 'Développement web, e-commerce, shooting photo, design graphique & panneau publicitaire en Algérie.',
    images: ['/og-image.png'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import GALoader from '../../components/GALoader'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://pixeldz.store/#organization',
  name: 'Pixel Creative Agency',
  url: 'https://pixeldz.store',
  logo: 'https://pixeldz.store/og-image.png',
  telephone: '+213799018288',
  email: 'contact@pixeldz.store',
  foundingDate: '2018',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'DZ',
    addressLocality: 'Batna',
    addressRegion: 'Batna',
  },
  geo: { '@type': 'GeoCoordinates', latitude: '35.5561', longitude: '6.1742' },
  areaServed: { '@type': 'Country', name: 'Algeria' },
  sameAs: ['https://www.instagram.com/pixeldz', 'https://www.facebook.com/pixeldz'],
  // Update reviewCount with your real Google Business total
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '50',
    bestRating: '5',
    worstRating: '1',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services Pixel Creative Agency',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Développement Web & E-commerce Algérie' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shooting Photo Professionnel Algérie' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Design Graphique & Identité Visuelle Algérie' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Panneau Publicitaire & Impression Algérie' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Production Audio & Jingles Algérie' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Photographie Mariage Algérie' } },
    ],
  },
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const messages = await getMessages()

  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  
  return (
    <html lang={locale} dir={dir} data-scroll-behavior="smooth" className={`${sora.variable} ${code.variable} ${grotesk.variable} ${pressStart.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.pixeldz.store" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.pixeldz.store" />
      </head>
      <body className="font-sans bg-n-8 text-n-1 text-base">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
          <Providers>
            <main>{children}</main>
          </Providers>
          <GALoader />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
