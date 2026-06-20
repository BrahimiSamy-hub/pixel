import ContactClient from './ContactClient'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'Contactez-nous — Devis Gratuit Site Web, Shooting & Design Algérie',
    description: 'Contactez Pixel Creative Agency pour un devis gratuit : site web, e-commerce, shooting photo, panneau publicitaire, design graphique. Réponse sous 24h. Batna, Algérie.',
    keywords: 'contact agence web algérie, devis site web algérie, devis shooting photo algérie, devis design graphique algérie, devis panneau publicitaire algérie, pixel creative agency contact, devis gratuit algérie',
    alternates: {
      canonical: `${base}/${locale}/contact`,
      languages: {
        'fr-DZ': `${base}/fr/contact`,
        'en-US': `${base}/en/contact`,
        'ar-DZ': `${base}/ar/contact`,
      },
    },
    openGraph: {
      title: 'Contactez Pixel Creative Agency — Devis Gratuit Algérie',
      description: 'Devis gratuit sous 24h pour votre site web, shooting photo, design ou panneau publicitaire. Basés à Batna, disponibles partout en Algérie.',
      url: `${base}/${locale}/contact`,
      images: [{ url: `${base}/og-image.png`, width: 1200, height: 630 }],
    },
  }
}

const contactStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact — Pixel Creative Agency',
  description:
    'Contactez Pixel Creative Agency pour votre prochain projet créatif. Devis gratuit sous 24h.',
  url: 'https://pixeldz.store/contact',
  mainEntity: {
    '@type': 'LocalBusiness',
    name: 'Pixel Creative Agency',
    telephone: '+213799018288',
    email: 'contact@pixeldz.store',
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

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />
      <ContactClient />
    </>
  )
}
