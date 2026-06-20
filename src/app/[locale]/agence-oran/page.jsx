import CityLandingPage from '@/components/CityLandingPage'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'Agence Créative Oran — Web, Shooting Photo & Design Graphique',
    description: 'Pixel Creative Agency intervient à Oran pour votre site web, e-commerce, shooting photo professionnel, design graphique et panneaux publicitaires. Devis gratuit sous 24h.',
    keywords: 'agence web oran, agence créative oran, shooting photo oran, design graphique oran, développeur site web oran, site ecommerce oran, panneau publicitaire oran, photographe oran',
    alternates: {
      canonical: `${base}/${locale}/agence-oran`,
      languages: {
        'fr-DZ': `${base}/fr/agence-oran`,
        'en-US': `${base}/en/agence-oran`,
        'ar-DZ': `${base}/ar/agence-oran`,
      },
    },
    openGraph: {
      title: 'Agence Créative à Oran — Web, Shooting & Design',
      description: 'Site web, shooting photo, design graphique et panneaux publicitaires à Oran. Pixel Creative Agency — devis gratuit.',
      url: `${base}/${locale}/agence-oran`,
      images: [{ url: `${base}/og-image.png`, width: 1200, height: 630 }],
    },
  }
}

export default async function OranPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CityLandingPage city="Oran" region="Oran" locale={locale} />
}
