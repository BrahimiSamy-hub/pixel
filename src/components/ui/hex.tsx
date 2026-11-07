import { cn } from '@/lib/cn'
import { toneClasses, type Tone } from '@/lib/studios'

/** Small P-symbol marker. Decorative. */
export function HexDot({ tone = 'orange', className }: { tone?: Tone; className?: string }) {
  return <span aria-hidden className={cn('inline-block h-3.5 w-3 shrink-0 clip-mark', toneClasses[tone].bg, className)} />
}

/** Symbol-shaped badge holding a short label (step numbers, initials). */
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
        'inline-flex h-16 w-14 shrink-0 items-center justify-center bg-line-strong pe-1 font-mono text-lg font-bold clip-mark',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** The new logo has no dots: a small gradient P symbol takes their place. */
export function PixelDots({ className }: { className?: string }) {
  return <span aria-hidden className={cn('inline-block h-5 w-[1.1rem] bg-linear-90 from-ember via-flame to-amber clip-mark', className)} />
}
