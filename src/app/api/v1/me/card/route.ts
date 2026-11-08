import { getApiUser } from '@/server/auth'
import { saveCard, serializeCard } from '@/server/cards'
import { apiError, json, readJson } from '@/server/http'

/** PUT CardInput → the saved card. Returns 422 with zod issues when invalid. */
export async function PUT(request: Request) {
  const user = await getApiUser(request)
  if (!user) return apiError(401, 'unauthorized')

  const result = await saveCard(user.id, await readJson(request))
  if (!result.ok) {
    return apiError(422, 'invalid_card', {
      issues: result.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
    })
  }
  return json(serializeCard(user, result.data))
}
