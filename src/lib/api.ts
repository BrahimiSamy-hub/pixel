import 'server-only'
import { cache } from 'react'
import type { Locale } from '@/i18n/routing'
import { site } from './site'

export type ApiImage = { _id: string; url: string }

export type ShopCategory = {
  _id: string
  frName: string
  engName: string
  arName: string
  image?: ApiImage
}

export type ProductVariant = {
  _id: string
  name: string
  mainImage?: ApiImage
  cardImage?: ApiImage
}

export type ProductSize = { _id: string; name: string; price: number; isAvailable: boolean }

export type Product = {
  _id: string
  name: string
  material?: string
  price?: number
  stock?: boolean
  mainImage?: ApiImage
  sideImage?: ApiImage
  heroes: ProductVariant[]
  sizes: ProductSize[]
  category?: ShopCategory
  createdAt?: string
}

const REVALIDATE_SECONDS = 60 * 60

async function getJson<T>(path: string, tags: string[]): Promise<T | null> {
  try {
    const res = await fetch(`${site.api}${path}`, { next: { revalidate: REVALIDATE_SECONDS, tags } })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    // The shop API being down must not take the whole site down.
    return null
  }
}

export const getCategories = cache(async () => (await getJson<ShopCategory[]>('/categories', ['categories'])) ?? [])

export const getProducts = cache(async () => (await getJson<Product[]>('/posters', ['products'])) ?? [])

export const getProduct = cache(async (id: string) => {
  if (!/^[a-f0-9]{24}$/i.test(id)) return null
  return getJson<Product>(`/posters/${id}`, ['products', `product-${id}`])
})

export function apiImageUrl(image?: ApiImage) {
  return image?.url ? encodeURI(image.url) : null
}

/** Lowest price of a product, or null when nothing can be bought yet. */
export function productPriceFrom(product: Product) {
  const prices = product.sizes.filter((s) => s.isAvailable && s.price > 0).map((s) => s.price)
  if (prices.length) return Math.min(...prices)
  return product.price && product.price > 0 ? product.price : null
}

export function productCategoryId(product: Product) {
  return product.category?._id ?? null
}

// The API stores the same Arabic name for every category, so map known categories ourselves.
const categorySlugs: Record<string, 'posters' | 'games' | 'neons'> = {
  posters: 'posters',
  games: 'games',
  neons: 'neons',
}

export function categorySlug(category: ShopCategory) {
  return categorySlugs[category.engName.trim().toLowerCase()] ?? null
}

export function categoryFallbackName(category: ShopCategory, locale: Locale) {
  return locale === 'en' ? category.engName : category.frName
}
