'use client'

import { useLocale } from 'next-intl'
import { type ReactNode, useEffect, useState } from 'react'
import { areaM2, formatDA, formatM2, type L10n, type Lang, type Price, type QuoteLine, summarize, type Swatch } from '@/shared/catalog/core'
import { quoteText } from '@/shared/catalog/text'
import { inputClass } from '@/components/forms/field'
import { buttonClass } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { site } from '@/lib/site'

// ---------------------------------------------------------------------------
// Language helpers: catalog labels are { fr, en, ar }.
// ---------------------------------------------------------------------------

export function useLang() {
  return useLocale() as Lang
}

/** Picks the page language out of a catalog label; fills `{name}` placeholders. */
export function useL() {
  const lang = useLang()
  return (text: L10n, values?: Record<string, string | number>) => {
    let out = text[lang]
    if (values) for (const [k, v] of Object.entries(values)) out = out.replace(`{${k}}`, String(v))
    return out
  }
}

/** "29 000 DA", "Sur devis", or a unit price like "1 800 DA / m²". */
export function usePriceText() {
  const L = useL()
  return (price: Price, unit?: keyof typeof quoteText.unit, from?: boolean) => {
    if (price === null) return L(quoteText.onQuote)
    const amount = formatDA(price)
    const base = from ? L(quoteText.from, { amount }) : L(quoteText.price, { amount })
    return unit ? `${base} / ${L(quoteText.unit[unit])}` : base
  }
}

// ---------------------------------------------------------------------------
// Draft: a form survives a reload or a later visit (per browser).
// ---------------------------------------------------------------------------

export function useDraft<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`quote-draft-${key}`)
      if (saved) {
        const v = JSON.parse(saved) as T
        const isObj = (x: unknown) => typeof x === 'object' && x !== null && !Array.isArray(x)
        // Reading storage only exists in the browser: restore after hydration.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(isObj(initial) && isObj(v) ? ({ ...initial, ...v } as T) : v)
      }
    } catch {}
    setLoaded(true)
    // `initial` is only the fallback for the first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  useEffect(() => {
    if (!loaded) return
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(`quote-draft-${key}`, JSON.stringify(state))
      } catch {}
    }, 400)
    return () => clearTimeout(timer)
  }, [key, loaded, state])
  return [state, setState] as const
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export function QSection({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-2xl font-semibold tracking-[-0.02em]">{title}</h3>
        {hint ? <p className="text-[0.9375rem] text-mist">{hint}</p> : null}
      </div>
      {children}
    </section>
  )
}

/** Bordered box whose rows are separated by hairlines. */
export function Group({ children }: { children: ReactNode }) {
  return <div className="flex flex-col divide-y divide-line overflow-hidden rounded-card border border-line bg-ink-2">{children}</div>
}

// ---------------------------------------------------------------------------
// Choices
// ---------------------------------------------------------------------------

export function OptionRow({ label, hint, price, selected, onToggle, kind = 'check', disabled, children }: {
  label: string
  hint?: string
  price?: string
  selected: boolean
  onToggle: () => void
  kind?: 'check' | 'radio'
  disabled?: boolean
  children?: ReactNode
}) {
  return (
    <div>
      <button
        type="button"
        role={kind === 'radio' ? 'radio' : 'checkbox'}
        aria-checked={selected}
        disabled={disabled}
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-start transition-colors hover:bg-ink-3 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span
          aria-hidden
          className={cn(
            'flex size-5.5 shrink-0 items-center justify-center border-2',
            kind === 'radio' ? 'rounded-full' : 'rounded-[4px]',
            selected ? 'border-orange bg-orange' : 'border-line-strong',
          )}
        >
          {selected ? <span className={cn('bg-ink', kind === 'radio' ? 'size-2 rounded-full' : 'size-2.5 rounded-[2px]')} /> : null}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base">{label}</span>
          {hint ? <span className="text-[0.8125rem] text-mist">{hint}</span> : null}
        </span>
        {price ? <span className="shrink-0 text-end text-sm font-semibold text-orange">{price}</span> : null}
      </button>
      {selected && children ? <div className="flex flex-col gap-3 px-5 pb-5 ps-15">{children}</div> : null}
    </div>
  )
}

export function Chip({ label, on, onClick }: { label: string; on?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        'min-h-10 rounded-full border px-4 font-mono text-[0.8125rem] font-bold tracking-[0.08em] uppercase transition-colors',
        on ? 'border-orange bg-orange text-ink' : 'border-line-strong bg-ink-2 text-lavender hover:border-mist',
      )}
    >
      {label}
    </button>
  )
}

/** One value (`max` 1, default) or several (`max` n). */
export function ChoiceChips<K extends string>({ options, value, onChange, max = 1 }: { options: readonly { value: K; label: string }[]; value: readonly K[]; onChange: (next: K[]) => void; max?: number }) {
  const toggle = (k: K) => {
    if (value.includes(k)) onChange(value.filter((v) => v !== k))
    else if (max === 1) onChange([k])
    else if (value.length < max) onChange([...value, k])
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <Chip key={o.value} label={o.label} on={value.includes(o.value)} onClick={() => toggle(o.value)} />
      ))}
    </div>
  )
}

export function QtyStepper({ value, onChange, min = 1, step = 1, label }: { value: number; onChange: (n: number) => void; min?: number; step?: number; label?: string }) {
  const L = useL()
  const btn = 'flex size-11 items-center justify-center rounded-field border border-line-strong bg-ink text-xl text-orange hover:border-mist'
  return (
    <div className="flex items-center gap-2">
      {label ? <span className="flex-1 text-sm text-mist">{label}</span> : null}
      <button type="button" aria-label={L(quoteText.less)} className={btn} onClick={() => onChange(Math.max(min, value - step))}>
        −
      </button>
      <input
        aria-label={label ?? L(quoteText.qty)}
        inputMode="numeric"
        value={String(value)}
        onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, '')) || 0)}
        onBlur={() => onChange(Math.max(min, value))}
        className="h-11 w-20 rounded-field border border-line-strong bg-ink text-center text-white outline-none focus:border-orange"
      />
      <button type="button" aria-label={L(quoteText.more)} className={btn} onClick={() => onChange(value + step)}>
        +
      </button>
    </div>
  )
}

export function TextField({ id, label, value, onChange, multiline, type = 'text', placeholder, dir }: { id: string; label: string; value: string; onChange: (v: string) => void; multiline?: boolean; type?: string; placeholder?: string; dir?: 'ltr' }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {multiline ? (
        <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} className={cn(inputClass, 'py-3')} />
      ) : (
        <input id={id} type={type} dir={dir} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputClass} />
      )}
    </div>
  )
}

/** Width × height (cm) × quantity, with the computed area. */
export function DimensionFields({ idPrefix, w, h, qty, onChange }: { idPrefix: string; w: string; h: string; qty: number; onChange: (next: { w: string; h: string; qty: number }) => void }) {
  const L = useL()
  const lang = useLang()
  const m2 = areaM2(Number(w.replace(',', '.')) || 0, Number(h.replace(',', '.')) || 0, qty)
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <TextField id={`${idPrefix}-w`} type="number" label={L(quoteText.width)} value={w} onChange={(v) => onChange({ w: v, h, qty })} dir="ltr" />
        <TextField id={`${idPrefix}-h`} type="number" label={L(quoteText.height)} value={h} onChange={(v) => onChange({ w, h: v, qty })} dir="ltr" />
      </div>
      <QtyStepper label={L(quoteText.qty)} value={qty} onChange={(n) => onChange({ w, h, qty: n })} />
      <p className="text-sm font-semibold text-orange">{L(quoteText.area, { m2: formatM2(m2, lang) })}</p>
    </div>
  )
}

export function SwatchGrid({ swatches, value, onChange }: { swatches: readonly Swatch[]; value: string | null; onChange: (id: string) => void }) {
  const L = useL()
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(4.75rem,1fr))] gap-3">
      {swatches.map((s) => {
        const on = s.id === value
        return (
          <button key={s.id} type="button" role="radio" aria-checked={on} aria-label={L(s.name)} onClick={() => onChange(s.id)} className="flex flex-col items-center gap-1.5">
            <span className={cn('block size-14 rounded-[6px] border-2 p-0.5', on ? 'border-orange' : 'border-transparent')}>
              <span className="block size-full rounded-[4px] border border-line" style={{ backgroundColor: s.hex }} />
            </span>
            <span className={cn('line-clamp-2 text-center text-[0.6875rem] leading-tight', on ? 'text-white' : 'text-mist')}>{L(s.name)}</span>
          </button>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Contact + request
// ---------------------------------------------------------------------------

export type Contact = { name: string; phone: string; city: string; company: string; email: string; date: string; budget: string; reply: 'whatsapp' | 'call' | 'email' }
export const emptyContact: Contact = { name: '', phone: '', city: '', company: '', email: '', date: '', budget: '', reply: 'whatsapp' }

export function ContactBlock({ value, onChange }: { value: Contact; onChange: (c: Contact) => void }) {
  const L = useL()
  const set = (k: keyof Contact) => (v: string) => onChange({ ...value, [k]: v })
  return (
    <QSection title={L(quoteText.contactTitle)} hint={L(quoteText.requiredHint)}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] gap-4">
        <TextField id="q-name" label={`${L(quoteText.name)} *`} value={value.name} onChange={set('name')} />
        <TextField id="q-phone" type="tel" label={`${L(quoteText.phone)} *`} value={value.phone} onChange={set('phone')} dir="ltr" />
        <TextField id="q-city" label={`${L(quoteText.city)} *`} value={value.city} onChange={set('city')} />
        <TextField id="q-company" label={L(quoteText.company)} value={value.company} onChange={set('company')} />
        <TextField id="q-email" type="email" label={L(quoteText.email)} value={value.email} onChange={set('email')} dir="ltr" />
        <TextField id="q-date" label={L(quoteText.date)} value={value.date} onChange={set('date')} placeholder={L(quoteText.datePlaceholder)} />
        <TextField id="q-budget" label={L(quoteText.budget)} value={value.budget} onChange={set('budget')} dir="ltr" />
      </div>
      <p className="text-sm text-mist">{L(quoteText.reply)}</p>
      <ChoiceChips
        options={(['whatsapp', 'call', 'email'] as const).map((r) => ({ value: r, label: L(quoteText.replyBy[r]) }))}
        value={[value.reply]}
        onChange={(v) => v[0] && onChange({ ...value, reply: v[0] })}
      />
    </QSection>
  )
}

export type QuoteRequest = { service: string; answers: { label: string; value: string }[]; lines: QuoteLine[]; notes?: string; contact: Contact }

/** Readable WhatsApp text, same layout as the app's. */
function requestText(req: QuoteRequest, L: ReturnType<typeof useL>) {
  const out = [L(quoteText.msgHello, { service: req.service }), '']
  for (const line of req.lines) {
    const price = line.amount === null ? L(quoteText.onQuote) : L(quoteText.price, { amount: formatDA(line.amount) })
    out.push(`• ${line.label}${line.detail ? ` (${line.detail})` : ''} : ${price}`)
  }
  const { amount, onQuote } = summarize(req.lines)
  if (amount) out.push(L(quoteText.msgTotal, { total: L(quoteText.price, { amount: formatDA(amount) }) }) + (onQuote ? ` + ${L(quoteText.onQuote).toLowerCase()}` : ''))
  if (req.lines.length) out.push('')
  for (const a of req.answers) if (a.value.trim()) out.push(`${a.label} : ${a.value}`)
  if (req.notes?.trim()) out.push(`${L(quoteText.notes)} : ${req.notes.trim()}`)
  const c = req.contact
  out.push('', `— ${L(quoteText.contactTitle)} —`, `${L(quoteText.name)} : ${c.name}`, `${L(quoteText.phone)} : ${c.phone}`, `${L(quoteText.city)} : ${c.city}`)
  if (c.company) out.push(`${L(quoteText.company)} : ${c.company}`)
  if (c.email) out.push(`${L(quoteText.email)} : ${c.email}`)
  if (c.date) out.push(`${L(quoteText.date)} : ${c.date}`)
  if (c.budget) out.push(`${L(quoteText.budget)} : ${c.budget}`)
  out.push(`${L(quoteText.reply)} : ${L(quoteText.replyBy[c.reply])}`)
  return out.join('\n')
}

/** Request summary with the estimate and the WhatsApp send button. */
export function Ticket({ request }: { request: QuoteRequest }) {
  const L = useL()
  const { amount, onQuote } = summarize(request.lines)
  const [missing, setMissing] = useState<string[]>([])

  const send = () => {
    const c = request.contact
    const miss = (['name', 'phone', 'city'] as const).filter((k) => !c[k].trim()).map((k) => L(quoteText[k]))
    setMissing(miss)
    if (miss.length) return
    window.open(`${site.whatsapp.href}?text=${encodeURIComponent(requestText(request, L))}`, '_blank', 'noopener')
  }

  return (
    <div className="flex flex-col gap-5 rounded-card border border-orange bg-ink-2 p-6 sm:p-8">
      <p className="text-label text-mist">{L(quoteText.ticket)}</p>
      {request.lines.length ? (
        <ul className="flex flex-col gap-3">
          {request.lines.map((line, i) => (
            <li key={`${line.label}-${i}`} className="flex items-start justify-between gap-4">
              <span className="flex flex-col">
                <span>{line.label}</span>
                {line.detail ? <span className="text-[0.8125rem] text-mist">{line.detail}</span> : null}
              </span>
              <span className={cn('shrink-0 text-sm font-semibold', line.amount === null ? 'text-mist' : 'text-orange')}>
                {line.amount === null ? L(quoteText.onQuote) : L(quoteText.price, { amount: formatDA(line.amount) })}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-mist">{L(quoteText.empty)}</p>
      )}
      <div className="h-px bg-line" />
      <div className="flex items-end justify-between gap-4">
        <p className="text-label text-mist">{L(quoteText.total)}</p>
        <div className="flex flex-col items-end">
          <p className="text-3xl font-semibold text-orange">{amount ? L(quoteText.price, { amount: formatDA(amount) }) : L(quoteText.onQuote)}</p>
          {amount && onQuote ? <p className="text-[0.8125rem] text-mist">+ {L(quoteText.onQuote).toLowerCase()}</p> : null}
        </div>
      </div>
      <p className="text-[0.8125rem] text-mist">{L(quoteText.estimateNote)}</p>
      {missing.length ? (
        <p role="alert" className="text-sm text-orange">
          {L(quoteText.missingTitle)} : {missing.join(', ')}
        </p>
      ) : null}
      <button type="button" onClick={send} className={buttonClass({ className: 'self-start' })}>
        {L(quoteText.send)}
      </button>
    </div>
  )
}

/** Free text area (brief, notes). */
export function Notes({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return <TextField id={id} label={label} value={value} onChange={onChange} multiline />
}

export { formatDA }
