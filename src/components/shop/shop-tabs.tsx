'use client'

import { useTranslations } from 'next-intl'
import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tab = 'all' | 'posters' | 'games' | 'neons'

/** Category tabs over server-rendered product cards. */
export function ShopTabs({
  items,
  emptyNeons,
}: {
  items: { id: string; category: Exclude<Tab, 'all'> | null; node: ReactNode }[]
  emptyNeons: ReactNode
}) {
  const t = useTranslations('Shop')
  const [tab, setTab] = useState<Tab>('all')
  const shown = items.filter((i) => tab === 'all' || i.category === tab)
  const tabs: Tab[] = ['all', 'posters', 'games', 'neons']

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
        <h2 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.04] font-semibold tracking-[-0.035em]">{t('allProducts')}</h2>
        <div role="group" aria-label={t('tabsLabel')} className="flex flex-wrap gap-2">
          {tabs.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                'min-h-11 rounded-full border px-4.5 text-[0.9375rem] transition-colors',
                tab === key ? 'border-orange bg-orange font-semibold text-ink' : 'border-line bg-ink-2 text-lavender hover:border-line-strong',
              )}
            >
              {key === 'all' ? t('all') : t(`categories.${key}`)}
            </button>
          ))}
        </div>
      </div>
      {shown.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] sm:gap-6">
          {shown.map((i) => (
            <div key={i.id}>{i.node}</div>
          ))}
        </div>
      ) : (
        emptyNeons
      )}
    </>
  )
}
