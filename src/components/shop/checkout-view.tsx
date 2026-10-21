'use client'

import { Banknote, Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useActionState, useEffect, useState, useSyncExternalStore } from 'react'
import { placeOrder, type OrderField } from '@/app/actions/order'
import { describedBy, Field, FormStatusMessage, inputClass, TextInput } from '@/components/forms/field'
import { Button, ButtonLink } from '@/components/ui/button'
import { usePriceFormatter } from '@/components/ui/price'
import { findWilaya, wilayaLabel, wilayas, type DeliveryMethod } from '@/data/wilayas'
import { Link } from '@/i18n/navigation'
import { trackPurchase } from '@/lib/analytics'
import { selectCount, selectSubtotal, useCart } from '@/lib/cart-store'
import { cn } from '@/lib/cn'
import type { FormState } from '@/lib/validation'
import astronaut from '@/assets/astro.png'

const initial: FormState<OrderField> = { status: 'idle' }

function useHydrated() {
  return useSyncExternalStore(
    (cb) => useCart.persist.onFinishHydration(cb),
    () => useCart.persist.hasHydrated(),
    () => false,
  )
}

export function CheckoutView() {
  const t = useTranslations('Checkout')
  const tProduct = useTranslations('Product')
  const price = usePriceFormatter()
  const hydrated = useHydrated()
  const items = useCart((s) => s.items)
  const count = useCart(selectCount)
  const subtotal = useCart(selectSubtotal)
  const { setQuantity, remove, clear } = useCart.getState()
  const [state, action, pending] = useActionState(placeOrder, initial)
  const [wilayaId, setWilayaId] = useState<number | null>(null)
  const [method, setMethod] = useState<DeliveryMethod>('desk')

  const wilaya = wilayaId ? findWilaya(wilayaId) : undefined
  const delivery = wilaya ? wilaya.deliveryMethods[method] : null
  const done = state.status === 'success'

  useEffect(() => {
    if (state.status === 'success') {
      trackPurchase(state.reference ?? 'unknown', subtotal + (delivery ?? 0))
      clear()
    }
    // Only react to the action result, not to cart changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const err = (f: OrderField) => {
    const code = state.fieldErrors?.[f]
    return code ? t(`errors.${code}` as 'errors.phone') : undefined
  }

  const step = (n: 1 | 2 | 3, label: string) => {
    const current = done ? 3 : 2
    return (
      <li
        aria-current={n === current ? 'step' : undefined}
        className={cn(
          'flex items-center gap-2 rounded-full px-3.5 py-2.5 text-label font-bold',
          n === current ? 'bg-orange text-ink' : n < current ? 'bg-line text-lavender' : 'border border-line bg-ink-2 text-mist',
        )}
      >
        {String(n).padStart(2, '0')} {label}
      </li>
    )
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6 pb-6">
        <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-semibold tracking-[-0.04em]">{t('title')}</h1>
        <ol aria-label={t('stepsLabel')} className="flex flex-wrap gap-2">
          {step(1, t('steps.cart'))}
          {step(2, t('steps.delivery'))}
          {step(3, t('steps.confirmation'))}
        </ol>
      </div>

      {done ? (
        <div role="status" className="mx-auto flex max-w-205 flex-col items-center gap-5.5 rounded-block border border-line bg-ink-2 p-10 text-center sm:p-18">
          <Image src={astronaut} alt="" sizes="200px" className="h-auto w-50" />
          <h2 className="text-h2">{t('success.title')}</h2>
          <p className="max-w-md text-[1.0625rem] leading-relaxed text-lavender">{t('success.text')}</p>
          <ButtonLink href="/boutique">{t('success.cta')}</ButtonLink>
        </div>
      ) : hydrated && items.length === 0 ? (
        <div className="mx-auto flex max-w-205 flex-col items-center gap-5 rounded-block border border-dashed border-line-strong p-12 text-center">
          <h2 className="text-h3">{t('empty.title')}</h2>
          <p className="text-mist">{t('empty.text')}</p>
          <ButtonLink href="/boutique">{t('empty.cta')}</ButtonLink>
        </div>
      ) : (
        <div className="flex flex-wrap-reverse items-start gap-8">
          <form action={action} noValidate className="flex min-w-0 flex-[1.4_1_32.5rem] flex-col gap-7 rounded-block border border-line bg-ink-2 p-7 sm:p-11">
            <h2 className="text-h3">{t('delivery')}</h2>
            <input
              type="hidden"
              name="items"
              value={JSON.stringify(items.map((i) => ({ productId: i.productId, variant: i.variant, size: i.size, quantity: i.quantity })))}
            />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-5">
              <Field id="o-name" label={t('fields.name')} required error={err('name')}>
                <TextInput id="o-name" name="name" autoComplete="name" required defaultValue={state.values?.name} placeholder={t('fields.namePlaceholder')} invalid={!!err('name')} aria-describedby={describedBy('o-name', err('name'))} />
              </Field>
              <Field id="o-phone" label={t('fields.phone')} required error={err('phone')}>
                <TextInput id="o-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" dir="ltr" required defaultValue={state.values?.phone} placeholder={t('fields.phonePlaceholder')} invalid={!!err('phone')} aria-describedby={describedBy('o-phone', err('phone'))} className="rtl:text-end" />
              </Field>
              <Field id="o-wilaya" label={t('fields.wilaya')} required error={err('wilaya')} className="col-span-full">
                <select
                  id="o-wilaya"
                  name="wilaya"
                  required
                  value={wilayaId ?? ''}
                  onChange={(e) => setWilayaId(e.target.value ? Number(e.target.value) : null)}
                  aria-invalid={!!err('wilaya') || undefined}
                  aria-describedby={describedBy('o-wilaya', err('wilaya'))}
                  className={inputClass}
                >
                  <option value="">{t('fields.wilayaPlaceholder')}</option>
                  {wilayas.map((w) => (
                    <option key={w.id} value={w.id}>
                      {wilayaLabel(w)}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-semibold">{t('method.legend')}</legend>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(13.75rem,1fr))] gap-3">
                {(['desk', 'home'] as const).map((m) => (
                  <label
                    key={m}
                    className={cn(
                      'flex cursor-pointer flex-col gap-1.5 rounded-2xl border-2 px-5 py-4.5 has-focus-visible:outline-2 has-focus-visible:outline-orange',
                      method === m ? 'border-orange bg-orange-tint' : 'border-line bg-ink hover:border-line-strong',
                    )}
                  >
                    <span className="flex items-center justify-between text-[1.0625rem] font-semibold">
                      {t(`method.${m}.label`)}
                      <input type="radio" name="method" value={m} checked={method === m} onChange={() => setMethod(m)} className="size-4.5 accent-orange" />
                    </span>
                    <span className="text-sm text-mist">{t(`method.${m}.text`)}</span>
                    {wilaya ? <span className="text-sm font-semibold">{price(wilaya.deliveryMethods[m])}</span> : null}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex items-center gap-3.5 rounded-2xl border border-line bg-ink px-5 py-4.5">
              <Banknote size={24} strokeWidth={1.8} className="shrink-0 text-lime" aria-hidden />
              <span>
                <strong className="block font-semibold">{t('cod.title')}</strong>
                <span className="text-sm text-mist">{t('cod.text')}</span>
              </span>
            </div>

            {err('items') ? <FormStatusMessage tone="error">{err('items')}</FormStatusMessage> : null}
            {state.status === 'error' && !state.fieldErrors ? <FormStatusMessage tone="error">{t('errors.generic')}</FormStatusMessage> : null}

            <Button type="submit" disabled={pending || !hydrated || items.length === 0} className="min-h-15">
              {pending ? t('sending') : t('confirm')}
            </Button>
          </form>

          <aside aria-label={t('summary')} className="flex min-w-0 flex-[1_1_22.5rem] flex-col gap-5 rounded-block border border-line bg-ink-2 p-8">
            <h2 className="text-[1.375rem] font-semibold">
              {t('summary')} <span className="font-normal text-mist">({count})</span>
            </h2>
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 border-b border-line pb-5">
                  {item.image ? (
                    <Image src={item.image} alt="" width={88} height={88} className="size-22 shrink-0 rounded-2xl object-cover" />
                  ) : (
                    <span aria-hidden className="size-22 shrink-0 rounded-2xl bg-ink-3" />
                  )}
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <strong className="font-semibold">{item.name}</strong>
                      <button type="button" onClick={() => remove(item.key)} aria-label={t('remove', { name: item.name })} className="text-mist hover:text-red">
                        <Trash2 size={16} aria-hidden />
                      </button>
                    </div>
                    <span className="text-[0.8125rem] text-mist">{[item.variant, item.size].filter(Boolean).join(' · ')}</span>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-[0.625rem] border border-line-strong">
                        <button type="button" aria-label={tProduct('decrease')} onClick={() => setQuantity(item.key, item.quantity - 1)} className="flex size-9 items-center justify-center">
                          <Minus size={14} aria-hidden />
                        </button>
                        <span className="min-w-6 text-center text-sm">{item.quantity}</span>
                        <button type="button" aria-label={tProduct('increase')} onClick={() => setQuantity(item.key, item.quantity + 1)} className="flex size-9 items-center justify-center">
                          <Plus size={14} aria-hidden />
                        </button>
                      </div>
                      <span className="font-semibold">{price(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="grid grid-cols-[1fr_auto] gap-3 text-[0.9375rem]">
              <dt className="text-mist">{t('subtotal')}</dt>
              <dd>{price(subtotal)}</dd>
              <dt className="text-mist">{t('deliveryFee')}</dt>
              <dd className="text-lavender">{delivery !== null ? price(delivery) : t('chooseWilaya')}</dd>
              <dt className="border-t border-line pt-3.5 text-lg font-semibold">{t('total')}</dt>
              <dd className="border-t border-line pt-3.5 text-lg font-semibold">{price(subtotal + (delivery ?? 0))}</dd>
            </dl>
            <Link href="/boutique" className="text-sm text-lavender underline underline-offset-4 hover:text-white">
              {t('continue')}
            </Link>
          </aside>
        </div>
      )}
    </>
  )
}
