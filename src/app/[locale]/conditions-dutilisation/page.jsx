import { getTranslations } from 'next-intl/server'
import ConditionsClient from './ConditionsClient'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('conditions.title'),
    description: t('conditions.description'),
    keywords: t('conditions.keywords'),
    alternates: {
      canonical: '/conditions-dutilisation',
    },
  }
}

const conditionsStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "Conditions Générales d'Utilisation — Pixel Creative Agency",
  description: "Consultez les conditions générales d'utilisation de Pixel Creative Agency.",
  url: 'https://pixeldz.store/conditions-dutilisation',
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

export default function ConditionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(conditionsStructuredData) }}
      />
      <ConditionsClient />
    </>
  )
}
