import Image from 'next/image'
import type { SVGProps } from 'react'
import waslaLogo from '@/assets/brand/wasla.png'

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

// Official marks (Simple Icons paths), filled with the text colour.
function Filled({ size = 18, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      {children}
    </svg>
  )
}

export function LinkedInIcon(props: IconProps) {
  return (
    <Filled {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </Filled>
  )
}

export function GitHubIcon(props: IconProps) {
  return (
    <Filled {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </Filled>
  )
}

export function BehanceIcon(props: IconProps) {
  return (
    <Filled {...props}>
      <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.051 1.395c.481.763.715 1.651.67 2.552a4.46 4.46 0 0 1-.452 2.07 4.12 4.12 0 0 1-1.214 1.433 5.39 5.39 0 0 1-1.747.822 7.882 7.882 0 0 1-2.024.267H0V4.084h6.947Zm-.405 5.818a2.383 2.383 0 0 0 1.401-.392 1.512 1.512 0 0 0 .54-1.302 1.643 1.643 0 0 0-.183-.817 1.316 1.316 0 0 0-.472-.497 2.053 2.053 0 0 0-.684-.237 4.317 4.317 0 0 0-.802-.064H3.296v3.306l3.246.003Zm.176 6.061c.3.003.6-.027.893-.09.271-.059.528-.17.756-.329.226-.159.41-.369.537-.613.146-.315.214-.659.199-1.005a2.022 2.022 0 0 0-.675-1.718 2.89 2.89 0 0 0-1.79-.513H3.296v4.268h3.422Zm11.877-6.235a2.072 2.072 0 0 0-1.6-.58 2.442 2.442 0 0 0-1.166.24 2.215 2.215 0 0 0-.737.597 2.18 2.18 0 0 0-.395.756 3.417 3.417 0 0 0-.13.711h4.776a3.106 3.106 0 0 0-.748-1.724Zm-3.43-4.786h5.968v1.456h-5.968V4.942Z" />
    </Filled>
  )
}

/** Wasla: its own colour logo (image), sized like the other marks. */
export function WaslaIcon({ size = 18 }: IconProps) {
  return <Image src={waslaLogo} alt="" width={size} height={size} aria-hidden className="shrink-0" />
}
