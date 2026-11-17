import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import beleghni from '@/assets/portfolio/landingPage/BeleghniMockup.jpg'
import web1 from '@/assets/portfolio/sam/web/web1.webp'
import web2 from '@/assets/portfolio/sam/web/web2.webp'
import web3 from '@/assets/portfolio/sam/web/web3.webp'
import web4 from '@/assets/portfolio/sam/web/web4.webp'
import web5 from '@/assets/portfolio/sam/web/web5.webp'
import web6 from '@/assets/portfolio/sam/web/web6.webp'
import web7 from '@/assets/portfolio/sam/web/web7.webp'
import web8 from '@/assets/portfolio/sam/web/web8.webp'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { HexDot } from '@/components/ui/hex'
import { JsonLd } from '@/components/ui/json-ld'
import { Eyebrow, SectionHeader } from '@/components/ui/section-header'
import { Faq } from '@/components/ui/faq'
import { CheckList } from '@/components/sections/check-list'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { staticPageMetadata } from '@/lib/seo'
import { serviceJsonLd } from '@/lib/structured-data'
import { devAddons, devFeatures, devGroups, devPriceText, devProjects } from '@/shared/catalog/dev'

export async function generateMetadata({ params }: PageProps<'/[locale]/developpement'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'dev', '/developpement')
}

const faqKeys = ['price', 'renewal', 'ecommerce', 'pos', 'delay', 'payment', 'seo', 'where'] as const

/** Delivered projects (portfolio, dev / web): captions under `Dev.work.items`. */
const projects = [
  { key: 'aladdinar', src: web1 },
  { key: 'bamboo', src: web2 },
  { key: 'cosmetics', src: web3 },
  { key: 'industry', src: web4 },
  { key: 'qhse', src: web5 },
  { key: 'ecomPlatform', src: web6 },
  { key: 'marketDark', src: web7 },
  { key: 'marketLight', src: web8 },
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
      <JsonLd
        data={serviceJsonLd({
          locale,
          path: '/developpement',
          name: tStudios('dev.name'),
          description: tMeta('description'),
          price: 5000,
          catalog: devProjects.map((p) => ({ name: p.label[locale], description: p.desc[locale], price: p.price })),
        })}
      />
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
              <ButtonLink href="/developpement/devis">{t('ctaPrimary')}</ButtonLink>
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
          <div className="flex flex-col gap-14">
            {devGroups.map((g) => (
              <div key={g.id} className="flex flex-col gap-6">
                <div className="flex max-w-3xl flex-col gap-2.5">
                  <h3 className="flex items-center gap-3 text-2xl font-semibold tracking-[-0.02em]">
                    <HexDot tone="lime" />
                    {g.label[locale]}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-mist">{g.intro[locale]}</p>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(min(18.75rem,100%),1fr))] gap-5">
                  {devProjects
                    .filter((p) => p.group === g.id)
                    .map((p) => (
                      <article key={p.id} className="flex flex-col gap-4 rounded-card border border-line bg-ink-2 p-8">
                        <h4 className="text-xl font-semibold tracking-[-0.02em]">{p.label[locale]}</h4>
                        <p className={cn('text-2xl font-semibold tracking-[-0.02em]', p.price === null ? 'text-lavender' : 'text-lime')}>{devPriceText(p, locale)}</p>
                        <p className="text-[0.9375rem] leading-relaxed text-mist">{p.desc[locale]}</p>
                        {p.id === 'vitrine' ? (
                          <p className="text-sm text-lavender">
                            {devAddons.dashboard.label[locale]} : {devPriceText({ ...p, price: devAddons.dashboard.price, from: false }, locale)}
                          </p>
                        ) : p.id === 'ecommerce' ? (
                          <p className="text-sm text-lavender">
                            {devAddons.ecomApp.label[locale]} : {devPriceText({ ...p, price: devAddons.ecomApp.monthlyTotal }, locale)}
                          </p>
                        ) : null}
                        <CheckList items={(devFeatures[p.id] ?? []).map((f) => f[locale])} tone="lime" className="mb-2" />
                        <ButtonLink href={`/developpement/devis?offre=${p.id}`} size="sm" className="mt-auto w-full">
                          {t('offers.pick')}
                        </ButtonLink>
                      </article>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y border-y border-line bg-ink-2">
        <Container>
          <SectionHeader index="02" tone="lime" eyebrow={t('work.eyebrow')} title={t('work.title')} aside={t('work.lead')} />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(15rem,100%),1fr))] gap-5">
            {projects.map((p) => {
              const title = t(`work.items.${p.key}.title`)
              const kind = t(`work.items.${p.key}.kind`)
              return (
                <figure key={p.key} className="overflow-hidden rounded-card border border-line bg-ink">
                  <div className="relative aspect-3/4">
                    <Image src={p.src} alt={`${title} — ${kind}, ${t('work.devices')}`} fill placeholder="blur" sizes="(min-width: 1360px) 330px, (min-width: 640px) 45vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="flex flex-col gap-0.5 px-5 py-4 text-[0.9375rem]">
                    <strong className="font-semibold">{title}</strong>
                    <span className="text-sm text-mist">{kind}</span>
                  </figcaption>
                </figure>
              )
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/portfolio/dev" variant="secondary" size="sm">
              {t('work.all')}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container className="flex flex-wrap gap-x-20 gap-y-10">
          <div className="flex min-w-0 flex-[1_1_20rem] flex-col gap-4">
            <Eyebrow index="03" tone="lime">
              {t('faq.eyebrow')}
            </Eyebrow>
            <h2 className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] font-semibold tracking-[-0.03em]">{t('faq.title')}</h2>
          </div>
          <Faq tone="lime" className="min-w-0 flex-[2_1_35rem]" items={faqKeys.map((k) => ({ q: t(`faq.${k}.q`), a: t(`faq.${k}.a`) }))} />
        </Container>
      </section>
    </>
  )
}
