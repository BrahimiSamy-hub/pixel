'use client'

import { ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { selectCount, useCart } from '@/lib/cart-store'

export function CartButton() {
  const t = useTranslations('Nav')
  const count = useCart(selectCount)

  return (
    <Link
      href="/paiement"
      aria-label={t('cart', { count })}
      className="relative flex size-12 items-center justify-center rounded-[14px] border border-line bg-ink-2 text-white transition-colors hover:border-line-strong"
    >
      <ShoppingCart size={20} strokeWidth={1.8} aria-hidden />
      {count > 0 ? (
        <span
          aria-hidden
          className="absolute -inset-e-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-1 font-mono text-[0.6875rem] font-bold text-ink"
        >
          {count}
        </span>
      ) : null}
    </Link>
  )
}
