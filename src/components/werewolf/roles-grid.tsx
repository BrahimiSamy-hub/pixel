'use client'

import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/cn'

export type Camp = 'village' | 'wolves' | 'solo'
export type RoleCard = { id: string; camp: Camp; name: string; text: string; campLabel: string; icon: StaticImageData }

const campTone: Record<Camp, { text: string; bg: string }> = {
  village: { text: 'text-teal', bg: 'bg-teal' },
  wolves: { text: 'text-red', bg: 'bg-red' },
  solo: { text: 'text-violet', bg: 'bg-violet' },
}

export function RolesGrid({ roles, filters, label }: { roles: RoleCard[]; filters: { key: Camp | 'all'; label: string }[]; label: string }) {
  const [camp, setCamp] = useState<Camp | 'all'>('all')
  const shown = camp === 'all' ? roles : roles.filter((r) => r.camp === camp)

  return (
    <>
      <div role="group" aria-label={label} className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={camp === f.key}
            onClick={() => setCamp(f.key)}
            className={cn(
              'min-h-11 rounded-full border px-4.5 text-[0.9375rem]',
              camp === f.key ? 'border-white bg-white font-semibold text-ink' : 'border-line-strong bg-ink text-lavender hover:border-mist',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(16.25rem,100%),1fr))] gap-4">
        {shown.map((r) => (
          <li key={r.id} className="flex flex-col gap-3 rounded-tile border border-line bg-ink p-6">
            <div className="flex items-center gap-3.5">
              <span className={cn('relative flex h-14 w-12 shrink-0 items-center justify-center clip-hex', campTone[r.camp].bg)}>
                <Image src={r.icon} alt="" width={34} height={34} unoptimized className="size-8.5 object-contain" />
              </span>
              <span className="flex flex-col gap-0.5">
                <strong className="text-[1.0625rem] font-semibold">{r.name}</strong>
                <span className={cn('text-label text-[0.6875rem]', campTone[r.camp].text)}>{r.campLabel}</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-mist">{r.text}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
