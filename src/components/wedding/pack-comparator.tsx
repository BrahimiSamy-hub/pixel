'use client'

import { Check, Minus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useId, useState, type KeyboardEvent } from 'react'
import { ButtonLink } from '@/components/ui/button'
import { usePriceFormatter } from '@/components/ui/price'
import { weddingPacks, type WeddingPack } from '@/data/wedding-packs'
import { cn } from '@/lib/cn'

type Row = { key: string; value: (p: WeddingPack) => string | boolean }

export function PackComparator() {
  const t = useTranslations('Wedding')
  const price = usePriceFormatter()
  const [selected, setSelected] = useState(2)
  const id = useId()
  const pack = weddingPacks[selected] ?? weddingPacks[0]!

  const features = (p: WeddingPack) =>
    [
      t('features.photographers', { count: p.photographers }),
      t('features.coverage'),
      t('features.editing', { quality: p.editing }),
      p.prep && t('features.prep'),
      p.studio && t('features.studio'),
      p.retouch && t('features.retouch'),
      p.photobook && t('features.photobook'),
      p.frames > 0 && t('features.frames', { count: p.frames }),
      p.shortFilm && t('features.shortFilm'),
      p.drone && t('features.drone'),
      t('features.usb', { size: p.usbGb }),
    ].filter((f): f is string => typeof f === 'string')

  const rows: Row[] = [
    { key: 'photographers', value: (p) => String(p.photographers) },
    { key: 'coverage', value: () => true },
    { key: 'editing', value: (p) => p.editing },
    { key: 'prep', value: (p) => p.prep },
    { key: 'studio', value: (p) => p.studio },
    { key: 'retouch', value: (p) => p.retouch },
    { key: 'photobook', value: (p) => p.photobook },
    { key: 'frames', value: (p) => (p.frames ? String(p.frames) : false) },
    { key: 'shortFilm', value: (p) => p.shortFilm },
    { key: 'drone', value: (p) => p.drone },
    { key: 'usb', value: (p) => t('gb', { size: p.usbGb }) },
  ]

  // WAI-ARIA tabs: arrow keys move between packs (mirrored in RTL by reading dir).
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl'
    const next = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1, Home: -selected, End: weddingPacks.length - 1 - selected }[e.key]
    if (next === undefined) return
    e.preventDefault()
    const index = (selected + next + weddingPacks.length) % weddingPacks.length
    setSelected(index)
    document.getElementById(`${id}-tab-${index}`)?.focus()
  }

  return (
    <>
      <div role="tablist" aria-label={t('packs.tablist')} onKeyDown={onKeyDown} className="mb-7 flex flex-wrap gap-2.5">
        {weddingPacks.map((p, i) => {
          const on = i === selected
          return (
            <button
              key={p.id}
              id={`${id}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${id}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setSelected(i)}
              className={cn(
                'flex min-h-16 min-w-33 flex-col items-start gap-1 rounded-2xl border px-4.5 py-3 text-start transition-colors',
                on ? 'border-red bg-red text-ink' : 'border-line bg-ink-2 text-white hover:border-line-strong',
              )}
            >
              <span className="text-[1.0625rem] font-semibold">{t(`packs.names.${p.id}`)}</span>
              <span className={cn('font-mono text-xs', on ? 'text-ink' : 'text-mist')}>{price(p.price)}</span>
            </button>
          )
        })}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${selected}`}
        className="flex flex-wrap gap-8 rounded-block border border-line bg-ink-2 p-7 sm:p-12"
      >
        <div className="flex min-w-0 flex-[1_1_20rem] flex-col gap-4.5">
          <span className="self-start rounded-full bg-red px-3 py-1.5 text-label font-bold text-ink">{t(`packs.badges.${pack.id}`)}</span>
          <h3 className="text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.035em]">{t(`packs.names.${pack.id}`)}</h3>
          <p className="text-[clamp(2.5rem,4.4vw,4rem)] leading-none font-semibold tracking-[-0.04em]">{price(pack.price)}</p>
          <ButtonLink href="/contact" className="mt-2 self-start">
            {t('packs.book')}
          </ButtonLink>
        </div>
        <ul className="grid min-w-0 flex-[1.4_1_26rem] grid-cols-[repeat(auto-fit,minmax(13.75rem,1fr))] content-start gap-x-7">
          {features(pack).map((f) => (
            <li key={f} className="flex gap-3 border-b border-line py-3.5 text-lavender">
              <Check size={18} strokeWidth={2.2} aria-hidden className="mt-0.5 shrink-0 text-red" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 overflow-x-auto rounded-card border border-line">
        <table className="w-full min-w-215 border-collapse text-[0.9375rem]">
          <caption className="border-b border-line bg-ink-2 px-6 py-5 text-start text-label text-mist">{t('packs.compare')}</caption>
          <thead>
            <tr className="bg-ink-2">
              <th scope="col" className="px-6 py-4.5 text-start font-normal text-mist">
                {t('packs.included')}
              </th>
              {weddingPacks.map((p, i) => (
                <th
                  key={p.id}
                  scope="col"
                  className={cn('px-3 py-4.5 text-center font-semibold', i === selected && 'border-b-2 border-red bg-red-tint')}
                >
                  {t(`packs.names.${p.id}`)}
                  <span className="mt-1 block text-[0.8125rem] font-normal text-mist">{price(p.price)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-line">
                <th scope="row" className="px-6 py-4 text-start font-semibold">
                  {t(`rows.${row.key}` as 'rows.coverage')}
                </th>
                {weddingPacks.map((p, i) => {
                  const v = row.value(p)
                  return (
                    <td key={p.id} className={cn('px-3 py-4 text-center', i === selected && 'bg-red-tint font-semibold')}>
                      {v === true ? (
                        <Check size={18} strokeWidth={2.4} className="mx-auto text-white" aria-label={t('yes')} />
                      ) : v === false ? (
                        <Minus size={18} className="mx-auto text-muted" aria-label={t('no')} />
                      ) : (
                        v
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
