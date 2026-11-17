import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import quincaillerie from '@/assets/portfolio/sam/banner/banner8.webp'
import aladdinar from '@/assets/portfolio/sam/web/web1.webp'
import studioShoot from '@/assets/portfolio/Shooting/shooting12.jpg'
import weddingFlares from '@/assets/portfolio/wedding/wedding.jpg'
import mic from '@/assets/services/audio.png'
import elRiadh from '@/assets/signs/elriadh.jpg'
import mark from '@/assets/brand/pixel-mark.svg'
import studioDesk from '@/assets/services/infographie.png'
import { HomeHeroV1, HomeHeroV2 } from '@/components/sections/home-hero'
import { FeaturedReview, ReviewCard } from '@/components/sections/review-card'
import { homeReviews } from '@/data/reviews'
import { TimelineList } from '@/components/sections/timeline'
import { ProductCard } from '@/components/shop/product-card'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Faq } from '@/components/ui/faq'
import { Price } from '@/components/ui/price'
import { Eyebrow, SectionHeader } from '@/components/ui/section-header'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getProducts } from '@/lib/api'
import { cn } from '@/lib/cn'
import { formatDecimal, formatNumber } from '@/lib/format'
import { staticPageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import { ServiceLogo } from '@/components/sections/service-logo'
import { serviceThemeClass, studioList, studios, toneClasses, type StudioKey } from '@/lib/studios'
import { portfolioItems, type PortfolioSub } from '@/data/portfolio'

export async function generateMetadata({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'home', '/')
}

/**
 * Selected work: one piece per service (Tapini aside for now), in a 4-column bento. Each row is
 * one wide (2 columns, 16:10) and two tall (4:5) tiles, which come out the same height.
 * `title` is the client's name; without one, the portfolio sub-category names the piece
 * (`titleSub: null`: the studio's own category).
 */
const work = [
  { studio: 'design', title: 'Quincaillerie Générale', image: quincaillerie, wide: true },
  { studio: 'photo', titleSub: 'studio', image: studioShoot, wide: false },
  { studio: 'dev', title: 'Aladdinar', image: aladdinar, wide: false },
  { studio: 'sound', titleSub: null, image: mic, wide: false },
  { studio: 'ads', title: 'El Riadh Bijouterie', image: elRiadh, wide: false },
  { studio: 'wedding', titleSub: 'wedding', image: weddingFlares, wide: true },
] as const satisfies ReadonlyArray<{ studio: StudioKey; title?: string; titleSub?: PortfolioSub | null; wide: boolean; image: unknown }>

/** Which home hero to show: both stay available (components/sections/home-hero.tsx). */
const HERO: 'v1' | 'v2' = 'v2'

const steps = ['listen', 'concept', 'production', 'delivery'] as const
const faqKeys = ['price', 'photo', 'ads', 'ecommerce', 'outside'] as const
const featuredProductNames = ['Collector', 'Music Nostalgia', 'LES LOUPS GAROUS DE THIERCELIEUX', 'One Piece Wanted']

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)

  const [t, tStudios, tPortfolio, tCommon, products] = await Promise.all([
    getTranslations('Home'),
    getTranslations('Studios'),
    getTranslations('Portfolio'),
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
      {/* Hero: V2 (Claude Design, centred). Set HERO to "v1" for the photo-and-P version. */}
      {HERO === 'v2' ? <HomeHeroV2 /> : <HomeHeroV1 />}

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
                <Link href={s.href} className={cn('group flex flex-wrap items-center gap-x-10 gap-y-5 py-7 text-white', serviceThemeClass[s.tone])}>
                  <span className={cn('flex-[0_0_3rem] font-mono text-lg font-bold tracking-widest', toneClasses[s.tone].text)}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex flex-[1_1_17rem] flex-col gap-2.5">
                    <ServiceLogo service={s.tone} className="h-11 w-auto self-start transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
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
                  {/* Inside the row, `orange` is the service colour (serviceThemeClass). */}
                  <span className="flex flex-[0_0_auto] items-center gap-3.5 font-mono text-sm font-bold tracking-[0.16em] text-orange uppercase">
                    {tCommon('seeDetails')}
                    <span className="brand-circle flex size-12 items-center justify-center rounded-full border border-orange transition-colors group-hover:bg-orange group-hover:text-ink">
                      <ArrowRight size={18} aria-hidden className="flip-rtl transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </span>
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
          <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {work.map((item) => {
              const studio = studios[item.studio]
              const title = 'title' in item ? item.title : item.titleSub ? tPortfolio(`subs.${item.titleSub}`) : tStudios(`${item.studio}.category`)
              const service = tStudios(`${item.studio}.short`)
              return (
                <Link key={item.studio} href={studio.href} className={cn('group flex min-w-0 flex-col gap-4 text-white', item.wide && 'md:col-span-2')}>
                  <span className={cn('relative block overflow-hidden rounded-card bg-ink-3', item.wide ? 'aspect-16/10' : 'aspect-4/5')}>
                    <Image
                      src={item.image}
                      alt={`${title} — ${service}`}
                      fill
                      placeholder="blur"
                      sizes={item.wide ? '(min-width: 1024px) 640px, (min-width: 768px) 100vw, 100vw' : '(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw'}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="text-xl font-bold tracking-[-0.02em] [font-stretch:112%]">{title}</span>
                    <span className={cn(label, 'shrink-0 text-xs', toneClasses[studio.tone].text)}>{service}</span>
                  </span>
                </Link>
              )
            })}
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
              <FeaturedReview review={homeReviews[0]!} />
            </div>
            <div className="flex min-w-0 flex-[1_1_21rem] flex-col gap-10">
              {homeReviews.slice(1).map((r, i) => (
                <ReviewCard
                  key={r.key}
                  review={r}
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
