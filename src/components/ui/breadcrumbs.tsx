import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { localizedUrl } from '@/lib/seo'
import { JsonLd } from './json-ld'

export type Crumb = { label: string; href?: string }

/** Visible trail + BreadcrumbList structured data. The home crumb is added automatically. */
export function Breadcrumbs({ items, className, tone = 'muted' }: { items: Crumb[]; className?: string; tone?: 'muted' | 'light' }) {
  const t = useTranslations('Common')
  const locale = useLocale()
  const trail: Crumb[] = [{ label: t('home'), href: '/' }, ...items]

  return (
    <>
      <nav aria-label={t('breadcrumb')} className={cn('text-sm', tone === 'light' ? 'text-lavender' : 'text-mist', className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1
            return (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                {crumb.href && !last ? (
                  <Link href={crumb.href} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current={last ? 'page' : undefined} className={last ? 'text-white' : undefined}>
                    {crumb.label}
                  </span>
                )}
                {!last ? <span aria-hidden>/</span> : null}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: trail.map((crumb, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: crumb.label,
            ...(crumb.href ? { item: localizedUrl(locale, crumb.href) } : {}),
          })),
        }}
      />
    </>
  )
}
