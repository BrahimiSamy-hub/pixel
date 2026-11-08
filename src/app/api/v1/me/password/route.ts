import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { getApiUser } from '@/server/auth'
import { db, schema } from '@/server/db'
import { apiError, json, readJson } from '@/server/http'
import { hashPassword, MIN_PASSWORD_LENGTH, verifyPassword } from '@/server/password'

const bodySchema = z.object({
  current: z.string().min(1).max(200),
  next: z.string().min(MIN_PASSWORD_LENGTH).max(200),
})

/** PUT { current, next } — lets a client replace the password Pixel gave them. */
export async function PUT(request: Request) {
  const user = await getApiUser(request)
  if (!user) return apiError(401, 'unauthorized')

  const body = bodySchema.safeParse(await readJson(request))
  if (!body.success) return apiError(400, 'invalid_body')
  if (!(await verifyPassword(body.data.current, user.passwordHash))) return apiError(403, 'wrong_password')

  await db
    .update(schema.users)
    .set({ passwordHash: await hashPassword(body.data.next) })
    .where(eq(schema.users.id, user.id))
  return json({ ok: true })
}
