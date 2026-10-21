import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import mic from '@/assets/services/audio.png'
import { OfferCard } from '@/components/sections/offer-card'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { HexDot } from '@/components/ui/hex'
import { JsonLd } from '@/components/ui/json-ld'
import { Eyebrow, SectionHeader } from '@/components/ui/section-header'
import type { Locale } from '@/i18n/routing'
import { staticPageMetadata } from '@/lib/seo'
import { serviceJsonLd } from '@/lib/structured-data'

export async function generateMetadata({ params }: PageProps<'/[locale]/sons'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'sound', '/sons')
}

// Decorative waveform, deterministic so server and client agree.
const bars = Array.from({ length: 96 }, (_, i) => Math.min(70, Math.round(18 + 50 * Math.abs(Math.sin(i * 0.37) * Math.cos(i * 0.11)) + (i % 5) * 2)))

export default async function SoundPage({ params }: PageProps<'/[locale]/sons'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const [t, tNav, tStudios, tMeta] = await Promise.all([
    getTranslations('Sound'),
    getTranslations('Nav'),
    getTranslations('Studios'),
    getTranslations('Metadata.sound'),
  ])

  return (
    <>
      <JsonLd data={serviceJsonLd({ locale, path: '/sons', name: tStudios('sound.name'), description: tMeta('description'), price: 4000 })} />
      <section className="border-b border-line">
        <Container className="flex flex-col gap-6.5 pt-12 pb-14 md:pt-20 md:pb-24">
          <Breadcrumbs items={[{ label: tNav('services'), href: '/services' }, { label: tStudios('sound.short') }]} />
          <p className="flex items-center gap-3 text-label text-violet">
            <HexDot tone="violet" />
            {t('eyebrow')}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
            <h1 className="min-w-0 flex-[1_1_42rem] text-balance text-h1">
              {t('title')} <span className="text-violet">{t('titleAccent')}</span>
            </h1>
            <div className="flex flex-[0_1_24rem] flex-col gap-5">
              <p className="text-lead text-lavender">{t('lead')}</p>
              <ButtonLink href="/contact" className="self-start">
                {t('cta')}
              </ButtonLink>
            </div>
          </div>
          <div aria-hidden className="mt-6 flex h-24 items-center gap-0.75 overflow-hidden rounded-card border border-line bg-ink-2 px-7">
            {bars.map((h, i) => (
              <span key={i} className={i < 40 ? 'w-1 shrink-0 rounded-full bg-violet' : 'w-1 shrink-0 rounded-full bg-line-strong'} style={{ height: h }} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionHeader index="01" tone="violet" eyebrow={t('offers.eyebrow')} title={t('offers.title')} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] gap-6">
            <OfferCard tone="violet" tag={t('sfx.tag')} title={t('sfx.title')} text={t('sfx.text')} price={4000} features={t.raw('sfx.features') as string[]} />
            <OfferCard tone="violet" tag={t('voice.tag')} title={t('voice.title')} text={t('voice.text')} price={6000} features={t.raw('voice.features') as string[]} />
            <OfferCard tone="violet" highlight tag={t('music.tag')} title={t('music.title')} text={t('music.text')} price={10000} features={t.raw('music.features') as string[]} />
          </div>
        </Container>
      </section>

      <section className="section-y border-y border-line bg-ink-2">
        <Container className="flex flex-wrap items-center gap-x-16 gap-y-12">
          <div className="relative aspect-square max-h-140 min-w-0 flex-[1_1_26rem] overflow-hidden rounded-[1.75rem]">
            <Image src={mic} alt={t('micAlt')} fill placeholder="blur" sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
          <div className="flex min-w-0 flex-[1_1_26rem] flex-col gap-5.5">
            <Eyebrow index="02" tone="violet">
              {t('uses.eyebrow')}
            </Eyebrow>
            <h2 className="text-balance text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] font-semibold tracking-[-0.035em] rtl:leading-[1.3]">{t('uses.title')}</h2>
            <ul className="flex flex-col">
              {(t.raw('uses.items') as string[]).map((item, i) => (
                <li key={item} className="flex justify-between gap-4 border-t border-line py-4.5 text-lg last:border-b">
                  <span>{item}</span>
                  <span className="font-mono text-violet">{String(i + 1).padStart(2, '0')}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  )
}
