import { sql } from 'drizzle-orm'
import { blob, index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { CardData } from '../card-schema'

const createdAt = () =>
  integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)

/** Accounts are created by Pixel staff only: there is no public sign-up. */
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  /** Lowercase, also used as the public slug of the client's page (`/c/<username>`). */
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role', { enum: ['admin', 'client'] }).notNull().default('client'),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
  createdAt: createdAt(),
  lastLoginAt: integer('last_login_at', { mode: 'timestamp' }),
})

/** One landing page per client. The QR code always points at `/c/<username>`. */
export const cards = sqliteTable('cards', {
  userId: text('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  data: text('data', { mode: 'json' }).$type<CardData>().notNull(),
  views: integer('views').notNull().default(0),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

/** Logos, photos and covers, already resized to WebP. Stored in the database so the site
 *  keeps working on hosts without a persistent disk. */
export const media = sqliteTable(
  'media',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    kind: text('kind', { enum: ['logo', 'avatar', 'cover'] }).notNull(),
    mime: text('mime').notNull(),
    bytes: blob('bytes', { mode: 'buffer' }).notNull(),
    width: integer('width').notNull(),
    height: integer('height').notNull(),
    createdAt: createdAt(),
  },
  (t) => [index('media_user_idx').on(t.userId)],
)

/** Opaque session tokens. Only the SHA-256 of the token is stored. */
export const sessions = sqliteTable(
  'sessions',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    kind: text('kind', { enum: ['mobile', 'web'] }).notNull(),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
    createdAt: createdAt(),
  },
  (t) => [index('sessions_user_idx').on(t.userId)],
)

export type User = typeof users.$inferSelect
