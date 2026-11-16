'use client'

import { ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import { openCart, selectCount, useCart } from '@/lib/cart-store'

/** Opens the cart sidebar (there is no cart page). */
export function CartButton() {
  const t = useTranslations('Nav')
  const count = useCart(selectCount)

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={t('cart', { count })}
      aria-haspopup="dialog"
      className="relative flex size-12 items-center justify-center rounded-card border border-line bg-ink-2 text-white transition-colors hover:border-line-strong"
    >
      <ShoppingCart size={20} strokeWidth={1.8} aria-hidden />
      {count > 0 ? (
        <span
          aria-hidden
          className="absolute -inset-e-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center bg-orange px-1 font-mono text-[0.8125rem] font-bold text-ink"
        >
          {count}
        </span>
      ) : null}
    </button>
  )
}

/** A text link that opens the cart sidebar (footer, product page). */
export function OpenCartLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button type="button" onClick={openCart} aria-haspopup="dialog" className={className}>
      {children}
    </button>
  )
}
