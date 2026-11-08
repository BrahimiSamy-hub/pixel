import { z } from 'zod'
import { checkCredentials, createSession } from '@/server/auth'
import { getCardByUserId, serializeCard } from '@/server/cards'
import { apiError, json, readJson } from '@/server/http'

const bodySchema = z.object({
  username: z.string().min(1).max(64),
  password: z.string().min(1).max(200),
})

/** POST { username, password } → { token, expiresAt, profile } */
export async function POST(request: Request) {
  const body = bodySchema.safeParse(await readJson(request))
  if (!body.success) return apiError(400, 'invalid_body')

  const result = await checkCredentials(body.data.username, body.data.password)
  if (!result.ok) return apiError(result.reason === 'throttled' ? 429 : 401, result.reason)
  // Admins use the web back office; the app is for clients.
  if (result.user.role !== 'client') return apiError(403, 'not_a_client')

  const session = await createSession(result.user.id, 'mobile')
  const card = await getCardByUserId(result.user.id)
  return json({
    token: session.token,
    expiresAt: session.expiresAt.toISOString(),
    profile: card ? serializeCard(result.user, card.data, card.views) : null,
  })
}
