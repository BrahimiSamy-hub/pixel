import AudioPricingClient from './AudioPricingClient'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const base = 'https://pixeldz.store'
  return {
    title: 'Production Audio & Jingle Publicitaire en Algérie — Voix & Musique',
    description: 'Production audio professionnelle en Algérie : jingles publicitaires, voix off, effets sonores, musique originale et mixage pour projets vidéo et campagnes publicitaires.',
    keywords: 'production audio algérie, jingle publicitaire algérie, voix off algérie, studio enregistrement algérie, musique originale algérie, mixage audio algérie, effets sonores algérie, sound design algérie, publicité audio algérie',
    alternates: {
      canonical: `${base}/${locale}/sons`,
      languages: {
        'fr-DZ': `${base}/fr/sons`,
        'en-US': `${base}/en/sons`,
        'ar-DZ': `${base}/ar/sons`,
      },
    },
    openGraph: {
      title: 'Production Audio & Jingle Publicitaire — Algérie',
      description: 'Jingles publicitaires, voix off et musique originale pour projets vidéo et pub en Algérie.',
      url: `${base}/${locale}/sons`,
      images: [{ url: `${base}/og-audio.png`, width: 1200, height: 630 }],
    },
  }
}

const audioStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Production Audio & Jingles Publicitaires — Algérie',
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
  serviceType: 'Production Audio, Jingle & Voix Off',
  areaServed: { '@type': 'Country', name: 'Algeria' },
  description: "Production de jingles publicitaires, voix off, effets sonores et musique originale pour projets vidéo et campagnes publicitaires en Algérie.",
  url: 'https://pixeldz.store/fr/sons',
}

export default function AudioPricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(audioStructuredData) }}
      />
      <AudioPricingClient />
    </>
  )
}
