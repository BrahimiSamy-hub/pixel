import type { ComponentProps, ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ink' | 'light'
type Size = 'md' | 'sm'

const variants: Record<Variant, string> = {
  primary: 'bg-orange text-ink hover:bg-orange-light',
  secondary: 'bg-line text-white hover:bg-line-strong',
  ink: 'bg-ink text-white hover:bg-ink-3',
  light: 'bg-white text-ink hover:bg-lavender',
}

const sizes: Record<Size, string> = {
  md: 'clip-chamfer min-h-14 px-8 text-[0.8125rem]',
  sm: 'clip-chamfer-sm min-h-12 px-6 text-xs',
}

export function buttonClass({
  variant = 'primary',
  size = 'md',
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    // The chamfer clip-path cuts an outer outline, so the focus ring is drawn inside.
    'inline-flex shrink-0 items-center justify-center gap-3 font-mono font-bold tracking-[0.08em] uppercase transition-colors focus-visible:outline-offset-[-5px] focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  )
}

type ButtonLinkProps = {
  href: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
} & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'>

/** Internal paths go through the locale-aware Link; anchors, tel:, mailto: and URLs stay plain. */
export function ButtonLink({ href, variant, size, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClass({ variant, size, className })
  if (/^(#|https?:|tel:|mailto:)/.test(href)) {
    const external = href.startsWith('http')
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  )
}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ComponentProps<'button'> & { variant?: Variant; size?: Size }) {
  return <button type={type} className={buttonClass({ variant, size, className })} {...props} />
}
