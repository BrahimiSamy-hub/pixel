export const mainNav = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'shop', href: '/boutique' },
  { key: 'about', href: '/a-propos' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const

export type NavKey = (typeof mainNav)[number]['key']

/** Paths that also light up a nav item (e.g. studio pages belong to "Services"). */
const sections: Record<string, NavKey> = {
  '/services': 'services',
  '/photo-lab': 'services',
  '/design-graphique': 'services',
  '/mariage': 'services',
  '/developpement': 'services',
  '/sons': 'services',
  '/publicite': 'services',
  '/portfolio': 'portfolio',
  '/boutique': 'shop',
  '/product': 'shop',
  '/paiement': 'shop',
  '/loup-garou-regles': 'shop',
  '/a-propos': 'about',
  '/blog': 'blog',
  '/contact': 'contact',
}

export function activeNavKey(pathname: string): NavKey | null {
  if (pathname === '/') return 'home'
  const first = `/${pathname.split('/')[1] ?? ''}`
  return sections[first] ?? null
}

export const cities = [
  { key: 'alger', href: '/agence-alger' },
  { key: 'oran', href: '/agence-oran' },
  { key: 'constantine', href: '/agence-constantine' },
  { key: 'annaba', href: '/agence-annaba' },
  { key: 'setif', href: '/agence-setif' },
] as const

export type CityKey = (typeof cities)[number]['key']
