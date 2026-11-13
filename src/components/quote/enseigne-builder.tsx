'use client'

import Image from 'next/image'
import { useState } from 'react'
import { emptySign, enseigne, LED_PER_BAG, LED_PER_SHEET, leds, materials, type PreviewFont, type Sign, signCatalog, signLines, type SignState, swatchesOf } from '@/shared/catalog/enseigne'
import { signImages } from '@/data/sign-images'
import { cn } from '@/lib/cn'
import { ChoiceChips, Chip, type Contact, ContactBlock, DimensionFields, emptyContact, Group, Notes, OptionRow, QSection, QtyStepper, TextField, SwatchGrid, Ticket, useDraft, useL, useLang, usePriceText } from './kit'

/** Lit/unlit sign gallery, then the sign estimator with a live preview (shared with the app). */
export function EnseigneBuilder() {
  const L = useL()
  const lang = useLang()
  const price = usePriceText()
  const [s, setS] = useDraft<SignState>('enseigne', emptySign)
  const [notes, setNotes] = useDraft('enseigne.notes', '')
  const [contact, setContact] = useDraft<Contact>('contact', emptyContact)
  const set = (p: Partial<SignState>) => setS({ ...s, ...p })
  const material = materials.find((m) => m.id === s.material)

  return (
    <div className="flex flex-col gap-12">
      <QSection title={L(enseigne.estimatorTitle)} hint={L(enseigne.estimatorHint)}>
        <Group>
          {materials.map((m) => (
            <OptionRow key={m.id} kind="radio" label={L(m.label)} hint={L(m.spec)} price={price(m.perM2, 'm2')} selected={s.material === m.id} onToggle={() => set({ material: s.material === m.id ? null : m.id, color: null })} />
          ))}
        </Group>
      </QSection>

      {material ? (
        <QSection title={L(enseigne.colorTitle)} hint={L(enseigne.colorNote)}>
          {material.charts.map((c) => (
            <div key={c.title.fr} className="flex flex-col gap-3">
              {material.charts.length > 1 ? <p className="text-sm text-mist">{L(c.title)}</p> : null}
              <SwatchGrid swatches={c.swatches} value={s.color} onChange={(color) => set({ color })} />
            </div>
          ))}
        </QSection>
      ) : null}

      {material ? (
        <QSection title={L(enseigne.sizeTitle)}>
          <DimensionFields idPrefix="sign" w={s.w} h={s.h} qty={s.qty} onChange={(d) => set(d)} />
        </QSection>
      ) : null}

      <QSection title={L(enseigne.ledTitle)} hint={L(enseigne.ledHint)}>
        <div className="flex flex-wrap gap-2">
          <Chip label={L(enseigne.ledNone)} on={!s.led} onClick={() => set({ led: null })} />
          {leds.map((led) => (
            <button key={led.id} type="button" aria-pressed={s.led === led.id} onClick={() => set({ led: led.id })} className={cn('flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm', s.led === led.id ? 'border-orange' : 'border-line-strong hover:border-mist')}>
              <span aria-hidden className="size-3 rounded-full" style={{ backgroundColor: led.glow, boxShadow: `0 0 8px ${led.glow}` }} />
              {L(led.name)} · {price(led.price)}
            </button>
          ))}
        </div>
        {s.led ? (
          <div className="flex flex-col gap-3">
            <QtyStepper label={L(enseigne.ledPieces)} value={s.ledPieces} step={LED_PER_SHEET} onChange={(ledPieces) => set({ ledPieces })} />
            <div className="flex gap-2">
              <Chip label={L(enseigne.plusSheet)} onClick={() => set({ ledPieces: s.ledPieces + LED_PER_SHEET })} />
              <Chip label={L(enseigne.plusBag)} onClick={() => set({ ledPieces: s.ledPieces + LED_PER_BAG })} />
            </div>
          </div>
        ) : null}
      </QSection>

      <QSection title={L(enseigne.previewTitle)} hint={L(enseigne.previewHint)}>
        <TextField id="sign-text" label={L(enseigne.textLabel)} value={s.text} onChange={(text) => set({ text })} placeholder={L(enseigne.textPlaceholder)} />
        <ChoiceChips options={(['modern', 'condensed', 'arabic'] as const).map((f) => ({ value: f, label: L(enseigne.fonts[f]) }))} value={[s.font]} onChange={(v) => v[0] && set({ font: v[0] })} />
        <SignPreview s={s} />
      </QSection>

      <Notes id="sign-notes" label={L(enseigne.notes)} value={notes} onChange={setNotes} />
      <ContactBlock value={contact} onChange={setContact} />
      <Ticket request={{ service: 'Pixel Enseigne', answers: [{ label: L(enseigne.textLabel), value: s.text }], lines: signLines(s, lang), notes, contact }} />
    </div>
  )
}

const FONT: Record<PreviewFont, string> = {
  modern: 'var(--font-archivo), system-ui, sans-serif',
  condensed: 'var(--font-barlow), "Arial Narrow", sans-serif',
  arabic: 'var(--font-readex), system-ui, sans-serif',
}

/** The client's text on the chosen material colour and proportions; LEDs light it at night. */
function SignPreview({ s }: { s: SignState }) {
  const L = useL()
  const [night, setNight] = useState(false)
  const led = leds.find((x) => x.id === s.led)
  const lit = night && led
  const material = materials.find((m) => m.id === s.material)
  const panel = (material ? swatchesOf(material).find((c) => c.id === s.color)?.hex ?? swatchesOf(material)[0]?.hex : undefined) ?? '#FFFFFF'
  const w = Number(s.w.replace(',', '.')) || 0
  const h = Number(s.h.replace(',', '.')) || 0
  const ratio = w && h ? Math.min(4, Math.max(1, w / h)) : 3
  const text = s.text.trim() || L(enseigne.textPlaceholder)
  const dark = luminance(panel) < 0.5

  return (
    <div className="flex flex-col gap-3">
      <div className={cn('flex justify-center rounded-card border border-line px-6 py-10 transition-colors duration-500', lit ? 'bg-[#0e0f12]' : 'bg-ink-3')}>
        <div
          className="flex w-full max-w-160 items-center justify-center px-4 transition-all duration-500"
          style={{
            aspectRatio: ratio,
            backgroundColor: lit ? shade(panel, 0.55) : panel,
            boxShadow: lit ? `0 0 40px ${led.glow}99` : '0 4px 12px rgba(0,0,0,0.35)',
          }}
        >
          <span
            className="line-clamp-2 text-center leading-none font-extrabold transition-all duration-500"
            style={{
              fontFamily: FONT[s.font],
              fontSize: `clamp(1.25rem, ${Math.min(9, 60 / Math.max(4, text.length))}vw, 4.5rem)`,
              textTransform: s.font === 'arabic' ? 'none' : 'uppercase',
              letterSpacing: s.font === 'condensed' ? '0.08em' : 0,
              color: lit ? led.glow : dark ? '#FFFFFF' : '#0F1010',
              textShadow: lit ? `0 0 14px ${led.glow}, 0 0 28px ${led.glow}` : 'none',
              opacity: s.text.trim() ? 1 : 0.45,
            }}
          >
            {text}
          </span>
        </div>
      </div>
      <label className="flex items-center justify-between gap-4 text-sm">
        <span className={led ? 'text-white' : 'text-mist'}>{led ? L(enseigne.night) : L(enseigne.nightHint)}</span>
        {led ? <input type="checkbox" role="switch" checked={night} onChange={(e) => setNight(e.target.checked)} className="size-5 accent-orange" /> : null}
      </label>
      <p className="text-[0.8125rem] text-mist">{L(enseigne.previewNote)}</p>
    </div>
  )
}

/** Gallery of real signs; one switch lights them all, a click lights one. */
export function SignsGallery() {
  const L = useL()
  const [lightsOn, setLightsOn] = useState(false)
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-2xl font-semibold tracking-[-0.02em]">{L(enseigne.galleryTitle)}</h3>
          <p className="text-mist">{L(enseigne.galleryHint)}</p>
        </div>
        <label className="flex items-center gap-3 font-mono text-sm font-bold tracking-[0.12em] uppercase">
          <span className={lightsOn ? 'text-orange' : 'text-mist'}>{L(enseigne.lightsOn)}</span>
          <input type="checkbox" role="switch" checked={lightsOn} onChange={(e) => setLightsOn(e.target.checked)} className="size-5 accent-orange" />
        </label>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(16rem,100%),1fr))] gap-4">
        {signCatalog.map((sign) => (
          <SignCard key={sign.id} sign={sign} lit={lightsOn} />
        ))}
      </div>
    </div>
  )
}

function SignCard({ sign, lit }: { sign: Sign; lit: boolean }) {
  // A click only overrides the global switch until the switch moves again.
  const [override, setOverride] = useState<{ lit: boolean; on: boolean } | null>(null)
  const on = override && override.lit === lit ? override.on : lit
  const image = signImages[sign.id]
  if (!image) return null
  const ratio = (sign.pair ? sign.w / 2 : sign.w) / sign.h
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={sign.name} onClick={() => sign.pair && setOverride({ lit, on: !on })} className="group flex flex-col gap-2 text-start">
      <span className="relative block w-full overflow-hidden rounded-card border border-line bg-white" style={{ aspectRatio: ratio }}>
        <Image src={image} alt="" fill sizes="(min-width: 1024px) 320px, 50vw" className="object-cover" style={{ objectPosition: sign.pair ? 'left center' : 'center' }} />
        {sign.pair ? (
          <Image src={image} alt="" fill sizes="(min-width: 1024px) 320px, 50vw" className={cn('object-cover transition-opacity duration-500', on ? 'opacity-100' : 'opacity-0')} style={{ objectPosition: 'right center' }} />
        ) : null}
      </span>
      <span className="text-sm text-mist group-hover:text-white">{sign.name}</span>
    </button>
  )
}

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function shade(hex: string, k: number) {
  return `#${[1, 3, 5].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * k).toString(16).padStart(2, '0')).join('')}`
}
