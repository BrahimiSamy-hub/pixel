import { getApiUser } from '@/server/auth'
import { mediaUrl, setPalette } from '@/server/cards'
import { db, schema } from '@/server/db'
import { apiError, json } from '@/server/http'
import { extractPalette, isAcceptedImage, MAX_UPLOAD_BYTES, type MediaKind, processImage } from '@/server/images'

const KINDS = new Set<MediaKind>(['logo', 'avatar', 'cover'])

/**
 * POST multipart/form-data { file, kind: logo | avatar | cover } → { id, url, palette? }
 * The client then references the id in its card (logoId, avatarId, coverId) and saves.
 */
export async function POST(request: Request) {
  const user = await getApiUser(request)
  if (!user) return apiError(401, 'unauthorized')

  const form = await request.formData().catch(() => null)
  const file = form?.get('file')
  const kind = form?.get('kind') as MediaKind | null
  if (!(file instanceof File) || !kind || !KINDS.has(kind)) return apiError(400, 'invalid_body')
  if (file.size > MAX_UPLOAD_BYTES) return apiError(413, 'too_large')
  if (!isAcceptedImage(file.type)) return apiError(415, 'unsupported_type')

  const input = Buffer.from(await file.arrayBuffer())
  let image
  try {
    image = await processImage(input, kind)
  } catch {
    return apiError(415, 'unreadable_image')
  }

  const [row] = await db
    .insert(schema.media)
    .values({ userId: user.id, kind, mime: image.mime, bytes: image.bytes, width: image.width, height: image.height })
    .returning({ id: schema.media.id })
  if (!row) return apiError(500, 'insert_failed')

  let palette: string[] | undefined
  if (kind === 'logo') {
    palette = await extractPalette(image.bytes)
    await setPalette(user.id, palette)
  }

  return json({ id: row.id, url: mediaUrl(row.id), width: image.width, height: image.height, palette }, { status: 201 })
}
