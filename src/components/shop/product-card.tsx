import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Price } from '@/components/ui/price'
import { Link } from '@/i18n/navigation'
import { apiImageUrl, productPriceFrom, type Product } from '@/lib/api'
import { cn } from '@/lib/cn'
import { AddToCartButton } from './add-to-cart-button'

export const WEREWOLF_PRODUCT_ID = '6745cd66eda1751bb9652b17'

export function productHref(product: Product) {
  return product._id === WEREWOLF_PRODUCT_ID ? '/loup-garou-regles' : `/product/${product._id}`
}

export type MaterialKey = 'canva' | 'frames' | 'pmaa' | 'sticker' | 'card'

/** Material names come from the API in French; map the known ones to message keys. */
export function materialKey(material?: string): MaterialKey | null {
  const m = material?.trim().toLowerCase()
  if (!m) return null
  if (m.startsWith('canva')) return 'canva'
  if (m.startsWith('frame')) return 'frames'
  if (m === 'pmaa') return 'pmaa'
  if (m.includes('autocollant')) return 'sticker'
  if (m === 'card') return 'card'
  return null
}

export function ProductCard({ product, showAdd = false, isNew = false, className }: { product: Product; showAdd?: boolean; isNew?: boolean; className?: string }) {
  const t = useTranslations('Shop')
  const tCommon = useTranslations('Common')
  const price = productPriceFrom(product)
  const image = apiImageUrl(product.mainImage)
  const href = productHref(product)
  const material = materialKey(product.material)
  const variants = product.heroes.length
  const firstSize = product.sizes.find((s) => s.isAvailable && s.price > 0)
  const defaultVariant = variants > 1 ? product.heroes[0] : undefined

  return (
    <article className={cn('flex flex-col gap-3.5', className)}>
      <Link href={href} className="group relative block aspect-square overflow-hidden rounded-[1.375rem] border border-line bg-ink-2">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 300px, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
        {isNew ? (
          <span className="absolute inset-s-3.5 top-3.5 rounded-lg bg-orange px-2.5 py-1.5 text-label font-bold text-ink">{tCommon('new')}</span>
        ) : null}
      </Link>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={href} className="block font-semibold text-white hover:text-orange-light">
            {product.name}
          </Link>
          <p className="mt-1 text-sm text-mist">
            {[material ? t(`materials.${material}`) : product.material, variants > 1 ? t('variants', { count: variants }) : null]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>
        <p className="shrink-0 text-[0.9375rem] font-semibold">
          {price ? (
            firstSize && product.sizes.filter((s) => s.isAvailable).length > 1 ? (
              <>
                {tCommon('from')} <Price value={price} />
              </>
            ) : (
              <Price value={price} />
            )
          ) : (
            <span className="text-mist">{t('unavailable')}</span>
          )}
        </p>
      </div>
      {showAdd && price ? (
        <AddToCartButton
          item={{
            productId: product._id,
            name: product.name,
            variant: defaultVariant?.name,
            size: firstSize?.name || undefined,
            price,
            image: apiImageUrl(defaultVariant?.mainImage) ?? image,
          }}
        />
      ) : null}
    </article>
  )
}
