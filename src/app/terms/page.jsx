import RulesClient from './RulesClient'

export const metadata = {
  title: "Conditions Générales d'Utilisation | Pixel Creative Agency",
  description: "Consultez les conditions générales d'utilisation de Pixel Creative Agency. Informations sur nos services, commandes, et politiques d'utilisation.",
  keywords: 'conditions générales, CGU, mentions légales, pixel creative agency, algérie',
  alternates: {
    canonical: '/terms',
  },
}

const termsStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "Conditions Générales d'Utilisation — Pixel Creative Agency",
  description: "Consultez les conditions générales d'utilisation de Pixel Creative Agency.",
  url: 'https://pixeldz.store/terms',
  mainEntity: {
    '@type': 'LocalBusiness',
    name: 'Pixel Creative Agency',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
      addressLocality: 'Batna',
      addressRegion: 'Batna',
    },
  },
}

export default function RulesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsStructuredData) }}
      />
      <RulesClient />
    </>
  )
}
