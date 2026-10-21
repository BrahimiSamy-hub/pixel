import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import mark from '@/assets/brand/pixel-mark.svg'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { JsonLd } from '@/components/ui/json-ld'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { cities, type CityKey } from '@/lib/nav'
import { localizedUrl, pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import { studioList, toneClasses } from '@/lib/studios'
import { cn } from '@/lib/cn'

// Rough position of each city on a schematic map of northern Algeria (percent of the box).
const pins: Record<CityKey, { x: number; y: number }> = {
  alger: { x: 34, y: 14 },
  oran: { x: 12, y: 22 },
  constantine: { x: 70, y: 30 },
  annaba: { x: 82, y: 16 },
  setif: { x: 58, y: 26 },
}

export async function cityMetadata(locale: Locale, city: CityKey) {
  const [t, tNames] = await Promise.all([
    getTranslations({ locale, namespace: 'Metadata.city' }),
    getTranslations({ locale, namespace: 'City.names' }),
  ])
  const name = tNames(city)
  const path = cities.find((c) => c.key === city)!.href
  return pageMetadata({ locale, path, title: t('title', { city: name }), description: t('description', { city: name }) })
}

export async function CityPage({ locale, city }: { locale: Locale; city: CityKey }) {
  const [t, tNames] = await Promise.all([getTranslations('City'), getTranslations('City.names')])
  const name = tNames(city)
  const pin = pins[city]
  const path = cities.find((c) => c.key === city)!.href

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: site.name,
          url: localizedUrl(locale, path),
          telephone: site.phone.e164,
          parentOrganization: { '@id': `${site.url}/#organization` },
          areaServed: [{ '@type': 'City', name }, { '@type': 'Country', name: 'Algeria' }],
        }}
      />
      <section className="border-b border-line">
        <Container className="flex flex-wrap items-center gap-12 pt-12 pb-14 md:pt-24 md:pb-26">
          <div className="flex min-w-0 flex-[1.3_1_35rem] flex-col gap-6.5">
            <nav aria-label={t('switcher')}>
              <ul className="flex flex-wrap gap-2">
                {cities.map((c) => (
                  <li key={c.key}>
                    <Link
                      href={c.href}
                      aria-current={c.key === city ? 'page' : undefined}
                      className={cn(
                        'flex min-h-10 items-center rounded-full border px-4 text-sm',
                        c.key === city ? 'border-white bg-white font-semibold text-ink' : 'border-line bg-ink-2 text-lavender hover:border-line-strong',
                      )}
                    >
                      {tNames(c.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="text-label text-orange">{t('eyebrow', { city: name })}</p>
            <h1 className="text-display">
              {t('title')}
              <br />
              <span className="text-orange">{name}.</span>
            </h1>
            <p className="max-w-150 text-lead text-lavender">{t('lead', { city: name })}</p>
            <div className="flex flex-wrap gap-3.5">
              <ButtonLink href="/contact">{t('ctaPrimary')}</ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary">
                {t('ctaSecondary')}
              </ButtonLink>
            </div>
          </div>
          <div
            role="img"
            aria-label={t('mapLabel', { city: name })}
            className="relative mx-auto aspect-square w-full max-w-130 min-w-0 flex-[1_1_22.5rem] rounded-block border border-line bg-ink-2 bg-[radial-gradient(var(--color-line-strong)_1.2px,transparent_1.2px)] bg-size-[22px_22px]"
            dir="ltr"
          >
            <span className="absolute top-[58%] left-1/2 flex -translate-1/2 flex-col items-center gap-2">
              <Image src={mark} alt="" unoptimized className="h-auto w-13" />
              <span className="rounded-lg border border-line bg-ink px-3 py-1.5 text-[0.8125rem] font-semibold">{t('studioPin')}</span>
            </span>
            <span className="absolute flex -translate-x-1/2 flex-col items-center gap-1.5" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
              <span className="h-6.25 w-5.5 bg-teal clip-hex" />
              <span className="rounded-lg bg-teal px-3 py-1.5 text-[0.8125rem] font-bold text-ink">{name}</span>
            </span>
            <span className="absolute bottom-5 left-6 font-mono text-xs text-mist">{t('coverage')}</span>
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <h2 className="mb-10 text-h2">{t('servicesTitle', { city: name })}</h2>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] gap-4">
            {studioList.map((s) => (
              <li key={s.key}>
                <Link href={s.href} className="flex items-center gap-4.5 rounded-tile border border-line bg-ink-2 p-6 hover:border-line-strong">
                  <span aria-hidden className={cn('h-12.5 w-11 shrink-0 clip-hex', toneClasses[s.tone].bg)} />
                  <span className="flex-1">
                    <strong className="block text-[1.0625rem] font-semibold">{t(`services.${s.key}`)}</strong>
                    <span className="text-sm text-mist">{t('inCity', { city: name })}</span>
                  </span>
                  <ArrowRight size={18} aria-hidden className="flip-rtl text-mist" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-y border-y border-line bg-ink-2">
        <Container>
          <h2 className="mb-10 max-w-215 text-balance text-[clamp(2rem,4vw,3.5rem)] leading-[1.06] font-semibold tracking-[-0.035em] rtl:leading-[1.3]">
            {t('whyTitle', { city: name })}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(17.5rem,100%),1fr))] gap-6">
            {(['local', 'team', 'quote'] as const).map((k, i) => (
              <div key={k} className="flex flex-col gap-3.5 rounded-card border border-line bg-ink p-8">
                <span className="font-mono font-bold text-orange">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-[1.375rem] font-semibold">{t(`why.${k}.title`)}</h3>
                <p className="leading-relaxed text-mist">{t(`why.${k}.text`, { city: name })}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
