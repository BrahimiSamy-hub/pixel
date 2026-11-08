import { z } from 'zod'

// Keep in sync with `pixel-mobile/src/lib/types.ts`.

export const cardLangs = ['fr', 'en', 'ar'] as const
export type CardLang = (typeof cardLangs)[number]

export const cardThemes = ['aurora', 'minimal', 'bold', 'card', 'elegant'] as const
export type CardTheme = (typeof cardThemes)[number]

export const socialPlatforms = [
  'instagram',
  'facebook',
  'tiktok',
  'linkedin',
  'x',
  'youtube',
  'snapchat',
  'telegram',
  'threads',
  'pinterest',
  'behance',
  'github',
] as const
export type SocialPlatform = (typeof socialPlatforms)[number]

const hex = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, 'Expected a #RRGGBB colour')
  .transform((v) => v.toLowerCase())

// Empty strings from forms become undefined so optional fields stay optional.
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined))

const url = z
  .string()
  .trim()
  .max(500)
  .transform((v) => (v && !/^[a-z][a-z0-9+.-]*:/i.test(v) ? `https://${v}` : v))
  .pipe(z.url({ protocol: /^https?$/ }))

const optionalUrl = z
  .union([z.literal(''), url])
  .optional()
  .transform((v) => (v ? v : undefined))

const phone = z
  .string()
  .trim()
  .min(4)
  .max(24)
  .regex(/^\+?[0-9 ().-]+$/, 'Invalid phone number')

const mediaId = z.uuid().optional()

/** What the client edits from the app. `palette` is computed by the server from the logo. */
export const cardInputSchema = z.object({
  displayName: z.string().trim().min(1).max(80),
  title: optionalText(80),
  company: optionalText(80),
  bio: optionalText(400),
  logoId: mediaId,
  avatarId: mediaId,
  coverId: mediaId,
  phones: z
    .array(z.object({ label: optionalText(30), number: phone }))
    .max(4)
    .default([]),
  emails: z
    .array(z.object({ label: optionalText(30), address: z.email().max(120) }))
    .max(3)
    .default([]),
  whatsapp: z.union([z.literal(''), phone]).optional().transform((v) => (v ? v : undefined)),
  website: optionalUrl,
  address: optionalText(200),
  mapsUrl: optionalUrl,
  socials: z
    .array(z.object({ platform: z.enum(socialPlatforms), url }))
    .max(12)
    .default([]),
  links: z
    .array(z.object({ label: z.string().trim().min(1).max(40), url }))
    .max(10)
    .default([]),
  theme: z.enum(cardThemes).default('aurora'),
  colors: z
    .object({ primary: hex, accent: hex })
    .default({ primary: '#ee7d22', accent: '#f6a43d' }),
  defaultLang: z.enum(cardLangs).default('fr'),
})

export type CardInput = z.input<typeof cardInputSchema>
export type CardData = z.output<typeof cardInputSchema> & {
  /** Colours read from the uploaded logo, offered as suggestions in the app. */
  palette?: string[]
}

export function emptyCard(displayName: string): CardData {
  return cardInputSchema.parse({ displayName })
}
