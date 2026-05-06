import { Suspense } from 'react'
import PortfolioClient from '../PortfolioClient'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const { category, locale } = await params
  const t = await getTranslations({ locale, namespace: 'portfolio_filters' })
  
  const categoryTitle = t(category) || category

  return {
    title: `${categoryTitle} | Portfolio | Pixel Creative Agency`,
    description: `Découvrez nos projets de ${categoryTitle}. Pixel Creative Agency vous accompagne dans vos besoins en design, vidéo et marketing.`,
    alternates: {
      canonical: `/portfolio/${category}`,
    },
  }
}

export default async function CategoryPortfolioPage() {
  return (
    <Suspense fallback={<div>Loading Portfolio...</div>}>
      <PortfolioClient />
    </Suspense>
  )
}
