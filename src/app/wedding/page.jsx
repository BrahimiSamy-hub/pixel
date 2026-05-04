import WeedingPricingClient from './WeedingPricingClient'

export const metadata = {
  title: 'Photographe Mariage en Algérie — Forfaits Wedding | Pixel',
  description: 'Forfaits photographie mariage en Algérie. Capturez chaque moment de votre journée avec notre équipe professionnelle. Reportage complet, album souvenir.',
  keywords: 'photographie mariage algérie, photo mariage, wedding photography, photographe mariage, cérémonie mariage',
  alternates: {
    canonical: '/wedding',
  },
}

const weddingStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Photographie de Mariage en Algérie',
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
  serviceType: 'Wedding Photography',
  areaServed: { '@type': 'Country', "name": "Algeria" },
  description: 'Forfaits photographie et vidéographie de mariage complets en Algérie. Reportage, album souvenir, édition professionnelle.',
  url: 'https://pixeldz.store/wedding',
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
