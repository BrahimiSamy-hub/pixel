'use client'

import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useActionState, useEffect, useRef, useState } from 'react'
import { sendContact, type ContactField } from '@/app/actions/contact'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { trackLead } from '@/lib/analytics'
import { cn } from '@/lib/cn'
import { toneClasses, type Tone } from '@/lib/studios'
import type { FormState } from '@/lib/validation'
import { describedBy, Field, FormStatusMessage, Honeypot, inputClass, TextInput } from './field'

export type StudioOption = { value: string; label: string; tone: Tone | 'mist' }

const initial: FormState<ContactField> = { status: 'idle' }

export function ContactForm({ studios }: { studios: StudioOption[] }) {
  const t = useTranslations('Contact')
  const [state, action, pending] = useActionState(sendContact, initial)
  const [studio, setStudio] = useState(studios[0]?.value ?? '')
  const form = useRef<HTMLFormElement>(null)
  const err = (f: ContactField) => {
    const code = state.fieldErrors?.[f]
    return code ? t(`errors.${code}` as 'errors.nameMin') : undefined
  }

  useEffect(() => {
    if (state.status === 'success') {
      form.current?.reset()
      trackLead('contact')
    }
  }, [state])

  const v = state.status === 'error' ? state.values : undefined

  return (
    <form
      ref={form}
      action={action}
      noValidate
      className="relative flex min-w-0 flex-[1.5_1_35rem] flex-col gap-6 rounded-block border border-line bg-ink-2 p-7 sm:p-12"
    >
      <Honeypot />
      <fieldset className="flex flex-col gap-3.5">
        <legend className="mb-3.5 text-[0.9375rem] font-semibold">{t('studioLegend')}</legend>
        <input type="hidden" name="studio" value={studio} />
        <div className="flex flex-wrap gap-2">
          {studios.map((s) => {
            const on = s.value === studio
            return (
              <button
                key={s.value}
                type="button"
                aria-pressed={on}
                onClick={() => setStudio(s.value)}
                className={cn(
                  'flex min-h-11 items-center gap-2.5 rounded-full border px-4 text-[0.9375rem] transition-colors',
                  on ? 'border-white bg-white font-semibold text-ink' : 'border-line-strong bg-ink text-lavender hover:border-mist',
                )}
              >
                <span aria-hidden className={cn('h-2.75 w-2.5 clip-hex', s.tone === 'mist' ? 'bg-mist' : toneClasses[s.tone].bg)} />
                {s.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-5">
        <Field id="c-name" label={t('fields.name')} required requiredLabel={t('required')} error={err('name')}>
          <TextInput id="c-name" name="name" autoComplete="name" required minLength={2} defaultValue={v?.name} placeholder={t('fields.namePlaceholder')} invalid={!!err('name')} aria-describedby={describedBy('c-name', err('name'))} />
        </Field>
        <Field id="c-phone" label={t('fields.phone')} required requiredLabel={t('required')} error={err('phone')}>
          <TextInput id="c-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" dir="ltr" required defaultValue={v?.phone} placeholder={t('fields.phonePlaceholder')} invalid={!!err('phone')} aria-describedby={describedBy('c-phone', err('phone'))} className="rtl:text-end" />
        </Field>
      </div>
      <Field id="c-mail" label={t('fields.email')} required requiredLabel={t('required')} error={err('email')}>
        <TextInput id="c-mail" name="email" type="email" autoComplete="email" dir="ltr" required defaultValue={v?.email} placeholder={t('fields.emailPlaceholder')} invalid={!!err('email')} aria-describedby={describedBy('c-mail', err('email'))} className="rtl:text-end" />
      </Field>
      <Field id="c-msg" label={t('fields.message')} required requiredLabel={t('required')} error={err('message')} hint={t('fields.messageHelp')}>
        <textarea
          id="c-msg"
          name="message"
          rows={6}
          required
          minLength={10}
          maxLength={500}
          defaultValue={v?.message}
          placeholder={t('fields.messagePlaceholder')}
          aria-invalid={!!err('message') || undefined}
          aria-describedby={describedBy('c-msg', err('message'), t('fields.messageHelp'))}
          className={cn(inputClass, 'resize-y py-4 leading-relaxed')}
        />
      </Field>

      {state.status === 'success' ? <FormStatusMessage tone="success">{t('success')}</FormStatusMessage> : null}
      {state.status === 'error' && !state.fieldErrors ? <FormStatusMessage tone="error">{t('error')}</FormStatusMessage> : null}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-sm text-[0.8125rem] leading-normal text-mist">
          {t('privacyNote')}{' '}
          <Link href="/politique-de-confidentialite" className="text-lavender underline underline-offset-4">
            {t('privacyLink')}
          </Link>
        </p>
        <Button type="submit" disabled={pending}>
          {pending ? t('sending') : t('submit')}
          <ArrowRight size={18} aria-hidden className="flip-rtl" />
        </Button>
      </div>
    </form>
  )
}
