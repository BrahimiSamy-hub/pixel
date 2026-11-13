'use client'

import { availableExtras, type ExtraId, extraPrices, otherEvents, type PackId, packIncludes, packs, type PhotobookFormat, photobookPrices, total } from '@/shared/catalog/events'
import type { QuoteLine } from '@/shared/catalog/core'
import { eventsText as E } from '@/shared/catalog/text'
import { cn } from '@/lib/cn'
import { site } from '@/lib/site'
import { Chip, type Contact, ContactBlock, emptyContact, formatDA, Group, OptionRow, QSection, Ticket, useDraft, useL } from './kit'

/** Wedding packs → extras the pack lacks → live total → WhatsApp (Events.pdf rules, shared with the app). */
export function EventsBuilder() {
  const L = useL()
  const [packId, setPackId] = useDraft<PackId>('events.pack', 'jasmin')
  const [extras, setExtras] = useDraft<ExtraId[]>('events.extras', [])
  const [photobook, setPhotobook] = useDraft<PhotobookFormat | null>('events.photobook', null)
  const [travel, setTravel] = useDraft('events.travel', false)
  const [contact, setContact] = useDraft<Contact>('contact', emptyContact)

  const pack = packs.find((p) => p.id === packId) ?? packs[1]!
  const sum = total(pack, { extras: new Set(extras), photobook, travel })
  const da = (amount: number) => L(E.price, { amount: formatDA(amount) })
  const lines: QuoteLine[] = [
    { label: `Pack ${pack.name}`, amount: pack.price },
    ...sum.extras.map((e) => ({ label: L(E.extra[e]), amount: extraPrices[e] })),
    ...(photobook && !pack.photobook ? [{ label: L(E.photobook), detail: photobook, amount: photobookPrices[photobook] }] : []),
    ...(travel ? [{ label: L(E.travel), amount: null }] : []),
  ]

  return (
    <div className="flex flex-col gap-12">
      <QSection title={L(E.weddingTitle)} hint={L(E.weddingIntro)}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(17rem,100%),1fr))] gap-4">
          {packs.map((p) => {
            const on = p.id === pack.id
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => {
                  setPackId(p.id)
                  // An included photobook is a free format choice; a billed one doesn't carry over.
                  if (p.photobook !== pack.photobook) setPhotobook(null)
                }}
                className={cn('flex flex-col gap-4 rounded-card border bg-ink-2 p-6 text-start transition-colors', on ? 'border-orange' : 'border-line hover:border-line-strong')}
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-lg font-bold tracking-[0.08em] uppercase">Pack {p.name}</span>
                  <span className="font-semibold text-orange">{da(p.price)}</span>
                </span>
                <ul className="flex flex-col gap-1.5 text-[0.9375rem] text-lavender">
                  {packIncludes(p).map((line) => (
                    <li key={line.key} className="flex gap-2">
                      <span aria-hidden className="text-orange">✓</span>
                      {L(E.inc[line.key], line.values)}
                    </li>
                  ))}
                </ul>
                {p.prep === 'one' ? <span className="text-[0.8125rem] text-mist">{L(E.secondPrep)}</span> : null}
              </button>
            )
          })}
        </div>
      </QSection>

      <QSection title={L(E.extrasTitle)} hint={L(E.extrasHint)}>
        <Group>
          {availableExtras(pack).map((e) => (
            <OptionRow
              key={e}
              label={L(E.extra[e])}
              price={L(E.plus, { amount: formatDA(extraPrices[e]) })}
              selected={extras.includes(e)}
              onToggle={() => setExtras(extras.includes(e) ? extras.filter((x) => x !== e) : [...extras, e])}
            />
          ))}
          <div className="flex flex-col gap-3 px-5 py-4">
            <span>{L(E.photobook)}</span>
            {pack.photobook ? <span className="text-[0.8125rem] text-mist">{L(E.photobookIncluded)}</span> : null}
            <div className="flex flex-wrap gap-2">
              {pack.photobook ? null : <Chip label={L(E.photobookNone)} on={!photobook} onClick={() => setPhotobook(null)} />}
              {(['A4', 'A5'] as const).map((f) => (
                <Chip key={f} label={pack.photobook ? f : `${f} ${L(E.plus, { amount: formatDA(photobookPrices[f]) })}`} on={photobook === f} onClick={() => setPhotobook(photobook === f && pack.photobook ? null : f)} />
              ))}
            </div>
          </div>
          <OptionRow label={L(E.travel)} hint={L(E.travelHint)} selected={travel} onToggle={() => setTravel(!travel)} />
        </Group>
      </QSection>

      <ContactBlock value={contact} onChange={setContact} />
      <Ticket request={{ service: 'Pixel Events', answers: photobook && pack.photobook ? [{ label: L(E.photobook), value: photobook }] : [], lines, contact }} />

      <QSection title={L(E.otherTitle)}>
        <Group>
          {otherEvents.map((e) => (
            <a key={e} href={`${site.whatsapp.href}?text=${encodeURIComponent(L(E.msgQuote, { event: L(E.types[e]) }))}`} target="_blank" rel="noopener" className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-ink-3">
              <span>{L(E.types[e])}</span>
              <span className="text-sm font-semibold text-orange">{L(E.onQuote)} →</span>
            </a>
          ))}
        </Group>
      </QSection>
    </div>
  )
}
