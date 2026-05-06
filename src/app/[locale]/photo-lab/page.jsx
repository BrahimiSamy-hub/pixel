import PhotoPricingClient from './PhotoPricingClient'

export const metadata = {
  title: 'Photo Lab Algérie — Portraits, Tirages & Retouches | Pixel',
  description: 'Service photo lab professionnel en Algérie: portraits studio, retouches, tirages haute qualité. Shootings professionnels et personnels avec Pixel Agency.',
  keywords: 'photographie professionnelle algérie, photos événements, mariage, portrait, photo commerciale, studio photo',
  alternates: {
    canonical: '/photo-lab',
  },
}

const photoStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Photo Lab Professionnel — Portraits & Tirages',
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
  serviceType: 'Photography',
  areaServed: { '@type': 'Country', "name": "Algeria" },
  description: 'Services de photographie professionnelle en Algérie: portraits studio, retouches, tirages haute qualité.',
  url: 'https://pixeldz.store/photo-lab'
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
