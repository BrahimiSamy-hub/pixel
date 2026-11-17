'use client'

import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { cn } from '@/lib/cn'
import type { Tone } from '@/lib/studios'
import type { FaqItem } from './faq'

// Full class strings so Tailwind sees them: the icon fills with the tone when its question is open.
const openTone: Record<Tone, string> = {
  teal: 'group-aria-expanded:bg-teal',
  yellow: 'group-aria-expanded:bg-yellow',
  red: 'group-aria-expanded:bg-red',
  lime: 'group-aria-expanded:bg-lime',
  violet: 'group-aria-expanded:bg-violet',
  orange: 'group-aria-expanded:bg-orange',
  creative: 'group-aria-expanded:bg-creative',
  photo: 'group-aria-expanded:bg-photo',
  dev: 'group-aria-expanded:bg-dev',
  events: 'group-aria-expanded:bg-events',
  sounds: 'group-aria-expanded:bg-sounds',
  enseigne: 'group-aria-expanded:bg-enseigne',
  tapini: 'group-aria-expanded:bg-tapini',
}

/**
 * One answer open at a time; opening another closes it. Answers animate their height (grid rows
 * 0fr → 1fr) and stay in the HTML when closed, so search engines still read them.
 */
export function FaqList({ items, tone, className }: { items: FaqItem[]; tone: Tone; className?: string }) {
  const id = useId()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className={cn('border-t border-line', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-start text-lg font-semibold tracking-[-0.01em] md:text-xl"
              >
                {item.q}
                {/* A plus turned 45° is an ×. */}
                <span
                  aria-hidden
                  className={cn(
                    'brand-dot flex size-9 shrink-0 items-center justify-center rounded-full bg-line text-white transition-[rotate,background-color,color] duration-300 ease-out group-aria-expanded:rotate-45 group-aria-expanded:text-ink motion-reduce:transition-none',
                    openTone[tone],
                  )}
                >
                  <Plus size={16} strokeWidth={2.2} />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              inert={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-base leading-relaxed text-mist">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
