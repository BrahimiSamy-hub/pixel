import AudioPricingClient from './AudioPricingClient'

export const metadata = {
  title: 'Production Audio Algérie — Sons, Voix & Musique | Pixel',
  description: 'Production audio professionnelle en Algérie: effets sonores, voix off, musique originale pour vos projets vidéo, pubs et contenus digitaux. Pixel Agency.',
  keywords: 'production audio algérie, effets sonores, voix-off, musique originale, mixage audio, studio enregistrement',
  alternates: {
    canonical: '/sounds',
  },
}

const audioStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Production Audio Professionnelle',
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
  serviceType: 'Audio Production',
  areaServed: { '@type': 'Country', "name": "Algeria" },
  description: "Production d'effets sonores, voix off, jingles et musique originale pour projets vidéo et publicitaires en Algérie.",
  url: 'https://pixeldz.store/sounds'
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
