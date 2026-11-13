'use client'

import { useState } from 'react'
import {
  ads,
  adsLines,
  type AdsState,
  type CreativeTab,
  creativeTabs,
  emptyLogo,
  emptyMenu,
  emptyPrint,
  logo,
  logoLines,
  type LogoState,
  menuLines,
  menus,
  type MenuState,
  print,
  printLines,
  type PrintState,
} from '@/shared/catalog/creative'
import type { L10n } from '@/shared/catalog/core'
import { quoteText } from '@/shared/catalog/text'
import { cn } from '@/lib/cn'
import { ChoiceChips, type Contact, ContactBlock, DimensionFields, emptyContact, Group, Notes, OptionRow, QSection, QtyStepper, TextField, Ticket, useDraft, useL, useLang, usePriceText } from './kit'

type L = ReturnType<typeof useL>
const opts = <K extends string>(list: readonly { id: K; label: L10n }[], L: L) => list.map((o) => ({ value: o.id, label: L(o.label) }))
const names = (list: readonly { id: string; label: L10n }[], ids: readonly string[], L: L) => list.filter((o) => ids.includes(o.id)).map((o) => L(o.label)).join(', ')

/** Pixel Creative: logo brief, print & cut, menus, advertising works; everything adds up in one request. */
export function CreativeBuilder() {
  const L = useL()
  const lang = useLang()
  const [tab, setTab] = useState<CreativeTab>('logo')
  const [lg, setLogo] = useDraft<LogoState>('creative.logo', emptyLogo)
  const [pr, setPrint] = useDraft<PrintState>('creative.print', emptyPrint)
  const [mn, setMenu] = useDraft<MenuState>('creative.menu', emptyMenu)
  const [ad, setAds] = useDraft<AdsState>('creative.ads', {})
  const [notes, setNotes] = useDraft('creative.notes', '')
  const [contact, setContact] = useDraft<Contact>('contact', emptyContact)

  const lines = [...logoLines(lg, lang), ...printLines(pr, lang), ...menuLines(mn, lang), ...adsLines(ad, lang)]
  const b = lg.brand
  const answers = [
    { label: L(logo.brand.name), value: b.name },
    { label: L(logo.brand.slogan), value: b.slogan },
    { label: L(logo.brand.sector), value: b.sector },
    { label: L(logo.brand.audience), value: b.audience },
    { label: L(logo.brand.words), value: b.words },
    { label: L(logo.typesTitle), value: names(logo.types, lg.types, L) },
    { label: L(logo.directionTitle), value: names(logo.directions, lg.directions, L) },
    { label: L(logo.usesTitle), value: names(logo.uses, lg.uses, L) },
    { label: L(logo.brand.colors), value: b.colors },
    { label: L(logo.brand.refs), value: b.refs },
    { label: L(logo.brand.avoid), value: b.avoid },
    { label: 'IA', value: lg.aiLogo ? L(logo.aiLogo) : '' },
    { label: L(print.cutColor), value: pr.cutColor },
    { label: L(print.cutThickness), value: pr.cutThickness },
    { label: L(print.cutTitle), value: names(print.cutTypes, pr.cutTypes, L) },
    { label: L(print.uvSupportTitle), value: names(print.uvSupports, pr.uvSupport ? [pr.uvSupport] : [], L) },
    { label: L(menus.orientationTitle), value: names(menus.orientations, mn.orientation ? [mn.orientation] : [], L) },
    { label: L(menus.custom), value: mn.custom },
    { label: L(menus.finishesTitle), value: names(menus.finishes, mn.finishes, L) },
    { label: L(menus.designTitle), value: mn.design === 'own' ? L(menus.designOwn) : mn.design === 'pixel' ? L(menus.designPixel) : '' },
  ]

  return (
    <div className="flex flex-col gap-12">
      <div role="tablist" className="flex flex-wrap gap-2">
        {creativeTabs.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={tab === x.id} onClick={() => setTab(x.id)} className={cn('clip-chamfer-sm min-h-12 ps-5 pe-9 font-mono font-bold tracking-[0.12em] uppercase transition-colors', tab === x.id ? 'bg-orange text-ink' : 'bg-ink-3 text-white hover:bg-line-strong')}>
            {L(x.label)}
          </button>
        ))}
      </div>

      {tab === 'logo' ? <LogoTab s={lg} set={(p) => setLogo({ ...lg, ...p })} /> : null}
      {tab === 'print' ? <PrintTab s={pr} set={(p) => setPrint({ ...pr, ...p })} /> : null}
      {tab === 'menus' ? <MenusTab s={mn} set={(p) => setMenu({ ...mn, ...p })} /> : null}
      {tab === 'ads' ? <AdsTab s={ad} onChange={setAds} /> : null}

      <Notes id="creative-notes" label={L(ads.notes)} value={notes} onChange={setNotes} />
      <ContactBlock value={contact} onChange={setContact} />
      <Ticket request={{ service: 'Pixel Creative', answers, lines, notes, contact }} />
    </div>
  )
}

function LogoTab({ s, set }: { s: LogoState; set: (p: Partial<LogoState>) => void }) {
  const L = useL()
  const brand = (k: keyof LogoState['brand']) => (v: string) => set({ brand: { ...s.brand, [k]: v } })
  return (
    <div className="flex flex-col gap-10">
      <QSection title={L(logo.title)} hint={L(logo.intro)}>
        <Group>
          {logo.nature.map((n) => (
            <OptionRow key={n.id} kind="radio" label={L(n.label)} hint={L(n.hint)} price={n.id === 'modern' ? L(quoteText.onQuote) : undefined} selected={s.nature === n.id} onToggle={() => set({ nature: s.nature === n.id ? null : n.id })} />
          ))}
          <OptionRow label={L(logo.aiLogo)} hint={L(logo.aiNote)} selected={s.aiLogo} onToggle={() => set({ aiLogo: !s.aiLogo })} />
        </Group>
      </QSection>
      <QSection title={L(logo.brand.title)}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] gap-4">
          <TextField id="lg-name" label={L(logo.brand.name)} value={s.brand.name} onChange={brand('name')} />
          <TextField id="lg-slogan" label={L(logo.brand.slogan)} value={s.brand.slogan} onChange={brand('slogan')} />
          <TextField id="lg-sector" label={L(logo.brand.sector)} value={s.brand.sector} onChange={brand('sector')} />
          <TextField id="lg-aud" label={L(logo.brand.audience)} value={s.brand.audience} onChange={brand('audience')} />
          <TextField id="lg-words" label={L(logo.brand.words)} value={s.brand.words} onChange={brand('words')} />
        </div>
      </QSection>
      <QSection title={L(logo.typesTitle)} hint={L(quoteText.maxChoices, { n: 2 })}>
        <Group>
          {logo.types.map((x) => {
            const on = s.types.includes(x.id)
            return <OptionRow key={x.id} label={L(x.label)} hint={L(x.hint)} selected={on} disabled={!on && s.types.length >= 2} onToggle={() => set({ types: on ? s.types.filter((k) => k !== x.id) : [...s.types, x.id] })} />
          })}
        </Group>
      </QSection>
      <QSection title={L(logo.directionTitle)}>
        <ChoiceChips options={opts(logo.directions, L)} value={s.directions} onChange={(directions) => set({ directions })} max={logo.directions.length} />
        <TextField id="lg-colors" label={L(logo.brand.colors)} value={s.brand.colors} onChange={brand('colors')} />
        <TextField id="lg-refs" label={L(logo.brand.refs)} value={s.brand.refs} onChange={brand('refs')} multiline />
        <TextField id="lg-avoid" label={L(logo.brand.avoid)} value={s.brand.avoid} onChange={brand('avoid')} multiline />
      </QSection>
      <QSection title={L(logo.usesTitle)} hint={L(logo.advice)}>
        <ChoiceChips options={opts(logo.uses, L)} value={s.uses} onChange={(uses) => set({ uses })} max={logo.uses.length} />
      </QSection>
      <QSection title={L(logo.socialTitle)}>
        <Group>
          <OptionRow label={L(logo.animation)} price={L(quoteText.onQuote)} selected={s.animation} onToggle={() => set({ animation: !s.animation })} />
          {logo.socialPacks.map((n) => (
            <OptionRow key={n} kind="radio" label={L(logo.socialPack, { n })} price={L(quoteText.onQuote)} selected={s.socialPack === n} onToggle={() => set({ socialPack: s.socialPack === n ? null : n })} />
          ))}
        </Group>
      </QSection>
    </div>
  )
}

function PrintTab({ s, set }: { s: PrintState; set: (p: Partial<PrintState>) => void }) {
  const L = useL()
  const price = usePriceText()
  const isCut = s.service === 'pmma' || s.service === 'alucobond' || s.service === 'forex'
  const isUv = s.service === 'uv' || s.service === 'uvSupport'
  const options = s.service === 'sticker' ? print.stickerOptions : s.service === 'tarp' ? print.tarpOptions : null
  return (
    <div className="flex flex-col gap-10">
      <QSection title={L(print.title)} hint={L(print.intro)}>
        <Group>
          {print.services.map((x) => {
            const billing: { perM2?: number; indicative?: L10n } = x.billing
            const tag = billing.perM2 ? price(billing.perM2, 'm2') : billing.indicative ? L(billing.indicative) : price(null)
            return <OptionRow key={x.id} kind="radio" label={L(x.label)} hint={L(x.hint)} price={tag} selected={s.service === x.id} onToggle={() => set({ service: s.service === x.id ? null : x.id, option: null })} />
          })}
        </Group>
      </QSection>
      {s.service ? (
        <QSection title={L({ fr: 'Dimensions et quantité', en: 'Size and quantity', ar: 'المقاسات والكمية' })} hint={L(print.formula)}>
          <DimensionFields idPrefix="print" w={s.w} h={s.h} qty={s.qty} onChange={(d) => set(d)} />
        </QSection>
      ) : null}
      {options ? (
        <QSection title={L(print.optionsTitle)}>
          <Group>
            {options.map((o) => (
              <OptionRow key={o.id} kind="radio" label={L(o.label)} hint={'hint' in o ? L(o.hint) : undefined} price={'price' in o ? price(null) : undefined} selected={s.option === o.id} onToggle={() => set({ option: s.option === o.id ? null : o.id })} />
            ))}
          </Group>
        </QSection>
      ) : null}
      {isCut || isUv ? (
        <QSection title={L(print.cutTitle)}>
          <div className="flex flex-wrap gap-4">
            <TextField id="cut-color" label={L(print.cutColor)} value={s.cutColor} onChange={(cutColor) => set({ cutColor })} />
            <TextField id="cut-thick" label={L(print.cutThickness)} value={s.cutThickness} onChange={(cutThickness) => set({ cutThickness })} />
          </div>
          <ChoiceChips options={opts(print.cutTypes, L)} value={s.cutTypes} onChange={(cutTypes) => set({ cutTypes })} max={print.cutTypes.length} />
        </QSection>
      ) : null}
      {isUv ? (
        <QSection title={L(print.uvSupportTitle)}>
          <ChoiceChips options={opts(print.uvSupports, L)} value={s.uvSupport ? [s.uvSupport] : []} onChange={(v) => set({ uvSupport: v[0] ?? null })} />
          <ChoiceChips options={opts(print.whiteLayer, L)} value={s.whiteLayer ? [s.whiteLayer] : []} onChange={(v) => set({ whiteLayer: v[0] ?? null })} />
        </QSection>
      ) : null}
      {s.service ? (
        <QSection title={L(print.fileTitle)}>
          <Group>
            {print.files.map((f) => (
              <OptionRow key={f.id} kind="radio" label={L(f.label)} hint={'hint' in f ? L(f.hint) : undefined} selected={s.file === f.id} onToggle={() => set({ file: s.file === f.id ? null : f.id })} />
            ))}
          </Group>
        </QSection>
      ) : null}
    </div>
  )
}

function MenusTab({ s, set }: { s: MenuState; set: (p: Partial<MenuState>) => void }) {
  const L = useL()
  const price = usePriceText()
  const type = menus.types.find((x) => x.id === s.type)
  return (
    <div className="flex flex-col gap-10">
      <QSection title={L(menus.title)} hint={L(menus.intro)}>
        <Group>
          {menus.types.map((x) => (
            <OptionRow key={x.id} kind="radio" label={L(x.label)} hint={L(x.hint)} price={price(x.price, 'unit')} selected={s.type === x.id} onToggle={() => set({ type: s.type === x.id ? null : x.id })}>
              <QtyStepper label={L(menus.qty)} value={s.qty} onChange={(qty) => set({ qty })} />
              {x.design === 'book' ? <QtyStepper label={L(menus.pages)} value={s.pages} onChange={(pages) => set({ pages })} /> : null}
            </OptionRow>
          ))}
        </Group>
      </QSection>
      {type ? (
        <>
          <QSection title={L(menus.orientationTitle)}>
            <ChoiceChips options={opts(menus.orientations, L)} value={s.orientation ? [s.orientation] : []} onChange={(v) => set({ orientation: v[0] ?? null })} />
            <TextField id="menu-custom" label={L(menus.custom)} value={s.custom} onChange={(custom) => set({ custom })} />
          </QSection>
          <QSection title={L(menus.finishesTitle)}>
            <ChoiceChips options={opts(menus.finishes, L)} value={s.finishes} onChange={(finishes) => set({ finishes })} max={menus.finishes.length} />
          </QSection>
          <QSection title={L(menus.designTitle)} hint={L(menus.designNote)}>
            <Group>
              <OptionRow kind="radio" label={L(menus.designOwn)} selected={s.design === 'own'} onToggle={() => set({ design: s.design === 'own' ? null : 'own' })} />
              <OptionRow
                kind="radio"
                label={L(menus.designPixel)}
                price={type.design === 'quote' ? price(null) : type.design === 'book' ? price(menus.designFees.book, 'page') : price(menus.designFees[type.design])}
                selected={s.design === 'pixel'}
                onToggle={() => set({ design: s.design === 'pixel' ? null : 'pixel' })}
              />
            </Group>
          </QSection>
        </>
      ) : null}
    </div>
  )
}

function AdsTab({ s, onChange }: { s: AdsState; onChange: (s: AdsState) => void }) {
  const L = useL()
  const price = usePriceText()
  return (
    <QSection title={L(ads.title)} hint={L(ads.intro)}>
      <Group>
        {ads.items.map((item) => {
          const pick = s[item.id]
          const formats: readonly string[] = 'formats' in item ? item.formats : []
          const hint = ['hint' in item ? L(item.hint) : null, item.min > 1 ? L(quoteText.min, { n: item.min }) : null].filter(Boolean).join(' · ')
          return (
            <OptionRow
              key={item.id}
              label={L(item.label)}
              hint={hint || undefined}
              price={price(item.price, item.price ? 'piece' : undefined)}
              selected={Boolean(pick)}
              onToggle={() => {
                const next = { ...s }
                if (pick) delete next[item.id]
                else next[item.id] = { qty: item.min, format: formats[0] ?? null }
                onChange(next)
              }}
            >
              {pick && formats.length ? <ChoiceChips options={formats.map((f) => ({ value: f, label: f }))} value={pick.format ? [pick.format] : []} onChange={(v) => onChange({ ...s, [item.id]: { ...pick, format: v[0] ?? null } })} /> : null}
              {pick ? <QtyStepper label={L(quoteText.qty)} value={pick.qty} min={item.min} step={item.min >= 500 ? 100 : 1} onChange={(qty) => onChange({ ...s, [item.id]: { ...pick, qty } })} /> : null}
            </OptionRow>
          )
        })}
      </Group>
    </QSection>
  )
}
