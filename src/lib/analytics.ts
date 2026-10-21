import { sendGAEvent } from '@next/third-parties/google'

// GA only loads after cookie consent; without it there is no dataLayer and events are no-ops.
function send(...args: Parameters<typeof sendGAEvent>) {
  if (typeof window === 'undefined' || !('dataLayer' in window)) return
  sendGAEvent(...args)
}

export function trackAddToCart(item: { id: string; name: string; price: number; quantity: number }) {
  send('event', 'add_to_cart', {
    currency: 'DZD',
    value: item.price * item.quantity,
    items: [{ item_id: item.id, item_name: item.name, price: item.price, quantity: item.quantity }],
  })
}

export function trackPurchase(transactionId: string, value: number) {
  send('event', 'purchase', { transaction_id: transactionId, value, currency: 'DZD' })
}

export function trackLead(form: 'contact' | 'ads-quote') {
  send('event', 'generate_lead', { form })
}
