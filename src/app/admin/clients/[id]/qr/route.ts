import { eq } from 'drizzle-orm'
import { getAdmin } from '@/server/auth'
import { cardUrl } from '@/server/cards'
import { db, schema } from '@/server/db'
import { qrOptionsFromSearch, qrResponse, renderQr } from '@/server/qr'

export async function GET(request: Request, { params }: RouteContext<'/admin/clients/[id]/qr'>) {
  if (!(await getAdmin())) return new Response(null, { status: 401 })
  const { id } = await params
  const user = await db.query.users.findFirst({ where: eq(schema.users.id, id) })
  if (!user || user.role !== 'client') return new Response(null, { status: 404 })

  const search = new URL(request.url).searchParams
  const rendered = await renderQr(cardUrl(user.username), qrOptionsFromSearch(search))
  return qrResponse(rendered, `qr-${user.username}`, search.has('download'))
}
