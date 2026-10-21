'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/cn'

const short = { fr: 'FR', en: 'EN', ar: 'ع' } as const

/** Plain links (crawlable, work without JS) to the same page in each locale. */
export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('LocaleNames')
  const tNav = useTranslations('Nav')
  const current = useLocale()
  const href = usePathname()

  return (
    <ul aria-label={tNav('language')} className={cn('flex items-center gap-1', className)}>
      {routing.locales.map((locale) => (
        <li key={locale}>
          <Link
            href={href}
            locale={locale}
            lang={locale}
            hrefLang={locale}
            aria-label={t(locale)}
            aria-current={locale === current ? 'true' : undefined}
            className={cn(
              'flex min-h-8 min-w-9 items-center justify-center rounded-md px-2 font-mono text-xs font-semibold tracking-[0.08em]',
              locale === current ? 'bg-line text-white' : 'text-mist hover:text-white',
            )}
          >
            {short[locale]}
          </Link>
        </li>
      ))}
    </ul>
  )
}
