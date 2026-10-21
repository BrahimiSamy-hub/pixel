'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { activeNavKey, mainNav } from '@/lib/nav'

export function NavLinks({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const t = useTranslations('Nav')
  const active = activeNavKey(usePathname())

  return (
    <ul className={cn('flex items-center gap-0.5', className)}>
      {mainNav.map((item) => {
        const current = item.key === active
        return (
          <li key={item.key}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={current ? 'page' : undefined}
              className={cn(
                'relative flex min-h-11 items-center gap-2 px-3.5 text-[0.8125rem] font-semibold tracking-[0.08em] uppercase font-mono transition-colors hover:text-white',
                current ? 'text-white' : 'text-mist',
              )}
            >
              {current ? <span aria-hidden className="h-2 w-1.75 bg-orange clip-hex" /> : null}
              {t(item.key)}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
