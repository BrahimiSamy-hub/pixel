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
    default: 'Pixel Creative Agency - Agence Créative en Algérie',
    template: '%s | Pixel Creative Agency',
  },
  description: 'Agence créative professionnelle en Algérie spécialisée en photographie, design graphique, développement web et production audio.',
  keywords: 'agence créative algérie, photographie professionnelle, design graphique, développement web, vidéographie, mariage, branding, marketing digital, production audio',
  robots: 'index, follow',
  alternates: {
    canonical: '/',
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
        alt: 'Pixel Creative Agency - Agence Créative en Algérie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixel Creative Agency - Algérie',
    description: 'Photographie, design, web et audio professionnel en Algérie.',
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

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const messages = await getMessages()

  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  
  return (
    <html lang={locale} dir={dir} data-scroll-behavior="smooth" className={`${sora.variable} ${code.variable} ${grotesk.variable} ${pressStart.variable}`}>
      <body className="font-sans bg-n-8 text-n-1 text-base">
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
