import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import alphaWolf from '@/assets/roles/loupAlpha.svg'
import blueWolf from '@/assets/roles/loupBleu.svg'
import redWolf from '@/assets/roles/loupRouge.svg'
import whiteWolf from '@/assets/roles/loupBlanc.svg'
import werewolf from '@/assets/roles/loup.svg'
import mysticWolf from '@/assets/roles/loupIcon.svg'
import villager from '@/assets/roles/villagois.svg'
import seer from '@/assets/roles/voyant.svg'
import witch from '@/assets/roles/sorciere.svg'
import guardian from '@/assets/roles/salvateur.svg'
import hunter from '@/assets/roles/chasseur.svg'
import cupid from '@/assets/roles/cupidon.svg'
import littleGirl from '@/assets/roles/petiteFille.svg'
import knight from '@/assets/roles/chevalier.svg'
import fox from '@/assets/roles/renard.svg'
import detective from '@/assets/roles/detective.svg'
import raven from '@/assets/roles/corbeau.svg'
import piper from '@/assets/roles/flutiste.svg'
import vampire from '@/assets/roles/vampire.svg'
import serialKiller from '@/assets/roles/tueurEnSerie.svg'
import { AddToCartButton } from '@/components/shop/add-to-cart-button'
import { WEREWOLF_PRODUCT_ID } from '@/components/shop/product-card'
import { RolesGrid, type Camp, type RoleCard } from '@/components/werewolf/roles-grid'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { HexBadge } from '@/components/ui/hex'
import { JsonLd } from '@/components/ui/json-ld'
import { Price } from '@/components/ui/price'
import { SectionHeader } from '@/components/ui/section-header'
import type { Locale } from '@/i18n/routing'
import { apiImageUrl, getProduct, productPriceFrom } from '@/lib/api'
import { cn } from '@/lib/cn'
import { staticPageMetadata } from '@/lib/seo'
import { productJsonLd } from '@/lib/structured-data'

export const revalidate = 3600

export async function generateMetadata({ params }: PageProps<'/[locale]/loup-garou-regles'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'werewolf', '/loup-garou-regles')
}

const roleList = [
  ['villager', 'village', villager],
  ['seer', 'village', seer],
  ['witch', 'village', witch],
  ['guardian', 'village', guardian],
  ['hunter', 'village', hunter],
  ['cupid', 'village', cupid],
  ['littleGirl', 'village', littleGirl],
  ['knight', 'village', knight],
  ['fox', 'village', fox],
  ['detective', 'village', detective],
  ['raven', 'village', raven],
  ['werewolf', 'wolves', werewolf],
  ['alphaWolf', 'wolves', alphaWolf],
  ['blueWolf', 'wolves', blueWolf],
  ['redWolf', 'wolves', redWolf],
  ['mysticWolf', 'wolves', mysticWolf],
  ['whiteWolf', 'solo', whiteWolf],
  ['piper', 'solo', piper],
  ['vampire', 'solo', vampire],
  ['serialKiller', 'solo', serialKiller],
] as const

const steps = [
  { key: 'setup', badge: '01', tone: '' },
  { key: 'night', badge: '02', tone: 'bg-violet text-ink' },
  { key: 'day', badge: '03', tone: 'bg-yellow text-ink' },
  { key: 'vote', badge: '04', tone: 'bg-red text-ink' },
  { key: 'mayor', badge: '★', tone: '' },
] as const

export default async function WerewolfPage({ params }: PageProps<'/[locale]/loup-garou-regles'>) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const [t, tNav, tMeta, product] = await Promise.all([
    getTranslations('Werewolf'),
    getTranslations('Nav'),
    getTranslations('Metadata.werewolf'),
    getProduct(WEREWOLF_PRODUCT_ID),
  ])
  const price = product ? productPriceFrom(product) : null
  const image = product ? apiImageUrl(product.mainImage) : null

  const roles: RoleCard[] = roleList.map(([id, camp, icon]) => ({
    id,
    camp: camp as Camp,
    icon,
    name: t(`roles.list.${id}.name`),
    text: t(`roles.list.${id}.text`),
    campLabel: t(`roles.campLabels.${camp}`),
  }))

  return (
    <>
      {product ? (
        <JsonLd
          data={productJsonLd({ locale, path: '/loup-garou-regles', name: t('title'), image, prices: price ? [price] : [], inStock: product.stock !== false, description: tMeta('description') })}
        />
      ) : null}
      <section className="border-b border-line">
        <Container className="flex flex-wrap items-center gap-14 pt-12 pb-14 md:pt-20 md:pb-24">
          <div className="relative aspect-square w-full max-w-140 min-w-0 flex-[1_1_25rem] overflow-hidden rounded-block bg-ink-2">
            {image ? <Image src={image} alt={t('boxAlt')} fill preload sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" /> : null}
          </div>
          <div className="flex min-w-0 flex-[1.1_1_30rem] flex-col gap-6">
            <Breadcrumbs items={[{ label: tNav('shop'), href: '/boutique' }, { label: t('games') }]} />
            <p className="text-label text-violet">{t('eyebrow')}</p>
            <h1 className="text-[clamp(2.5rem,5.4vw,5rem)] leading-none font-semibold tracking-[-0.045em] rtl:leading-[1.25]">{t('title')}</h1>
            <ul className="flex flex-wrap gap-2.5">
              {(t.raw('chips') as string[]).map((chip) => (
                <li key={chip} className="rounded-full border border-line bg-ink-2 px-3.5 py-2 text-sm">
                  {chip}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-5 pt-2">
              {price ? <Price value={price} className="text-[2.75rem] font-semibold tracking-[-0.04em]" /> : null}
              {product && price ? (
                <AddToCartButton
                  item={{ productId: product._id, name: t('title'), price, image }}
                  className="min-h-14.5 border-0 bg-orange px-8 text-ink hover:bg-orange-light"
                />
              ) : null}
              <ButtonLink href="#regles" variant="secondary" size="sm">
                {t('readRules')}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section id="regles" className="section-y scroll-mt-6">
        <Container>
          <SectionHeader index="01" tone="violet" eyebrow={t('rules.eyebrow')} title={t('rules.title')} />
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(17.5rem,100%),1fr))] gap-5">
            {steps.map((s) => (
              <li key={s.key} className="flex flex-col gap-3.5 rounded-card border border-line bg-ink-2 p-8">
                <HexBadge className={cn('h-14 w-12', s.tone)}>{s.badge}</HexBadge>
                <h3 className="text-[1.3125rem] font-semibold">{t(`rules.${s.key}.title`)}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-mist">{t(`rules.${s.key}.text`)}</p>
              </li>
            ))}
            <li className="flex flex-col gap-3.5 rounded-card bg-teal p-8 text-ink">
              <HexBadge className="h-14 w-12 bg-ink text-white">FIN</HexBadge>
              <h3 className="text-[1.3125rem] font-semibold">{t('rules.end.title')}</h3>
              <p className="text-[0.9375rem] leading-relaxed">{t('rules.end.text')}</p>
            </li>
          </ol>
        </Container>
      </section>

      <section className="section-y border-y border-line bg-ink-2">
        <Container>
          <SectionHeader index="02" tone="violet" eyebrow={t('roles.eyebrow')} title={t('roles.title')} />
          <RolesGrid
            roles={roles}
            label={t('roles.filter')}
            filters={(['all', 'village', 'wolves', 'solo'] as const).map((key) => ({ key, label: t(`roles.camps.${key}`) }))}
          />
          <p className="mt-8 text-[0.9375rem] text-mist">{t('roles.more')}</p>
        </Container>
      </section>
    </>
  )
}
