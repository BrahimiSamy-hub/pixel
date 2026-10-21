'use server'

import { z } from 'zod'
import { findWilaya } from '@/data/wilayas'
import { getProduct } from '@/lib/api'
import { site } from '@/lib/site'
import { algerianPhone, fieldErrorsOf, formValues, type FormState } from '@/lib/validation'

const orderFields = ['name', 'phone', 'wilaya', 'method', 'items'] as const
export type OrderField = (typeof orderFields)[number]

const lineSchema = z.object({
  productId: z.string().regex(/^[a-f0-9]{24}$/i),
  variant: z.string().max(120).optional(),
  size: z.string().max(40).optional(),
  quantity: z.number().int().min(1).max(20),
})

const orderSchema = z.object({
  name: z.string().trim().min(2, 'nameMin').max(100, 'nameMin'),
  phone: algerianPhone,
  wilaya: z.coerce.number({ error: 'wilaya' }).int('wilaya').min(1, 'wilaya').max(58, 'wilaya'),
  method: z.enum(['desk', 'home'], 'method'),
  items: z
    .string()
    .transform((s, ctx) => {
      try {
        return JSON.parse(s) as unknown
      } catch {
        ctx.addIssue({ code: 'custom', message: 'cart' })
        return z.NEVER
      }
    })
    .pipe(z.array(lineSchema, 'cart').min(1, 'cart').max(50, 'cart')),
})

/**
 * Prices are recomputed from the shop API: the browser only says what it wants,
 * never how much it costs.
 */
export async function placeOrder(_prev: FormState<OrderField>, formData: FormData): Promise<FormState<OrderField>> {
  const values = formValues(formData, orderFields)
  const parsed = orderSchema.safeParse(values)
  if (!parsed.success) return { status: 'error', fieldErrors: fieldErrorsOf<OrderField>(parsed.error), values }

  const { name, phone, wilaya: wilayaId, method, items } = parsed.data
  const wilaya = findWilaya(wilayaId)
  if (!wilaya) return { status: 'error', fieldErrors: { wilaya: 'wilaya' }, values }

  const orderItems = []
  for (const line of items) {
    const product = await getProduct(line.productId)
    if (!product) return { status: 'error', fieldErrors: { items: 'cart' }, values }
    const size = line.size ? product.sizes.find((s) => s.name === line.size && s.isAvailable) : undefined
    const price = size?.price ?? (line.size ? undefined : product.price ?? product.sizes.find((s) => s.isAvailable)?.price)
    const variantOk = !line.variant || product.heroes.some((h) => h.name === line.variant)
    if (!price || !variantOk) return { status: 'error', fieldErrors: { items: 'cart' }, values }
    orderItems.push({
      name: line.variant ? `${product.name} — ${line.variant}` : product.name,
      size: line.size ?? '',
      quantity: line.quantity,
      price,
      total: price * line.quantity,
    })
  }

  const shippingPrice = wilaya.deliveryMethods[method]
  const subtotal = orderItems.reduce((n, i) => n + i.total, 0)

  try {
    const res = await fetch(`${site.api}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({
        shippingType: method,
        shippingPrice,
        fullName: name,
        wilaya: wilaya.name,
        phone,
        total: subtotal + shippingPrice,
        orderItems,
      }),
    })
    if (!res.ok) throw new Error(`Orders API responded ${res.status}`)
    const body = (await res.json().catch(() => null)) as { _id?: string } | null
    return { status: 'success', reference: body?._id ?? `PX-${Date.now()}` }
  } catch (error) {
    console.error('placeOrder failed', error)
    return { status: 'error', values }
  }
}
