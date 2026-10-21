'use server'

import { z } from 'zod'
import { site } from '@/lib/site'
import { algerianPhone, fieldErrorsOf, formValues, type FormState } from '@/lib/validation'

const contactFields = ['name', 'email', 'phone', 'message', 'studio'] as const
export type ContactField = (typeof contactFields)[number]

const contactSchema = z.object({
  name: z.string().trim().min(2, 'nameMin').max(100, 'nameMin'),
  email: z.email('email'),
  phone: algerianPhone,
  message: z.string().trim().min(10, 'messageMin').max(500, 'messageMax'),
  studio: z.string().trim().max(60).optional(),
})

const quoteFields = ['type', 'size', 'quantity', 'wilaya', 'phone', 'email'] as const
export type QuoteField = (typeof quoteFields)[number]

const quoteSchema = z.object({
  type: z.string().trim().min(1).max(60),
  size: z.string().trim().max(60).optional(),
  quantity: z.coerce.number().int().min(1).max(9999),
  wilaya: z.string().trim().max(60).optional(),
  phone: algerianPhone,
  email: z.email('email'),
})

/** The legacy API endpoint behind the contact form. */
async function postContact(payload: { fullName: string; email: string; phone: string; message: string }) {
  const res = await fetch(`${site.api}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Contact API responded ${res.status}`)
}

// Bots fill every field; humans never see the "company" input.
function isSpam(formData: FormData) {
  return Boolean(formData.get('company'))
}

export async function sendContact(_prev: FormState<ContactField>, formData: FormData): Promise<FormState<ContactField>> {
  const values = formValues(formData, contactFields)
  if (isSpam(formData)) return { status: 'success' }

  const parsed = contactSchema.safeParse(values)
  if (!parsed.success) return { status: 'error', fieldErrors: fieldErrorsOf<ContactField>(parsed.error), values }

  const { name, email, phone, message, studio } = parsed.data
  try {
    await postContact({ fullName: name, email, phone, message: studio ? `[${studio}] ${message}` : message })
    return { status: 'success' }
  } catch (error) {
    console.error('sendContact failed', error)
    return { status: 'error', values }
  }
}

export async function sendQuote(_prev: FormState<QuoteField>, formData: FormData): Promise<FormState<QuoteField>> {
  const values = formValues(formData, quoteFields)
  if (isSpam(formData)) return { status: 'success' }

  const parsed = quoteSchema.safeParse(values)
  if (!parsed.success) return { status: 'error', fieldErrors: fieldErrorsOf<QuoteField>(parsed.error), values }

  const q = parsed.data
  const message = [
    'Devis express — Pixel Advertisement',
    `Support : ${q.type}`,
    q.size ? `Dimensions : ${q.size}` : null,
    `Quantité : ${q.quantity}`,
    q.wilaya ? `Wilaya : ${q.wilaya}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    await postContact({ fullName: 'Devis express', email: q.email, phone: q.phone, message })
    return { status: 'success' }
  } catch (error) {
    console.error('sendQuote failed', error)
    return { status: 'error', values }
  }
}
