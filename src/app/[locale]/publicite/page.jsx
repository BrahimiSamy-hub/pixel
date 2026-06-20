import NeonPricingClient from './NeonPricingClient'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'Panneau Publicitaire, Enseigne Lumineuse & Impression en Algérie',
    description: 'Panneaux publicitaires, enseignes lumineuses, néon, bâches, roll-ups et impression grand format en Algérie. Signalétique professionnelle et supports publicitaires sur mesure.',
    keywords: 'panneau publicitaire algérie, enseigne lumineuse algérie, neon algérie, impression grand format algérie, bâche publicitaire algérie, roll-up algérie, signalétique algérie, affiche publicitaire algérie, impression numérique algérie, panneau LED algérie, publicité extérieure algérie, sticker algérie',
    alternates: {
      canonical: `${base}/${locale}/publicite`,
      languages: {
        'fr-DZ': `${base}/fr/publicite`,
        'en-US': `${base}/en/publicite`,
        'ar-DZ': `${base}/ar/publicite`,
      },
    },
    openGraph: {
      title: 'Panneau Publicitaire & Enseigne Lumineuse — Algérie',
      description: 'Panneaux publicitaires, néon, bâches et impressions grand format en Algérie. Devis gratuit.',
      url: `${base}/${locale}/publicite`,
      images: [{ url: `${base}/og-publicite.png`, width: 1200, height: 630 }],
    },
  }
}

const neonStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Panneaux Publicitaires & Enseignes Lumineuses — Algérie',
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
  serviceType: 'Panneau Publicitaire, Enseigne Lumineuse & Impression',
  areaServed: { '@type': 'Country', name: 'Algeria' },
  description: 'Fabrication et pose de panneaux publicitaires, enseignes lumineuses néon, bâches, roll-ups et impressions grand format pour entreprises algériennes.',
  url: 'https://pixeldz.store/fr/publicite',
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
