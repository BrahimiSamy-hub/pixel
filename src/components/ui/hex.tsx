import { cn } from '@/lib/cn'
import { toneClasses, type Tone } from '@/lib/studios'

/** Small hexagon marker in a studio colour. Decorative. */
export function HexDot({ tone = 'orange', className }: { tone?: Tone; className?: string }) {
  return <span aria-hidden className={cn('inline-block h-3.5 w-3 shrink-0 clip-hex', toneClasses[tone].bg, className)} />
}

/** Hexagon badge holding a short label (step numbers, initials). */
export function HexBadge({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex h-16 w-14 shrink-0 items-center justify-center bg-line font-mono text-base font-bold clip-hex',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** The four coloured dots of the wordmark. */
export function PixelDots({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn('inline-flex items-end gap-1', className)}>
      <i className="size-1.75 rounded-full bg-yellow" />
      <i className="mb-1.25 size-1.75 rounded-full bg-red" />
      <i className="mb-2 size-1.75 rounded-full bg-teal" />
      <i className="mb-0.5 size-1.75 rounded-full bg-lime" />
    </span>
  )
}
