import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ProductCard, productHref } from '@/components/shop/product-card'
import { ProductConfigurator, type ConfigurableProduct } from '@/components/shop/product-configurator'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Container } from '@/components/ui/container'
import { JsonLd } from '@/components/ui/json-ld'
import { routing, type Locale } from '@/i18n/routing'
import { apiImageUrl, categorySlug, getProduct, getProducts, productCategoryId } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
import { productJsonLd } from '@/lib/structured-data'

export const revalidate = 3600

export async function generateStaticParams() {
  const products = await getProducts()
  return routing.locales.flatMap((locale) => products.map((p) => ({ locale, id: p._id })))
}

export async function generateMetadata({ params }: PageProps<'/[locale]/product/[id]'>) {
  const { locale: raw, id } = await params
  const locale = raw as Locale
  const product = await getProduct(id)
  if (!product) return {}
  const t = await getTranslations({ locale, namespace: 'Metadata.product' })
  return pageMetadata({ locale, path: `/product/${id}`, title: t('title', { name: product.name }), description: t('description', { name: product.name }) })
}

export default async function ProductPage({ params }: PageProps<'/[locale]/product/[id]'>) {
  const { locale: raw, id } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const [product, products, tNav, tShop, tProduct, tMeta] = await Promise.all([
    getProduct(id),
    getProducts(),
    getTranslations('Nav'),
    getTranslations('Shop'),
    getTranslations('Product'),
    getTranslations('Metadata.product'),
  ])
  if (!product) notFound()

  const configurable: ConfigurableProduct = {
    id: product._id,
    name: product.name,
    material: product.material ?? null,
    fallbackImage: apiImageUrl(product.mainImage),
    variants: product.heroes.map((h) => ({ name: h.name, image: apiImageUrl(h.mainImage) })),
    sizes: product.sizes.filter((s) => s.isAvailable && s.price > 0).map((s) => ({ name: s.name, price: s.price })),
    basePrice: product.price ?? null,
  }
  const related = products.filter((p) => p._id !== product._id && productCategoryId(p) === productCategoryId(product)).slice(0, 4)
  const slug = product.category ? categorySlug(product.category) : null
  const path = productHref(product)

  return (
    <>
      <JsonLd
        data={productJsonLd({
          locale,
          path,
          name: product.name,
          image: configurable.fallbackImage,
          prices: configurable.sizes.map((s) => s.price).concat(configurable.basePrice ? [configurable.basePrice] : []),
          inStock: product.stock !== false,
          description: tMeta('description', { name: product.name }),
        })}
      />
      <section className="pt-8 pb-16 md:pb-26">
        <Container className="flex flex-col gap-8">
          <Breadcrumbs
            items={[
              { label: tNav('shop'), href: '/boutique' },
              ...(product.category && slug ? [{ label: tShop(`categories.${slug}`), href: `/boutique/${product.category._id}` }] : []),
              { label: product.name },
            ]}
          />
          <ProductConfigurator product={configurable} isNew={product.name === 'Collector' || product.name === 'Music Nostalgia'} />
        </Container>
      </section>

      {related.length ? (
        <section className="border-t border-line py-16 md:py-26">
          <Container>
            <h2 className="mb-8 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em]">{tProduct('related')}</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  )
}
