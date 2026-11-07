import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import heroImage from '@/assets/portfolio/Shooting/shooting9.jpg'
import fashionWeek from '@/assets/portfolio/Shooting/shooting10.jpg'
import izem from '@/assets/portfolio/food/food5.jpg'
import broker from '@/assets/portfolio/landingPage/BrokerMockup.jpg'
import darYasmine from '@/assets/portfolio/logo/logo4.jpg'
import groom from '@/assets/portfolio/wedding/wedding3.jpg'
import mark from '@/assets/brand/pixel-mark.svg'
import studioDesk from '@/assets/services/infographie.png'
import { FeaturedReview, ReviewCard, reviews } from '@/components/sections/review-card'
import { TimelineList } from '@/components/sections/timeline'
import { ProductCard } from '@/components/shop/product-card'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Faq } from '@/components/ui/faq'
import { PixelDots } from '@/components/ui/hex'
import { Price } from '@/components/ui/price'
import { Eyebrow, SectionHeader } from '@/components/ui/section-header'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getProducts } from '@/lib/api'
import { cn } from '@/lib/cn'
import { formatDecimal, formatNumber } from '@/lib/format'
import { staticPageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import { studioList, type Tone } from '@/lib/studios'
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

  const label = 'font-mono text-[0.9375rem] font-semibold tracking-[0.24em] uppercase'
  const arrowLink = 'flex min-h-11 items-center gap-2.5 font-mono text-[1.0625rem] font-bold tracking-[0.16em] text-orange uppercase'
  const marquee = [...studioList, ...studioList]

  return (
    <>
      {/* Hero: oversized headline beside the photo masked by the P symbol. */}
      <section>
        <Container className="flex flex-col gap-10 pt-10 md:gap-14 md:pt-20">
          <div className={cn('flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-mist', label)}>
            <span className="flex items-center gap-3">
              <PixelDots className="h-4.5 w-4" />
              {t('hero.eyebrow')}
            </span>
          </div>
          <div className="flex flex-wrap items-end gap-x-14 gap-y-10">
            <h1 className="min-w-0 flex-[999_1_38rem] text-display">
              {t('hero.title')} <span className="text-brand-gradient">{t('hero.titleAccent')}</span>
            </h1>
            <div className="relative mx-auto w-full max-w-[29rem] min-w-0 flex-[1_1_22rem]">
              <Image src={mark} alt="" unoptimized className="absolute -inset-s-[9%] top-[5%] h-auto w-full opacity-95" />
              <div className="relative aspect-[0.886] w-full bg-ink-2 clip-mark">
                <Image
                  src={heroImage}
                  alt={t('hero.imageAlt')}
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1024px) 464px, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-e-0 bottom-[18%] flex flex-col gap-0.5 border border-line bg-ink px-4 py-3">
                <span className="text-sm font-semibold">{t('hero.tagTitle')}</span>
                <span className="font-mono text-[0.8125rem] font-semibold tracking-[0.2em] text-mist uppercase">{tStudios('photo.name')}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-7 border-t border-line pt-8 pb-12 md:pb-20">
            <div className="flex max-w-xl flex-col gap-4">
              <p className="text-lead text-lavender">{t('hero.lead')}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
                {(['proof1', 'proof2', 'proof3'] as const).map((k) => (
                  <li key={k} className="flex items-center gap-2">
                    <span aria-hidden className="h-2.5 w-[0.55rem] bg-orange clip-mark" />
                    {t(`hero.${k}`)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">{t('hero.ctaPrimary')}</ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary">
                {t('hero.ctaSecondary')}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Studios marquee on a flame aplat. Duplicated list = seamless loop. */}
      <section aria-label={t('studios.eyebrow')} className="overflow-hidden bg-orange text-ink">
        <div className="flex w-max animate-marquee py-5 motion-reduce:animate-none rtl:[animation-direction:reverse]">
          {marquee.map((s, i) => (
            <Link
              key={`${s.key}-${i}`}
              href={s.href}
              tabIndex={i >= studioList.length ? -1 : undefined}
              aria-hidden={i >= studioList.length ? true : undefined}
              className="flex items-center gap-7 pe-7 text-[clamp(1.75rem,3.4vw,3rem)] font-extrabold tracking-[-0.03em] whitespace-nowrap uppercase [font-stretch:112%] hover:text-charcoal"
            >
              {tStudios(`${s.key}.short`)}
              <span aria-hidden className="h-7 w-6.5 bg-ink clip-mark" />
            </Link>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <Container>
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] border-b border-line">
          {[
            { value: String(site.foundingYear), label: t('stats.founded') },
            { value: String(studioList.length).padStart(2, '0'), label: t('stats.studios') },
            { value: formatNumber(projectCount, locale), label: t('stats.projects'), plus: true },
            { value: formatDecimal(site.rating.value, locale), label: t('stats.rating'), suffix: '/5' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-2.5 py-12 pe-8">
              <dt className="text-[0.9375rem] text-mist">{stat.label}</dt>
              <dd className="text-[clamp(3.25rem,5.4vw,5rem)] leading-[0.9] font-extrabold tracking-[-0.05em] [font-stretch:112%]">
                <bdi>{stat.value}</bdi>
                {stat.plus ? <span className="text-orange">+</span> : null}
                {stat.suffix ? <span className="text-[0.45em] tracking-normal text-mist">{stat.suffix}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* Studios: a numbered editorial index instead of cards. */}
      <section className="section-y">
        <Container>
          <SectionHeader index="01" eyebrow={t('studios.eyebrow')} title={t('studios.title')} aside={t('studios.lead')} />
          <ol className="border-b border-line">
            {studioList.map((s, i) => (
              <li key={s.key} className="border-t border-line">
                <Link href={s.href} className="group flex flex-wrap items-center gap-x-10 gap-y-5 py-7 text-white">
                  <span className="flex-[0_0_3rem] font-mono text-lg font-bold tracking-widest text-orange">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex flex-[1_1_17rem] flex-col gap-1.5">
                    <span className="text-[clamp(1.75rem,2.8vw,2.5rem)] leading-none font-bold tracking-[-0.03em] [font-stretch:112%] group-hover:text-orange">
                      {tStudios(`${s.key}.short`)}
                    </span>
                    <span className="font-mono text-sm font-semibold tracking-[0.24em] text-mist uppercase">{tStudios(`${s.key}.category`)}</span>
                  </span>
                  <span className="flex-[2_1_18rem] leading-relaxed text-mist">{tStudios(`${s.key}.tagline`)}</span>
                  <span className="flex-[0_0_9.5rem] text-[0.9375rem] text-lavender">
                    {s.priceFrom ? (
                      <>
                        {tCommon('from')} <Price value={s.priceFrom} className="font-semibold text-white" />
                      </>
                    ) : (
                      <strong className="font-semibold text-white">{tCommon('onQuote')}</strong>
                    )}
                  </span>
                  <span className="relative hidden aspect-4/3 flex-[0_0_9.5rem] overflow-hidden bg-ink-2 [clip-path:polygon(0_0,84%_0,100%_50%,84%_100%,0_100%)] sm:block rtl:[clip-path:polygon(16%_0,100%_0,100%_100%,16%_100%,0_50%)]">
                    <Image src={s.image} alt="" fill placeholder="blur" sizes="152px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Selected work: full images, captions underneath, staggered rhythm. */}
      <section className="section-y border-y border-line bg-ink-2">
        <Container>
          <SectionHeader
            index="02"
            eyebrow={t('work.eyebrow')}
            title={t('work.title')}
            aside={
              <Link href="/portfolio" className={arrowLink}>
                {tCommon('seeAllWork')}
                <ArrowRight size={18} aria-hidden className="flip-rtl" />
              </Link>
            }
          />
          <div className="flex flex-wrap gap-x-6 gap-y-12">
            {work.map((item, i) => (
              <Link
                key={item.key}
                href="/portfolio"
                className={cn(
                  'group flex min-w-0 flex-col gap-4 text-white',
                  item.wide ? 'flex-[2_1_35rem]' : 'flex-[1_1_18.75rem]',
                  i === 3 && 'md:pt-24',
                )}
              >
                <span
                  className={cn(
                    'relative block overflow-hidden rounded-card bg-ink-3',
                    item.wide ? 'aspect-16/10' : i === 1 ? 'aspect-16/10 md:aspect-auto md:flex-1' : 'aspect-4/5',
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
                </span>
                <span className="flex items-baseline justify-between gap-4">
                  <span className="text-2xl font-bold tracking-[-0.02em] [font-stretch:112%]">{item.title ?? tWork(item.key)}</span>
                  <span className={cn('text-mist', label, 'text-sm')}>{item.title ? tWork(item.key) : tStudios('wedding.short')}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Process: big numerals, the first filled, the rest outlined. */}
      <section className="section-y">
        <Container>
          <SectionHeader index="03" eyebrow={t('process.eyebrow')} title={t('process.title')} />
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(15.5rem,100%),1fr))] gap-x-8 gap-y-10">
            {steps.map((step, i) => (
              <li key={step} className={cn('flex flex-col gap-4 border-t-2 pt-6', i === 0 ? 'border-orange' : 'border-line')}>
                <span className={cn('text-[6rem] leading-[0.85] font-extrabold tracking-[-0.05em] [font-stretch:125%]', i === 0 ? 'text-orange' : 'text-outline')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-[1.625rem] font-bold tracking-[-0.02em] [font-stretch:112%]">{t(`process.${step}.title`)}</h3>
                <p className="leading-relaxed text-mist">{t(`process.${step}.text`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Story */}
      <section className="section-y border-t border-line">
        <Container className="flex flex-wrap items-center gap-14">
          <div className="relative aspect-5/6 max-h-170 min-w-0 flex-[1_1_30rem] overflow-hidden rounded-card bg-ink-2">
            <Image src={studioDesk} alt={t('story.imageAlt')} fill placeholder="blur" sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
            <Image src={mark} alt="" unoptimized className="absolute inset-e-6 top-6 h-auto w-14" />
          </div>
          <div className="flex min-w-0 flex-[1_1_30rem] flex-col gap-6">
            <Eyebrow index="04">{t('story.eyebrow')}</Eyebrow>
            <h2 className="text-h2">{t('story.title')}</h2>
            <p className="text-lead text-lavender">{t('story.text')}</p>
            <TimelineList />
            <Link href="/a-propos" className={cn(arrowLink, 'self-start')}>
              {t('story.cta')}
              <ArrowRight size={18} aria-hidden className="flip-rtl" />
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

      {/* Testimonials on paper: the light version of the logo. */}
      <section className="section-y bg-paper text-ink">
        <Container>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div className="max-w-3xl">
              <div className={cn('flex items-center gap-3 text-stone', label)}>
                <span className="text-[#b84a12]">06</span>
                <span aria-hidden className="h-px w-8 bg-[#b9b6b2]" />
                <span>{t('testimonials.eyebrow')}</span>
              </div>
              <h2 className="mt-5 text-h2">{t('testimonials.title')}</h2>
            </div>
            <Link
              href="/temoignages"
              className="flex min-h-11 items-center border-b-2 border-orange font-mono text-[1.0625rem] font-bold tracking-[0.16em] uppercase"
            >
              {t('testimonials.cta')}
            </Link>
          </div>
          <div className="flex flex-wrap gap-12">
            <div className="min-w-0 flex-[1.5_1_32rem]">
              <FeaturedReview reviewKey={reviews[0].key} initials={reviews[0].initials} />
            </div>
            <div className="flex min-w-0 flex-[1_1_21rem] flex-col gap-10">
              {reviews.slice(1).map((r, i) => (
                <ReviewCard
                  key={r.key}
                  reviewKey={r.key}
                  initials={r.initials}
                  tone={r.tone}
                  onPaper
                  className={cn(i > 0 && 'border-t border-[#cfccc8] pt-10')}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section-y">
        <Container className="flex flex-wrap gap-x-20 gap-y-12">
          <div className="flex min-w-0 flex-[1_1_24rem] flex-col gap-5">
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
