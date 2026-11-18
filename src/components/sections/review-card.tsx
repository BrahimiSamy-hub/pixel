import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { HexDot } from '@/components/ui/hex'
import { cn } from '@/lib/cn'
import { reviewInitials, type Review } from '@/data/reviews'
import { studios, toneClasses } from '@/lib/studios'

/** "Avis Google · 2024": the only translated part of a review; quotes stay in their own language. */
function useSource(review: Review) {
  const t = useTranslations('Reviews')
  return `${t('source')} · ${review.year}`
}

export function Stars({ count = 5, className }: { count?: number; className?: string }) {
  const t = useTranslations('Common')
  return (
    <span role="img" aria-label={t('starsLabel', { count })} className={cn('flex gap-0.5 text-orange', className)}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={16} fill="currentColor" strokeWidth={0} aria-hidden />
      ))}
    </span>
  )
}

/** Lead testimonial, set large on the paper section. */
export function FeaturedReview({ review }: { review: Review }) {
  const source = useSource(review)
  return (
    <figure className="flex flex-col gap-8">
      <blockquote className="text-[clamp(1.375rem,2.4vw,2.125rem)] leading-[1.25] font-semibold tracking-[-0.025em] text-pretty whitespace-pre-line">
        «&#8239;{review.text}&#8239;»
      </blockquote>
      <figcaption className="flex items-center gap-3.5 border-t border-[#cfccc8] pt-6">
        <span className="font-bold">{review.name}</span>
        <span className="text-stone">{source}</span>
      </figcaption>
    </figure>
  )
}

export function ReviewCard({
  review,
  label,
  className,
  onPaper = false,
}: {
  review: Review
  /** The service the review is about, when it names one. */
  label?: string
  className?: string
  /** Set on the light "paper" section: dark text, no card. */
  onPaper?: boolean
}) {
  const source = useSource(review)
  const tone = review.studio ? studios[review.studio].tone : 'orange'
  return (
    <figure className={cn('flex flex-col gap-6', onPaper ? 'text-ink' : 'rounded-card border border-line bg-ink p-8', className)}>
      <div className="flex items-center justify-between gap-4">
        {label ? (
          <span className={cn('flex items-center gap-2 text-label', toneClasses[tone].text)}>
            <HexDot tone={tone} className="h-[0.6875rem] w-2.5" />
            {label}
          </span>
        ) : null}
        <Stars />
      </div>
      <blockquote className={cn('text-[1.0625rem] leading-relaxed whitespace-pre-line', onPaper ? 'text-[1.1875rem] font-medium' : 'text-lavender')}>{review.text}</blockquote>
      <figcaption className={cn('mt-auto flex items-center gap-3.5', !onPaper && 'border-t border-line pt-5')}>
        <span className={cn('flex h-12.5 w-11 items-center justify-center font-bold text-ink clip-hex', toneClasses[tone].bg)}>
          {reviewInitials(review.name)}
        </span>
        <span>
          <strong className="block font-semibold">{review.name}</strong>
          <span className={cn('text-sm', onPaper ? 'text-stone' : 'text-mist')}>{source}</span>
        </span>
      </figcaption>
    </figure>
  )
}
