import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { HexDot } from '@/components/ui/hex'
import { Price } from '@/components/ui/price'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { toneClasses, type Studio } from '@/lib/studios'

export function StudioCard({ studio, index }: { studio: Studio; index: number }) {
  const t = useTranslations('Studios')
  const tCommon = useTranslations('Common')

  return (
    <Link
      href={studio.href}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-ink-2 text-white transition-colors hover:border-line-strong"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={studio.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-s-4 top-4 rounded-lg bg-ink px-2.5 py-1.5 font-mono text-xs font-bold">
          {String(index).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3.5 p-7">
        <p className={cn('flex items-center gap-2.5 text-label', toneClasses[studio.tone].text)}>
          <HexDot tone={studio.tone} className="h-[0.6875rem] w-2.5" />
          {t(`${studio.key}.category`)}
        </p>
        <h3 className="text-h3">{t(`${studio.key}.name`)}</h3>
        <p className="leading-relaxed text-mist">{t(`${studio.key}.tagline`)}</p>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-5 text-sm text-lavender">
          {studio.priceFrom ? (
            <span>
              {tCommon('from')} <Price value={studio.priceFrom} className="font-semibold text-white" />
            </span>
          ) : (
            <span>
              <strong className="font-semibold text-white">{tCommon('onQuote')}</strong> · {tCommon('replyIn24h')}
            </span>
          )}
          <span className="flex size-10 items-center justify-center rounded-full bg-line transition-colors group-hover:bg-orange group-hover:text-ink">
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden className="flip-rtl" />
          </span>
        </div>
      </div>
    </Link>
  )
}
