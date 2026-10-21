import { getTranslations } from 'next-intl/server'
import { PageHero } from '@/components/sections/page-hero'
import { Container } from '@/components/ui/container'
import { portfolioCategories, portfolioItems, type PortfolioCategory } from '@/data/portfolio'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { PortfolioGrid } from './portfolio-grid'

/** Round-robin across categories so the "all" view opens on variety, not 24 logo boards. */
function interleave<T extends { category: string }>(list: T[]) {
  const groups = Object.values(Object.groupBy(list, (i) => i.category)) as T[][]
  const out: T[] = []
  for (let i = 0; out.length < list.length; i++) {
    for (const g of groups) {
      const item = g[i]
      if (item) out.push(item)
    }
  }
  return out
}

const allItems = interleave(portfolioItems)

/** Shared by /portfolio and /portfolio/[category]: the category is part of the URL so each view is indexable. */
export async function PortfolioPage({ category }: { category?: PortfolioCategory }) {
  const [t, tNav] = await Promise.all([getTranslations('Portfolio'), getTranslations('Nav')])
  const items = category ? portfolioItems.filter((i) => i.category === category) : allItems
  const counts = Object.fromEntries(portfolioCategories.map((c) => [c, portfolioItems.filter((i) => i.category === c).length]))

  const chips = [{ key: 'all', href: '/portfolio', label: t('all'), count: portfolioItems.length }].concat(
    portfolioCategories.map((c) => ({ key: c, href: `/portfolio/${c}`, label: t(`categories.${c}`), count: counts[c] ?? 0 })),
  )

  return (
    <>
      <PageHero
        crumbs={category ? [{ label: tNav('portfolio'), href: '/portfolio' }, { label: t(`categories.${category}`) }] : [{ label: tNav('portfolio') }]}
        eyebrow={t('eyebrow')}
        eyebrowIndex={category ? t(`categories.${category}`) : tNav('portfolio')}
        title={t('title', { count: items.length })}
        accent={t('titleAccent')}
      />

      <nav aria-label={t('filterLabel')} className="border-y border-line">
        <Container className="no-scrollbar flex gap-2 overflow-x-auto py-4">
          {chips.map((chip) => {
            const current = (category ?? 'all') === chip.key
            return (
              <Link
                key={chip.key}
                href={chip.href}
                scroll={false}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4.5 text-[0.9375rem] whitespace-nowrap',
                  current ? 'border-orange bg-orange font-semibold text-ink' : 'border-line bg-ink-2 text-lavender hover:border-line-strong',
                )}
              >
                {chip.label}
                <span className={cn('font-mono text-xs', current ? 'text-ink/70' : 'text-mist')}>{chip.count}</span>
              </Link>
            )
          })}
        </Container>
      </nav>

      <section className="pt-10 pb-6">
        <Container>
          <PortfolioGrid key={category ?? 'all'} items={items} />
        </Container>
      </section>
    </>
  )
}
