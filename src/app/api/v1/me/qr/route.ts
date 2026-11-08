import { getApiUser } from '@/server/auth'
import { cardUrl } from '@/server/cards'
import { apiError } from '@/server/http'
import { qrOptionsFromSearch, qrResponse, renderQr } from '@/server/qr'

/** GET ?format=svg|png&size=2048&dark=000000&light=ffffff|transparent&download=1 */
export async function GET(request: Request) {
  const user = await getApiUser(request)
  if (!user) return apiError(401, 'unauthorized')

  const params = new URL(request.url).searchParams
  const rendered = await renderQr(cardUrl(user.username), qrOptionsFromSearch(params))
  return qrResponse(rendered, `qr-${user.username}`, params.has('download'))
}
