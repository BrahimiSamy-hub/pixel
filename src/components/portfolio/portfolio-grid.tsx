'use client'

import { ExternalLink, Maximize2, Play, Search, X } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useDeferredValue, useLayoutEffect, useRef, useState } from 'react'
import type { PortfolioItem } from '@/data/portfolio'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'

const PAGE_SIZE = 24

function thumb(item: PortfolioItem) {
  return item.type === 'video' ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg` : item.image
}

/** Signs show their lit view: the right half of a lit/unlit pair. */
const isPair = (item: PortfolioItem) => item.type === 'sign' && item.pair

/** Masonry: columns are at least 16rem wide, 20px apart; each tile has a ~53px caption under its image. */
const COLUMN_MIN = 256
const GAP = 20
const CAPTION = 53

/** Height / width of a tile's image. */
function ratio(item: PortfolioItem) {
  if (item.type === 'video') return 360 / 480
  return item.image.height / (isPair(item) ? item.image.width / 2 : item.image.width)
}

/**
 * Deals the items in order into the shortest column, like the mobile app. CSS `columns` was used
 * before, but it fills each column top to bottom and balances heights, so it could leave the last
 * column empty and read down instead of across.
 */
function toColumns(items: PortfolioItem[], width: number) {
  const count = Math.max(1, Math.floor((width + GAP) / (COLUMN_MIN + GAP)))
  const columnWidth = (width - GAP * (count - 1)) / count
  const columns: PortfolioItem[][] = Array.from({ length: count }, () => [])
  const heights: number[] = new Array(count).fill(0)
  for (const item of items) {
    const c = heights.indexOf(Math.min(...heights))
    columns[c]!.push(item)
    heights[c]! += columnWidth * ratio(item) + CAPTION + GAP
  }
  return columns
}

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const t = useTranslations('Portfolio')
  const tCommon = useTranslations('Common')
  const [query, setQuery] = useState('')
  const [sub, setSub] = useState<string | null>(null)
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [active, setActive] = useState<PortfolioItem | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const deferredQuery = useDeferredValue(query)
  // Grid width, measured before the first paint and on resize; the server renders 3 columns.
  const grid = useRef<HTMLDivElement>(null)
  const [gridWidth, setGridWidth] = useState(COLUMN_MIN * 3 + GAP * 2)
  useLayoutEffect(() => {
    const el = grid.current
    if (!el) return
    setGridWidth(el.clientWidth)
    const observer = new ResizeObserver(([entry]) => entry && setGridWidth(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const label = (item: PortfolioItem) => ('title' in item ? item.title : t(`subs.${item.sub}`))
  // Inside one service, a second row filters by kind of work (as in the mobile app).
  const subs = new Set(items.map((i) => i.category)).size === 1 ? [...new Set(items.map((i) => i.sub))] : []
  const inSub = sub ? items.filter((i) => i.sub === sub) : items
  const needle = deferredQuery.trim().toLocaleLowerCase()
  const filtered = needle
    ? inSub.filter((item) => `${label(item)} ${t(`subs.${item.sub}`)} ${t(`categories.${item.category}`)}`.toLocaleLowerCase().includes(needle))
    : inSub
  const shown = filtered.slice(0, visible)

  const open = (item: PortfolioItem) => {
    setActive(item)
    dialog.current?.showModal()
  }

  return (
    <>
      {subs.length > 1 ? (
        <div className="no-scrollbar -mt-4 mb-6 flex gap-2 overflow-x-auto pb-1">
          {subs.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={sub === s}
              onClick={() => {
                setSub(sub === s ? null : s)
                setVisible(PAGE_SIZE)
              }}
              className={cn(
                'flex min-h-10 shrink-0 items-center rounded-full border px-4 text-sm whitespace-nowrap',
                sub === s ? 'border-orange bg-orange/15 font-semibold text-white' : 'border-line bg-ink-2 text-lavender hover:border-line-strong',
              )}
            >
              {t(`subs.${s}`)}
            </button>
          ))}
        </div>
      ) : null}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-label text-mist" aria-live="polite">
          {t('count', { count: filtered.length })}
        </p>
        <label className="flex min-h-11 items-center gap-2.5 rounded-full border border-line bg-ink-2 px-4 text-mist focus-within:border-orange">
          <Search size={16} aria-hidden />
          <span className="sr-only">{t('searchLabel')}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setVisible(PAGE_SIZE)
            }}
            placeholder={t('search')}
            className="w-52 bg-transparent text-[0.9375rem] text-white outline-none"
          />
        </label>
      </div>

      <div ref={grid}>
        {shown.length === 0 ? (
          <p className="rounded-card border border-dashed border-line-strong p-12 text-center text-mist">{t('empty')}</p>
        ) : (
          <div className="flex items-start gap-5">
            {toColumns(shown, gridWidth).map((column, i) => (
              <ul key={i} className="flex min-w-0 flex-1 flex-col gap-5">
                {column.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => open(item)}
                      className="group block w-full overflow-hidden rounded-tile border border-line bg-ink-2 text-start"
                    >
                      <span className="relative block overflow-hidden" style={isPair(item) && item.type !== 'video' ? { aspectRatio: `${item.image.width / 2} / ${item.image.height}` } : undefined}>
                        <Image
                          src={thumb(item)}
                          alt={label(item)}
                          width={item.type === 'video' ? 480 : item.image.width}
                          height={item.type === 'video' ? 360 : item.image.height}
                          placeholder={item.type === 'video' ? 'empty' : 'blur'}
                          sizes={isPair(item) ? '(min-width: 1280px) 640px, (min-width: 768px) 66vw, 100vw' : '(min-width: 1280px) 320px, (min-width: 768px) 33vw, 50vw'}
                          className={cn(
                            'transition-transform duration-500 group-hover:scale-[1.02]',
                            isPair(item) ? 'absolute inset-y-0 right-0 h-full w-[200%] max-w-none object-cover' : 'h-auto w-full',
                          )}
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors group-hover:bg-ink/40">
                          <span className="flex size-12 scale-90 items-center justify-center rounded-full bg-orange text-ink opacity-0 transition group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100">
                            {item.type === 'video' ? <Play size={20} fill="currentColor" aria-hidden /> : <Maximize2 size={18} aria-hidden />}
                          </span>
                        </span>
                      </span>
                      <span className="flex items-center justify-between gap-3 px-4 py-3.5">
                        <span className="text-[0.9375rem] font-semibold text-white">{label(item)}</span>
                        <span className="shrink-0 text-label text-[0.6875rem] text-mist">{t(`categories.${item.category}`)}</span>
                      </span>
                      <span className="sr-only">{item.type === 'video' ? t('play') : t('open')}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )}
      </div>

      {visible < filtered.length ? (
        <div className="mt-8 flex justify-center">
          <Button variant="secondary" size="sm" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            {t('loadMore')}
          </Button>
        </div>
      ) : null}

      <dialog
        ref={dialog}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close()
        }}
        aria-label={active ? label(active) : undefined}
        className="m-auto w-[min(72rem,calc(100%-2rem))] max-w-none overflow-visible bg-transparent p-0 text-white backdrop:bg-ink/90 backdrop:backdrop-blur-sm"
      >
        {active ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold">
                {label(active)} <span className="text-mist">· {t(`categories.${active.category}`)}</span>
              </p>
              <div className="flex items-center gap-2">
                {active.type === 'website' ? (
                  <a href={active.url} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 rounded-full bg-line px-4 text-sm">
                    {t('visitSite')}
                    <ExternalLink size={14} aria-hidden />
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={() => dialog.current?.close()}
                  aria-label={tCommon('close')}
                  className="flex size-11 items-center justify-center rounded-full bg-line"
                >
                  <X size={18} aria-hidden />
                </button>
              </div>
            </div>
            {active.type === 'video' ? (
              <div className="aspect-video overflow-hidden rounded-tile bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  className="size-full"
                />
              </div>
            ) : (
              <Image
                src={active.image}
                alt={label(active)}
                sizes="(min-width: 1200px) 1152px, 100vw"
                placeholder="blur"
                className="mx-auto h-auto max-h-[80dvh] w-auto rounded-tile"
              />
            )}
          </div>
        ) : null}
      </dialog>
    </>
  )
}
