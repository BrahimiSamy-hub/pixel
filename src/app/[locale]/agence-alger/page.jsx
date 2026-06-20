import CityLandingPage from '@/components/CityLandingPage'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'Agence Créative Alger — Web, Shooting Photo & Design Graphique',
    description: 'Pixel Creative Agency intervient à Alger pour votre site web, e-commerce, shooting photo professionnel, design graphique et panneaux publicitaires. Devis gratuit sous 24h.',
    keywords: 'agence web alger, agence créative alger, shooting photo alger, design graphique alger, développeur site web alger, site ecommerce alger, panneau publicitaire alger, photographe alger',
    alternates: {
      canonical: `${base}/${locale}/agence-alger`,
      languages: {
        'fr-DZ': `${base}/fr/agence-alger`,
        'en-US': `${base}/en/agence-alger`,
        'ar-DZ': `${base}/ar/agence-alger`,
      },
    },
    openGraph: {
      title: 'Agence Créative à Alger — Web, Shooting & Design',
      description: 'Site web, shooting photo, design graphique et panneaux publicitaires à Alger. Pixel Creative Agency — devis gratuit.',
      url: `${base}/${locale}/agence-alger`,
      images: [{ url: `${base}/og-image.png`, width: 1200, height: 630 }],
    },
  }
}

export default async function AlgerPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CityLandingPage city="Alger" region="Alger" locale={locale} />
}
