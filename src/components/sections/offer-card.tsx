import { useTranslations } from 'next-intl'
import { ButtonLink } from '@/components/ui/button'
import { Price } from '@/components/ui/price'
import { cn } from '@/lib/cn'
import { toneClasses, type Tone } from '@/lib/studios'
import { CheckList } from './check-list'

/** A priced offer on a studio page. `highlight` paints the card in the studio colour. */
export function OfferCard({
  title,
  text,
  price,
  features,
  tone,
  highlight = false,
  badge,
  tag,
  cta,
  href = '/contact',
}: {
  title: string
  text: string
  price?: number
  features: string[]
  tone: Tone
  highlight?: boolean
  badge?: string
  tag?: string
  cta?: string
  href?: string
}) {
  const t = useTranslations('Offer')
  return (
    <article
      className={cn(
        'relative flex flex-col gap-5 rounded-[1.75rem] p-8 sm:p-9',
        highlight ? cn(toneClasses[tone].bg, 'text-ink') : 'border border-line bg-ink-2',
      )}
    >
      {badge ? (
        <span className="absolute inset-e-6 top-6 rounded-full bg-ink px-3 py-1.5 text-label text-white">{badge}</span>
      ) : null}
      {tag ? <span className={cn('font-mono text-[0.8125rem]', highlight ? 'font-bold' : toneClasses[tone].text)}>{tag}</span> : null}
      <h3 className={cn('text-h3', badge && 'pe-32')}>{title}</h3>
      <p className={cn('text-[0.9375rem] leading-relaxed', highlight ? undefined : 'text-mist')}>{text}</p>
      {price ? (
        <p className="flex items-baseline gap-2">
          <span className={cn('text-sm', highlight ? undefined : 'text-mist')}>{t('from')}</span>
          <Price value={price} className="text-[2.75rem] leading-none font-semibold tracking-[-0.04em]" />
        </p>
      ) : null}
      <CheckList items={features} tone={tone} onColor={highlight} />
      <ButtonLink href={href} variant={highlight ? 'ink' : 'secondary'} size="sm" className="mt-auto w-full">
        {cta ?? t('requestQuote')}
      </ButtonLink>
    </article>
  )
}
