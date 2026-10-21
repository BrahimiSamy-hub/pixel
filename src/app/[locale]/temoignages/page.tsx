import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ReviewCard, reviews, Stars } from '@/components/sections/review-card'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { JsonLd } from '@/components/ui/json-ld'
import { Eyebrow } from '@/components/ui/section-header'
import type { Locale } from '@/i18n/routing'
import { formatDecimal } from '@/lib/format'
import { staticPageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export async function generateMetadata({ params }: PageProps<'/[locale]/temoignages'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'testimonials', '/temoignages')
}

export default async function TestimonialsPage({ params }: PageProps<'/[locale]/temoignages'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const [t, tStudios, tReviews] = await Promise.all([getTranslations('Testimonials'), getTranslations('Studios'), getTranslations('Reviews')])

  return (
    <>
      <JsonLd
        data={reviews.map((r) => ({
          '@context': 'https://schema.org',
          '@type': 'Review',
          itemReviewed: { '@id': `${site.url}/#organization` },
          reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
          author: { '@type': 'Person', name: tReviews(`${r.key}.name`) },
          reviewBody: tReviews(`${r.key}.text`),
        }))}
      />
      <section className="pt-12 pb-12 md:pt-20">
        <Container className="flex flex-wrap items-end justify-between gap-10">
          <div className="flex min-w-0 flex-[1_1_37.5rem] flex-col gap-6">
            <Breadcrumbs items={[{ label: t('label') }]} />
            <Eyebrow index={t('eyebrow')}>{t('label')}</Eyebrow>
            <h1 className="text-balance text-h1">
              {t('title')} <span className="text-orange">{t('titleAccent')}</span>
            </h1>
          </div>
          <div className="flex flex-[0_1_22.5rem] flex-col gap-3.5 rounded-[1.75rem] border border-line bg-ink-2 p-8">
            <p className="flex items-baseline gap-2.5">
              <span className="text-[4rem] leading-none font-semibold tracking-[-0.04em]">{formatDecimal(site.rating.value, locale)}</span>
              <span className="text-xl text-mist">/ {site.rating.best}</span>
            </p>
            <Stars className="[&_svg]:size-5" />
            <p className="text-[0.9375rem] text-lavender">{t('average')}</p>
            <ButtonLink href={site.mapsUrl} size="sm" className="mt-1.5 self-start">
              {t('leaveReview')}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))] gap-6 pb-6">
        {reviews.map((r) => (
          <ReviewCard key={r.key} reviewKey={r.key} initials={r.initials} tone={r.tone} label={tStudios(`${r.studio}.short`)} className="bg-ink-2" />
        ))}
      </Container>
    </>
  )
}
