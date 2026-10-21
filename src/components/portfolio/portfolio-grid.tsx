'use client'

import { ExternalLink, Maximize2, Play, Search, X } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useDeferredValue, useRef, useState } from 'react'
import type { PortfolioItem } from '@/data/portfolio'
import { Button } from '@/components/ui/button'

const PAGE_SIZE = 24

function thumb(item: PortfolioItem) {
  return item.type === 'video' ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg` : item.image
}

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const t = useTranslations('Portfolio')
  const tCommon = useTranslations('Common')
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [active, setActive] = useState<PortfolioItem | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const deferredQuery = useDeferredValue(query)

  const label = (item: PortfolioItem) => ('title' in item ? item.title : t(`subs.${item.sub}`))
  const needle = deferredQuery.trim().toLocaleLowerCase()
  const filtered = needle
    ? items.filter((item) => `${label(item)} ${t(`subs.${item.sub}`)} ${t(`categories.${item.category}`)}`.toLocaleLowerCase().includes(needle))
    : items
  const shown = filtered.slice(0, visible)

  const open = (item: PortfolioItem) => {
    setActive(item)
    dialog.current?.showModal()
  }

  return (
    <>
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

      {shown.length === 0 ? (
        <p className="rounded-card border border-dashed border-line-strong p-12 text-center text-mist">{t('empty')}</p>
      ) : (
        <ul className="columns-[16rem] gap-5">
          {shown.map((item) => (
            <li key={item.id} className="mb-5 break-inside-avoid">
              <button
                type="button"
                onClick={() => open(item)}
                className="group block w-full overflow-hidden rounded-tile border border-line bg-ink-2 text-start"
              >
                <span className="relative block">
                  <Image
                    src={thumb(item)}
                    alt={label(item)}
                    width={item.type === 'video' ? 480 : item.image.width}
                    height={item.type === 'video' ? 360 : item.image.height}
                    placeholder={item.type === 'video' ? 'empty' : 'blur'}
                    sizes="(min-width: 1280px) 320px, (min-width: 768px) 33vw, 50vw"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
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
      )}

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
