import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import cardZahra from '@/assets/portfolio/carte-visite/carte.jpg'
import sevenFour from '@/assets/portfolio/logo/logo.jpg'
import articor from '@/assets/portfolio/logo/logo1.jpg'
import myJuice from '@/assets/portfolio/logo/logo10.jpg'
import darYasmine from '@/assets/portfolio/logo/logo4.jpg'
import dzNeon from '@/assets/portfolio/logo/logo8.jpg'
import fehd from '@/assets/portfolio/packaging/packaging1.jpg'
import socialPost from '@/assets/portfolio/posts/post5.jpg'
import tikoubaouine from '@/assets/portfolio/affiche/poster3.jpg'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { HexDot } from '@/components/ui/hex'
import { JsonLd } from '@/components/ui/json-ld'
import { Price } from '@/components/ui/price'
import { SectionHeader } from '@/components/ui/section-header'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { staticPageMetadata } from '@/lib/seo'
import { serviceJsonLd } from '@/lib/structured-data'

export async function generateMetadata({ params }: PageProps<'/[locale]/design-graphique'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'design', '/design-graphique')
}

const work = [
  { src: darYasmine, title: 'Dar Yasmine', kind: 'identity' },
  { src: dzNeon, title: 'DZ Neon', kind: 'identity' },
  { src: fehd, title: 'Fehd', kind: 'packaging' },
  { src: cardZahra, title: 'Zahra', kind: 'cards' },
  { src: socialPost, title: 'Social', kind: 'social' },
  { src: tikoubaouine, title: 'Tikoubaouine', kind: 'poster' },
] as const

export default async function DesignPage({ params }: PageProps<'/[locale]/design-graphique'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const [t, tNav, tStudios, tMeta, tOffer, tCommon] = await Promise.all([
    getTranslations('Design'),
    getTranslations('Nav'),
    getTranslations('Studios'),
    getTranslations('Metadata.design'),
    getTranslations('Offer'),
    getTranslations('Common'),
  ])

  return (
    <>
      <JsonLd data={serviceJsonLd({ locale, path: '/design-graphique', name: tStudios('design.name'), description: tMeta('description'), price: 1000 })} />
      <section className="pt-12 pb-10 md:pt-20">
        <Container className="flex flex-col gap-6.5">
          <Breadcrumbs items={[{ label: tNav('services'), href: '/services' }, { label: tStudios('design.category') }]} />
          <p className="flex items-center gap-3 text-label text-yellow">
            <HexDot tone="yellow" />
            {t('eyebrow')}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
            <h1 className="min-w-0 flex-[1_1_45rem] text-balance text-h1">
              {t('title')} <span className="text-yellow">{t('titleAccent')}</span>
            </h1>
            <div className="flex flex-[0_1_24rem] flex-col gap-5">
              <p className="text-lead text-lavender">{t('lead')}</p>
              <ButtonLink href="/contact" className="self-start">
                {t('cta')}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Container className="flex flex-wrap gap-5">
        <div className="relative aspect-square max-h-155 min-w-0 flex-[1.4_1_28.75rem] overflow-hidden rounded-[1.75rem] bg-ink-2">
          <Image src={sevenFour} alt="Seven Four — Sweet & Dessert" fill preload placeholder="blur" sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
        </div>
        <div className="flex min-w-0 flex-[1_1_18.75rem] flex-col gap-5">
          {[
            { src: myJuice, alt: 'My Juice' },
            { src: articor, alt: 'Articor' },
          ].map((img) => (
            <div key={img.alt} className="relative min-h-70 flex-1 overflow-hidden rounded-[1.75rem] bg-ink-2">
              <Image src={img.src} alt={img.alt} fill placeholder="blur" sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </Container>

      <section className="section-y">
        <Container>
          <SectionHeader index="01" tone="yellow" eyebrow={t('deliverables.eyebrow')} title={t('deliverables.title')} />
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] border-s border-t border-line">
            {(t.raw('deliverables.items') as string[]).map((item, i) => (
              <li key={item} className="flex items-baseline gap-5 border-e border-b border-line p-6">
                <span className="font-mono font-bold text-yellow">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-lg font-semibold">{item}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-y border-y border-line bg-ink-2">
        <Container>
          <SectionHeader index="02" tone="yellow" eyebrow={t('pricing.eyebrow')} title={t('pricing.title')} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))] gap-6">
            {[
              { key: 'design', price: 1000, highlight: false, cta: tOffer('requestQuote') },
              { key: 'social', price: 10000, highlight: true, cta: t('pricing.social.cta') },
            ].map((offer) => (
              <article
                key={offer.key}
                className={`flex flex-wrap items-end justify-between gap-x-10 gap-y-6 rounded-[1.75rem] p-10 ${offer.highlight ? 'bg-yellow text-ink' : 'border border-line bg-ink'}`}
              >
                <div className="flex min-w-0 flex-[1_1_16rem] flex-col gap-3.5">
                  <h3 className="text-h3">{t(`pricing.${offer.key as 'design'}.title`)}</h3>
                  <p className={offer.highlight ? 'leading-relaxed' : 'leading-relaxed text-mist'}>{t(`pricing.${offer.key as 'design'}.text`)}</p>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <p className="flex items-baseline gap-2">
                    <span className={offer.highlight ? 'text-sm' : 'text-sm text-mist'}>{tCommon('from')}</span>
                    <Price value={offer.price} className="text-5xl leading-none font-semibold tracking-[-0.04em]" />
                  </p>
                  <ButtonLink href="/contact" size="sm" variant={offer.highlight ? 'ink' : 'secondary'}>
                    {offer.cta}
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionHeader
            index="03"
            tone="yellow"
            eyebrow={t('work.eyebrow')}
            title={t('work.title')}
            aside={
              <Link href="/portfolio/conception" className="font-mono text-[0.8125rem] font-bold tracking-[0.08em] text-orange uppercase">
                {tCommon('seeAllWork')} →
              </Link>
            }
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(17.5rem,100%),1fr))] gap-5">
            {work.map((w) => (
              <figure key={w.title} className="flex flex-col gap-3">
                <div className="relative aspect-square overflow-hidden rounded-tile">
                  <Image src={w.src} alt={`${w.title} — ${t(`work.${w.kind}`)}`} fill placeholder="blur" sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
                </div>
                <figcaption className="flex justify-between text-[0.9375rem]">
                  <strong className="font-semibold">{w.title}</strong>
                  <span className="text-mist">{t(`work.${w.kind}`)}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
