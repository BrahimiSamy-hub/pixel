import RulesClient from './RulesClient'

import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('terms.title'),
    description: t('terms.description'),
    keywords: t('terms.keywords'),
    alternates: {
      canonical: '/loup-garou-regles',
    },
  }
}

const termsStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "Conditions Générales d'Utilisation — Pixel Creative Agency",
  description: "Consultez les conditions générales d'utilisation de Pixel Creative Agency.",
  url: 'https://pixeldz.store/loup-garou-regles',
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
