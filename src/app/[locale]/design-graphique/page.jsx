import InfographiePricingClient from './InfographiePricingClient'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'Design Graphique, Logo & Identité Visuelle en Algérie — Cadres & Impression',
    description: 'Design graphique professionnel en Algérie : création logo, charte graphique, cadre photo, packaging, carte de visite et supports marketing. Identité visuelle sur mesure.',
    keywords: 'design graphique algérie, création logo algérie, identité visuelle algérie, cadre photo algérie, cadre publicitaire, carte de visite algérie, packaging design algérie, infographie algérie, charte graphique algérie, supports marketing algérie, illustration algérie',
    alternates: {
      canonical: `${base}/${locale}/design-graphique`,
      languages: {
        'fr-DZ': `${base}/fr/design-graphique`,
        'en-US': `${base}/en/design-graphique`,
        'ar-DZ': `${base}/ar/design-graphique`,
      },
    },
    openGraph: {
      title: 'Design Graphique, Logo & Cadres — Algérie',
      description: 'Création de logos, identités visuelles, cadres photo et supports marketing en Algérie.',
      url: `${base}/${locale}/design-graphique`,
      images: [{ url: `${base}/og-design.png`, width: 1200, height: 630 }],
    },
  }
}

const infographieStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Design Graphique & Identité Visuelle — Algérie',
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
  serviceType: 'Design Graphique, Identité Visuelle, Cadre & Impression',
  areaServed: { '@type': 'Country', name: 'Algeria' },
  description: 'Création de logos, chartes graphiques, cadres photo, packaging et supports de communication visuels pour entreprises algériennes.',
  url: 'https://pixeldz.store/fr/design-graphique',
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
