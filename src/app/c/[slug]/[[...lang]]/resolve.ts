import { cardLangs, type CardLang } from '@/server/card-schema'
import { getPublicCard } from '@/server/cards'

/** `/c/<slug>` uses the client's default language; `/c/<slug>/<fr|en|ar>` forces one. */
export async function resolveCardRequest({ slug, lang }: { slug: string; lang?: string[] }) {
  if (lang && (lang.length > 1 || !cardLangs.includes(lang[0] as CardLang))) return null
  const card = await getPublicCard(slug)
  if (!card) return null
  return { card, lang: (lang?.[0] as CardLang | undefined) ?? card.data.defaultLang }
}
