import { Suspense } from 'react'
import PortfolioClient from './PortfolioClient'

export const metadata = {
  title: 'Portfolio — Réalisations Photo & Design | Pixel Algérie',
  description: "Découvrez nos réalisations: mariages, portraits, identités visuelles, sites web et campagnes publicitaires. Plus de 6 ans d'expérience créative en Algérie.",
  keywords: 'portfolio photographie algérie, design graphique, vidéographie, développement web, travaux créatifs, exemples réalisations',
  alternates: {
    canonical: '/portfolio',
  },
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
