import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'

// Small building blocks shared by the back-office pages.

export function AdminShell({ children, actions }: { children: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-4">
        <Link href="/admin" className="font-mono text-lg font-bold tracking-[0.2em] uppercase">
          Pixel <span className="text-flame">Cards</span>
        </Link>
        {actions}
      </header>
      {children}
    </div>
  )
}

export function Panel({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn('rounded-lg border border-line bg-ink-2 p-5', className)}>
      {title && <h2 className="mb-4 font-mono text-sm font-semibold tracking-[0.15em] text-mist uppercase">{title}</h2>}
      {children}
    </section>
  )
}

export function Input({ label, hint, className, ...props }: ComponentProps<'input'> & { label: string; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-lavender">{label}</span>
      <input
        className={cn(
          'w-full rounded-md border border-line-strong bg-ink px-3 py-2.5 text-paper outline-none placeholder:text-muted focus:border-flame',
          className,
        )}
        {...props}
      />
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  )
}

export function Btn({ variant = 'primary', className, ...props }: ComponentProps<'button'> & { variant?: 'primary' | 'ghost' | 'danger' }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50',
        variant === 'primary' && 'bg-flame text-ink hover:bg-amber',
        variant === 'ghost' && 'border border-line-strong text-paper hover:border-flame',
        variant === 'danger' && 'border border-red-500/50 text-red-400 hover:bg-red-500/10',
        className,
      )}
      {...props}
    />
  )
}

export function LinkBtn({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-semibold text-paper transition hover:border-flame',
        className,
      )}
      {...props}
    />
  )
}
