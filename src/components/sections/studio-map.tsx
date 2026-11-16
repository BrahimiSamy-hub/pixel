'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { site } from '@/lib/site'

type StudioKey = keyof typeof site.studios
const order: StudioKey[] = ['batna', 'algiers']

/** The studios' Google Maps, switched by an iOS-style segmented toggle in the bottom corner. */
export function StudioMap({
  labels,
  className,
}: {
  labels: { studios: Record<StudioKey, string>; maps: Record<StudioKey, string>; toggle: string }
  className?: string
}) {
  const [studio, setStudio] = useState<StudioKey>('batna')
  const index = order.indexOf(studio)

  return (
    <div className={cn('relative min-h-104 min-w-0 bg-ink-3', className)}>
      {/* Keyed by studio so switching loads the other map. */}
      <iframe
        key={studio}
        src={site.studios[studio].embed}
        title={labels.maps[studio]}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 size-full border-0 [filter:grayscale(0.35)_contrast(1.05)]"
      />
      <div
        role="group"
        aria-label={labels.toggle}
        className="absolute start-4 bottom-4 grid grid-cols-2 rounded-full border border-line bg-ink/90 p-1 shadow-lg backdrop-blur-sm"
      >
        {/* The thumb slides under the selected option, like an iOS segmented control. */}
        <span
          aria-hidden
          className={cn(
            'absolute inset-y-1 start-1 w-[calc(50%-0.25rem)] rounded-full bg-orange shadow-md transition-transform duration-300 ease-[cubic-bezier(0.3,1.3,0.5,1)] motion-reduce:transition-none',
            index === 1 && 'translate-x-full rtl:-translate-x-full',
          )}
        />
        {order.map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={studio === key}
            onClick={() => setStudio(key)}
            className={cn(
              'relative z-10 min-h-10 min-w-24 rounded-full px-5 text-sm font-semibold transition-colors duration-300',
              studio === key ? 'text-ink' : 'text-lavender hover:text-white',
            )}
          >
            {labels.studios[key]}
          </button>
        ))}
      </div>
    </div>
  )
}
