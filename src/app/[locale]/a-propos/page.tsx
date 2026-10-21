import { ArrowUpRight, Check, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import stage from '@/assets/portfolio/Shooting/shooting4.jpg'
import kid from '@/assets/portfolio/Shooting/shooting2.jpg'
import flares from '@/assets/portfolio/wedding/wedding.jpg'
import mark from '@/assets/brand/pixel-mark.svg'
import { TimelineRail } from '@/components/sections/timeline'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Eyebrow, SectionHeader } from '@/components/ui/section-header'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { staticPageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export async function generateMetadata({ params }: PageProps<'/[locale]/a-propos'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'about', '/a-propos')
}

const values = [
  { key: 'quality', Icon: Check, tone: 'bg-orange' },
  { key: 'support', Icon: Clock, tone: 'bg-teal' },
  { key: 'proximity', Icon: MapPin, tone: 'bg-yellow' },
] as const

const tools = ['Photoshop', 'Lightroom', 'Illustrator', 'After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Figma', 'VS Code']

export default async function AboutPage({ params }: PageProps<'/[locale]/a-propos'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const [t, tNav] = await Promise.all([getTranslations('About'), getTranslations('Nav')])

  return (
    <>
      <section className="pt-12 md:pt-20 lg:pt-24">
        <Container className="flex flex-col gap-7">
          <Breadcrumbs items={[{ label: tNav('about') }]} />
          <Eyebrow index={t('eyebrow')}>{t('label')}</Eyebrow>
          <h1 className="max-w-[74rem] text-balance text-h1">
            {t('title')} <span className="text-orange">{t('titleAccent')}</span>
          </h1>
        </Container>
      </section>

      <Container className="flex flex-wrap items-end gap-5 pt-10">
        <div className="relative aspect-16/10 min-w-0 flex-[2_1_32rem] overflow-hidden rounded-[1.75rem] bg-ink-2">
          <Image src={stage} alt={t('galleryMain')} fill preload placeholder="blur" sizes="(min-width: 1024px) 860px, 100vw" className="object-cover" />
        </div>
        <div className="flex min-w-0 flex-[1_1_16rem] flex-col gap-5">
          <div className="relative aspect-[0.866] w-[78%] self-end overflow-hidden bg-ink-2 clip-hex">
            <Image src={kid} alt={t('galleryHex')} fill placeholder="blur" sizes="320px" className="object-cover" />
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-[1.75rem] bg-ink-2">
            <Image src={flares} alt={t('gallerySmall')} fill placeholder="blur" sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
          </div>
        </div>
      </Container>

      <section className="section-y">
        <Container className="flex flex-wrap gap-x-20 gap-y-10">
          <h2 className="min-w-0 flex-[1_1_24rem] text-balance text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] font-semibold tracking-[-0.03em] rtl:leading-[1.35]">
            {t('introTitle')}
          </h2>
          <div className="flex min-w-0 flex-[1.3_1_30rem] flex-col gap-5 text-lead text-lavender">
            <p>{t('introP1')}</p>
            <p>{t('introP2')}</p>
          </div>
        </Container>
      </section>

      <section className="section-y border-y border-line bg-ink-2">
        <Container>
          <SectionHeader index="01" eyebrow={t('values.eyebrow')} title={t('values.title')} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(17.5rem,1fr))] gap-6">
            {values.map(({ key, Icon, tone }) => (
              <div key={key} className="flex flex-col gap-4 rounded-card border border-line bg-ink p-9">
                <span className={cn('flex h-16 w-14 items-center justify-center text-ink clip-hex', tone)}>
                  <Icon size={24} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{t(`values.${key}.title`)}</h3>
                <p className="leading-relaxed text-mist">{t(`values.${key}.text`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionHeader index="02" eyebrow={t('timeline.eyebrow')} title={t('timeline.title')} />
          <TimelineRail />
          <div className="mt-16 flex flex-wrap items-center gap-2.5">
            <span className="me-2.5 text-label text-mist">{t('tools')}</span>
            {tools.map((tool) => (
              <span key={tool} className="rounded-full border border-line px-3.5 py-2 text-sm text-lavender" lang="en">
                {tool}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <section className="flex flex-wrap overflow-hidden rounded-block border border-line bg-ink-2">
          <div className="flex min-w-0 flex-[1_1_26rem] flex-col gap-5 p-8 sm:p-12 lg:p-16">
            <Eyebrow index="03">{t('visit.eyebrow')}</Eyebrow>
            <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.035em]">{t('visit.title')}</h2>
            <p className="text-[1.0625rem] leading-relaxed text-lavender">{t('visit.text')}</p>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-[0.9375rem]">
              <dt className="text-mist">{t('visit.city')}</dt>
              <dd>{t('visit.cityValue')}</dd>
              <dt className="text-mist">{t('visit.hours')}</dt>
              <dd>{t('visit.hoursValue')}</dd>
              <dt className="text-mist">{t('visit.phone')}</dt>
              <dd>
                <a href={site.phone.href} dir="ltr" className="hover:text-orange-light">
                  {site.phone.display}
                </a>
              </dd>
            </dl>
            <ButtonLink href={site.mapsUrl} size="sm" className="mt-2 self-start">
              {t('visit.directions')}
              <ArrowUpRight size={16} aria-hidden className="flip-rtl" />
            </ButtonLink>
          </div>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('visit.mapLabel')}
            className="grid min-h-104 min-w-0 flex-[1.2_1_26rem] place-items-center bg-ink-3 bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-size-[48px_48px]"
          >
            <span className="flex -translate-y-[10%] flex-col items-center gap-2.5">
              <Image src={mark} alt="" unoptimized className="h-auto w-14" />
              <span className="rounded-[0.625rem] border border-line bg-ink px-3.5 py-2 text-sm font-semibold whitespace-nowrap">{site.name}</span>
              <span className="font-mono text-xs text-mist" dir="ltr">
                {site.geo.latitude}° N · {site.geo.longitude}° E
              </span>
            </span>
          </a>
        </section>
      </Container>
    </>
  )
}
