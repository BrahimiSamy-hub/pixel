import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DevWizard } from '@/components/quote/dev-wizard'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Container } from '@/components/ui/container'
import { HexDot } from '@/components/ui/hex'
import type { Locale } from '@/i18n/routing'
import { staticPageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps<'/[locale]/developpement/devis'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'devQuote', '/developpement/devis')
}

/** Pixel Development quote request, step by step. `?offre=<id>` pre-ticks an offer. */
export default async function DevQuotePage({ params, searchParams }: PageProps<'/[locale]/developpement/devis'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const { offre } = await searchParams
  const [t, tNav, tStudios] = await Promise.all([getTranslations('Dev.quote'), getTranslations('Nav'), getTranslations('Studios')])

  return (
    <section className="section-y">
      <Container className="flex max-w-5xl flex-col gap-12">
        <div className="flex flex-col gap-5">
          <Breadcrumbs items={[{ label: tNav('services'), href: '/services' }, { label: tStudios('dev.short'), href: '/developpement' }, { label: t('crumb') }]} />
          <p className="flex items-center gap-3 text-label text-lime">
            <HexDot tone="lime" />
            {t('eyebrow')}
          </p>
          <h1 className="text-balance text-h1">{t('title')}</h1>
          <p className="max-w-2xl text-lead text-lavender">{t('lead')}</p>
        </div>
        <DevWizard initialOffer={typeof offre === 'string' ? offre : undefined} />
      </Container>
    </section>
  )
}
