'use client'

import { useTranslations } from 'next-intl'
import { useActionState, useEffect } from 'react'
import { sendQuote, type QuoteField } from '@/app/actions/contact'
import { Button } from '@/components/ui/button'
import { wilayaLabel, wilayas } from '@/data/wilayas'
import { trackLead } from '@/lib/analytics'
import type { FormState } from '@/lib/validation'
import { describedBy, Field, FormStatusMessage, Honeypot, inputClass, TextInput } from './field'

const types = ['neon', 'banner', 'rollup', 'lightbox', 'storefront', 'other'] as const
const initial: FormState<QuoteField> = { status: 'idle' }

export function QuoteForm() {
  const t = useTranslations('Ads.quote')
  const tContact = useTranslations('Contact')
  const [state, action, pending] = useActionState(sendQuote, initial)
  const err = (f: QuoteField) => {
    const code = state.fieldErrors?.[f]
    return code ? tContact(`errors.${code}` as 'errors.email') : undefined
  }
  const v = state.status === 'error' ? state.values : undefined

  useEffect(() => {
    if (state.status === 'success') trackLead('ads-quote')
  }, [state])

  return (
    <form
      action={action}
      noValidate
      className="relative grid min-w-0 flex-[1.4_1_32.5rem] grid-cols-[repeat(auto-fit,minmax(13.75rem,1fr))] gap-5 rounded-[1.75rem] border border-line bg-ink-2 p-7 sm:p-11"
    >
      <Honeypot />
      <Field id="q-type" label={t('type')}>
        <select id="q-type" name="type" defaultValue={v?.type ?? t('types.neon')} className={inputClass}>
          {types.map((k) => (
            <option key={k} value={t(`types.${k}`)}>
              {t(`types.${k}`)}
            </option>
          ))}
        </select>
      </Field>
      <Field id="q-size" label={t('size')}>
        <TextInput id="q-size" name="size" defaultValue={v?.size} placeholder={t('sizePlaceholder')} />
      </Field>
      <Field id="q-qty" label={t('quantity')}>
        <TextInput id="q-qty" name="quantity" type="number" min={1} defaultValue={v?.quantity ?? '1'} inputMode="numeric" />
      </Field>
      <Field id="q-wilaya" label={t('wilaya')}>
        <select id="q-wilaya" name="wilaya" defaultValue={v?.wilaya ?? ''} className={inputClass}>
          <option value="">—</option>
          {wilayas.map((w) => (
            <option key={w.id} value={wilayaLabel(w)}>
              {wilayaLabel(w)}
            </option>
          ))}
        </select>
      </Field>
      <Field id="q-phone" label={t('phone')} required error={err('phone')}>
        <TextInput id="q-phone" name="phone" type="tel" autoComplete="tel" dir="ltr" required defaultValue={v?.phone} placeholder="07 XX XX XX XX" invalid={!!err('phone')} aria-describedby={describedBy('q-phone', err('phone'))} className="rtl:text-end" />
      </Field>
      <Field id="q-email" label={tContact('fields.email')} required error={err('email')}>
        <TextInput id="q-email" name="email" type="email" autoComplete="email" dir="ltr" required defaultValue={v?.email} placeholder={tContact('fields.emailPlaceholder')} invalid={!!err('email')} aria-describedby={describedBy('q-email', err('email'))} className="rtl:text-end" />
      </Field>
      <div className="col-span-full flex flex-col gap-4">
        {state.status === 'success' ? <FormStatusMessage tone="success">{t('success')}</FormStatusMessage> : null}
        {state.status === 'error' && !state.fieldErrors ? <FormStatusMessage tone="error">{t('error')}</FormStatusMessage> : null}
        <Button type="submit" disabled={pending} className="w-full sm:w-auto sm:self-end">
          {t('submit')}
        </Button>
      </div>
    </form>
  )
}
