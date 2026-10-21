import { setRequestLocale } from 'next-intl/server'
import { LegalPage } from '@/components/legal/legal-page'
import type { Locale } from '@/i18n/routing'
import { staticPageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps<'/[locale]/politique-de-confidentialite'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'privacy', '/politique-de-confidentialite')
}

export default async function PrivacyPage({ params }: PageProps<'/[locale]/politique-de-confidentialite'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  return <LegalPage doc="privacy" locale={locale as Locale} />
}
