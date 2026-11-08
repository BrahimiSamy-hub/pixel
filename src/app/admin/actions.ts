'use server'

import { randomInt } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createAccount, setPassword } from '@/server/accounts'
import { ADMIN_COOKIE, checkCredentials, createSession, deleteSession, getAdmin } from '@/server/auth'
import { db, schema } from '@/server/db'

export type FormState = { error?: string; ok?: string; password?: string; username?: string } | undefined

// No 0/O/1/l/I: passwords are read aloud or copied by hand to clients.
const ALPHABET = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
function generatePassword(length = 10) {
  return Array.from({ length }, () => ALPHABET[randomInt(ALPHABET.length)]).join('')
}

async function requireAdmin() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')
  return admin
}

export async function login(_prev: FormState, form: FormData): Promise<FormState> {
  const username = String(form.get('username') ?? '')
  const password = String(form.get('password') ?? '')
  const result = await checkCredentials(username, password)
  if (!result.ok) {
    return {
      error:
        result.reason === 'throttled'
          ? 'Trop de tentatives. Réessayez dans 15 minutes.'
          : result.reason === 'disabled'
            ? 'Ce compte est désactivé.'
            : 'Identifiant ou mot de passe incorrect.',
    }
  }
  if (result.user.role !== 'admin') return { error: 'Ce compte n’a pas accès au back-office.' }

  const session = await createSession(result.user.id, 'web')
  const store = await cookies()
  store.set(ADMIN_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    expires: session.expiresAt,
  })
  redirect('/admin')
}

export async function logout() {
  const store = await cookies()
  const token = store.get(ADMIN_COOKIE)?.value
  if (token) await deleteSession(token)
  store.delete({ name: ADMIN_COOKIE, path: '/admin' })
  redirect('/admin/login')
}

const createErrors = {
  invalid_username: 'Identifiant invalide : 3 à 32 caractères, lettres minuscules, chiffres et tirets.',
  weak_password: 'Mot de passe trop court (8 caractères minimum).',
  username_taken: 'Cet identifiant est déjà utilisé.',
} as const

export async function createClient(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin()
  const typed = String(form.get('password') ?? '').trim()
  const password = typed || generatePassword()
  const result = await createAccount({
    username: String(form.get('username') ?? ''),
    displayName: String(form.get('displayName') ?? ''),
    password,
    role: 'client',
  })
  if (!result.ok) return { error: createErrors[result.error] }
  revalidatePath('/admin')
  return { ok: 'Compte créé. Son QR code est prêt.', username: result.username, password }
}

export async function resetPassword(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin()
  const userId = String(form.get('userId') ?? '')
  const password = String(form.get('password') ?? '').trim() || generatePassword()
  if (!(await setPassword(userId, password))) return { error: 'Mot de passe trop court (8 caractères minimum).' }
  return { ok: 'Nouveau mot de passe enregistré. Le client est déconnecté de l’app.', password }
}

export async function toggleActive(form: FormData) {
  await requireAdmin()
  const userId = String(form.get('userId') ?? '')
  const user = await db.query.users.findFirst({ where: eq(schema.users.id, userId) })
  if (!user || user.role !== 'client') return
  await db.update(schema.users).set({ active: !user.active }).where(eq(schema.users.id, userId))
  if (user.active) await db.delete(schema.sessions).where(eq(schema.sessions.userId, userId))
  revalidatePath(`/admin/clients/${userId}`)
  revalidatePath('/admin')
}

export async function deleteClient(form: FormData) {
  await requireAdmin()
  const userId = String(form.get('userId') ?? '')
  const confirm = String(form.get('confirm') ?? '')
  const user = await db.query.users.findFirst({ where: eq(schema.users.id, userId) })
  if (!user || user.role !== 'client' || confirm !== user.username) return
  // Explicit deletes: SQLite only cascades when foreign keys are enabled on the connection.
  await db.transaction(async (tx) => {
    await tx.delete(schema.sessions).where(eq(schema.sessions.userId, userId))
    await tx.delete(schema.media).where(eq(schema.media.userId, userId))
    await tx.delete(schema.cards).where(eq(schema.cards.userId, userId))
    await tx.delete(schema.users).where(eq(schema.users.id, userId))
  })
  revalidatePath('/admin')
  redirect('/admin')
}
