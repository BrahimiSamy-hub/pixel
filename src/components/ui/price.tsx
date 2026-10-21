import { useLocale, useTranslations } from 'next-intl'
import { formatNumber } from '@/lib/format'

/** A DZD amount in the current locale ("1 500 DA", "1,500 DA", "1.500 د.ج"). */
export function Price({ value, className }: { value: number; className?: string }) {
  const locale = useLocale()
  const t = useTranslations('Common')
  return (
    <span className={className}>
      <bdi>{formatNumber(value, locale)}</bdi> {t('currency')}
    </span>
  )
}

export function usePriceFormatter() {
  const locale = useLocale()
  const t = useTranslations('Common')
  return (value: number) => `${formatNumber(value, locale)} ${t('currency')}`
}
