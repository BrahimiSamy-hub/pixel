import DevPricingClient from './DevPricingClient'

export const metadata = {
  title: 'Développement Web & E-commerce en Algérie | Pixel Agency',
  description: 'Création de sites e-commerce, landing pages et applications mobiles en Algérie. Solutions web performantes et optimisées SEO par Pixel Creative Agency.',
  keywords: 'développement web algérie, site e-commerce, landing page, application mobile, développement frontend, développement backend',
  alternates: {
    canonical: '/development',
  },
}

const devStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Développement Web & E-commerce Algérie',
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
  serviceType: 'Web Development',
  areaServed: { '@type': 'Country', "name": "Algeria" },
  description: 'Création de sites e-commerce, landing pages et applications mobiles performantes pour entreprises algériennes.',
  url: 'https://pixeldz.store/development'
}

export default function DevPricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(devStructuredData) }}
      />
      <DevPricingClient />
    </>
  )
}
