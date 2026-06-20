import PhotoPricingClient from './PhotoPricingClient'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'Shooting Photo & Studio Algérie — Portraits, Produits & Événements',
    description: 'Shooting photo professionnel en Algérie : studio photo, portraits, shooting produit, shooting artistique, retouches et tirages haute qualité. Photographe professionnel à Batna.',
    keywords: 'shooting photo algérie, studio photo algérie, photographe professionnel algérie, shooting produit algérie, shooting artistique algérie, portrait studio algérie, tirage photo algérie, retouche photo algérie, photographe batna, photo commerciale algérie, shooting événement algérie',
    alternates: {
      canonical: `${base}/${locale}/photo-lab`,
      languages: {
        'fr-DZ': `${base}/fr/photo-lab`,
        'en-US': `${base}/en/photo-lab`,
        'ar-DZ': `${base}/ar/photo-lab`,
      },
    },
    openGraph: {
      title: 'Shooting Photo & Studio Professionnel — Algérie',
      description: 'Shooting photo produit, portrait et événement en Algérie. Studio équipé, tirages haute qualité.',
      url: `${base}/${locale}/photo-lab`,
      images: [{ url: `${base}/og-photo.png`, width: 1200, height: 630 }],
    },
  }
}

const photoStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Shooting Photo & Studio Professionnel — Algérie',
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
  serviceType: 'Shooting Photo, Portrait Studio & Tirage',
  areaServed: { '@type': 'Country', name: 'Algeria' },
  description: 'Services de shooting photo professionnel en Algérie : portraits studio, shooting produit, shooting artistique, retouches et tirages haute qualité.',
  url: 'https://pixeldz.store/fr/photo-lab',
  // Update reviewCount with your real Google Business total
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '50',
    bestRating: '5',
    worstRating: '1',
  },
}

export default function PhotoPricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(photoStructuredData) }}
      />
      <PhotoPricingClient />
    </>
  )
}
