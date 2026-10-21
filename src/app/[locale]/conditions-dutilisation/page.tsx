import { setRequestLocale } from 'next-intl/server'
import { LegalPage } from '@/components/legal/legal-page'
import type { Locale } from '@/i18n/routing'
import { staticPageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps<'/[locale]/conditions-dutilisation'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'terms', '/conditions-dutilisation')
}

export default async function TermsPage({ params }: PageProps<'/[locale]/conditions-dutilisation'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  return <LegalPage doc="terms" locale={locale as Locale} />
}
