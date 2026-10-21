import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PortfolioPage } from '@/components/portfolio/portfolio-page'
import { isPortfolioCategory, portfolioCategories } from '@/data/portfolio'
import { routing, type Locale } from '@/i18n/routing'
import { pageMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => portfolioCategories.map((category) => ({ locale, category })))
}

export async function generateMetadata({ params }: PageProps<'/[locale]/portfolio/[category]'>) {
  const { locale: raw, category } = await params
  const locale = raw as Locale
  if (!isPortfolioCategory(category)) return {}
  const [t, tPortfolio] = await Promise.all([
    getTranslations({ locale, namespace: 'Metadata.portfolioCategory' }),
    getTranslations({ locale, namespace: 'Portfolio.categories' }),
  ])
  const name = tPortfolio(category)
  return pageMetadata({ locale, path: `/portfolio/${category}`, title: t('title', { category: name }), description: t('description', { category: name }) })
}

export default async function Page({ params }: PageProps<'/[locale]/portfolio/[category]'>) {
  const { locale, category } = await params
  if (!isPortfolioCategory(category)) notFound()
  setRequestLocale(locale as Locale)
  return <PortfolioPage category={category} />
}
