import type { SVGProps } from 'react'

// Brand marks are not part of lucide; drawn here in the same 24px stroke style.
type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 18, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" />
    </Base>
  )
}

export function TikTokIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M15 3c.4 2.6 2.3 4.6 5 5v3a8 8 0 0 1-5-1.7V16a6 6 0 1 1-6-6v3.2A2.8 2.8 0 1 0 11.8 16V3z" />
    </Base>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Base>
  )
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 21l2-5.6A8.4 8.4 0 1 1 21 11.5z" />
    </Base>
  )
}
