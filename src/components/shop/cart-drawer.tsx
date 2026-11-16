'use client'

import { ArrowLeft, Banknote, Minus, Plus, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useActionState, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { placeOrder, type OrderField } from '@/app/actions/order'
import { describedBy, Field, FormStatusMessage, inputClass, TextInput } from '@/components/forms/field'
import { Button, ButtonLink } from '@/components/ui/button'
import { usePriceFormatter } from '@/components/ui/price'
import { findWilaya, wilayaLabel, wilayas, type DeliveryMethod } from '@/data/wilayas'
import { trackPurchase } from '@/lib/analytics'
import { selectCount, selectSubtotal, useCart } from '@/lib/cart-store'
import { cn } from '@/lib/cn'
import type { FormState } from '@/lib/validation'
import astronaut from '@/assets/astro.png'

const initial: FormState<OrderField> = { status: 'idle' }
/** Matches the slide duration below. */
const ANIMATION_MS = 300

function lockScroll(on: boolean) {
  const root = document.documentElement.style
  root.overflow = on ? 'hidden' : ''
  root.scrollbarGutter = on ? 'stable' : ''
}

function useHydrated() {
  return useSyncExternalStore(
    (cb) => useCart.persist.onFinishHydration(cb),
    () => useCart.persist.hasHydrated(),
    () => false,
  )
}

/**
 * The cart as a sidebar (there is no cart page): items, then delivery details and cash-on-delivery
 * order, then the confirmation, all in the panel. A modal <dialog> gives focus trapping and Esc.
 */
export function CartDrawer() {
  const t = useTranslations('Checkout')
  const tCommon = useTranslations('Common')
  const open = useCart((s) => s.drawerOpen)
  const setOpen = useCart((s) => s.setDrawerOpen)
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const [step, setStep] = useState<'cart' | 'delivery'>('cart')
  // A new key resets the order form after a completed order.
  const [formKey, setFormKey] = useState(0)
  const [done, setDone] = useState(false)
  // Drives the slide. Opening: show the dialog with the panel off-screen, let the browser lay it
  // out, then slide it in on the next frame. Closing: slide out, then close the dialog.
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (open) {
      // Lock the page without the scrollbar disappearing (that would shift the whole page).
      lockScroll(true)
      if (!el.open) el.showModal()
      // The dialog holds focus while it slides in (focusing a button off-screen made it jump).
      el.focus({ preventScroll: true })
      // Two frames: the first paints the off-screen panel, the second starts the transition.
      let second = 0
      const first = requestAnimationFrame(() => {
        second = requestAnimationFrame(() => setShown(true))
      })
      // Focus once the panel is in place: focusing it off-screen made the browser scroll to it.
      const focus = setTimeout(() => closeButton.current?.focus({ preventScroll: true }), ANIMATION_MS)
      return () => {
        cancelAnimationFrame(first)
        cancelAnimationFrame(second)
        clearTimeout(focus)
      }
    }
    lockScroll(false)
    const frame = requestAnimationFrame(() => setShown(false))
    const timer = setTimeout(() => {
      if (el.open) el.close()
      setStep('cart')
      if (done) {
        setDone(false)
        setFormKey((k) => k + 1)
      }
    }, ANIMATION_MS)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [open, done])

  const close = () => setOpen(false)
  const title = done ? t('steps.confirmation') : step === 'cart' ? t('steps.cart') : t('delivery')

  return (
    <dialog
      ref={dialog}
      tabIndex={-1}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-clip border-0 bg-transparent p-0 text-white outline-none backdrop:bg-transparent"
    >
      <div
        aria-hidden
        onClick={close}
        className={cn('absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-300', shown ? 'opacity-100' : 'opacity-0')}
      />
      <div
        className={cn(
          'absolute inset-y-0 end-0 flex w-[min(30rem,100%)] flex-col border-s border-line bg-ink-2 shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none',
          shown ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full',
        )}
      >
        <header className="flex min-h-18 shrink-0 items-center justify-between gap-4 border-b border-line px-6">
          <div className="flex items-center gap-3">
            {step === 'delivery' && !done ? (
              <button type="button" onClick={() => setStep('cart')} aria-label={t('back')} className="flex size-10 items-center justify-center rounded-full bg-line hover:bg-line-strong">
                <ArrowLeft size={18} aria-hidden className="flip-rtl" />
              </button>
            ) : null}
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          <button ref={closeButton} type="button" onClick={close} aria-label={tCommon('close')} className="flex size-10 items-center justify-center rounded-full bg-line hover:bg-line-strong">
            <X size={18} aria-hidden />
          </button>
        </header>
        <DrawerBody key={formKey} step={step} setStep={setStep} done={done} setDone={setDone} close={close} />
      </div>
    </dialog>
  )
}

function DrawerBody({
  step,
  setStep,
  done,
  setDone,
  close,
}: {
  step: 'cart' | 'delivery'
  setStep: (s: 'cart' | 'delivery') => void
  done: boolean
  setDone: (d: boolean) => void
  close: () => void
}) {
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

  useEffect(() => {
    if (state.status === 'success') {
      trackPurchase(state.reference ?? 'unknown', subtotal + (delivery ?? 0))
      clear()
      setDone(true)
    }
    // Only react to the action result, not to cart changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const err = (f: OrderField) => {
    const code = state.fieldErrors?.[f]
    return code ? t(`errors.${code}` as 'errors.phone') : undefined
  }

  if (done) {
    return (
      <div role="status" className="flex flex-1 flex-col items-center justify-center gap-5 overflow-y-auto p-8 text-center">
        <Image src={astronaut} alt="" sizes="160px" className="h-auto w-40" />
        <h3 className="text-h3">{t('success.title')}</h3>
        <p className="leading-relaxed text-lavender">{t('success.text')}</p>
        <ButtonLink href="/boutique" size="sm" onClick={close}>
          {t('success.cta')}
        </ButtonLink>
      </div>
    )
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <h3 className="text-h3">{t('empty.title')}</h3>
        <p className="text-mist">{t('empty.text')}</p>
        <ButtonLink href="/boutique" size="sm" onClick={close}>
          {t('empty.cta')}
        </ButtonLink>
      </div>
    )
  }

  const totals = (
    <dl className="grid grid-cols-[1fr_auto] gap-2.5 text-[0.9375rem]">
      <dt className="text-mist">{t('subtotal')}</dt>
      <dd>{price(subtotal)}</dd>
      {step === 'delivery' ? (
        <>
          <dt className="text-mist">{t('deliveryFee')}</dt>
          <dd className="text-lavender">{delivery !== null ? price(delivery) : t('chooseWilaya')}</dd>
          <dt className="border-t border-line pt-3 text-lg font-semibold">{t('total')}</dt>
          <dd className="border-t border-line pt-3 text-lg font-semibold">{price(subtotal + (delivery ?? 0))}</dd>
        </>
      ) : null}
    </dl>
  )

  if (step === 'cart') {
    return (
      <>
        <ul aria-label={`${t('summary')} (${count})`} className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
          {items.map((item) => (
            <li key={item.key} className="flex gap-4 border-b border-line pb-5">
              {item.image ? (
                <Image src={item.image} alt="" width={80} height={80} className="size-20 shrink-0 rounded-2xl object-cover" />
              ) : (
                <span aria-hidden className="size-20 shrink-0 rounded-2xl bg-ink-3" />
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
                  <div className="flex items-center rounded-card border border-line-strong">
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
        <footer className="flex shrink-0 flex-col gap-4 border-t border-line p-6">
          {totals}
          <Button type="button" onClick={() => setStep('delivery')} disabled={!hydrated || items.length === 0} className="min-h-14 w-full">
            {t('order')}
          </Button>
          <button type="button" onClick={close} className="self-center text-sm text-lavender underline underline-offset-4 hover:text-white">
            {t('continue')}
          </button>
        </footer>
      </>
    )
  }

  return (
    <form action={action} noValidate className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
        <input
          type="hidden"
          name="items"
          value={JSON.stringify(items.map((i) => ({ productId: i.productId, variant: i.variant, size: i.size, quantity: i.quantity })))}
        />
        <Field id="o-name" label={t('fields.name')} required error={err('name')}>
          <TextInput id="o-name" name="name" autoComplete="name" required defaultValue={state.values?.name} placeholder={t('fields.namePlaceholder')} invalid={!!err('name')} aria-describedby={describedBy('o-name', err('name'))} />
        </Field>
        <Field id="o-phone" label={t('fields.phone')} required error={err('phone')}>
          <TextInput id="o-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" dir="ltr" required defaultValue={state.values?.phone} placeholder={t('fields.phonePlaceholder')} invalid={!!err('phone')} aria-describedby={describedBy('o-phone', err('phone'))} className="rtl:text-end" />
        </Field>
        <Field id="o-wilaya" label={t('fields.wilaya')} required error={err('wilaya')}>
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

        <fieldset>
          <legend className="mb-3 text-sm font-semibold">{t('method.legend')}</legend>
          <div className="grid gap-3">
            {(['desk', 'home'] as const).map((m) => (
              <label
                key={m}
                className={cn(
                  'flex cursor-pointer flex-col gap-1 rounded-2xl border-2 px-5 py-4 has-focus-visible:outline-2 has-focus-visible:outline-orange',
                  method === m ? 'border-orange bg-orange-tint' : 'border-line bg-ink hover:border-line-strong',
                )}
              >
                <span className="flex items-center justify-between font-semibold">
                  {t(`method.${m}.label`)}
                  <input type="radio" name="method" value={m} checked={method === m} onChange={() => setMethod(m)} className="size-4.5 accent-orange" />
                </span>
                <span className="text-sm text-mist">{t(`method.${m}.text`)}</span>
                {wilaya ? <span className="text-sm font-semibold">{price(wilaya.deliveryMethods[m])}</span> : null}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex items-center gap-3.5 rounded-2xl border border-line bg-ink px-5 py-4">
          <Banknote size={24} strokeWidth={1.8} className="shrink-0 text-lime" aria-hidden />
          <span>
            <strong className="block font-semibold">{t('cod.title')}</strong>
            <span className="text-sm text-mist">{t('cod.text')}</span>
          </span>
        </div>

        {err('items') ? <FormStatusMessage tone="error">{err('items')}</FormStatusMessage> : null}
        {state.status === 'error' && !state.fieldErrors ? <FormStatusMessage tone="error">{t('errors.generic')}</FormStatusMessage> : null}
      </div>
      <footer className="flex shrink-0 flex-col gap-4 border-t border-line p-6">
        {totals}
        <Button type="submit" disabled={pending || !hydrated || items.length === 0} className="min-h-14 w-full">
          {pending ? t('sending') : t('confirm')}
        </Button>
      </footer>
    </form>
  )
}
