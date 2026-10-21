import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import photoImg from '@/assets/portfolio/Shooting/shooting5.jpg'
import designImg from '@/assets/portfolio/logo/logo5.jpg'
import weddingImg from '@/assets/portfolio/wedding/wedding11.jpg'
import devImg from '@/assets/portfolio/landingPage/ComfortSpaceMockup.jpg'
import soundImg from '@/assets/services/audio.png'
import adsImg from '@/assets/services/publicité.png'
import { PageHero } from '@/components/sections/page-hero'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { HexDot } from '@/components/ui/hex'
import { Price } from '@/components/ui/price'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { staticPageMetadata } from '@/lib/seo'
import { studioList, toneClasses, type StudioKey } from '@/lib/studios'

export async function generateMetadata({ params }: PageProps<'/[locale]/services'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'services', '/services')
}

type Translator = Awaited<ReturnType<typeof getTranslations>>

// Brand names are not translated; descriptive alts come from the messages.
const images: Record<StudioKey, { src: typeof photoImg; alt: (t: Translator) => string }> = {
  photo: { src: photoImg, alt: (t) => t('Photo.heroHexAlt') },
  design: { src: designImg, alt: () => 'La Dolce Vita' },
  wedding: { src: weddingImg, alt: (t) => t('Wedding.alts.hands') },
  dev: { src: devImg, alt: () => 'Comfort Space' },
  sound: { src: soundImg, alt: (t) => t('Sound.micAlt') },
  ads: { src: adsImg, alt: (t) => t('Ads.gallery.billboard') },
}

export default async function ServicesPage({ params }: PageProps<'/[locale]/services'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const [t, tStudios, tCommon, tAll] = await Promise.all([
    getTranslations('Services'),
    getTranslations('Studios'),
    getTranslations('Common'),
    getTranslations(),
  ])

  return (
    <>
      <PageHero crumbs={[{ label: tAll('Nav.services') }]} title={t('title')} accent={t('titleAccent')} lead={t('lead')} className="border-b border-line pb-14 md:pb-20">
        <ul className="mt-3 flex flex-wrap gap-2.5">
          {studioList.map((s) => (
            <li key={s.key}>
              <a href={`#${s.key}`} className="flex min-h-11 items-center gap-2.5 rounded-full border border-line bg-ink-2 px-4.5 text-[0.9375rem] hover:border-line-strong">
                <HexDot tone={s.tone} className="h-2.75 w-2.5" />
                {tStudios(`${s.key}.short`)}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <Container>
        {studioList.map((s, i) => {
          const image = images[s.key]
          const alt = image.alt(tAll)
          return (
            <article
              key={s.key}
              id={s.key}
              className={cn(
                'flex scroll-mt-6 flex-wrap items-center gap-x-16 gap-y-12 py-14 md:py-24',
                i % 2 === 1 && 'flex-wrap-reverse md:flex-row-reverse',
                i < studioList.length - 1 && 'border-b border-line',
              )}
            >
              <div className="relative aspect-4/3 min-w-0 flex-[1_1_28.75rem] overflow-hidden rounded-[1.75rem] bg-ink-2">
                <Image src={image.src} alt={alt} fill placeholder="blur" sizes="(min-width: 1024px) 620px, 100vw" className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-[1_1_28.75rem] flex-col gap-5">
                <p className={cn('flex items-center gap-3 text-label', toneClasses[s.tone].text)}>
                  <HexDot tone={s.tone} />
                  {String(i + 1).padStart(2, '0')} · {tStudios(`${s.key}.category`)}
                </p>
                <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.04] font-semibold tracking-[-0.035em] rtl:leading-[1.3]">
                  {tStudios(`${s.key}.name`)}
                </h2>
                <p className="text-[1.0625rem] leading-relaxed text-lavender">{t(`${s.key}.lead`)}</p>
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] gap-x-6 gap-y-2.5 text-[0.9375rem] text-lavender">
                  {(t.raw(`${s.key}.features`) as string[]).map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span aria-hidden className={toneClasses[s.tone].text}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-line pt-5">
                  <p className="text-[0.9375rem] text-mist">
                    {s.priceFrom ? (
                      <>
                        {tCommon('from')} <Price value={s.priceFrom} className="text-[1.375rem] font-semibold text-white" />
                      </>
                    ) : (
                      <>
                        <strong className="text-[1.375rem] font-semibold text-white">{tCommon('onQuote')}</strong> ·{' '}
                        {s.key === 'dev' ? t('hostingIncluded') : tCommon('replyIn24h')}
                      </>
                    )}
                  </p>
                  <ButtonLink href={s.href} variant="secondary" size="sm">
                    {s.key === 'wedding' ? t('seePacks') : tCommon('seeOffers')}
                    <ArrowRight size={16} aria-hidden className="flip-rtl" />
                  </ButtonLink>
                </div>
              </div>
            </article>
          )
        })}
      </Container>
    </>
  )
}
