import Section from '@/components/Section'
import Faq from '@/components/Faq'
import { headers } from 'next/headers'

// This will be a Server Component to handle Metadata
export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'À Propos — Agence Créative en Algérie depuis 2018',
    description: 'Pixel Creative Agency, votre partenaire créatif en Algérie depuis 2018. Photographie, shooting, design graphique, développement web, panneau publicitaire. Équipe passionnée à Batna.',
    keywords: 'agence créative algérie, pixel creative agency, agence communication batna, histoire agence, équipe créative algérie, studio photo algérie, agence web algérie, depuis 2018',
    alternates: {
      canonical: `${base}/${locale}/a-propos`,
      languages: {
        'fr-DZ': `${base}/fr/a-propos`,
        'en-US': `${base}/en/a-propos`,
        'ar-DZ': `${base}/ar/a-propos`,
      },
    },
    openGraph: {
      title: 'À Propos — Pixel Creative Agency Algérie depuis 2018',
      description: 'Votre partenaire créatif en Algérie depuis 2018. Shooting, design, web, publicité — équipe passionnée à Batna.',
      url: `${base}/${locale}/a-propos`,
      images: [{ url: `${base}/og-image.png`, width: 1200, height: 630 }],
    },
  }
}

// Structured data for SEO
const aboutStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'À Propos — Pixel Creative Agency',
  description:
    'Découvrez Pixel Creative Agency, votre partenaire créatif en Algérie depuis 2018. Équipe passionnée, projets personnalisés, résultats professionnels garantis.',
  url: 'https://pixeldz.store/a-propos',
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
