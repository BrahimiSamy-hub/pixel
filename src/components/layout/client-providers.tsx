'use client'

import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { useCart } from '@/lib/cart-store'

/** Client-only bits of the shell: cart rehydration and the toast host. */
export function ClientProviders({ dir }: { dir: 'ltr' | 'rtl' }) {
  useEffect(() => {
    void useCart.persist.rehydrate()
  }, [])

  return (
    <Toaster
      dir={dir}
      theme="dark"
      position={dir === 'rtl' ? 'bottom-left' : 'bottom-right'}
      toastOptions={{
        classNames: {
          toast: 'rounded-2xl! border! border-line! bg-ink-2! text-white! font-sans!',
          actionButton: 'bg-orange! text-ink! font-semibold!',
        },
      }}
    />
  )
}
