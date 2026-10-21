'use client'

import { useTranslations } from 'next-intl'
import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { MaterialKey } from './product-card'

export type FilterableItem = {
  id: string
  material: MaterialKey | null
  sizes: string[]
  price: number | null
  createdAt: string
  node: ReactNode
}

type Sort = 'new' | 'asc' | 'desc'

export function CategoryFilters({ items, materials, sizes }: { items: FilterableItem[]; materials: { key: MaterialKey; label: string }[]; sizes: string[] }) {
  const t = useTranslations('Shop.filters')
  const [picked, setPicked] = useState<Set<MaterialKey>>(new Set())
  const [size, setSize] = useState<string | null>(null)
  const [sort, setSort] = useState<Sort>('new')

  const toggle = (key: MaterialKey) =>
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const shown = items
    .filter((i) => picked.size === 0 || (i.material !== null && picked.has(i.material)))
    .filter((i) => !size || i.sizes.includes(size))
    .sort((a, b) => {
      if (sort === 'new') return b.createdAt.localeCompare(a.createdAt)
      const pa = a.price ?? Number.POSITIVE_INFINITY
      const pb = b.price ?? Number.POSITIVE_INFINITY
      return sort === 'asc' ? pa - pb : pb - pa
    })

  return (
    <div className="flex flex-wrap items-start gap-10">
      <aside aria-label={t('title')} className="flex w-full flex-col gap-7 rounded-card border border-line bg-ink-2 p-7 md:max-w-75 md:flex-[1_1_15rem]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t('title')}</h2>
          <button
            type="button"
            onClick={() => {
              setPicked(new Set())
              setSize(null)
            }}
            className="text-sm text-mist underline underline-offset-4 hover:text-white"
          >
            {t('reset')}
          </button>
        </div>
        {materials.length ? (
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-label text-orange">{t('material')}</legend>
            {materials.map((m) => (
              <label key={m.key} className="flex min-h-8 items-center gap-3 text-[0.9375rem] text-lavender">
                <input type="checkbox" checked={picked.has(m.key)} onChange={() => toggle(m.key)} className="size-4.5 accent-orange" />
                {m.label}
                <span className="ms-auto text-[0.8125rem] text-mist">{items.filter((i) => i.material === m.key).length}</span>
              </label>
            ))}
          </fieldset>
        ) : null}
        {sizes.length ? (
          <fieldset>
            <legend className="mb-3 text-label text-orange">{t('format')}</legend>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => setSize(size === s ? null : s)}
                  className={cn(
                    'min-h-10 rounded-[0.625rem] border px-3 text-sm',
                    size === s ? 'border-orange bg-orange-tint text-white' : 'border-line-strong text-lavender hover:border-mist',
                  )}
                  dir="ltr"
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}
      </aside>

      <div className="flex min-w-0 flex-[999_1_35rem] flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-[0.9375rem] text-mist" aria-live="polite">
            {t('found', { count: shown.length })}
          </p>
          <label className="flex items-center gap-2.5 text-sm text-mist">
            {t('sort')}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="min-h-11 rounded-xl border border-line-strong bg-ink-2 px-3.5 text-sm text-white"
            >
              <option value="new">{t('sortNew')}</option>
              <option value="asc">{t('sortAsc')}</option>
              <option value="desc">{t('sortDesc')}</option>
            </select>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-[repeat(auto-fill,minmax(14.5rem,1fr))] sm:gap-5">
          {shown.map((i) => (
            <div key={i.id}>{i.node}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
