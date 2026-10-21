import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { toneClasses, type Tone } from '@/lib/studios'

export function CheckList({
  items,
  tone = 'orange',
  onColor = false,
  className,
}: {
  items: string[]
  tone?: Tone
  /** Set when the list sits on a studio-coloured card: ticks and divider turn ink. */
  onColor?: boolean
  className?: string
}) {
  return (
    <ul
      className={cn(
        'flex flex-col gap-3 border-t pt-5 text-[0.9375rem]',
        onColor ? 'border-ink' : 'border-line text-lavender',
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check size={18} strokeWidth={2.2} aria-hidden className={cn('mt-0.5 shrink-0', onColor ? 'text-ink' : toneClasses[tone].text)} />
          {item}
        </li>
      ))}
    </ul>
  )
}
