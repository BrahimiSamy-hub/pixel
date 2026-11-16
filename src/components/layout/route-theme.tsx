'use client'

import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'
import { usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { serviceLogos, serviceThemeClass, type ServiceId } from '@/lib/studios'

/** Pages that belong to one sub-brand: the whole site chrome (navbar, page, footer) takes its colours. */
const routes: Record<string, ServiceId> = {
  '/design-graphique': 'creative',
  '/photo-lab': 'photo',
  '/developpement': 'dev',
  '/mariage': 'events',
  '/sons': 'sounds',
  '/publicite': 'enseigne',
  '/tapini': 'tapini',
  '/portfolio/creative': 'creative',
  '/portfolio/photo': 'photo',
  '/portfolio/dev': 'dev',
  '/portfolio/events': 'events',
  '/portfolio/enseigne': 'enseigne',
}

export function useRouteService(): ServiceId | undefined {
  return routes[usePathname()]
}

/** Wraps the header, page and footer in the current service's theme (see `.service-*` in globals.css). */
export function RouteTheme({ children }: { children: ReactNode }) {
  const service = useRouteService()
  return <div className={cn('flex flex-1 flex-col', service && serviceThemeClass[service])}>{children}</div>
}

/** The navbar logo: the sub-brand's logo on its pages (as in the mobile app), Pixel's everywhere else. */
export function HeaderLogo({ pixel }: { pixel: StaticImageData }) {
  const service = useRouteService()
  const logo = service && serviceLogos[service]
  return <Image src={logo ?? pixel} alt="" unoptimized preload className="h-9 w-auto sm:h-10" />
}
