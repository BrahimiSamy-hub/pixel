import InfographiePricingClient from './InfographiePricingClient'

export const metadata = {
  title: 'Design Graphique & Identité Visuelle Algérie | Pixel',
  description: 'Design graphique professionnel en Algérie: logos, charte graphique, packaging et supports de communication. Identité visuelle sur mesure par Pixel Agency.',
  keywords: 'design graphique algérie, création logo, identité visuelle, packaging design, supports marketing, design print',
  alternates: {
    canonical: '/graphic-design',
  },
}

const infographieStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Design Graphique & Identité Visuelle',
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
  serviceType: 'Graphic Design',
  areaServed: { '@type': 'Country', "name": "Algeria" },
  description: 'Création de logos, chartes graphiques, packaging et supports de communication visuels pour entreprises algériennes.',
  url: 'https://pixeldz.store/graphic-design'
}

export default function InfographiePricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(infographieStructuredData) }}
      />
      <InfographiePricingClient />
    </>
  )
}
