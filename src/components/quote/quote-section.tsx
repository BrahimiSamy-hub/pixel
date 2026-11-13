'use client'

import type { ReactNode } from 'react'
import type { L10n } from '@/shared/catalog/core'
import { Container } from '@/components/ui/container'
import { SectionHeader } from '@/components/ui/section-header'
import { useL } from './kit'

const text = {
  eyebrow: { fr: 'Devis en ligne', en: 'Online quote', ar: 'عرض سعر عبر الإنترنت' },
  title: { fr: 'Composez votre demande, voyez le prix.', en: 'Build your request, see the price.', ar: 'كوّن طلبك وشاهد السعر.' },
} satisfies Record<string, L10n>

/** Page section holding a quote builder, anchored at #devis. */
export function QuoteSection({ index, children, title }: { index: string; children: ReactNode; title?: L10n }) {
  const L = useL()
  return (
    <section id="devis" className="section-y scroll-mt-6 border-t border-line">
      <Container>
        <SectionHeader index={index} eyebrow={L(text.eyebrow)} title={L(title ?? text.title)} />
        {children}
      </Container>
    </section>
  )
}
