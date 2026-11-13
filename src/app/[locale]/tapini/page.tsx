import { getTranslations, setRequestLocale } from 'next-intl/server'
import { TapiniBuilder } from '@/components/quote/small-builders'
import { QuoteSection } from '@/components/quote/quote-section'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Container } from '@/components/ui/container'
import type { Locale } from '@/i18n/routing'
import { pageMetadata } from '@/lib/seo'
import { servicesText } from '@/shared/catalog/text'

const tapini = servicesText.items.tapini

export async function generateMetadata({ params }: PageProps<'/[locale]/tapini'>) {
  const { locale } = await params
  const l = locale as Locale
  return pageMetadata({ locale: l, path: '/tapini', title: `Tapini — ${tapini.tagline[l]}`, description: tapini.desc[l] })
}

/** Tapini: Pixel's NFC cards and connected supports, with their quote builder. */
export default async function TapiniPage({ params }: PageProps<'/[locale]/tapini'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const tNav = await getTranslations('Nav')

  return (
    <>
      <section className="border-b border-line">
        <Container className="flex flex-col gap-6.5 pt-12 pb-14 md:pt-20 md:pb-20">
          <Breadcrumbs items={[{ label: tNav('services'), href: '/services' }, { label: 'Tapini' }]} />
          <p className="text-label text-orange">{tapini.tagline[locale]}</p>
          <h1 className="text-balance text-h1">Tapini</h1>
          <p className="max-w-160 text-lead text-lavender">{tapini.desc[locale]}</p>
        </Container>
      </section>
      <QuoteSection index="01">
        <TapiniBuilder />
      </QuoteSection>
    </>
  )
}
