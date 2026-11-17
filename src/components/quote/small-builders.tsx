'use client'

import { soundLines, soundOffers, sounds, type SoundsState, voiceLangs, voices } from '@/shared/catalog/sounds'
import { tapini, tapiniLines, tapiniProducts, type TapiniState } from '@/shared/catalog/tapini'
import { quoteText } from '@/shared/catalog/text'
import { cn } from '@/lib/cn'
import { ChoiceChips, type Contact, ContactBlock, emptyContact, Group, Notes, OptionRow, QSection, QtyStepper, Ticket, useDraft, useL, useLang, usePriceText } from './kit'

/** Pixel Sounds: offers, voice and languages (darija included). */
export function SoundsBuilder() {
  const L = useL()
  const lang = useLang()
  const price = usePriceText()
  const [s, setS] = useDraft<SoundsState>('sounds', { offers: ['SND-01'], voice: null, langs: [] })
  const [notes, setNotes] = useDraft('sounds.notes', '')
  const [contact, setContact] = useDraft<Contact>('contact', emptyContact)
  const needsVoice = soundOffers.some((o) => o.voice && s.offers.includes(o.id))
  return (
    <div className="flex flex-col gap-12">
      <QSection title={L(sounds.title)}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(17rem,100%),1fr))] gap-4">
          {soundOffers.map((o) => {
            const on = s.offers.includes(o.id)
            return (
              <button key={o.id} type="button" role="checkbox" aria-checked={on} onClick={() => setS({ ...s, offers: on ? s.offers.filter((x) => x !== o.id) : [...s.offers, o.id] })} className={cn('flex flex-col gap-3 rounded-card border bg-ink-2 p-6 text-start transition-colors', on ? 'border-orange' : 'border-line hover:border-line-strong')}>
                <span className="flex justify-between font-mono text-sm text-mist">
                  {o.id}
                  <span aria-hidden className={on ? 'text-orange' : ''}>{on ? '✓' : '+'}</span>
                </span>
                <span className="text-xl font-semibold">{L(o.label)}</span>
                <span className="font-semibold text-orange">{price(o.price, undefined, o.from)}</span>
                <span className="text-[0.9375rem] text-mist">{L(o.desc)}</span>
              </button>
            )
          })}
        </div>
      </QSection>
      {needsVoice ? (
        <QSection title={L(sounds.voiceTitle)}>
          <ChoiceChips options={voices.map((v) => ({ value: v.id, label: L(v.label) }))} value={s.voice ? [s.voice] : []} onChange={(v) => setS({ ...s, voice: v[0] ?? null })} />
          <p className="text-sm text-mist">{L(sounds.langTitle)}</p>
          <ChoiceChips options={voiceLangs.map((v) => ({ value: v.id, label: L(v.label) }))} value={s.langs} onChange={(langs) => setS({ ...s, langs })} max={voiceLangs.length} />
        </QSection>
      ) : null}
      <Notes id="snd-script" label={L(sounds.script)} value={notes} onChange={setNotes} />
      <ContactBlock value={contact} onChange={setContact} />
      <Ticket request={{ service: 'Pixel Sounds', answers: [], lines: soundLines(s, lang), notes, contact }} />
    </div>
  )
}

/** Tapini: NFC products with quantities. */
export function TapiniBuilder() {
  const L = useL()
  const lang = useLang()
  const price = usePriceText()
  const [picks, setPicks] = useDraft<TapiniState>('tapini', {})
  const [notes, setNotes] = useDraft('tapini.notes', '')
  const [contact, setContact] = useDraft<Contact>('contact', emptyContact)
  return (
    <div className="flex flex-col gap-12">
      <QSection title={L(tapini.title)} hint={L(tapini.intro)}>
        <Group>
          {tapiniProducts.map((p) => {
            const qty = picks[p.id]
            return (
              <OptionRow key={p.id} label={L(p.label)} hint={L(p.hint)} price={price(p.price, p.price ? 'piece' : undefined)} selected={Boolean(qty)} onToggle={() => setPicks({ ...picks, [p.id]: qty ? 0 : 1 })}>
                <QtyStepper label={L(quoteText.qty)} value={qty ?? 1} onChange={(n) => setPicks({ ...picks, [p.id]: n })} />
              </OptionRow>
            )
          })}
        </Group>
      </QSection>
      <Notes id="tp-notes" label={L(tapini.notes)} value={notes} onChange={setNotes} />
      <ContactBlock value={contact} onChange={setContact} />
      <Ticket request={{ service: 'Tapini', answers: [], lines: tapiniLines(picks, lang), notes, contact }} />
    </div>
  )
}
