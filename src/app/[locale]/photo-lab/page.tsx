import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import fashionWeek from '@/assets/portfolio/Shooting/shooting10.jpg'
import jewel from '@/assets/portfolio/Shooting/shooting5.jpg'
import joker from '@/assets/portfolio/Shooting/shooting7.jpg'
import kid from '@/assets/portfolio/Shooting/shooting2.jpg'
import burger from '@/assets/portfolio/food/food10.jpg'
import izem from '@/assets/portfolio/food/food5.jpg'
import lipstick from '@/assets/portfolio/product/product4.jpg'
import { OfferCard } from '@/components/sections/offer-card'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Faq } from '@/components/ui/faq'
import { HexDot } from '@/components/ui/hex'
import { Eyebrow, SectionHeader } from '@/components/ui/section-header'
import type { Locale } from '@/i18n/routing'
import { staticPageMetadata } from '@/lib/seo'
import { serviceJsonLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/ui/json-ld'

export async function generateMetadata({ params }: PageProps<'/[locale]/photo-lab'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'photo', '/photo-lab')
}

const gallery = [
  { src: joker, alt: 'Joker' },
  { src: izem, alt: 'Izem Energy' },
  { src: kid, alt: 'Portrait' },
  { src: burger, alt: 'Food' },
]

export default async function PhotoLabPage({ params }: PageProps<'/[locale]/photo-lab'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const [t, tNav, tStudios, tMeta, tOffer] = await Promise.all([
    getTranslations('Photo'),
    getTranslations('Nav'),
    getTranslations('Studios'),
    getTranslations('Metadata.photo'),
    getTranslations('Offer'),
  ])

  return (
    <>
      <JsonLd data={serviceJsonLd({ locale, path: '/photo-lab', name: tStudios('photo.name'), description: tMeta('description'), price: 4000 })} />
      <section className="border-b border-line">
        <Container className="flex flex-wrap items-center gap-14 pt-12 pb-14 md:pt-20 md:pb-26">
          <div className="flex min-w-0 flex-[1_1_33.75rem] flex-col gap-6.5">
            <Breadcrumbs items={[{ label: tNav('services'), href: '/services' }, { label: tStudios('photo.short') }]} />
            <p className="flex items-center gap-3 text-label text-teal">
              <HexDot tone="teal" />
              {t('eyebrow')}
            </p>
            <h1 className="text-balance text-h1">
              {t('title')} <span className="text-teal">{t('titleAccent')}</span>
            </h1>
            <p className="max-w-xl text-lead text-lavender">{t('lead')}</p>
            <div className="flex flex-wrap gap-3.5">
              <ButtonLink href="/contact">{t('ctaPrimary')}</ButtonLink>
              <ButtonLink href="#offres" variant="secondary">
                {t('ctaSecondary')}
              </ButtonLink>
            </div>
          </div>
          <div className="flex h-[clamp(26rem,42vw,36rem)] min-w-0 flex-[1_1_27.5rem] items-end gap-4">
            <div className="relative h-full flex-[1.3] overflow-hidden rounded-[1.75rem] bg-ink-2">
              <Image src={fashionWeek} alt={t('heroMainAlt')} fill preload placeholder="blur" sizes="(min-width: 1024px) 360px, 55vw" className="object-cover" />
            </div>
            <div className="flex h-full flex-1 flex-col gap-4">
              <div className="relative flex-1 bg-teal clip-hex">
                <Image src={jewel} alt={t('heroHexAlt')} fill placeholder="blur" sizes="280px" className="object-cover" />
              </div>
              <div className="relative flex-1 overflow-hidden rounded-[1.75rem] bg-ink-2">
                <Image src={lipstick} alt={t('heroSmallAlt')} fill placeholder="blur" sizes="280px" className="object-cover" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="offres" className="section-y scroll-mt-6">
        <Container>
          <SectionHeader index="01" tone="teal" eyebrow={t('offers.eyebrow')} title={t('offers.title')} aside={t('offers.lead')} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] gap-6">
            <OfferCard tone="teal" title={t('photo.title')} text={t('photo.text')} price={4000} features={t.raw('photo.features') as string[]} />
            <OfferCard tone="teal" title={t('video.title')} text={t('video.text')} price={30000} features={t.raw('video.features') as string[]} />
            <OfferCard
              tone="teal"
              highlight
              badge={tOffer('mostComplete')}
              title={t('social.title')}
              text={t('social.text')}
              price={40000}
              features={t.raw('social.features') as string[]}
              cta={t('social.cta')}
            />
          </div>
        </Container>
      </section>

      <section className="section-y border-y border-line bg-ink-2">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-h2">{t('gallery.title')}</h2>
            <ul className="flex flex-wrap gap-2">
              {(t.raw('gallery.tags') as string[]).map((tag) => (
                <li key={tag} className="rounded-full border border-line-strong px-3.5 py-2 text-sm text-lavender">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {gallery.map((g) => (
              <div key={g.alt} className="relative aspect-3/4 overflow-hidden rounded-tile">
                <Image src={g.src} alt={g.alt} fill placeholder="blur" sizes="(min-width: 1024px) 320px, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container className="flex flex-wrap gap-x-20 gap-y-10">
          <div className="flex min-w-0 flex-[1_1_20rem] flex-col gap-4">
            <Eyebrow index="02" tone="teal">
              {t('faq.eyebrow')}
            </Eyebrow>
            <h2 className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] font-semibold tracking-[-0.03em]">{t('faq.title')}</h2>
          </div>
          <Faq
            tone="teal"
            className="min-w-0 flex-[2_1_35rem]"
            items={(['types', 'video', 'print'] as const).map((k) => ({ q: t(`faq.${k}.q`), a: t(`faq.${k}.a`) }))}
          />
        </Container>
      </section>
    </>
  )
}
