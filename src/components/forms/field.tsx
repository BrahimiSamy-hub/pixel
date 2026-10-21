import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export const inputClass =
  'min-h-13.5 w-full rounded-field border border-line-strong bg-ink px-4 text-base text-white transition-colors outline-none focus:border-orange focus-visible:outline-2 focus-visible:outline-offset-1 aria-invalid:border-red'

type FieldProps = {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  requiredLabel?: string
  className?: string
  children?: ReactNode
}

/** Label + control + hint/error, wired with aria-describedby / aria-invalid. */
export function Field({ id, label, error, hint, required, requiredLabel, className, children }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required ? (
          <>
            {' '}
            <span aria-hidden className="text-orange">*</span>
            {requiredLabel ? <span className="sr-only">({requiredLabel})</span> : null}
          </>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-red">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[0.8125rem] text-mist">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined
}

export function TextInput({ invalid, className, ...props }: ComponentProps<'input'> & { invalid?: boolean }) {
  return <input aria-invalid={invalid || undefined} className={cn(inputClass, className)} {...props} />
}

/** Off-screen field that humans never fill; the server action drops submissions that do. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -inset-s-[9999px] h-px w-px overflow-hidden">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}

export function FormStatusMessage({ tone, children }: { tone: 'success' | 'error'; children: ReactNode }) {
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'rounded-field border px-4 py-3.5 text-[0.9375rem]',
        tone === 'success' ? 'border-lime bg-lime-tint text-white' : 'border-red bg-red-tint text-white',
      )}
    >
      {children}
    </p>
  )
}
