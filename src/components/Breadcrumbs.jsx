"use client"
import { Link, usePathname } from '@/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { FaChevronRight, FaHome } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Breadcrumbs = () => {
  const pathname = usePathname()
  const t = useTranslations('breadcrumbs')
  const locale = useLocale()
  const isRTL = locale === 'ar'

  if (pathname === '/') return null

  const pathSegments = pathname.split('/').filter((v) => v.length > 0)

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`

    // Try to translate the segment, fallback to formatted segment name
    let label = segment;
    try {
      label = t(segment)
    } catch (e) {
      label = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase())
    }

    return { label, href }
  })

  const baseUrl = 'https://pixeldz.store'

  // JSON-LD for Breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('home'),
        item: `${baseUrl}/${locale}`,
      },
      ...breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: crumb.label,
        item: `${baseUrl}/${locale}${crumb.href}`,
      })),
    ],
  }

  const ChevronIcon = () => (
    <FaChevronRight
      className={`mx-2 text-[10px] text-n-4 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`}
    />
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="container relative z-10 py-6">
        <motion.ol
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center flex-wrap gap-y-2 px-4 py-2 rounded-2xl bg-n-7/40 backdrop-blur-md border border-n-1/10 text-sm text-n-3 w-fit shadow-2xl"
        >
          <li className="flex items-center">
            <Link
              href="/"
              className="hover:text-color-1 transition-colors flex items-center group"
            >
              <FaHome className={`text-base transition-transform group-hover:scale-110 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span className="font-medium">{t('home')}</span>
            </Link>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              <ChevronIcon />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-color-1 font-semibold truncate max-w-[150px] sm:max-w-[300px]" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-color-1 transition-colors font-medium whitespace-nowrap"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </motion.ol>
      </nav>
    </>
  )
}

export default Breadcrumbs
