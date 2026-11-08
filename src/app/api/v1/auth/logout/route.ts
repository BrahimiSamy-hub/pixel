import { bearerToken, deleteSession } from '@/server/auth'
import { json } from '@/server/http'

export async function POST(request: Request) {
  const token = bearerToken(request)
  if (token) await deleteSession(token)
  return json({ ok: true })
}
