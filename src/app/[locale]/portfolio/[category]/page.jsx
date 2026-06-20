import { Suspense } from 'react'
import CategoryPortfolioClient from '@/components/portfolio/CategoryPortfolioClient'
import { getTranslations } from 'next-intl/server'

const CATEGORY_META = {
  conception: {
    title: 'Identité Visuelle & Branding',
    description: 'Logos, chartes graphiques et identités de marque créées par Pixel Creative Agency en Algérie.',
  },
  print: {
    title: 'Supports Print',
    description: 'Flyers, affiches, menus et tous vos supports imprimés conçus par Pixel Creative Agency.',
  },
  digital: {
    title: 'Sites Web & Digital',
    description: 'Création de sites web modernes et expériences digitales par Pixel Creative Agency, Algérie.',
  },
  video: {
    title: 'Production Vidéo',
    description: 'Réels, spots publicitaires et films cinématographiques par Pixel Creative Agency.',
  },
  social: {
    title: 'Social Media',
    description: 'Contenus et visuels pour les réseaux sociaux par Pixel Creative Agency, Algérie.',
  },
  photo: {
    title: 'Photographie Professionnelle',
    description: 'Shooting produit, événementiel et reportage photo par Pixel Creative Agency, Algérie.',
  },
}

export async function generateMetadata({ params }) {
  const { category, locale } = await params
  const meta = CATEGORY_META[category]

  return {
    title: meta
      ? `${meta.title} | Portfolio | Pixel Creative Agency`
      : `Portfolio ${category} | Pixel Creative Agency`,
    description: meta?.description ?? `Réalisations ${category} de Pixel Creative Agency.`,
    alternates: {
      canonical: `/${locale}/portfolio/${category}`,
    },
  }
}

export default async function CategoryPortfolioPage({ params }) {
  const { category } = await params
  return (
    <Suspense fallback={<div className="min-h-screen bg-n-8" />}>
      <CategoryPortfolioClient category={category} />
    </Suspense>
  )
}
