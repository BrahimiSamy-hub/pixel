import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHero } from '@/components/sections/page-hero'
import { CategoryFilters, type FilterableItem } from '@/components/shop/category-filters'
import { materialKey, ProductCard } from '@/components/shop/product-card'
import { Container } from '@/components/ui/container'
import { routing, type Locale } from '@/i18n/routing'
import { apiImageUrl, categoryFallbackName, categorySlug, getCategories, getProducts, productCategoryId, productPriceFrom } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateStaticParams() {
  const categories = await getCategories()
  return routing.locales.flatMap((locale) => categories.map((c) => ({ locale, categoryId: c._id })))
}

async function load(categoryId: string, locale: Locale) {
  const [categories, t] = await Promise.all([getCategories(), getTranslations({ locale, namespace: 'Shop' })])
  const category = categories.find((c) => c._id === categoryId)
  if (!category) return null
  const slug = categorySlug(category)
  return { category, slug, name: slug ? t(`categories.${slug}`) : categoryFallbackName(category, locale) }
}

export async function generateMetadata({ params }: PageProps<'/[locale]/boutique/[categoryId]'>) {
  const { locale: raw, categoryId } = await params
  const locale = raw as Locale
  const data = await load(categoryId, locale)
  if (!data) return {}
  const t = await getTranslations({ locale, namespace: 'Metadata.shopCategory' })
  return pageMetadata({ locale, path: `/boutique/${categoryId}`, title: t('title', { category: data.name }), description: t('description', { category: data.name }) })
}

export default async function CategoryPage({ params }: PageProps<'/[locale]/boutique/[categoryId]'>) {
  const { locale: raw, categoryId } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const data = await load(categoryId, locale)
  if (!data) notFound()

  const [t, tNav, products] = await Promise.all([getTranslations('Shop'), getTranslations('Nav'), getProducts()])
  const inCategory = products.filter((p) => productCategoryId(p) === categoryId)
  const image = apiImageUrl(data.category.image)

  const items: FilterableItem[] = inCategory.map((p) => ({
    id: p._id,
    material: materialKey(p.material),
    sizes: p.sizes.filter((s) => s.isAvailable && s.name).map((s) => s.name),
    price: productPriceFrom(p),
    createdAt: p.createdAt ?? '',
    node: <ProductCard product={p} />,
  }))
  const materials = [...new Set(items.map((i) => i.material).filter((m): m is NonNullable<typeof m> => m !== null))].map((key) => ({
    key,
    label: t(`materials.${key}`),
  }))
  const sizes = [...new Set(items.flatMap((i) => i.sizes))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  return (
    <>
      <PageHero
        crumbs={[{ label: tNav('shop'), href: '/boutique' }, { label: data.name }]}
        title={data.name}
        lead={data.slug ? t(`categoryLead.${data.slug}`) : undefined}
        className="border-b border-line pb-12"
      >
        {image ? (
          <div className="relative hidden aspect-[0.866] w-40 self-end overflow-hidden clip-hex md:block">
            <Image src={image} alt="" fill sizes="160px" className="object-cover" />
          </div>
        ) : null}
      </PageHero>
      <section className="pt-10 pb-6">
        <Container>
          <CategoryFilters items={items} materials={materials} sizes={sizes} />
        </Container>
      </section>
    </>
  )
}
