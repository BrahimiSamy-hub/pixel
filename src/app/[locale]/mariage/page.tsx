import { Quote } from 'lucide-react'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import couple from '@/assets/services/wedding.jpg'
import flares from '@/assets/portfolio/wedding/wedding.jpg'
import shoes from '@/assets/portfolio/wedding/wedding9.jpg'
import hands from '@/assets/portfolio/wedding/wedding11.jpg'
import groom from '@/assets/portfolio/wedding/wedding3.jpg'
import bouquet from '@/assets/portfolio/wedding/wedding7.jpg'
import { PackComparator } from '@/components/wedding/pack-comparator'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { HexDot } from '@/components/ui/hex'
import { JsonLd } from '@/components/ui/json-ld'
import { SectionHeader } from '@/components/ui/section-header'
import type { Locale } from '@/i18n/routing'
import { staticPageMetadata } from '@/lib/seo'
import { serviceJsonLd } from '@/lib/structured-data'

export async function generateMetadata({ params }: PageProps<'/[locale]/mariage'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'wedding', '/mariage')
}

export default async function WeddingPage({ params }: PageProps<'/[locale]/mariage'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const [t, tNav, tStudios, tMeta, tReview] = await Promise.all([
    getTranslations('Wedding'),
    getTranslations('Nav'),
    getTranslations('Studios'),
    getTranslations('Metadata.wedding'),
    getTranslations('Reviews.amel'),
  ])

  return (
    <>
      <JsonLd data={serviceJsonLd({ locale, path: '/mariage', name: tStudios('wedding.name'), description: tMeta('description'), price: 29000 })} />
      <section className="relative flex min-h-160 items-end border-b border-line">
        <Image src={couple} alt={t('heroAlt')} fill preload placeholder="blur" sizes="100vw" className="object-cover object-[center_30%]" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-r from-ink/95 via-ink/75 to-ink/15 rtl:bg-linear-to-l" />
        <Container className="relative flex flex-col gap-6 py-18">
          <Breadcrumbs tone="light" items={[{ label: tNav('services'), href: '/services' }, { label: tStudios('wedding.category') }]} />
          <p className="flex items-center gap-3 text-label text-red">
            <HexDot tone="red" />
            {t('eyebrow')}
          </p>
          <h1 className="max-w-205 text-balance text-h1">{t('title')}</h1>
          <p className="max-w-lg text-lead text-lavender">{t('lead')}</p>
          <div className="flex flex-wrap gap-3.5">
            <ButtonLink href="#packs">{t('ctaPrimary')}</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              {t('ctaSecondary')}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section id="packs" className="section-y scroll-mt-6">
        <Container>
          <SectionHeader index="01" tone="red" eyebrow={t('packs.eyebrow')} title={t('packs.title')} />
          <PackComparator />
        </Container>
      </section>

      <section className="section-y border-y border-line bg-ink-2">
        <Container>
          <h2 className="mb-10 text-h2">{t('details')}</h2>
          <div className="flex flex-wrap gap-4">
            <div className="relative aspect-3/4 min-w-0 flex-[1_1_17.5rem] overflow-hidden rounded-tile">
              <Image src={bouquet} alt={t('alts.bouquet')} fill placeholder="blur" sizes="(min-width: 1024px) 320px, 50vw" className="object-cover" />
            </div>
            <div className="flex min-w-0 flex-[1_1_17.5rem] flex-col gap-4">
              <div className="relative min-h-50 flex-1 overflow-hidden rounded-tile">
                <Image src={shoes} alt={t('alts.shoes')} fill placeholder="blur" sizes="(min-width: 1024px) 320px, 50vw" className="object-cover" />
              </div>
              <div className="relative min-h-50 flex-1 overflow-hidden rounded-tile">
                <Image src={flares} alt={t('alts.procession')} fill placeholder="blur" sizes="(min-width: 1024px) 320px, 50vw" className="object-cover" />
              </div>
            </div>
            <div className="relative aspect-3/4 min-w-0 flex-[1_1_17.5rem] overflow-hidden rounded-tile">
              <Image src={hands} alt={t('alts.hands')} fill placeholder="blur" sizes="(min-width: 1024px) 320px, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-3/4 min-w-0 flex-[1_1_17.5rem] overflow-hidden rounded-tile">
              <Image src={groom} alt={t('alts.groom')} fill placeholder="blur" sizes="(min-width: 1024px) 320px, 50vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container className="flex max-w-275 flex-col items-center gap-7 text-center">
          <Quote size={44} fill="currentColor" strokeWidth={0} aria-hidden className="flip-rtl text-red" />
          <blockquote className="text-[clamp(1.5rem,3vw,2.5rem)] leading-tight font-semibold tracking-[-0.02em]">{tReview('text')}</blockquote>
          <p className="text-[0.9375rem] text-mist">
            <strong className="font-semibold text-white">{tReview('name')}</strong> · {tReview('role')}
          </p>
        </Container>
      </section>
    </>
  )
}
