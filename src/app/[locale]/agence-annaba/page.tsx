import { setRequestLocale } from 'next-intl/server'
import { CityPage, cityMetadata } from '@/components/city/city-page'
import type { Locale } from '@/i18n/routing'

export async function generateMetadata({ params }: PageProps<'/[locale]/agence-annaba'>) {
  const { locale } = await params
  return cityMetadata(locale as Locale, 'annaba')
}

export default async function Page({ params }: PageProps<'/[locale]/agence-annaba'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  return <CityPage locale={locale as Locale} city="annaba" />
}
