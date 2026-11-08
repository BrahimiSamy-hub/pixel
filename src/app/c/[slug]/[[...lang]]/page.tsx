import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { after } from 'next/server'
import { CardPage } from '@/components/card/card-page'
import { themeVars } from '@/components/card/theme-vars'
import { cardBaseUrl, cardUrl, countView, getPublicCard } from '@/server/cards'
import { resolveCardRequest } from './resolve'

// Always fresh: clients see their edits immediately, and views are counted.
export const dynamic = 'force-dynamic'

export async function generateViewport({ params }: PageProps<'/c/[slug]/[[...lang]]'>): Promise<Viewport> {
  const card = await getPublicCard((await params).slug)
  return { themeColor: card ? themeVars(card.data.theme, card.data.colors)['--bg'] : '#0b0b10' }
}

export async function generateMetadata({ params }: PageProps<'/c/[slug]/[[...lang]]'>): Promise<Metadata> {
  const resolved = await resolveCardRequest(await params)
  if (!resolved) return {}
  const { card } = resolved
  const d = card.data
  const image = d.avatarId ?? d.logoId
  const description = d.bio ?? [d.title, d.company].filter(Boolean).join(' · ')
  return {
    metadataBase: new URL(cardBaseUrl()),
    title: d.displayName,
    description: description || undefined,
    alternates: {
      canonical: `/c/${card.username}`,
      languages: { fr: `/c/${card.username}/fr`, en: `/c/${card.username}/en`, ar: `/c/${card.username}/ar` },
    },
    openGraph: {
      type: 'profile',
      title: d.displayName,
      description: description || undefined,
      url: cardUrl(card.username),
      images: image ? [{ url: `/api/media/${image}` }] : undefined,
    },
    icons: d.logoId ? { icon: `/api/media/${d.logoId}` } : undefined,
  }
}

export default async function ClientCardPage({ params }: PageProps<'/c/[slug]/[[...lang]]'>) {
  const resolved = await resolveCardRequest(await params)
  if (!resolved) notFound()
  const { card, lang } = resolved

  // Count after the response is sent so it never slows the page down.
  after(() => countView(card.username))

  return <CardPage username={card.username} card={card.data} lang={lang} pageUrl={cardUrl(card.username)} />
}
