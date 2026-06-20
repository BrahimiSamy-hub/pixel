import CityLandingPage from '@/components/CityLandingPage'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'Agence Créative Sétif — Web, Shooting Photo & Design Graphique',
    description: 'Pixel Creative Agency intervient à Sétif pour votre site web, e-commerce, shooting photo professionnel, design graphique et panneaux publicitaires. Devis gratuit sous 24h.',
    keywords: 'agence web setif, agence créative sétif, shooting photo setif, design graphique setif, développeur site web sétif, site ecommerce setif, panneau publicitaire setif, photographe setif',
    alternates: {
      canonical: `${base}/${locale}/agence-setif`,
      languages: {
        'fr-DZ': `${base}/fr/agence-setif`,
        'en-US': `${base}/en/agence-setif`,
        'ar-DZ': `${base}/ar/agence-setif`,
      },
    },
    openGraph: {
      title: 'Agence Créative à Sétif — Web, Shooting & Design',
      description: 'Site web, shooting photo, design graphique et panneaux publicitaires à Sétif. Pixel Creative Agency — devis gratuit.',
      url: `${base}/${locale}/agence-setif`,
      images: [{ url: `${base}/og-image.png`, width: 1200, height: 630 }],
    },
  }
}

export default async function SetifPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CityLandingPage city="Sétif" region="Sétif" locale={locale} />
}
