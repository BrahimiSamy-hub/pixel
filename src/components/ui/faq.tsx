import type { Tone } from '@/lib/studios'
import { FaqList } from './faq-list'
import { JsonLd } from './json-ld'

export type FaqItem = { q: string; a: string }

/** Accordion (one answer open at a time, animated) with FAQPage structured data. */
export function Faq({ items, tone = 'orange', schema = true, className }: { items: FaqItem[]; tone?: Tone; schema?: boolean; className?: string }) {
  return (
    <>
      <FaqList items={items} tone={tone} className={className} />
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
    </>
  )
}
