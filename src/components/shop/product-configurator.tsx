'use client'

import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'
import { WhatsAppIcon } from '@/components/ui/brand-icons'
import { Button } from '@/components/ui/button'
import { usePriceFormatter } from '@/components/ui/price'
import { Link, useRouter } from '@/i18n/navigation'
import { trackAddToCart } from '@/lib/analytics'
import { useCart } from '@/lib/cart-store'
import { cn } from '@/lib/cn'
import { site } from '@/lib/site'

export type ConfigurableProduct = {
  id: string
  name: string
  material: string | null
  fallbackImage: string | null
  variants: { name: string; image: string | null }[]
  sizes: { name: string; price: number }[]
  basePrice: number | null
}

export function ProductConfigurator({ product, isNew }: { product: ConfigurableProduct; isNew: boolean }) {
  const t = useTranslations('Product')
  const tShop = useTranslations('Shop')
  const tCommon = useTranslations('Common')
  const price = usePriceFormatter()
  const router = useRouter()
  const add = useCart((s) => s.add)
  const [variantIndex, setVariantIndex] = useState(0)
  const [sizeIndex, setSizeIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const variant = product.variants.length > 1 ? product.variants[variantIndex] : undefined
  const size = product.sizes[sizeIndex]
  const unit = size?.price ?? product.basePrice
  const image = variant?.image ?? product.variants[0]?.image ?? product.fallbackImage

  const addToCart = () => {
    if (!unit) return
    add({ productId: product.id, name: product.name, variant: variant?.name, size: size?.name || undefined, price: unit, image }, quantity)
    trackAddToCart({ id: product.id, name: product.name, price: unit, quantity })
    toast.success(tShop('added', { name: variant ? `${product.name} — ${variant.name}` : product.name }), {
      action: { label: tShop('viewCart'), onClick: () => router.push('/paiement') },
    })
  }

  return (
    <div className="flex flex-wrap items-start gap-12">
      <div className="flex min-w-0 flex-[1.1_1_30rem] flex-col gap-4">
        <div className="relative aspect-square overflow-hidden rounded-block border border-line bg-ink-2">
          {image ? <Image key={image} src={image} alt={variant ? `${product.name} — ${variant.name}` : product.name} fill preload sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" /> : null}
          {isNew ? <span className="absolute inset-s-5 top-5 rounded-[0.625rem] bg-orange px-3 py-1.5 text-label font-bold text-ink">{tCommon('new')}</span> : null}
        </div>
        {product.variants.length > 1 ? (
          <ul aria-label={t('gallery')} className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
            {product.variants.map((v, i) =>
              v.image ? (
                <li key={v.name} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setVariantIndex(i)}
                    aria-label={v.name}
                    aria-pressed={i === variantIndex}
                    className={cn('relative block size-20 overflow-hidden rounded-2xl border-2', i === variantIndex ? 'border-orange' : 'border-line')}
                  >
                    <Image src={v.image} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                </li>
              ) : null,
            )}
          </ul>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-[1_1_26rem] flex-col gap-6.5">
        <div className="flex flex-col gap-3">
          <p className="flex flex-wrap items-center gap-2.5 text-label text-mist">
            <span>{t('poster')}</span>
            {product.material ? (
              <>
                <span aria-hidden>·</span>
                <span>{product.material}</span>
              </>
            ) : null}
            <span aria-hidden>·</span>
            <span className="text-lime">{tCommon('inStock')}</span>
          </p>
          <h1 className="text-[clamp(2.5rem,4.6vw,4rem)] leading-none font-semibold tracking-[-0.04em] rtl:leading-[1.25]">
            {product.name}
            {variant ? <span className="text-mist"> — {variant.name}</span> : null}
          </h1>
          {unit ? <p className="text-[2.5rem] font-semibold tracking-[-0.03em]">{price(unit)}</p> : null}
        </div>

        {product.variants.length > 1 ? (
          <fieldset>
            <legend className="mb-3 flex gap-2 text-[0.9375rem] font-semibold">
              {t('variant')} <span className="font-normal text-mist">· {t('variantsAvailable', { count: product.variants.length })}</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v, i) => (
                <button
                  key={v.name}
                  type="button"
                  aria-pressed={i === variantIndex}
                  onClick={() => setVariantIndex(i)}
                  className={cn(
                    'min-h-10 rounded-xl border px-3.5 text-sm transition-colors',
                    i === variantIndex ? 'border-white bg-white font-semibold text-ink' : 'border-line-strong bg-ink-2 text-lavender hover:border-mist',
                  )}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        {product.sizes.length > 1 ? (
          <fieldset>
            <legend className="mb-3 text-[0.9375rem] font-semibold">{t('size')}</legend>
            <div className="grid grid-cols-2 gap-3">
              {product.sizes.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  aria-pressed={i === sizeIndex}
                  onClick={() => setSizeIndex(i)}
                  className={cn(
                    'flex flex-col items-start gap-1 rounded-2xl border-2 px-4.5 py-4 text-start',
                    i === sizeIndex ? 'border-orange bg-orange-tint text-white' : 'border-line bg-ink-2 text-lavender hover:border-line-strong',
                  )}
                >
                  <span className="text-lg font-semibold">{t('sizeValue', { size: s.name })}</span>
                  <span className="text-sm">{price(s.price)}</span>
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        <div className="flex flex-wrap items-stretch gap-3">
          <div className="flex items-center rounded-2xl border border-line-strong bg-ink-2">
            <button type="button" aria-label={t('decrease')} onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="flex h-14.5 w-13 items-center justify-center">
              <Minus size={18} aria-hidden />
            </button>
            <output aria-label={t('quantity')} className="min-w-8 text-center text-[1.0625rem] font-semibold">
              {quantity}
            </output>
            <button type="button" aria-label={t('increase')} onClick={() => setQuantity((q) => Math.min(20, q + 1))} className="flex h-14.5 w-13 items-center justify-center">
              <Plus size={18} aria-hidden />
            </button>
          </div>
          <Button onClick={addToCart} disabled={!unit} className="flex-[1_1_15rem]">
            {unit ? t('addToCart', { total: price(unit * quantity) }) : tShop('unavailable')}
          </Button>
        </div>

        <ul className="flex flex-col border-t border-line text-[0.9375rem] text-lavender">
          <li className="border-b border-line py-4">{t('perks.delivery')}</li>
          <li className="border-b border-line py-4">{t('perks.cod')}</li>
          <li className="flex items-center gap-2 border-b border-line py-4">
            <WhatsAppIcon size={18} className="text-whatsapp" />
            {t('perks.question')}{' '}
            <a href={site.whatsapp.href} className="text-white underline underline-offset-4" dir="ltr">
              {site.whatsapp.display}
            </a>
          </li>
        </ul>
        <Link href="/paiement" className="self-start text-sm text-mist underline underline-offset-4 hover:text-white">
          {t('viewCart')}
        </Link>
      </div>
    </div>
  )
}
