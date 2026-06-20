import Benefits from '../../components/Benefits'
import Collaboration from '../../components/Collaboration'
import Hero from '../../components/Hero'
import Contact from '../../components/Contact'

export const metadata = {
  title: { absolute: 'Pixel Creative Agency — Agence Créative en Algérie | Web, Photo, Design' },
  description: 'Pixel Creative Agency — agence créative en Algérie depuis 2018. Développement site web & e-commerce, shooting photo professionnel, design graphique, panneau publicitaire, cadre & impression. Devis gratuit.',
  keywords: 'agence créative algérie, website algeria, agence web algérie, développeur site web algérie, site ecommerce algérie prix, shooting photo algérie, panneau publicitaire algérie, cadre photo algérie, design graphique algérie, photographe professionnel algérie, agence communication algérie, Batna, Algérie',
  alternates: {
    canonical: 'https://pixeldz.store',
    languages: {
      'fr-DZ': 'https://pixeldz.store/fr',
      'en-US': 'https://pixeldz.store/en',
      'ar-DZ': 'https://pixeldz.store/ar',
      'x-default': 'https://pixeldz.store',
    },
  },
  openGraph: {
    title: 'Pixel Creative Agency — Agence Créative en Algérie',
    description: 'Développement web, e-commerce, shooting photo, design graphique & panneau publicitaire en Algérie depuis 2018.',
    url: 'https://pixeldz.store',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Pixel Creative Agency Algérie' }],
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Pixel Creative Agency',
  url: 'https://pixeldz.store',
  description: 'Agence créative en Algérie — développement web, shooting photo, design graphique, panneau publicitaire.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://pixeldz.store/fr/portfolio?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
}

const homepageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quel est le prix d\'un site web en Algérie ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pixel Creative Agency propose des sites web à partir de prix compétitifs adaptés au marché algérien. Nos forfaits couvrent les landing pages, sites vitrines et boutiques e-commerce. Contactez-nous pour un devis gratuit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Faites-vous du shooting photo professionnel en Algérie ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, nous réalisons des shootings professionnels : produits, portraits, événements d\'entreprise, mariage et shooting artistique. Studio équipé à Batna, disponibles dans toute l\'Algérie.',
      },
    },
    {
      '@type': 'Question',
      name: 'Proposez-vous des panneaux publicitaires et impressions en Algérie ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, nous créons et imprimons tous types de supports publicitaires : panneaux publicitaires, enseignes lumineuses, bâches, roll-ups, cadres et impressions grand format. Service disponible dans toute l\'Algérie.',
      },
    },
    {
      '@type': 'Question',
      name: 'Créez-vous des sites e-commerce en Algérie ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, Pixel Creative Agency développe des boutiques e-commerce complètes pour le marché algérien : paiement en ligne, gestion des commandes, optimisation SEO et interface responsive. Devis gratuit sous 24h.',
      },
    },
    {
      '@type': 'Question',
      name: 'Êtes-vous disponibles en dehors de Batna ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pixel Creative Agency est basé à Batna mais intervient dans toute l\'Algérie pour nos services de développement web, design graphique, shooting photo et publicité.',
      },
    },
  ],
}

import { setRequestLocale } from 'next-intl/server'

export default async function Home({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }} />
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Hero />
        <Benefits />
        <Collaboration />
        <Contact />
      </div>
    </>
  )
}
