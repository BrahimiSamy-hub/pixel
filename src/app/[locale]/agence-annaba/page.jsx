import CityLandingPage from '@/components/CityLandingPage'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'Agence Créative Annaba — Web, Shooting Photo & Design Graphique',
    description: 'Pixel Creative Agency intervient à Annaba pour votre site web, e-commerce, shooting photo professionnel, design graphique et panneaux publicitaires. Devis gratuit sous 24h.',
    keywords: 'agence web annaba, agence créative annaba, shooting photo annaba, design graphique annaba, développeur site web annaba, site ecommerce annaba, panneau publicitaire annaba, photographe annaba',
    alternates: {
      canonical: `${base}/${locale}/agence-annaba`,
      languages: {
        'fr-DZ': `${base}/fr/agence-annaba`,
        'en-US': `${base}/en/agence-annaba`,
        'ar-DZ': `${base}/ar/agence-annaba`,
      },
    },
    openGraph: {
      title: 'Agence Créative à Annaba — Web, Shooting & Design',
      description: 'Site web, shooting photo, design graphique et panneaux publicitaires à Annaba. Pixel Creative Agency — devis gratuit.',
      url: `${base}/${locale}/agence-annaba`,
      images: [{ url: `${base}/og-image.png`, width: 1200, height: 630 }],
    },
  }
}

export default async function AnnabaPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CityLandingPage city="Annaba" region="Annaba" locale={locale} />
}
