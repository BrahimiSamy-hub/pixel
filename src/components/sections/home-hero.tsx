import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import heroImage from '@/assets/portfolio/Shooting/shooting9.jpg'
import mark from '@/assets/brand/pixel-mark.svg'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { PixelDots } from '@/components/ui/hex'
import { cn } from '@/lib/cn'

const proofs = ['proof1', 'proof2', 'proof3'] as const
const label = 'font-mono text-[0.9375rem] font-semibold tracking-[0.24em] uppercase'

/** V1: oversized headline beside the photo masked by the P symbol. */
export async function HomeHeroV1() {
  const t = await getTranslations('Home.hero')
  return (
    <section>
      <Container className="flex flex-col gap-10 pt-10 md:gap-14 md:pt-20">
        <div className={cn('flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-mist', label)}>
          <span className="flex items-center gap-3">
            <PixelDots className="h-4.5 w-4" />
            {t('eyebrow')}
          </span>
        </div>
        <div className="flex flex-wrap items-end gap-x-14 gap-y-10">
          <h1 className="min-w-0 flex-[999_1_38rem] text-display">
            {t('title')} <span className="text-brand-gradient">{t('titleAccent')}</span>
          </h1>
          <div className="relative mx-auto w-full max-w-[29rem] min-w-0 flex-[1_1_22rem]">
            <Image src={mark} alt="" unoptimized className="absolute -inset-s-[9%] top-[5%] h-auto w-full opacity-95" />
            <div className="relative aspect-[0.886] w-full bg-ink-2 clip-mark">
              <Image src={heroImage} alt={t('imageAlt')} fill preload placeholder="blur" sizes="(min-width: 1024px) 464px, 90vw" className="object-cover" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-7 border-t border-line pt-8 pb-12 md:pb-20">
          <div className="flex max-w-xl flex-col gap-4">
            <p className="text-lead text-lavender">{t('lead')}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
              {proofs.map((k) => (
                <li key={k} className="flex items-center gap-2">
                  <span aria-hidden className="h-2.5 w-[0.55rem] bg-orange clip-mark" />
                  {t(k)}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact">{t('ctaPrimary')}</ButtonLink>
            <ButtonLink href="/portfolio" variant="secondary">
              {t('ctaSecondary')}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}

/**
 * V2 (Claude Design « Pixel Hero Explorations », 01 · Centré): centred headline over the large
 * P symbol, faded by a radial vignette; eyebrow between rules; proof points along the bottom.
 */
export async function HomeHeroV2() {
  const t = await getTranslations('Home.hero')
  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden">
      {/* The P symbol, centred and faded into the page by the vignette above it. */}
      <Image
        src={mark}
        alt=""
        unoptimized
        preload
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-auto w-[min(760px,130vw)] -translate-x-1/2 -translate-y-[52%] opacity-35 select-none"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgb(15_16_16/0.2)_0%,rgb(15_16_16/0.85)_60%,var(--color-ink)_85%)]" />

      <Container className="flex flex-1 flex-col items-center justify-center gap-7 py-16 text-center md:gap-8 md:py-24">
        <p className={cn('flex items-center gap-3.5 text-mist', label)}>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          {t('eyebrow')}
          <span aria-hidden className="h-px w-8 bg-line-strong" />
        </p>
        <h1 className="max-w-[17ch] text-balance text-[clamp(3rem,8.9vw,8rem)] leading-[0.9] font-extrabold tracking-[-0.045em] [font-stretch:112%]">
          {t('title')} <span className="text-brand-gradient">{t('titleAccent')}</span>
        </h1>
        <p className="max-w-[42.5rem] text-lead text-lavender">{t('lead')}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3.5">
          <ButtonLink href="/contact">{t('ctaPrimary')}</ButtonLink>
          <ButtonLink href="/portfolio" variant="secondary">
            {t('ctaSecondary')}
          </ButtonLink>
        </div>
      </Container>

      <Container>
        <ul className="flex flex-wrap justify-center gap-x-14 gap-y-2.5 border-t border-line pt-6 pb-10 text-[0.9375rem] text-mist md:pb-12">
          {proofs.map((k) => (
            <li key={k}>{t(k)}</li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
