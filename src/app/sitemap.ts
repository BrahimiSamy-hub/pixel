import type { MetadataRoute } from 'next'
import { portfolioCategories } from '@/data/portfolio'
import { routing } from '@/i18n/routing'
import { getCategories, getProducts } from '@/lib/api'
import { cities } from '@/lib/nav'
import { languageAlternates, localizedUrl } from '@/lib/seo'

export const revalidate = 86400

const staticPaths: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/photo-lab', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/design-graphique', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/mariage', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/developpement', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/sons', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/publicite', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/boutique', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/a-propos', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/blog', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/temoignages', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/loup-garou-regles', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/conditions-dutilisation', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/politique-de-confidentialite', priority: 0.2, changeFrequency: 'yearly' },
  ...cities.map((c) => ({ path: c.href, priority: 0.7, changeFrequency: 'monthly' as const })),
  ...portfolioCategories.map((c) => ({ path: `/portfolio/${c}`, priority: 0.6, changeFrequency: 'monthly' as const })),
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([getCategories(), getProducts()])
  const now = new Date()

  const paths = [
    ...staticPaths.map((p) => ({ ...p, lastModified: now })),
    ...categories.map((c) => ({ path: `/boutique/${c._id}`, priority: 0.6, changeFrequency: 'weekly' as const, lastModified: now })),
    ...products.map((p) => ({
      path: `/product/${p._id}`,
      priority: 0.6,
      changeFrequency: 'weekly' as const,
      lastModified: p.createdAt ? new Date(p.createdAt) : now,
    })),
  ]

  // One entry per locale, each listing its siblings so Google pairs the translations.
  return paths.flatMap(({ path, priority, changeFrequency, lastModified }) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  )
}
