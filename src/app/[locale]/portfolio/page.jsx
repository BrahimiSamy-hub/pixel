import { Suspense } from 'react'
import PortfolioClient from './PortfolioClient'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'Portfolio — Shootings, Design Graphique & Sites Web en Algérie',
    description: "Découvrez nos réalisations en Algérie : shootings photo, mariages, identités visuelles, panneaux publicitaires et sites web. Plus de 6 ans d'expérience créative.",
    keywords: 'portfolio agence créative algérie, réalisations shooting photo algérie, design graphique algérie, développement web algérie, panneau publicitaire algérie, exemples travaux algérie',
    alternates: {
      canonical: `${base}/${locale}/portfolio`,
      languages: {
        'fr-DZ': `${base}/fr/portfolio`,
        'en-US': `${base}/en/portfolio`,
        'ar-DZ': `${base}/ar/portfolio`,
      },
    },
    openGraph: {
      title: 'Portfolio — Shootings, Design & Web — Algérie',
      description: "Nos réalisations en Algérie : shootings photo, mariages, identités visuelles et sites web.",
      url: `${base}/${locale}/portfolio`,
      images: [{ url: `${base}/og-image.png`, width: 1200, height: 630 }],
    },
  }
}

const portfolioStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Portfolio — Pixel Creative Agency',
  description:
    "Découvrez nos réalisations: mariages, portraits, identités visuelles, sites web et campagnes publicitaires. Plus de 6 ans d'expérience créative en Algérie.",
  url: 'https://pixeldz.store/portfolio',
  mainEntity: {
    '@type': 'LocalBusiness',
    name: 'Pixel Creative Agency',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
      addressLocality: 'Batna',
      addressRegion: 'Batna',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Algeria',
    },
  },
}

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioStructuredData) }}
      />
      <Suspense fallback={<div>Loading Portfolio...</div>}>
        <PortfolioClient />
      </Suspense>
    </>
  )
}
