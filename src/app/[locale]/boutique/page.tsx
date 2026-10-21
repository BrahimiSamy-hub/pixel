import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHero } from '@/components/sections/page-hero'
import { ProductCard } from '@/components/shop/product-card'
import { ShopPerks } from '@/components/shop/shop-perks'
import { ShopTabs } from '@/components/shop/shop-tabs'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { apiImageUrl, categoryFallbackName, categorySlug, getCategories, getProducts, productCategoryId } from '@/lib/api'
import { staticPageMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata({ params }: PageProps<'/[locale]/boutique'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'shop', '/boutique')
}

const NEW_PRODUCTS = new Set(['Collector', 'Music Nostalgia'])

export default async function ShopPage({ params }: PageProps<'/[locale]/boutique'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const [t, tNav, categories, products] = await Promise.all([getTranslations('Shop'), getTranslations('Nav'), getCategories(), getProducts()])

  const slugById = new Map(categories.map((c) => [c._id, categorySlug(c)]))
  const countBySlug = (slug: string) => products.filter((p) => slugById.get(productCategoryId(p) ?? '') === slug).length

  return (
    <>
      <PageHero crumbs={[{ label: tNav('shop') }]} title={t('title')} accent={t('titleAccent')} lead={t('lead')} />

      <Container className="flex flex-col gap-10">
        {categories.length ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(17.5rem,100%),1fr))] gap-5">
            {categories.map((c) => {
              const slug = categorySlug(c)
              const image = apiImageUrl(c.image)
              const href = slug === 'neons' ? '/publicite' : slug === 'games' ? '/loup-garou-regles' : `/boutique/${c._id}`
              return (
                <Link key={c._id} href={href} className="group relative block aspect-4/3 overflow-hidden rounded-[1.75rem] bg-ink-2">
                  {image ? (
                    <Image src={image} alt="" fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  ) : null}
                  <span className="absolute inset-s-4 bottom-4 flex items-center gap-2.5 rounded-[0.875rem] bg-ink px-4 py-3 font-semibold">
                    {slug ? t(`categories.${slug}`) : categoryFallbackName(c, locale)}
                    {slug ? (
                      <span className="font-mono text-xs font-normal text-mist">
                        {slug === 'posters' ? t('categoryNotes.posters', { count: countBySlug('posters') }) : t(`categoryNotes.${slug}`)}
                      </span>
                    ) : null}
                  </span>
                </Link>
              )
            })}
          </div>
        ) : null}

        <ShopPerks />
      </Container>

      <section className="pt-16 pb-6 md:pt-26">
        <Container>
          {products.length ? (
            <ShopTabs
              items={products.map((p) => {
                const slug = slugById.get(productCategoryId(p) ?? '') ?? null
                return { id: p._id, category: slug, node: <ProductCard product={p} showAdd isNew={NEW_PRODUCTS.has(p.name)} /> }
              })}
              emptyNeons={
                <div className="flex flex-wrap items-center justify-between gap-6 rounded-[1.75rem] border border-dashed border-line-strong bg-ink-2 p-10 sm:p-16">
                  <div className="flex max-w-xl flex-col gap-3">
                    <h3 className="text-h3">{t('neons.title')}</h3>
                    <p className="leading-relaxed text-mist">{t('neons.text')}</p>
                  </div>
                  <ButtonLink href="/publicite">{t('neons.cta')}</ButtonLink>
                </div>
              }
            />
          ) : (
            <p role="status" className="rounded-[1.75rem] border border-dashed border-line-strong p-12 text-center text-mist">
              {t('loadError')}
            </p>
          )}
        </Container>
      </section>
    </>
  )
}
