import Image from 'next/image'
import { cn } from '@/lib/cn'
import { serviceLogos, type ServiceId } from '@/lib/studios'

/** Sub-brand names as written on the logos (not translated). */
export const serviceNames: Record<ServiceId, string> = {
  creative: 'Pixel Creative',
  photo: 'Pixel Photo Lab',
  dev: 'Pixel Development',
  events: 'Pixel Events',
  sounds: 'Pixel Sounds',
  enseigne: 'Pixel Enseigne',
  tapini: 'Tapini',
}

/**
 * The sub-brand logo from the mobile app; Tapini has none yet, so its name is set in its colour.
 * `decorative` hides it from screen readers when the name is already given as text nearby.
 */
export function ServiceLogo({ service, className, priority, decorative }: { service: ServiceId; className?: string; priority?: boolean; decorative?: boolean }) {
  const logo = serviceLogos[service]
  if (!logo) {
    return (
      <span aria-hidden={decorative} className={cn('text-[2rem] leading-none font-extrabold tracking-[-0.03em] text-tapini [font-stretch:112%]', className)}>
        {serviceNames[service]}
      </span>
    )
  }
  return <Image src={logo} alt={decorative ? '' : serviceNames[service]} priority={priority} className={cn('h-14 w-auto', className)} />
}
