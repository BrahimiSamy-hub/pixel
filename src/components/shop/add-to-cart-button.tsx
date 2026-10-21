'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { useRouter } from '@/i18n/navigation'
import { trackAddToCart } from '@/lib/analytics'
import { useCart, type CartItem } from '@/lib/cart-store'
import { cn } from '@/lib/cn'

type Payload = Omit<CartItem, 'key' | 'quantity'>

/** Adds the product with its default design and size; the product page lets people choose. */
export function AddToCartButton({ item, className }: { item: Payload; className?: string }) {
  const t = useTranslations('Shop')
  const add = useCart((s) => s.add)
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => {
        add(item)
        trackAddToCart({ id: item.productId, name: item.name, price: item.price, quantity: 1 })
        toast.success(t('added', { name: item.variant ? `${item.name} — ${item.variant}` : item.name }), {
          action: { label: t('viewCart'), onClick: () => router.push('/paiement') },
        })
      }}
      className={cn(
        'flex min-h-12 items-center justify-center gap-2.5 rounded-[14px] border border-line-strong bg-ink-2 font-mono text-xs font-bold tracking-[0.08em] text-white uppercase transition-colors hover:border-orange',
        className,
      )}
    >
      <Plus size={16} strokeWidth={2} aria-hidden />
      {t('addToCart')}
    </button>
  )
}
