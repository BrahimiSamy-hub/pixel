import { Quote, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { HexDot } from '@/components/ui/hex'
import { cn } from '@/lib/cn'
import { toneClasses, type Tone } from '@/lib/studios'

export const reviews = [
  { key: 'amel', initials: 'AB', tone: 'red', studio: 'wedding' },
  { key: 'mohamed', initials: 'MR', tone: 'lime', studio: 'dev' },
  { key: 'yassine', initials: 'YT', tone: 'yellow', studio: 'design' },
] as const

export type ReviewKey = (typeof reviews)[number]['key']

export function Stars({ count = 5, className }: { count?: number; className?: string }) {
  const t = useTranslations('Common')
  return (
    <span role="img" aria-label={t('starsLabel', { count })} className={cn('flex gap-0.5 text-yellow', className)}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={16} fill="currentColor" strokeWidth={0} aria-hidden />
      ))}
    </span>
  )
}

/** Large orange quote used as the lead testimonial. */
export function FeaturedReview({ reviewKey, initials }: { reviewKey: ReviewKey; initials: string }) {
  const t = useTranslations(`Reviews.${reviewKey}`)
  return (
    <figure className="flex flex-col justify-between gap-8 rounded-[1.75rem] bg-orange p-8 text-ink sm:p-12">
      <Quote size={44} fill="currentColor" strokeWidth={0} aria-hidden className="flip-rtl" />
      <blockquote className="text-[clamp(1.375rem,2.4vw,2rem)] leading-snug font-semibold tracking-[-0.02em]">{t('text')}</blockquote>
      <figcaption className="flex items-center gap-3.5">
        <span className="flex h-12.5 w-11 items-center justify-center bg-ink font-bold text-orange clip-hex">{initials}</span>
        <span>
          <span className="block font-bold">{t('name')}</span>
          <span className="block text-sm">{t('role')}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function ReviewCard({
  reviewKey,
  initials,
  tone,
  label,
  className,
}: {
  reviewKey: ReviewKey
  initials: string
  tone: Tone
  label?: string
  className?: string
}) {
  const t = useTranslations(`Reviews.${reviewKey}`)
  return (
    <figure className={cn('flex flex-col gap-6 rounded-[1.75rem] border border-line bg-ink p-8', className)}>
      <div className="flex items-center justify-between gap-4">
        {label ? (
          <span className={cn('flex items-center gap-2 text-label', toneClasses[tone].text)}>
            <HexDot tone={tone} className="h-[0.6875rem] w-2.5" />
            {label}
          </span>
        ) : null}
        <Stars />
      </div>
      <blockquote className="text-[1.0625rem] leading-relaxed text-lavender">{t('text')}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3.5 border-t border-line pt-5">
        <span className={cn('flex h-12.5 w-11 items-center justify-center font-bold text-ink clip-hex', toneClasses[tone].bg)}>
          {initials}
        </span>
        <span>
          <strong className="block font-semibold">{t('name')}</strong>
          <span className="text-sm text-mist">{t('role')}</span>
        </span>
      </figcaption>
    </figure>
  )
}
