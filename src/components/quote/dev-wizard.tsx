'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'
import { type L10n, l } from '@/shared/catalog/core'
import { dev, devAddons, devEmailPacks, devGroups, devLines, devPriceText, devProjects, devUnits, type DevState } from '@/shared/catalog/dev'
import { quoteText } from '@/shared/catalog/text'
import { buttonClass } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { type Contact, ContactBlock, emptyContact, formatDA, Group, Notes, OptionRow, QSection, QtyStepper, TextField, Ticket, useDraft, useL, useLang } from './kit'

const text = {
  steps: [l('Offre', 'Offer', 'العرض'), l('Projet', 'Project', 'المشروع'), l('Coordonnées', 'Contact', 'معلومات الاتصال'), l('Envoi', 'Send', 'الإرسال')],
  stepOf: l('Étape {n} sur {total}', 'Step {n} of {total}', 'الخطوة {n} من {total}'),
  offerTitle: l('Choisissez votre offre', 'Choose your offer', 'اختر عرضك'),
  offerHint: l('Vous pouvez en cocher plusieurs et ajouter des options.', 'You can pick several and add options.', 'يمكنك اختيار أكثر من عرض وإضافة خيارات.'),
  projectTitle: l('Parlez-nous de votre projet', 'Tell us about your project', 'حدثنا عن مشروعك'),
  projectHint: l('Quelques lignes suffisent : nous vous rappelons pour les détails.', 'A few lines are enough: we call you back for the details.', 'بضعة أسطر تكفي: سنتصل بك لمعرفة التفاصيل.'),
  sendTitle: l('Vérifiez et envoyez', 'Review and send', 'راجع وأرسل'),
  sendHint: l('Votre demande part sur WhatsApp, nous répondons sous 24 h avec un devis détaillé.', 'Your request goes out on WhatsApp; we reply within 24 hours with a detailed quote.', 'يُرسل طلبك عبر واتساب، ونرد خلال 24 ساعة بعرض سعر مفصل.'),
  next: l('Continuer', 'Continue', 'متابعة'),
  back: l('Retour', 'Back', 'رجوع'),
  pickOne: l('Choisissez au moins une offre pour continuer.', 'Pick at least one offer to continue.', 'اختر عرضاً واحداً على الأقل للمتابعة.'),
  missing: l('À compléter', 'Please fill in', 'يرجى ملء'),
  edit: l('Modifier', 'Edit', 'تعديل'),
} satisfies Record<string, L10n | L10n[]>

const STEPS = 4

/** Pixel Development quote, step by step: offer → project → contact → review & send. */
export function DevWizard({ initialOffer }: { initialOffer?: string }) {
  const L = useL()
  const lang = useLang()
  const [s, setS, loaded] = useDraft<DevState>('dev', { projects: [] })
  const [site, setSite] = useDraft('dev.site', '')
  const [goal, setGoal] = useDraft('dev.goal', '')
  const [contact, setContact] = useDraft<Contact>('contact', emptyContact)
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const top = useRef<HTMLDivElement>(null)

  // The offer picked on the development page (?offre=…) is ticked once the saved draft is restored.
  const applied = useRef(false)
  useEffect(() => {
    if (!loaded || applied.current) return
    applied.current = true
    if (initialOffer && devProjects.some((p) => p.id === initialOffer)) {
      setS((prev) => (prev.projects.includes(initialOffer) ? prev : { ...prev, projects: [...prev.projects, initialOffer] }))
    }
  }, [loaded, initialOffer, setS])

  const go = (n: number) => {
    setError('')
    setStep(n)
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const next = () => {
    if (step === 1 && !s.projects.length) return setError(L(text.pickOne))
    if (step === 3) {
      const miss = (['name', 'phone', 'city'] as const).filter((k) => !contact[k].trim()).map((k) => L(quoteText[k]))
      if (miss.length) return setError(`${L(text.missing)} : ${miss.join(', ')}`)
    }
    go(step + 1)
  }

  const toggle = (id: string) => setS({ ...s, projects: s.projects.includes(id) ? s.projects.filter((x) => x !== id) : [...s.projects, id] })
  const lines = devLines(s, lang)

  return (
    <div ref={top} className="flex scroll-mt-28 flex-col gap-10">
      {/* Progress */}
      <nav aria-label={L(text.stepOf, { n: step, total: STEPS })} className="flex flex-col gap-4">
        <p className="text-label text-mist">{L(text.stepOf, { n: step, total: STEPS })}</p>
        <ol className="grid grid-cols-4 gap-2">
          {text.steps.map((label, i) => {
            const n = i + 1
            const done = n < step
            return (
              <li key={label.fr} className="flex flex-col gap-2.5">
                <span aria-hidden className={cn('h-1.5 rounded-full transition-colors', n <= step ? 'bg-orange' : 'bg-line')} />
                <button
                  type="button"
                  disabled={!done}
                  onClick={() => go(n)}
                  aria-current={n === step ? 'step' : undefined}
                  className={cn('flex items-center gap-2 text-start text-sm', n === step ? 'font-semibold text-white' : done ? 'text-lavender hover:text-white' : 'text-mist')}
                >
                  <span className={cn('flex size-6 shrink-0 items-center justify-center rounded-full border text-xs', n <= step ? 'border-orange text-orange' : 'border-line-strong')}>{done ? '✓' : n}</span>
                  <span className="hidden sm:inline">{L(label)}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      {step === 1 ? (
        <QSection title={L(text.offerTitle)} hint={L(text.offerHint)}>
          <div className="flex flex-col gap-8">
            {devGroups.map((g) => (
              <div key={g.id} className="flex flex-col gap-2.5">
                <p className="text-label text-mist">{L(g.label)}</p>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(min(17rem,100%),1fr))] gap-4">
                  {devProjects
                    .filter((p) => p.group === g.id)
                    .map((p) => {
                      const on = s.projects.includes(p.id)
                      return (
                        <div key={p.id} className={cn('flex flex-col rounded-card border bg-ink-2 transition-colors', on ? 'border-orange' : 'border-line hover:border-line-strong')}>
                          <button type="button" role="checkbox" aria-checked={on} onClick={() => toggle(p.id)} className="flex flex-1 flex-col gap-3 p-6 text-start">
                            <span className="flex items-start justify-between gap-3">
                              <span className="text-xl font-semibold">{L(p.label)}</span>
                              <span aria-hidden className={cn('text-lg', on ? 'text-orange' : 'text-mist')}>{on ? '✓' : '+'}</span>
                            </span>
                            <span className="font-semibold text-orange">{devPriceText(p, lang)}</span>
                            <span className="text-[0.9375rem] text-mist">{L(p.desc)}</span>
                          </button>
                          {on ? <OfferOptions id={p.id} s={s} setS={setS} /> : null}
                        </div>
                      )
                    })}
                </div>
              </div>
            ))}
          </div>
        </QSection>
      ) : null}

      {step === 2 ? (
        <QSection title={L(text.projectTitle)} hint={L(text.projectHint)}>
          <Notes id="dev-goal" label={L(dev.goal)} value={goal} onChange={setGoal} />
          <TextField id="dev-site" type="url" label={L(dev.current)} value={site} onChange={setSite} dir="ltr" />
          <div className="flex flex-col gap-3 rounded-card border border-line bg-ink-2 p-6">
            <p className="font-semibold">{L(dev.provideTitle)}</p>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] gap-2 text-lavender">
              {dev.provide.map((x) => (
                <li key={x.fr}>— {L(x)}</li>
              ))}
            </ul>
            <p className="text-sm text-mist">{L(dev.provideNote)}</p>
          </div>
        </QSection>
      ) : null}

      {step === 3 ? <ContactBlock value={contact} onChange={setContact} /> : null}

      {step === 4 ? (
        <QSection title={L(text.sendTitle)} hint={L(text.sendHint)}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] gap-4 text-[0.9375rem]">
            <Recap title={L(text.projectTitle)} onEdit={() => go(2)} edit={L(text.edit)}>
              {goal.trim() || '—'}
              {site.trim() ? <span className="block text-mist" dir="ltr">{site}</span> : null}
            </Recap>
            <Recap title={L(quoteText.contactTitle)} onEdit={() => go(3)} edit={L(text.edit)}>
              {contact.name} · <span dir="ltr">{contact.phone}</span> · {contact.city}
            </Recap>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">{L(dev.paymentTitle)}</p>
            <div className="grid grid-cols-3 gap-4">
              {dev.payment.map((p) => (
                <div key={p.pct}>
                  <p className="text-2xl font-semibold text-orange">{p.pct} %</p>
                  <p className="text-sm text-mist">{L(p.label)}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-mist">{L(dev.paymentNote)}</p>
          </div>
          <Ticket request={{ service: 'Pixel Development', answers: [{ label: L(dev.current), value: site }], lines, notes: goal, contact }} />
        </QSection>
      ) : null}

      {error ? (
        <p role="alert" className="text-sm text-orange">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        {step > 1 ? (
          <button type="button" onClick={() => go(step - 1)} className={buttonClass({ variant: 'secondary', size: 'sm' })}>
            {L(text.back)}
          </button>
        ) : (
          <span />
        )}
        {step < STEPS ? (
          <button type="button" onClick={next} className={buttonClass({ size: 'sm' })}>
            {L(text.next)}
          </button>
        ) : null}
      </div>
    </div>
  )
}

/** Extra choices under a picked offer: dashboard, mobile app, hours, years, email pack. */
function OfferOptions({ id, s, setS }: { id: string; s: DevState; setS: (next: DevState) => void }) {
  const L = useL()
  const price = (amount: number, unit?: keyof typeof devUnits) => `${L(quoteText.price, { amount: formatDA(amount) })}${unit ? ` / ${L(devUnits[unit])}` : ''}`
  let body = null
  if (id === 'vitrine')
    body = (
      <Group>
        <OptionRow label={L(devAddons.dashboard.label)} price={`+ ${price(devAddons.dashboard.price)}`} selected={Boolean(s.dashboard)} onToggle={() => setS({ ...s, dashboard: !s.dashboard })} />
      </Group>
    )
  else if (id === 'ecommerce')
    body = (
      <Group>
        <OptionRow label={L(devAddons.ecomApp.label)} price={price(devAddons.ecomApp.monthlyTotal, 'month')} selected={Boolean(s.ecomApp)} onToggle={() => setS({ ...s, ecomApp: !s.ecomApp })} />
      </Group>
    )
  else if (id === 'consulting') body = <QtyStepper label={L(dev.hours)} value={s.hours ?? 1} onChange={(hours) => setS({ ...s, hours })} />
  else if (id === 'domain') body = <QtyStepper label={L(dev.years)} value={s.domainYears ?? 1} onChange={(domainYears) => setS({ ...s, domainYears })} />
  else if (id === 'emails')
    body = (
      <Group>
        {devEmailPacks.map((pack) => (
          <OptionRow key={pack.boxes} kind="radio" label={L(dev.emailBoxes, { n: pack.boxes })} price={price(pack.price, 'year')} selected={(s.emailBoxes ?? 5) === pack.boxes} onToggle={() => setS({ ...s, emailBoxes: pack.boxes })} />
        ))}
      </Group>
    )
  return body ? <div className="px-6 pb-6">{body}</div> : null
}

function Recap({ title, edit, onEdit, children }: { title: string; edit: string; onEdit: () => void; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-card border border-line bg-ink-2 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-label text-mist">{title}</p>
        <button type="button" onClick={onEdit} className="text-sm text-orange hover:underline">
          {edit}
        </button>
      </div>
      <p className="whitespace-pre-line">{children}</p>
    </div>
  )
}
