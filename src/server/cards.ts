import 'server-only'
import { and, eq, lt, notInArray, sql } from 'drizzle-orm'
import { cache } from 'react'
import { site } from '@/lib/site'
import { type CardData, cardInputSchema, emptyCard } from './card-schema'
import { db, schema } from './db'
import type { User } from './db/schema'

/**
 * Base URL encoded in every QR code. Set CARD_BASE_URL once the final domain is chosen,
 * BEFORE business cards are printed: changing it later changes every QR code.
 */
export function cardBaseUrl() {
  return (process.env.CARD_BASE_URL ?? site.url).replace(/\/+$/, '')
}

export function cardUrl(username: string) {
  return `${cardBaseUrl()}/c/${username}`
}

export function mediaUrl(id: string | undefined) {
  return id ? `/api/media/${id}` : undefined
}

export async function getCardByUserId(userId: string) {
  const row = await db.query.cards.findFirst({ where: eq(schema.cards.userId, userId) })
  return row ?? null
}

/** Public lookup for the landing page; memoised per request (layout + page + metadata). */
export const getPublicCard = cache(async (username: string) => {
  const row = await db
    .select({ card: schema.cards, user: schema.users })
    .from(schema.cards)
    .innerJoin(schema.users, eq(schema.cards.userId, schema.users.id))
    .where(eq(schema.users.username, username.toLowerCase()))
    .get()
  if (!row || !row.user.active || row.user.role !== 'client') return null
  return { username: row.user.username, data: row.card.data, views: row.card.views }
})

export async function countView(username: string) {
  await db
    .update(schema.cards)
    .set({ views: sql`${schema.cards.views} + 1` })
    .where(
      eq(
        schema.cards.userId,
        db.select({ id: schema.users.id }).from(schema.users).where(eq(schema.users.username, username)),
      ),
    )
}

export async function createCardFor(user: Pick<User, 'id'>, displayName: string) {
  await db.insert(schema.cards).values({ userId: user.id, data: emptyCard(displayName) }).onConflictDoNothing()
}

/** Validates client input, keeps server-owned fields, and checks media ownership. */
export async function saveCard(userId: string, input: unknown) {
  const parsed = cardInputSchema.safeParse(input)
  if (!parsed.success) return { ok: false as const, issues: parsed.error.issues }

  const current = await getCardByUserId(userId)
  const owned = new Set(
    (
      await db.select({ id: schema.media.id }).from(schema.media).where(eq(schema.media.userId, userId))
    ).map((m) => m.id),
  )
  const data: CardData = {
    ...parsed.data,
    logoId: parsed.data.logoId && owned.has(parsed.data.logoId) ? parsed.data.logoId : undefined,
    avatarId: parsed.data.avatarId && owned.has(parsed.data.avatarId) ? parsed.data.avatarId : undefined,
    coverId: parsed.data.coverId && owned.has(parsed.data.coverId) ? parsed.data.coverId : undefined,
    palette: current?.data.palette,
  }

  await db
    .insert(schema.cards)
    .values({ userId, data })
    .onConflictDoUpdate({ target: schema.cards.userId, set: { data, updatedAt: new Date() } })
  await pruneMedia(userId, [data.logoId, data.avatarId, data.coverId])
  return { ok: true as const, data }
}

/** Drops replaced images. Recent uploads are kept: the app uploads first, saves second. */
async function pruneMedia(userId: string, keep: Array<string | undefined>) {
  const kept = keep.filter((id): id is string => Boolean(id))
  const anHourAgo = new Date(Date.now() - 60 * 60 * 1000)
  await db
    .delete(schema.media)
    .where(
      and(
        eq(schema.media.userId, userId),
        lt(schema.media.createdAt, anHourAgo),
        kept.length ? notInArray(schema.media.id, kept) : undefined,
      ),
    )
}

export async function setPalette(userId: string, palette: string[]) {
  const current = await getCardByUserId(userId)
  if (!current) return
  await db
    .update(schema.cards)
    .set({ data: { ...current.data, palette }, updatedAt: new Date() })
    .where(eq(schema.cards.userId, userId))
}

/** Shape returned to the mobile app. */
export function serializeCard(user: Pick<User, 'username'>, data: CardData, views = 0) {
  return {
    username: user.username,
    url: cardUrl(user.username),
    views,
    card: data,
    media: {
      logo: mediaUrl(data.logoId),
      avatar: mediaUrl(data.avatarId),
      cover: mediaUrl(data.coverId),
    },
  }
}
