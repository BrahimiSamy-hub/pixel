import { Star } from 'lucide-react'
import Image from 'next/image'
import mark from '@/assets/brand/pixel-mark.svg'
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
    <span role="img" aria-label={t('starsLabel', { count })} className={cn('flex gap-0.5 text-orange', className)}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={16} fill="currentColor" strokeWidth={0} aria-hidden />
      ))}
    </span>
  )
}

/** Lead testimonial, set large on the paper section: the P symbol opens the quote. */
export function FeaturedReview({ reviewKey }: { reviewKey: ReviewKey; initials?: string }) {
  const t = useTranslations(`Reviews.${reviewKey}`)
  return (
    <figure className="flex flex-col gap-8">
      <Image src={mark} alt="" unoptimized className="h-auto w-10" />
      <blockquote className="text-[clamp(1.625rem,2.8vw,2.5rem)] leading-[1.2] font-semibold tracking-[-0.025em] text-pretty">
        «&#8239;{t('text')}&#8239;»
      </blockquote>
      <figcaption className="flex items-center gap-3.5 border-t border-[#cfccc8] pt-6">
        <span className="font-bold">{t('name')}</span>
        <span className="text-stone">{t('role')}</span>
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
  onPaper = false,
}: {
  reviewKey: ReviewKey
  initials: string
  tone: Tone
  label?: string
  className?: string
  /** Set on the light "paper" section: dark text, no card. */
  onPaper?: boolean
}) {
  const t = useTranslations(`Reviews.${reviewKey}`)
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
      <blockquote className={cn('text-[1.0625rem] leading-relaxed', onPaper ? 'text-[1.1875rem] font-medium' : 'text-lavender')}>{t('text')}</blockquote>
      <figcaption className={cn('mt-auto flex items-center gap-3.5', !onPaper && 'border-t border-line pt-5')}>
        <span className={cn('flex h-12.5 w-11 items-center justify-center font-bold text-ink clip-hex', toneClasses[tone].bg)}>
          {initials}
        </span>
        <span>
          <strong className="block font-semibold">{t('name')}</strong>
          <span className={cn('text-sm', onPaper ? 'text-stone' : 'text-mist')}>{t('role')}</span>
        </span>
      </figcaption>
    </figure>
  )
}
