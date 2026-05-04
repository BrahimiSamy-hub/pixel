"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaChevronRight, FaHome } from 'react-icons/fa'

const Breadcrumbs = () => {
  const pathname = usePathname()
  if (pathname === '/') return null

  const pathSegments = pathname.split('/').filter((v) => v.length > 0)

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`
    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())

    return { label, href }
  })

  // JSON-LD for Breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://pixeldz.store/',
      },
      ...breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: crumb.label,
        item: `https://pixeldz.store${crumb.href}`,
      })),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="container py-4 mt-20 lg:mt-24">
        <ol className="flex items-center space-x-2 text-sm text-n-3">
          <li className="flex items-center">
            <Link href="/" className="hover:text-color-1 transition-colors flex items-center">
              <FaHome className="mr-1" />
              <span>Accueil</span>
            </Link>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              <FaChevronRight className="mx-2 text-xs text-n-4" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-color-1 font-medium" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="hover:text-color-1 transition-colors">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumbs
