// No `server-only` here: scripts/create-admin.ts imports this module outside Next.
import { eq } from 'drizzle-orm'
import { emptyCard } from './card-schema'
import { db, schema } from './db'
import { hashPassword, MIN_PASSWORD_LENGTH, normalizeUsername, USERNAME_PATTERN } from './password'

export type CreateAccountError = 'invalid_username' | 'weak_password' | 'username_taken'

/**
 * Creates a login. For clients it also creates their landing page, so their QR code
 * (which encodes `/c/<username>`) exists from the very first second.
 */
export async function createAccount(input: {
  username: string
  password: string
  role: 'admin' | 'client'
  displayName?: string
}): Promise<{ ok: true; id: string; username: string } | { ok: false; error: CreateAccountError }> {
  const username = normalizeUsername(input.username)
  if (!USERNAME_PATTERN.test(username)) return { ok: false, error: 'invalid_username' }
  if (input.password.length < MIN_PASSWORD_LENGTH) return { ok: false, error: 'weak_password' }

  const existing = await db.query.users.findFirst({ where: eq(schema.users.username, username) })
  if (existing) return { ok: false, error: 'username_taken' }

  const passwordHash = await hashPassword(input.password)
  const id = await db.transaction(async (tx) => {
    const [user] = await tx
      .insert(schema.users)
      .values({ username, passwordHash, role: input.role })
      .returning({ id: schema.users.id })
    if (!user) throw new Error('User insert failed')
    if (input.role === 'client') {
      await tx.insert(schema.cards).values({ userId: user.id, data: emptyCard(input.displayName?.trim() || username) })
    }
    return user.id
  })
  return { ok: true, id, username }
}

export async function setPassword(userId: string, password: string) {
  if (password.length < MIN_PASSWORD_LENGTH) return false
  await db
    .update(schema.users)
    .set({ passwordHash: await hashPassword(password) })
    .where(eq(schema.users.id, userId))
  // Sign the account out everywhere.
  await db.delete(schema.sessions).where(eq(schema.sessions.userId, userId))
  return true
}
