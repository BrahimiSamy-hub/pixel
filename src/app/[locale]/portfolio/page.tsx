import { setRequestLocale } from 'next-intl/server'
import { PortfolioPage } from '@/components/portfolio/portfolio-page'
import type { Locale } from '@/i18n/routing'
import { staticPageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps<'/[locale]/portfolio'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'portfolio', '/portfolio')
}

export default async function Page({ params }: PageProps<'/[locale]/portfolio'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  return <PortfolioPage />
}
