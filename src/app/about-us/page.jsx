import Section from '@/components/Section'
import Faq from '@/components/Faq'
import { headers } from 'next/headers'

// This will be a Server Component to handle Metadata
export const metadata = {
  title: 'À Propos — Pixel Creative Agency Algérie | Depuis 2018',
  description: 'Découvrez Pixel Creative Agency, votre partenaire créatif en Algérie depuis 2018. Équipe passionnée, projets personnalisés, résultats professionnels garantis.',
  keywords: 'pixel creative agency, histoire agence, équipe créative, algérie, photographie, design, depuis 2018',
  alternates: {
    canonical: '/about-us',
  },
}

// Structured data for SEO
const aboutStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'À Propos — Pixel Creative Agency',
  description:
    'Découvrez Pixel Creative Agency, votre partenaire créatif en Algérie depuis 2018. Équipe passionnée, projets personnalisés, résultats professionnels garantis.',
  url: 'https://pixeldz.store/about-us',
  mainEntity: {
    '@type': 'LocalBusiness',
    name: 'Pixel Creative Agency',
    foundingDate: '2018',
    description:
      'Agence créative professionnelle en Algérie spécialisée en photographie, design graphique et développement web',
    url: 'https://pixeldz.store',
    telephone: '+213799018288',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
      addressLocality: 'Batna',
      addressRegion: 'Batna',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Algeria',
    },
  },
}

// We'll use a client component for the actual content because it uses useTranslation
import AboutUsClient from './AboutUsClient'

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutStructuredData) }}
      />
      <AboutUsClient />
    </>
  )
}
