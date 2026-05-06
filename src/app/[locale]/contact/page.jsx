import ContactClient from './ContactClient'

export const metadata = {
  title: 'Contactez Pixel Creative Agency — Algérie | Devis Gratuit',
  description: 'Contactez Pixel Creative Agency pour votre prochain projet créatif. Lundi–Vendredi 9h–18h. Devis gratuit sous 24h. Basés en Algérie, disponibles partout.',
  keywords: 'contact pixel creative agency, devis photographie, design graphique algérie, développement web, production audio, consultation gratuite',
  alternates: {
    canonical: '/contact',
  },
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
