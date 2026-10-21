import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import banner from '@/assets/portfolio/bache/bache4.jpg'
import rollup from '@/assets/portfolio/rollUp/rollUp.jpg'
import mural from '@/assets/portfolio/wall/wall6.jpg'
import billboard from '@/assets/services/publicité.png'
import neon from '@/assets/portfolio/logo/logo8.jpg'
import { QuoteForm } from '@/components/forms/quote-form'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { HexDot } from '@/components/ui/hex'
import { JsonLd } from '@/components/ui/json-ld'
import { Eyebrow, SectionHeader } from '@/components/ui/section-header'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { staticPageMetadata } from '@/lib/seo'
import { serviceJsonLd } from '@/lib/structured-data'

export async function generateMetadata({ params }: PageProps<'/[locale]/publicite'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'ads', '/publicite')
}

const gallery = [
  { src: mural, key: 'mural' },
  { src: banner, key: 'banner' },
  { src: rollup, key: 'rollup' },
  { src: billboard, key: 'billboard' },
] as const

export default async function AdsPage({ params }: PageProps<'/[locale]/publicite'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const [t, tNav, tStudios, tMeta] = await Promise.all([
    getTranslations('Ads'),
    getTranslations('Nav'),
    getTranslations('Studios'),
    getTranslations('Metadata.ads'),
  ])

  return (
    <>
      <JsonLd data={serviceJsonLd({ locale, path: '/publicite', name: tStudios('ads.name'), description: tMeta('description') })} />
      <section className="border-b border-line">
        <Container className="flex flex-wrap items-center gap-14 pt-12 pb-14 md:pt-20 md:pb-26">
          <div className="flex min-w-0 flex-[1_1_33.75rem] flex-col gap-6.5">
            <Breadcrumbs items={[{ label: tNav('services'), href: '/services' }, { label: tStudios('ads.short') }]} />
            <p className="flex items-center gap-3 text-label text-orange">
              <HexDot />
              {t('eyebrow')}
            </p>
            <h1 className="text-balance text-h1">
              {t('title')} <span className="text-orange">{t('titleAccent')}</span>
            </h1>
            <p className="max-w-xl text-lead text-lavender">{t('lead')}</p>
            <div className="flex flex-wrap gap-3.5">
              <ButtonLink href="#devis">{t('ctaPrimary')}</ButtonLink>
              <ButtonLink href="/portfolio/print" variant="secondary">
                {t('ctaSecondary')}
              </ButtonLink>
            </div>
          </div>
          <div className="relative min-w-0 flex-[1_1_27.5rem]">
            <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-ink-2">
              <Image src={neon} alt="DZ Neon" fill preload placeholder="blur" sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </div>
            <div className="absolute -inset-s-4 bottom-8 flex flex-col gap-1 rounded-2xl border border-line bg-ink px-5 py-4">
              <span className="text-label text-orange">{t('neonTag')}</span>
              <span className="text-[0.9375rem] font-semibold">{t('neonValue')}</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionHeader index="01" eyebrow={t('workshops.eyebrow')} title={t('workshops.title')} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(21.25rem,100%),1fr))] gap-6">
            {(['print', 'works'] as const).map((k) => {
              const highlight = k === 'works'
              return (
                <article key={k} className={cn('flex flex-col gap-4.5 rounded-[1.75rem] p-10', highlight ? 'bg-orange text-ink' : 'border border-line bg-ink-2')}>
                  <h3 className="text-h3">{t(`workshops.${k}.title`)}</h3>
                  <p className={cn('leading-relaxed', !highlight && 'text-mist')}>{t(`workshops.${k}.text`)}</p>
                  <ul className={cn('grid grid-cols-[repeat(auto-fit,minmax(13.75rem,1fr))] gap-x-6 text-[0.9375rem]', !highlight && 'text-lavender')}>
                    {(t.raw(`workshops.${k}.items`) as string[]).map((item) => (
                      <li key={item} className={cn('border-t py-3', highlight ? 'border-ink' : 'border-line')}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="section-y border-y border-line bg-ink-2">
        <Container>
          <h2 className="mb-10 text-h2">{t('gallery.title')}</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {gallery.map((g) => (
              <figure key={g.key} className="flex flex-col gap-2.5">
                <div className="relative aspect-square overflow-hidden rounded-tile">
                  <Image src={g.src} alt={t(`gallery.${g.key}`)} fill placeholder="blur" sizes="(min-width: 1024px) 320px, 50vw" className="object-cover" />
                </div>
                <figcaption className="text-sm text-mist">{t(`gallery.${g.key}`)}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section id="devis" className="section-y scroll-mt-6">
        <Container className="flex flex-wrap items-start gap-x-18 gap-y-10">
          <div className="flex min-w-0 flex-[1_1_21.25rem] flex-col gap-4.5">
            <Eyebrow index="02">{t('quote.eyebrow')}</Eyebrow>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.035em] rtl:leading-[1.3]">{t('quote.title')}</h2>
            <p className="leading-relaxed text-mist">{t('quote.lead')}</p>
          </div>
          <QuoteForm />
        </Container>
      </section>
    </>
  )
}
