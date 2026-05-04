import NeonPricingClient from './NeonPricingClient'

export const metadata = {
  title: 'Publicité & Impression Algérie — Enseignes Neon | Pixel',
  description: 'Services publicité et impression en Algérie: enseignes lumineuses, néon, affiches, roll-ups et supports publicitaires. Devis rapide par Pixel Agency.',
  keywords: 'publicité algérie, panneau neon, impression publicitaire, signalétique, bâche publicitaire, supports marketing',
  alternates: {
    canonical: '/advertisement',
  },
}

const neonStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Publicité & Impression en Algérie',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Pixel Creative Agency',
    telephone: '+213799018288',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
      addressLocality: 'Batna',
      addressRegion: 'Batna',
    },
  },
  serviceType: 'Advertising & Printing',
  areaServed: { '@type': 'Country', "name": "Algeria" },
  description: 'Création et impression de supports publicitaires en Algérie: enseignes lumineuses, néon, roll-ups, affiches, stickers.',
  url: 'https://pixeldz.store/advertisement'
}

export default function NeonPricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(neonStructuredData) }}
      />
      <NeonPricingClient />
    </>
  )
}
