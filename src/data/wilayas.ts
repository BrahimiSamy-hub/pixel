import data from './wilayas.json'

export type DeliveryMethod = 'desk' | 'home'

export type Wilaya = {
  id: number
  name: string
  deliveryMethods: Record<DeliveryMethod, number>
}

export const wilayas: Wilaya[] = data.wilayas

export function findWilaya(id: number) {
  return wilayas.find((w) => w.id === id)
}

export function wilayaLabel(w: Wilaya) {
  const name = w.name.toLowerCase().replace(/(^|[\s\-’'])(\p{L})/gu, (_, sep: string, c: string) => sep + c.toUpperCase())
  return `${String(w.id).padStart(2, '0')} — ${name}`
}
