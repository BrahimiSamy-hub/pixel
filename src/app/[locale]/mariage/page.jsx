import WeedingPricingClient from './WeedingPricingClient'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'Photographe Mariage Algérie — Shooting & Vidéo, Prix & Forfaits',
    description: 'Photographe mariage professionnel en Algérie. Shooting mariage, reportage complet, vidéo, album souvenir. Forfaits adaptés au budget algérien. Réservez votre date.',
    keywords: 'photographe mariage algérie, shooting mariage algérie, photo mariage algérie, vidéo mariage algérie, prix shooting mariage algérie, reportage mariage algérie, album mariage algérie, wedding photography algeria, photographe mariage batna, cinémato mariage algérie',
    alternates: {
      canonical: `${base}/${locale}/mariage`,
      languages: {
        'fr-DZ': `${base}/fr/mariage`,
        'en-US': `${base}/en/mariage`,
        'ar-DZ': `${base}/ar/mariage`,
      },
    },
    openGraph: {
      title: 'Photographe Mariage Algérie — Shooting & Vidéo',
      description: 'Shooting mariage professionnel en Algérie. Reportage complet, vidéo cinémato, album souvenir. Devis gratuit.',
      url: `${base}/${locale}/mariage`,
      images: [{ url: `${base}/og-mariage.png`, width: 1200, height: 630 }],
    },
  }
}

const weddingStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Shooting Photo & Vidéo Mariage — Algérie',
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
  serviceType: 'Shooting Photo & Vidéo Mariage',
  areaServed: { '@type': 'Country', name: 'Algeria' },
  description: 'Forfaits shooting photo et vidéographie de mariage complets en Algérie. Reportage, album souvenir, cinémato professionnelle.',
  url: 'https://pixeldz.store/fr/mariage',
  // Update reviewCount with your real Google Business total
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '50',
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'Offer',
    "priceCurrency": "DZD",
    "availability": "https://schema.org/InStock"
  }
}

export default function WeddingPricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(weddingStructuredData) }}
      />
      <WeedingPricingClient />
    </>
  )
}
