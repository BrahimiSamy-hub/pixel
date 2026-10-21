import { BookOpen, Clock, Code2, MonitorSmartphone, Search } from 'lucide-react'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import antic from '@/assets/portfolio/landingPage/AnticMockup.jpg'
import beleghni from '@/assets/portfolio/landingPage/BeleghniMockup.jpg'
import broker from '@/assets/portfolio/landingPage/BrokerMockup.jpg'
import comfort from '@/assets/portfolio/landingPage/ComfortSpaceMockup.jpg'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { HexDot } from '@/components/ui/hex'
import { JsonLd } from '@/components/ui/json-ld'
import { SectionHeader } from '@/components/ui/section-header'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { staticPageMetadata } from '@/lib/seo'
import { serviceJsonLd } from '@/lib/structured-data'

export async function generateMetadata({ params }: PageProps<'/[locale]/developpement'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'dev', '/developpement')
}

const offers = [
  { key: 'vitrine', slug: '/vitrine', support: 3 },
  { key: 'ecommerce', slug: '/e-commerce', support: 6, highlight: true },
  { key: 'mobile', slug: '/mobile', support: 12 },
  { key: 'landing', slug: '/landing', support: 3 },
  { key: 'pwa', slug: '/pwa', support: 6 },
  { key: 'api', slug: '/api', support: 12 },
] as const

const projects = [
  { src: antic, title: 'Antic', kind: 'vitrine' },
  { src: broker, title: 'Broker', kind: 'web' },
  { src: comfort, title: 'Comfort Space', kind: 'ecommerce' },
] as const

const base = [
  { key: 'responsive', Icon: MonitorSmartphone },
  { key: 'seo', Icon: Search },
  { key: 'custom', Icon: Code2 },
  { key: 'training', Icon: BookOpen },
  { key: 'support', Icon: Clock },
] as const

export default async function DevPage({ params }: PageProps<'/[locale]/developpement'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const [t, tNav, tStudios, tMeta] = await Promise.all([
    getTranslations('Dev'),
    getTranslations('Nav'),
    getTranslations('Studios'),
    getTranslations('Metadata.dev'),
  ])

  return (
    <>
      <JsonLd data={serviceJsonLd({ locale, path: '/developpement', name: tStudios('dev.name'), description: tMeta('description') })} />
      <section className="border-b border-line">
        <Container className="flex flex-wrap items-center gap-14 pt-12 pb-14 md:pt-20 md:pb-26">
          <div className="flex min-w-0 flex-[1_1_32.5rem] flex-col gap-6.5">
            <Breadcrumbs items={[{ label: tNav('services'), href: '/services' }, { label: tStudios('dev.short') }]} />
            <p className="flex items-center gap-3 text-label text-lime">
              <HexDot tone="lime" />
              {t('eyebrow')}
            </p>
            <h1 className="text-balance text-h1">
              {t('title')} <span className="text-lime">{t('titleAccent')}</span>
              {t('titleEnd')}
            </h1>
            <p className="max-w-xl text-lead text-lavender">{t('lead')}</p>
            <div className="flex flex-wrap gap-3.5">
              <ButtonLink href="/contact">{t('ctaPrimary')}</ButtonLink>
              <ButtonLink href="#offres" variant="secondary">
                {t('ctaSecondary')}
              </ButtonLink>
            </div>
          </div>
          <figure className="min-w-0 flex-[1_1_30rem] overflow-hidden rounded-tile border border-line bg-ink-2">
            <div className="flex items-center gap-3.5 border-b border-line px-4.5 py-3.5" dir="ltr">
              <span aria-hidden className="flex gap-1.75">
                <i className="size-2.75 rounded-full bg-red" />
                <i className="size-2.75 rounded-full bg-yellow" />
                <i className="size-2.75 rounded-full bg-lime" />
              </span>
              <figcaption className="flex-1 rounded-lg bg-ink px-3.5 py-1.5 font-mono text-xs text-mist">{t('browser')}</figcaption>
            </div>
            <Image src={beleghni} alt={t('heroAlt')} preload placeholder="blur" sizes="(min-width: 1024px) 620px, 100vw" className="h-auto w-full" />
          </figure>
        </Container>
      </section>

      <section id="offres" className="section-y scroll-mt-6">
        <Container>
          <SectionHeader index="01" tone="lime" eyebrow={t('offers.eyebrow')} title={t('offers.title')} aside={t('offers.lead')} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] gap-5">
            {offers.map((o) => {
              const highlight = 'highlight' in o
              return (
                <article key={o.key} className={cn('flex flex-col gap-4 rounded-card p-8', highlight ? 'bg-lime text-ink' : 'border border-line bg-ink-2')}>
                  <div className="flex items-center justify-between">
                    <code className={cn('font-mono text-[0.8125rem]', highlight ? 'font-bold' : 'text-lime')} dir="ltr">
                      {o.slug}
                    </code>
                    <span className={cn('text-[0.8125rem]', highlight ? undefined : 'text-mist')}>{t('offers.support', { months: o.support })}</span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{t(`${o.key}.title`)}</h3>
                  <p className={cn('text-[0.9375rem] leading-relaxed', highlight ? undefined : 'text-mist')}>{t(`${o.key}.text`)}</p>
                  <ul className={cn('mt-auto flex flex-col gap-2.5 border-t pt-4 text-sm', highlight ? 'border-ink' : 'border-line text-lavender')}>
                    {(t.raw(`${o.key}.features`) as string[]).map((f) => (
                      <li key={f}>{f}</li>
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
          <SectionHeader index="02" tone="lime" eyebrow={t('work.eyebrow')} title={t('work.title')} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] gap-6">
            {projects.map((p) => (
              <figure key={p.title} className="overflow-hidden rounded-card border border-line bg-ink">
                <div className="relative aspect-4/3">
                  <Image src={p.src} alt={`${p.title} — ${t(`work.${p.kind}`)}`} fill placeholder="blur" sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
                </div>
                <figcaption className="flex justify-between px-5 py-4.5 text-[0.9375rem]">
                  <strong className="font-semibold">{p.title}</strong>
                  <span className="text-mist">{t(`work.${p.kind}`)}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionHeader index="03" tone="lime" eyebrow={t('base.eyebrow')} title={t('base.title')} />
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(13.75rem,100%),1fr))] border-s border-t border-line">
            {base.map(({ key, Icon }) => (
              <li key={key} className="flex flex-col gap-3 border-e border-b border-line p-7">
                <Icon size={26} strokeWidth={1.8} className="text-lime" aria-hidden />
                <strong className="text-lg font-semibold">{t(`base.${key}.title`)}</strong>
                <span className="text-[0.9375rem] text-mist">{t(`base.${key}.text`)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
