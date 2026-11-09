/**
 * Seeds a local database with a demo client (for the mobile app) and a demo admin.
 * Safe to run again: existing demo accounts get their password and card reset.
 *   npm run seed:demo
 *
 * Development only: these credentials are public (they are shown in the app's dev build).
 */
import { eq } from 'drizzle-orm'
import { createAccount, setPassword } from '../src/server/accounts'
import { cardInputSchema } from '../src/server/card-schema'
import { db, schema } from '../src/server/db'

if (process.env.NODE_ENV === 'production') {
  console.error('Refusing to seed demo accounts in production.')
  process.exit(1)
}

// Keep in sync with `Pixel_MobileApp/src/lib/demo.ts`.
const DEMO_CLIENT = { username: 'demo', password: 'pixel-demo-2026' }
const DEMO_ADMIN = { username: 'admin', password: 'pixel-admin-2026' }

const demoCard = cardInputSchema.parse({
  displayName: 'Café El Bahia',
  title: 'Café & pâtisserie',
  company: 'El Bahia',
  bio: 'Café de spécialité et pâtisseries maison au cœur de Batna. Ouvert tous les jours de 7h à 22h.',
  phones: [
    { label: 'Réservations', number: '0555 12 34 56' },
    { label: 'Livraison', number: '0661 98 76 54' },
  ],
  emails: [{ label: 'Contact', address: 'contact@elbahia.dz' }],
  whatsapp: '0555 12 34 56',
  website: 'www.elbahia.dz',
  address: 'Rue de la Liberté, Batna 05000',
  mapsUrl: 'https://maps.app.goo.gl/batna',
  socials: [
    { platform: 'instagram', url: 'https://instagram.com/elbahia.cafe' },
    { platform: 'facebook', url: 'https://facebook.com/elbahia.cafe' },
    { platform: 'tiktok', url: 'https://tiktok.com/@elbahia.cafe' },
  ],
  links: [{ label: 'Notre menu', url: 'https://elbahia.dz/menu' }],
  theme: 'aurora',
  colors: { primary: '#0f766e', accent: '#f6a43d' },
  defaultLang: 'fr',
})

async function upsert(account: { username: string; password: string }, role: 'admin' | 'client', displayName?: string) {
  const created = await createAccount({ ...account, role, displayName })
  if (created.ok) return { id: created.id, created: true }
  if (created.error !== 'username_taken') throw new Error(`${account.username}: ${created.error}`)

  const user = await db.query.users.findFirst({ where: eq(schema.users.username, account.username) })
  if (!user) throw new Error(`${account.username}: not found`)
  if (user.role !== role) throw new Error(`${account.username} exists with role "${user.role}", expected "${role}"`)
  await setPassword(user.id, account.password)
  await db.update(schema.users).set({ active: true }).where(eq(schema.users.id, user.id))
  return { id: user.id, created: false }
}

const client = await upsert(DEMO_CLIENT, 'client', demoCard.displayName)
await db
  .insert(schema.cards)
  .values({ userId: client.id, data: demoCard, views: 128 })
  .onConflictDoUpdate({ target: schema.cards.userId, set: { data: demoCard, views: 128, updatedAt: new Date() } })

const admin = await upsert(DEMO_ADMIN, 'admin')

console.log(`Client "${DEMO_CLIENT.username}" / ${DEMO_CLIENT.password} ${client.created ? 'created' : 'reset'} (page: /c/${DEMO_CLIENT.username})`)
console.log(`Admin  "${DEMO_ADMIN.username}" / ${DEMO_ADMIN.password} ${admin.created ? 'created' : 'reset'} (sign in at /admin)`)
