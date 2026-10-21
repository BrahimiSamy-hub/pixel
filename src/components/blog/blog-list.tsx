'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BlogFilter = { key: string; label: string; tone: string }

/** Category chips over server-rendered post cards. */
export function BlogList({
  filters,
  allLabel,
  label,
  emptyLabel,
  posts,
  trailing,
}: {
  filters: BlogFilter[]
  allLabel: string
  label: string
  emptyLabel: string
  posts: { key: string; category: string; node: ReactNode }[]
  trailing: ReactNode
}) {
  const [active, setActive] = useState('all')
  const shown = posts.filter((p) => active === 'all' || p.category === active)

  return (
    <>
      <div role="group" aria-label={label} className="mb-8 flex flex-wrap gap-2">
        {[{ key: 'all', label: allLabel, tone: '' }, ...filters].map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={active === f.key}
            onClick={() => setActive(f.key)}
            className={cn(
              'flex min-h-11 items-center gap-2.5 rounded-full border px-4.5 text-[0.9375rem]',
              active === f.key ? 'border-orange bg-orange font-semibold text-ink' : 'border-line bg-ink-2 text-lavender hover:border-line-strong',
            )}
          >
            {f.tone ? <span aria-hidden className={cn('h-2.5 w-2.25 clip-hex', f.tone)} /> : null}
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))] gap-6">
        {shown.length ? shown.map((p) => <div key={p.key}>{p.node}</div>) : <p className="text-mist">{emptyLabel}</p>}
        {trailing}
      </div>
    </>
  )
}
