import { useTranslations } from 'next-intl'
import { cn } from '@/lib/cn'

const years = [
  { year: '2018', key: 'y2018', done: true },
  { year: '2021', key: 'y2021', done: true },
  { year: '2023', key: 'y2023', done: true },
  { year: '2024', key: 'y2024', done: true },
  { year: '2025', key: 'y2025', done: false },
] as const

/** Compact list used on the home page. */
export function TimelineList() {
  const t = useTranslations('Timeline')
  return (
    <ol className="mt-2 flex flex-col">
      {years.map((y) => (
        <li key={y.key} className="flex gap-6 border-t border-line py-4.5 last:border-b">
          <span className={cn('w-16 shrink-0 font-mono font-bold', y.done ? 'text-orange' : 'text-mist')}>{y.year}</span>
          <span className="text-lavender">
            {t(`${y.key}.text`)}
            {!y.done ? <span className="text-yellow"> — {t('ongoing')}</span> : null}
          </span>
        </li>
      ))}
    </ol>
  )
}

/** Horizontal rail with hexagon nodes, used on the About page. */
export function TimelineRail() {
  const t = useTranslations('Timeline')
  return (
    <ol className="grid grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] gap-y-10 border-t border-line-strong">
      {years.map((y) => (
        <li key={y.key} className="flex flex-col gap-3.5 pe-6">
          <span aria-hidden className={cn('-mt-2.75 h-5.25 w-4.5 clip-hex', y.done ? 'bg-orange' : 'bg-line-strong')} />
          <span className={cn('font-mono text-[0.9375rem] font-bold', y.done ? 'text-orange' : 'text-yellow')}>
            {y.year}
            {!y.done ? ` · ${t('ongoing')}` : null}
          </span>
          <strong className="text-xl font-semibold">{t(`${y.key}.title`)}</strong>
          <span className="text-[0.9375rem] leading-relaxed text-mist">{t(`${y.key}.text`)}</span>
        </li>
      ))}
    </ol>
  )
}
