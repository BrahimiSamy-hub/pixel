import { eq } from 'drizzle-orm'
import { db, schema } from '@/server/db'

/** Public: logos and photos shown on landing pages. Ids are random and content never
 *  changes for a given id (a new upload gets a new id), so it can be cached forever. */
export async function GET(_request: Request, { params }: RouteContext<'/api/media/[id]'>) {
  const { id } = await params
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response(null, { status: 404 })

  const row = await db.query.media.findFirst({ where: eq(schema.media.id, id) })
  if (!row) return new Response(null, { status: 404 })

  return new Response(new Uint8Array(row.bytes), {
    headers: {
      'Content-Type': row.mime,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
