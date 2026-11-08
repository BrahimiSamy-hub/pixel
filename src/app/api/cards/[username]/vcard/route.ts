import { eq } from 'drizzle-orm'
import sharp from 'sharp'
import { cardUrl, getPublicCard } from '@/server/cards'
import { db, schema } from '@/server/db'
import { buildVCard } from '@/server/vcard'

/** "Save contact" button of the landing page. */
export async function GET(_request: Request, { params }: RouteContext<'/api/cards/[username]/vcard'>) {
  const { username } = await params
  const card = await getPublicCard(username)
  if (!card) return new Response(null, { status: 404 })

  // Contacts apps want a small JPEG.
  let photo: { base64: string; type: string } | undefined
  const photoId = card.data.avatarId ?? card.data.logoId
  if (photoId) {
    const row = await db.query.media.findFirst({ where: eq(schema.media.id, photoId) })
    if (row) {
      const jpeg = await sharp(row.bytes).flatten({ background: '#ffffff' }).resize(256, 256, { fit: 'cover' }).jpeg({ quality: 80 }).toBuffer()
      photo = { base64: jpeg.toString('base64'), type: 'JPEG' }
    }
  }

  const body = buildVCard(card.data, cardUrl(card.username), photo)
  return new Response(body, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${card.username}.vcf"`,
      'Cache-Control': 'no-store',
    },
  })
}
