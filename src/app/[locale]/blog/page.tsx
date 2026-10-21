import Image, { type StaticImageData } from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import comfort from '@/assets/portfolio/landingPage/ComfortSpaceMockup.jpg'
import redBox from '@/assets/portfolio/product/product1.jpg'
import groom from '@/assets/portfolio/wedding/wedding3.jpg'
import { BlogList } from '@/components/blog/blog-list'
import { PageHero } from '@/components/sections/page-hero'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { JsonLd } from '@/components/ui/json-ld'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { formatDate } from '@/lib/format'
import { localizedUrl, staticPageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export async function generateMetadata({ params }: PageProps<'/[locale]/blog'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'blog', '/blog')
}

type Post = { key: 'wedding' | 'ecommerce' | 'photo'; category: 'wedding' | 'web' | 'photo'; date: string; image: StaticImageData; tone: string }

const posts: Post[] = [
  { key: 'wedding', category: 'wedding', date: '2026-04-01', image: groom, tone: 'text-red' },
  { key: 'ecommerce', category: 'web', date: '2026-03-25', image: comfort, tone: 'text-lime' },
  { key: 'photo', category: 'photo', date: '2026-03-20', image: redBox, tone: 'text-teal' },
]

export default async function BlogPage({ params }: PageProps<'/[locale]/blog'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const [t, tNav] = await Promise.all([getTranslations('Blog'), getTranslations('Nav')])
  const [featured, ...rest] = posts

  const card = (p: Post, big = false) => (
    <article
      className={cn(
        'flex overflow-hidden rounded-[1.75rem] border border-line bg-ink-2',
        big ? 'flex-wrap' : 'h-full flex-col',
      )}
    >
      <div className={cn('relative overflow-hidden', big ? 'min-h-105 min-w-0 flex-[1.3_1_30rem]' : 'aspect-16/10')}>
        <Image src={p.image} alt="" fill placeholder="blur" sizes={big ? '(min-width: 1024px) 760px, 100vw' : '(min-width: 1024px) 420px, 100vw'} className="object-cover" />
      </div>
      <div className={cn('flex flex-col gap-4', big ? 'min-w-0 flex-[1_1_23.75rem] justify-center p-8 sm:p-14' : 'p-7')}>
        <p className="flex flex-wrap gap-x-4.5 gap-y-2 text-label">
          <span className={p.tone}>{t(`filters.${p.category}`)}</span>
          <time dateTime={p.date} className="text-mist">
            {formatDate(p.date, locale)}
          </time>
          {big ? <span className="text-orange">{t('featured')}</span> : null}
        </p>
        <h2 className={cn('font-semibold tracking-[-0.02em]', big ? 'text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.03em]' : 'text-2xl leading-tight')}>
          {t(`posts.${p.key}.title`)}
        </h2>
        <p className="leading-relaxed text-mist">{t(`posts.${p.key}.excerpt`)}</p>
      </div>
    </article>
  )

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: t('label'),
          url: localizedUrl(locale, '/blog'),
          publisher: { '@id': `${site.url}/#organization` },
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: t(`posts.${p.key}.title`),
            description: t(`posts.${p.key}.excerpt`),
            datePublished: p.date,
            inLanguage: locale,
          })),
        }}
      />
      <PageHero crumbs={[{ label: tNav('blog') }]} eyebrowIndex={t('eyebrow')} eyebrow={t('label')} title={t('title')} accent={t('titleAccent')} lead={t('lead')} />

      <Container className="flex flex-col gap-8 pb-6">
        {featured ? card(featured, true) : null}
        <BlogList
          label={t('filtersLabel')}
          allLabel={t('filters.all')}
          emptyLabel={t('empty')}
          filters={[
            { key: 'photo', label: t('filters.photo'), tone: 'bg-teal' },
            { key: 'wedding', label: t('filters.wedding'), tone: 'bg-red' },
            { key: 'web', label: t('filters.web'), tone: 'bg-lime' },
          ]}
          posts={rest.map((p) => ({ key: p.key, category: p.category, node: card(p) }))}
          trailing={
            <div className="flex flex-col justify-between gap-6 rounded-[1.75rem] bg-orange p-8 text-ink">
              <div className="flex flex-col gap-3.5">
                <span className="text-label font-bold">{t('instagram.eyebrow')}</span>
                <h2 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.02em]">{t('instagram.title')}</h2>
              </div>
              <ButtonLink href={site.socials.instagram.href} variant="ink" size="sm" className="self-start" dir="ltr">
                {site.socials.instagram.handle}
              </ButtonLink>
            </div>
          }
        />
      </Container>
    </>
  )
}
