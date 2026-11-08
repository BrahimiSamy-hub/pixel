import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

// Local development uses a SQLite file; production can point DATABASE_URL at Turso (libsql://…).
const url = process.env.DATABASE_URL ?? 'file:./data/pixel.db'

const globalForDb = globalThis as unknown as { pixelDb?: ReturnType<typeof createDb> }

function createDb() {
  const client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN })
  return drizzle(client, { schema })
}

// Reuse one client across hot reloads in development.
export const db = globalForDb.pixelDb ?? createDb()
if (process.env.NODE_ENV !== 'production') globalForDb.pixelDb = db

export { schema }
