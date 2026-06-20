import CityLandingPage from '@/components/CityLandingPage'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'Agence Créative Constantine — Web, Shooting Photo & Design',
    description: 'Pixel Creative Agency intervient à Constantine pour votre site web, e-commerce, shooting photo professionnel, design graphique et panneaux publicitaires. Devis gratuit sous 24h.',
    keywords: 'agence web constantine, agence créative constantine, shooting photo constantine, design graphique constantine, développeur site web constantine, site ecommerce constantine, panneau publicitaire constantine, photographe constantine',
    alternates: {
      canonical: `${base}/${locale}/agence-constantine`,
      languages: {
        'fr-DZ': `${base}/fr/agence-constantine`,
        'en-US': `${base}/en/agence-constantine`,
        'ar-DZ': `${base}/ar/agence-constantine`,
      },
    },
    openGraph: {
      title: 'Agence Créative à Constantine — Web, Shooting & Design',
      description: 'Site web, shooting photo, design graphique et panneaux publicitaires à Constantine. Pixel Creative Agency — devis gratuit.',
      url: `${base}/${locale}/agence-constantine`,
      images: [{ url: `${base}/og-image.png`, width: 1200, height: 630 }],
    },
  }
}

export default async function ConstantinePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CityLandingPage city="Constantine" region="Constantine" locale={locale} />
}
