import DevPricingClient from './DevPricingClient'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'Développement Site Web & E-commerce en Algérie — Prix & Forfaits',
    description: 'Développeur site web & e-commerce en Algérie. Création de sites vitrines, boutiques en ligne, landing pages et applications mobiles. Prix compétitifs, optimisation SEO incluse. Devis gratuit.',
    keywords: 'développeur site web algérie, site ecommerce algérie prix, création site web algérie, agence web algérie, website algeria, développement web batna, boutique en ligne algérie, landing page algérie, application mobile algérie, prix site web algérie, développement frontend backend',
    alternates: {
      canonical: `${base}/${locale}/developpement`,
      languages: {
        'fr-DZ': `${base}/fr/developpement`,
        'en-US': `${base}/en/developpement`,
        'ar-DZ': `${base}/ar/developpement`,
      },
    },
    openGraph: {
      title: 'Développement Site Web & E-commerce Algérie — Prix & Forfaits',
      description: 'Créez votre site web ou boutique e-commerce en Algérie avec Pixel Agency. Prix compétitifs, SEO inclus, livraison rapide.',
      url: `${base}/${locale}/developpement`,
      images: [{ url: `${base}/og-developpement.png`, width: 1200, height: 630 }],
    },
  }
}

const devStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Développement Site Web & E-commerce — Algérie',
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
    serviceType: 'Développement Web & E-commerce',
    areaServed: { '@type': 'Country', name: 'Algeria' },
    description: 'Création de sites web, boutiques e-commerce et applications mobiles pour entreprises algériennes. SEO inclus, prix compétitifs.',
    url: 'https://pixeldz.store/fr/developpement',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'DZD',
      availability: 'https://schema.org/InStock',
      description: 'Forfaits développement web & e-commerce Algérie',
    },
    // Update reviewCount with your real Google Business total
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quel est le prix d\'un site e-commerce en Algérie ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le prix d\'un site e-commerce en Algérie varie selon les fonctionnalités. Pixel Creative Agency propose des forfaits adaptés au marché algérien avec paiement en ligne, gestion des stocks et optimisation SEO. Contactez-nous pour un devis personnalisé.',
        },
      },
      {
        '@type': 'Question',
        name: 'Combien de temps faut-il pour créer un site web en Algérie ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Un site vitrine est généralement livré en 1 à 2 semaines. Une boutique e-commerce complète prend entre 3 et 6 semaines selon les fonctionnalités demandées.',
        },
      },
    ],
  },
]

export default function DevPricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(devStructuredData[0]) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(devStructuredData[1]) }} />
      <DevPricingClient />
    </>
  )
}
