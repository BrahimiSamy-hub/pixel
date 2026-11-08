import { getApiUser } from '@/server/auth'
import { createCardFor, getCardByUserId, serializeCard } from '@/server/cards'
import { apiError, json } from '@/server/http'

/** GET → the signed-in client's card, URL and media links. */
export async function GET(request: Request) {
  const user = await getApiUser(request)
  if (!user) return apiError(401, 'unauthorized')

  let card = await getCardByUserId(user.id)
  if (!card) {
    await createCardFor(user, user.username)
    card = await getCardByUserId(user.id)
  }
  if (!card) return apiError(500, 'card_missing')
  return json(serializeCard(user, card.data, card.views))
}
