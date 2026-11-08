import 'server-only'
import { createHash, randomBytes } from 'node:crypto'
import { and, eq, gt } from 'drizzle-orm'
import { cookies, headers } from 'next/headers'
import { db, schema } from './db'
import type { User } from './db/schema'
import { normalizeUsername, verifyPassword } from './password'

const MOBILE_SESSION_DAYS = 90
const WEB_SESSION_DAYS = 7
export const ADMIN_COOKIE = 'pixel_admin'

const sha256 = (value: string) => createHash('sha256').update(value).digest('base64url')

// ---------------------------------------------------------------------------
// Login throttling: 8 failed attempts per username + IP per 15 minutes.
// In-memory, so it is per server instance; good enough for a small team app.
// ---------------------------------------------------------------------------
const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILURES = 8
const failures = new Map<string, { count: number; resetAt: number }>()

async function throttleKey(username: string) {
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'local'
  return `${username}|${ip}`
}

function isThrottled(key: string) {
  const entry = failures.get(key)
  if (!entry) return false
  if (entry.resetAt < Date.now()) {
    failures.delete(key)
    return false
  }
  return entry.count >= MAX_FAILURES
}

function recordFailure(key: string) {
  const entry = failures.get(key)
  if (!entry || entry.resetAt < Date.now()) failures.set(key, { count: 1, resetAt: Date.now() + WINDOW_MS })
  else entry.count++
}

export type LoginResult =
  | { ok: true; user: User }
  | { ok: false; reason: 'invalid' | 'throttled' | 'disabled' }

export async function checkCredentials(rawUsername: string, password: string): Promise<LoginResult> {
  const username = normalizeUsername(rawUsername)
  const key = await throttleKey(username)
  if (isThrottled(key)) return { ok: false, reason: 'throttled' }

  const user = await db.query.users.findFirst({ where: eq(schema.users.username, username) })
  // Verify against a dummy hash when the user is unknown so timing does not reveal usernames.
  const valid = await verifyPassword(
    password,
    user?.passwordHash ?? 'scrypt$32768$8$1$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
  )
  if (!user || !valid) {
    recordFailure(key)
    return { ok: false, reason: 'invalid' }
  }
  if (!user.active) return { ok: false, reason: 'disabled' }

  failures.delete(key)
  await db.update(schema.users).set({ lastLoginAt: new Date() }).where(eq(schema.users.id, user.id))
  return { ok: true, user }
}

export async function createSession(userId: string, kind: 'mobile' | 'web') {
  const token = randomBytes(32).toString('base64url')
  const days = kind === 'mobile' ? MOBILE_SESSION_DAYS : WEB_SESSION_DAYS
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  await db.insert(schema.sessions).values({ id: sha256(token), userId, kind, expiresAt })
  return { token, expiresAt }
}

export async function deleteSession(token: string) {
  await db.delete(schema.sessions).where(eq(schema.sessions.id, sha256(token)))
}

async function userForToken(token: string | undefined, kind: 'mobile' | 'web') {
  if (!token) return null
  const row = await db
    .select({ user: schema.users })
    .from(schema.sessions)
    .innerJoin(schema.users, eq(schema.sessions.userId, schema.users.id))
    .where(
      and(
        eq(schema.sessions.id, sha256(token)),
        eq(schema.sessions.kind, kind),
        gt(schema.sessions.expiresAt, new Date()),
      ),
    )
    .get()
  if (!row || !row.user.active) return null
  return row.user
}

export function bearerToken(request: Request) {
  const value = request.headers.get('authorization')
  return value?.startsWith('Bearer ') ? value.slice(7).trim() : undefined
}

/** The signed-in client of a mobile API request, or null. */
export async function getApiUser(request: Request) {
  const user = await userForToken(bearerToken(request), 'mobile')
  return user?.role === 'client' ? user : null
}

/** The signed-in admin of the web back office, or null. */
export async function getAdmin() {
  const store = await cookies()
  const user = await userForToken(store.get(ADMIN_COOKIE)?.value, 'web')
  return user?.role === 'admin' ? user : null
}
