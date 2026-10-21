import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import heroImage from '@/assets/portfolio/Shooting/shooting9.jpg'
import fashionWeek from '@/assets/portfolio/Shooting/shooting10.jpg'
import izem from '@/assets/portfolio/food/food5.jpg'
import broker from '@/assets/portfolio/landingPage/BrokerMockup.jpg'
import darYasmine from '@/assets/portfolio/logo/logo4.jpg'
import groom from '@/assets/portfolio/wedding/wedding3.jpg'
import astronaut from '@/assets/astro.png'
import mark from '@/assets/brand/pixel-mark.svg'
import studioDesk from '@/assets/services/infographie.png'
import { FeaturedReview, ReviewCard, reviews } from '@/components/sections/review-card'
import { StudioCard } from '@/components/sections/studio-card'
import { TimelineList } from '@/components/sections/timeline'
import { ProductCard } from '@/components/shop/product-card'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Faq } from '@/components/ui/faq'
import { HexBadge, HexDot, PixelDots } from '@/components/ui/hex'
import { Eyebrow, SectionHeader } from '@/components/ui/section-header'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getProducts } from '@/lib/api'
import { cn } from '@/lib/cn'
import { formatDecimal, formatNumber } from '@/lib/format'
import { staticPageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import { studioList, toneClasses, type Tone } from '@/lib/studios'
import { portfolioItems } from '@/data/portfolio'

export async function generateMetadata({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'home', '/')
}

const work = [
  { key: 'daryasmine', title: 'Dar Yasmine', image: darYasmine, tone: 'yellow', wide: true },
  { key: 'fashionweek', title: 'Fashion Week 2024', image: fashionWeek, tone: 'teal', wide: false },
  { key: 'izem', title: 'Izem Energy', image: izem, tone: 'teal', wide: false },
  { key: 'broker', title: 'Broker', image: broker, tone: 'lime', wide: false },
  { key: 'wedding', title: null, image: groom, tone: 'red', wide: false },
] as const satisfies ReadonlyArray<{ key: string; tone: Tone; title: string | null; wide: boolean; image: unknown }>

const steps = ['listen', 'concept', 'production', 'delivery'] as const
const faqKeys = ['price', 'photo', 'ads', 'ecommerce', 'outside'] as const
const featuredProductNames = ['Collector', 'Music Nostalgia', 'LES LOUPS GAROUS DE THIERCELIEUX', 'One Piece Wanted']

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)

  const [t, tStudios, tWork, tCommon, products] = await Promise.all([
    getTranslations('Home'),
    getTranslations('Studios'),
    getTranslations('Work'),
    getTranslations('Common'),
    getProducts(),
  ])

  const featured = featuredProductNames
    .map((name) => products.find((p) => p.name === name))
    .filter((p) => p !== undefined)
  const shopPicks = featured.length >= 4 ? featured : products.slice(0, 4)
  const projectCount = Math.floor(portfolioItems.length / 10) * 10

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <Container className="flex flex-wrap items-center gap-14 py-12 md:py-20 lg:py-26">
          <div className="flex min-w-0 flex-[1_1_35rem] flex-col gap-7">
            <p className="flex items-center gap-3 self-start rounded-full border border-line bg-ink-2 py-2 ps-3 pe-4 font-grotesk text-[0.8125rem] tracking-[0.14em] text-lavender uppercase">
              <PixelDots />
              {t('hero.eyebrow')}
            </p>
            <h1 className="text-balance text-display">
              {t('hero.title')} <span className="text-orange">{t('hero.titleAccent')}</span>
            </h1>
            <p className="max-w-xl text-lead text-lavender">{t('hero.lead')}</p>
            <div className="flex flex-wrap gap-3.5">
              <ButtonLink href="/contact">
                {t('hero.ctaPrimary')}
                <ArrowRight size={18} aria-hidden className="flip-rtl" />
              </ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary">
                {t('hero.ctaSecondary')}
              </ButtonLink>
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-7 gap-y-3 text-sm text-mist">
              {(['proof1', 'proof2', 'proof3'] as const).map((k) => (
                <li key={k} className="flex items-center gap-2">
                  <Check size={16} strokeWidth={2.2} className="text-lime" aria-hidden />
                  {t(`hero.${k}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-[clamp(27.5rem,46vw,38.75rem)] min-w-0 flex-[1_1_27.5rem]">
            <div className="absolute inset-e-0 top-0 h-[94%] w-[82%] bg-ink-2 clip-hex">
              <Image
                src={heroImage}
                alt={t('hero.imageAlt')}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-cover"
              />
            </div>
            <span aria-hidden className="absolute inset-e-[6%] top-[8%] aspect-[0.866] w-[18%] bg-teal/90 clip-hex" />
            <Image src={astronaut} alt="" sizes="260px" className="absolute -bottom-[4%] -inset-s-[2%] h-auto w-[44%]" />
            <div className="absolute inset-e-[2%] bottom-[10%] flex items-center gap-3 rounded-2xl border border-line bg-ink px-4.5 py-3.5">
              <HexDot tone="teal" />
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">{t('hero.tagTitle')}</span>
                <span className="text-[0.6875rem] text-mist font-mono uppercase tracking-[0.1em]">{tStudios('photo.name')}</span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Studio strip */}
      <section className="border-b border-line bg-ink-2">
        <Container className="flex flex-wrap justify-between gap-x-8 gap-y-3.5 py-5.5 text-[clamp(1rem,1.6vw,1.375rem)] font-semibold">
          {studioList.map((s) => (
            <Link key={s.key} href={s.href} className="flex items-center gap-3 hover:text-orange-light">
              <HexDot tone={s.tone} />
              {tStudios(`${s.key}.short`)}
            </Link>
          ))}
        </Container>
      </section>

      {/* Numbers */}
      <Container>
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(13.75rem,1fr))] border-s border-line">
          {[
            { value: String(site.foundingYear), label: t('stats.founded') },
            { value: String(studioList.length), label: t('stats.studios') },
            { value: `${formatNumber(projectCount, locale)}+`, label: t('stats.projects') },
            { value: formatDecimal(site.rating.value, locale), label: t('stats.rating'), suffix: '/5' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-2 border-e border-b border-line px-8 py-10">
              <dt className="text-[0.9375rem] text-mist">{stat.label}</dt>
              <dd className="text-[clamp(2.5rem,4.4vw,3.75rem)] leading-none font-semibold tracking-[-0.04em]">
                <bdi>{stat.value}</bdi>
                {stat.suffix ? <span className="text-[0.5em] text-mist">{stat.suffix}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* Studios */}
      <section className="section-y">
        <Container>
          <SectionHeader index="01" eyebrow={t('studios.eyebrow')} title={t('studios.title')} aside={t('studios.lead')} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))] gap-6">
            {studioList.map((s, i) => (
              <StudioCard key={s.key} studio={s} index={i + 1} />
            ))}
          </div>
        </Container>
      </section>

      {/* Selected work */}
      <section className="section-y border-t border-line">
        <Container>
          <SectionHeader
            index="02"
            eyebrow={t('work.eyebrow')}
            title={t('work.title')}
            aside={
              <Link href="/portfolio" className="flex min-h-11 items-center gap-2.5 font-mono text-[0.8125rem] font-bold tracking-[0.08em] text-orange uppercase">
                {tCommon('seeAllWork')}
                <ArrowRight size={16} aria-hidden className="flip-rtl" />
              </Link>
            }
          />
          <div className="flex flex-wrap gap-6">
            {work.map((item, i) => (
              <Link
                key={item.key}
                href="/portfolio"
                className={cn(
                  'group relative block overflow-hidden rounded-card bg-ink-2',
                  item.wide ? 'min-h-115 flex-[2_1_35rem]' : i === 1 ? 'min-h-115 flex-[1_1_18.75rem]' : 'min-h-95 flex-[1_1_18.75rem]',
                )}
              >
                <Image
                  src={item.image}
                  alt={tWork(`${item.key}Alt`)}
                  fill
                  placeholder="blur"
                  sizes={item.wide ? '(min-width: 1024px) 860px, 100vw' : '(min-width: 1024px) 420px, 100vw'}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-ink px-5 py-4">
                  <span className="text-lg font-semibold">{item.title ?? tWork(item.key)}</span>
                  <span className={cn('text-label', toneClasses[item.tone].text)}>{item.title ? tWork(item.key) : tStudios('wedding.short')}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="section-y border-y border-line bg-ink-2">
        <Container>
          <SectionHeader index="03" eyebrow={t('process.eyebrow')} title={t('process.title')} />
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-6">
            {steps.map((step, i) => (
              <li key={step} className="flex flex-col gap-4 rounded-card border border-line bg-ink p-8">
                <HexBadge className={i === 0 ? 'bg-orange text-ink' : undefined}>{String(i + 1).padStart(2, '0')}</HexBadge>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{t(`process.${step}.title`)}</h3>
                <p className="leading-relaxed text-mist">{t(`process.${step}.text`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Story */}
      <section className="section-y">
        <Container className="flex flex-wrap items-center gap-14">
          <div className="relative aspect-5/6 max-h-170 min-w-0 flex-[1_1_30rem] overflow-hidden rounded-[1.75rem] bg-ink-2">
            <Image src={studioDesk} alt={t('story.imageAlt')} fill placeholder="blur" sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
            <Image src={mark} alt="" unoptimized className="absolute inset-e-6 top-6 h-auto w-16" />
          </div>
          <div className="flex min-w-0 flex-[1_1_30rem] flex-col gap-6">
            <Eyebrow index="04">{t('story.eyebrow')}</Eyebrow>
            <h2 className="text-balance text-h2">{t('story.title')}</h2>
            <p className="text-lead text-lavender">{t('story.text')}</p>
            <TimelineList />
            <Link href="/a-propos" className="flex min-h-11 items-center gap-2.5 self-start font-mono text-[0.8125rem] font-bold tracking-[0.08em] text-orange uppercase">
              {t('story.cta')}
              <ArrowRight size={16} aria-hidden className="flip-rtl" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Shop teaser */}
      {shopPicks.length > 0 ? (
        <section className="section-y border-t border-line">
          <Container>
            <SectionHeader
              index="05"
              eyebrow={t('shop.eyebrow')}
              title={t('shop.title')}
              aside={
                <div className="flex flex-col items-start gap-5">
                  <p>{t('shop.lead')}</p>
                  <ButtonLink href="/boutique" variant="secondary" size="sm">
                    {t('shop.cta')}
                  </ButtonLink>
                </div>
              }
            />
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
              {shopPicks.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Testimonials */}
      <section className="section-y border-y border-line bg-ink-2">
        <Container>
          <SectionHeader
            index="06"
            eyebrow={t('testimonials.eyebrow')}
            title={t('testimonials.title')}
            aside={
              <Link href="/temoignages" className="flex min-h-11 items-center gap-2.5 font-mono text-[0.8125rem] font-bold tracking-[0.08em] text-orange uppercase">
                {t('testimonials.cta')}
                <ArrowRight size={16} aria-hidden className="flip-rtl" />
              </Link>
            }
          />
          <div className="flex flex-wrap gap-6">
            <div className="min-w-0 flex-[1.4_1_30rem]">
              <FeaturedReview reviewKey={reviews[0].key} initials={reviews[0].initials} />
            </div>
            <div className="flex min-w-0 flex-[1_1_22.5rem] flex-col gap-6">
              {reviews.slice(1).map((r) => (
                <ReviewCard key={r.key} reviewKey={r.key} initials={r.initials} tone={r.tone} className="flex-1" />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section-y">
        <Container className="flex flex-wrap gap-x-20 gap-y-12">
          <div className="flex min-w-0 flex-[1_1_20rem] flex-col gap-5">
            <Eyebrow index="07">{t('faq.eyebrow')}</Eyebrow>
            <h2 className="text-h2">{t('faq.title')}</h2>
            <p className="text-[1.0625rem] leading-relaxed text-mist">{t('faq.lead')}</p>
          </div>
          <Faq className="min-w-0 flex-[2_1_35rem]" items={faqKeys.map((k) => ({ q: t(`faq.${k}.q`), a: t(`faq.${k}.a`) }))} />
        </Container>
      </section>
    </>
  )
}
