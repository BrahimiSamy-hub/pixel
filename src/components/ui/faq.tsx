import { Plus } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { Tone } from '@/lib/studios'
import { JsonLd } from './json-ld'

const openTone: Record<Tone, string> = {
  teal: 'group-open:bg-teal',
  yellow: 'group-open:bg-yellow',
  red: 'group-open:bg-red',
  lime: 'group-open:bg-lime',
  violet: 'group-open:bg-violet',
  orange: 'group-open:bg-orange',
}

export type FaqItem = { q: string; a: string }

/** Native <details> accordion (works without JS) with FAQPage structured data. */
export function Faq({ items, tone = 'orange', schema = true, className }: { items: FaqItem[]; tone?: Tone; schema?: boolean; className?: string }) {
  return (
    <div className={cn('border-t border-line', className)}>
      {items.map((item, i) => (
        <details key={item.q} className="group border-b border-line py-6" open={i === 0}>
          <summary className="flex items-center justify-between gap-6 text-lg font-semibold tracking-[-0.01em] md:text-xl">
            {item.q}
            <span
              aria-hidden
              className={cn(
                'flex size-9 shrink-0 items-center justify-center rounded-full bg-line text-white transition-transform group-open:rotate-45 group-open:text-ink',
                openTone[tone],
              )}
            >
              <Plus size={16} strokeWidth={2.2} />
            </span>
          </summary>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist">{item.a}</p>
        </details>
      ))}
      {schema ? (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }}
        />
      ) : null}
    </div>
  )
}
