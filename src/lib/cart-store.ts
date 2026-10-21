import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type CartItem = {
  /** productId + variant + size — the same product in another size is another line. */
  key: string
  productId: string
  name: string
  variant?: string
  size?: string
  price: number
  image?: string | null
  quantity: number
}

type CartState = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'key' | 'quantity'>, quantity?: number) => void
  setQuantity: (key: string, quantity: number) => void
  remove: (key: string) => void
  clear: () => void
}

const MAX_QUANTITY = 20

export function cartKey(productId: string, variant?: string, size?: string) {
  return [productId, variant ?? '', size ?? ''].join('|')
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item, quantity = 1) =>
        set((state) => {
          const key = cartKey(item.productId, item.variant, item.size)
          const existing = state.items.find((i) => i.key === key)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: Math.min(i.quantity + quantity, MAX_QUANTITY) } : i,
              ),
            }
          }
          return { items: [...state.items, { ...item, key, quantity: Math.min(quantity, MAX_QUANTITY) }] }
        }),
      setQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: Math.max(1, Math.min(quantity, MAX_QUANTITY)) } : i,
          ),
        })),
      remove: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'pixel-cart',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Rehydrated from <CartHydrator /> after mount so server and first client render match.
      skipHydration: true,
    },
  ),
)

export const selectCount = (s: CartState) => s.items.reduce((n, i) => n + i.quantity, 0)
export const selectSubtotal = (s: CartState) => s.items.reduce((n, i) => n + i.price * i.quantity, 0)
