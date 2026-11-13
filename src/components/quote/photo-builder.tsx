'use client'

import { addOnsFor, budgets, emptyPhoto, type FieldDef, type FieldValue, fieldsFor, formatValue, photo, photoAnswers, photoLines, type PhotoServiceId, photoServices, type PhotoState } from '@/shared/catalog/photo'
import { quoteText } from '@/shared/catalog/text'
import { buttonClass } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { ChoiceChips, type Contact, ContactBlock, emptyContact, Group, Notes, OptionRow, QSection, TextField, Ticket, useDraft, useL, useLang } from './kit'

const LAST = photo.steps.length - 1

/** "Build your project" (Photography_Video.pdf): services → categories → questions → add-ons → review → send. */
export function PhotoBuilder() {
  const L = useL()
  const lang = useLang()
  const [step, setStep] = useDraft('photo.step', 0)
  const [s, setS] = useDraft<PhotoState>('photo', emptyPhoto)
  const [project, setProject] = useDraft('photo.project', { name: '', description: '', location: '' })
  const [contact, setContact] = useDraft<Contact>('contact', emptyContact)
  const yesNo: [string, string] = [L(quoteText.yes), L(quoteText.no)]
  const chosen = photoServices.filter((x) => s.services.includes(x.id))

  const setAnswers = (id: PhotoServiceId, patch: { categories?: string[]; values?: Record<string, FieldValue> }) => {
    const cur = s.answers[id] ?? { categories: [], values: {} }
    setS({ ...s, answers: { ...s.answers, [id]: { categories: patch.categories ?? cur.categories, values: { ...cur.values, ...patch.values } } } })
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p className="text-label text-orange">{L(quoteText.step, { n: step + 1, total: photo.steps.length })}</p>
        <h3 className="text-2xl font-semibold tracking-[-0.02em]">{L(photo.steps[step] ?? photo.steps[0]!)}</h3>
        <div className="flex gap-1">
          {photo.steps.map((_, i) => (
            <span key={i} className={cn('h-1 flex-1 rounded-full', i <= step ? 'bg-orange' : 'bg-line')} />
          ))}
        </div>
        {step === 0 ? <p className="text-mist">{L(photo.intro)}</p> : null}
      </div>

      {step === 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(13rem,100%),1fr))] gap-3">
          {photoServices.map((svc) => {
            const on = s.services.includes(svc.id)
            return (
              <button key={svc.id} type="button" role="checkbox" aria-checked={on} onClick={() => setS({ ...s, services: on ? s.services.filter((x) => x !== svc.id) : [...s.services, svc.id] })} className={cn('flex min-h-28 flex-col justify-between gap-4 rounded-card border p-5 text-start transition-colors', on ? 'border-orange bg-orange text-ink' : 'border-line bg-ink-2 hover:border-line-strong')}>
                <span aria-hidden className="text-2xl">{on ? '✓' : '+'}</span>
                <span className="text-lg font-semibold">{L(svc.label)}</span>
              </button>
            )
          })}
        </div>
      ) : null}

      {step === 1
        ? chosen.map((svc) => (
            <QSection key={svc.id} title={L(svc.label)} hint={svc.multiCategory ? undefined : L(quoteText.maxChoices, { n: 1 })}>
              <Group>
                {svc.categories.map((cat) => {
                  const cats = s.answers[svc.id]?.categories ?? []
                  const on = cats.includes(cat.id)
                  return <OptionRow key={cat.id} kind={svc.multiCategory ? 'check' : 'radio'} label={L(cat.label)} hint={cat.hint ? L(cat.hint) : undefined} selected={on} onToggle={() => setAnswers(svc.id, { categories: on ? cats.filter((x) => x !== cat.id) : svc.multiCategory ? [...cats, cat.id] : [cat.id] })} />
                })}
              </Group>
            </QSection>
          ))
        : null}

      {step === 2
        ? chosen.map((svc) => {
            const a = s.answers[svc.id] ?? { categories: [], values: {} }
            return (
              <QSection key={svc.id} title={L(svc.label)}>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] gap-5">
                  {fieldsFor(svc, a.categories).map((f) => (
                    <Question key={f.id} id={`${svc.id}-${f.id}`} field={f} value={a.values[f.id]} onChange={(v) => setAnswers(svc.id, { values: { [f.id]: v } })} />
                  ))}
                </div>
              </QSection>
            )
          })
        : null}

      {step === 3 ? (
        addOnsFor(s.services).length ? (
          <Group>
            {addOnsFor(s.services).map((a) => {
              const on = s.addOns.includes(a.id)
              return <OptionRow key={a.id} label={L(a.label)} hint={L(a.hint)} price={L(quoteText.onQuote)} selected={on} onToggle={() => setS({ ...s, addOns: on ? s.addOns.filter((x) => x !== a.id) : [...s.addOns, a.id] })} />
            })}
          </Group>
        ) : (
          <p className="text-mist">{L(photo.noAddOns)}</p>
        )
      ) : null}

      {step === 4 ? (
        <div className="flex flex-col gap-4">
          {chosen.map((svc) => {
            const a = s.answers[svc.id] ?? { categories: [], values: {} }
            const cats = svc.categories.filter((c) => a.categories.includes(c.id)).map((c) => L(c.label))
            const answered = fieldsFor(svc, a.categories).map((f) => [L(f.label), formatValue(f, a.values[f.id], lang, yesNo)] as const).filter(([, v]) => v)
            return (
              <div key={svc.id} className="flex flex-col gap-1.5 rounded-card border border-line bg-ink-2 p-5">
                <p className="font-semibold">{L(svc.label)}</p>
                {cats.length ? <p className="text-sm text-orange">{cats.join(', ')}</p> : null}
                {answered.map(([k, v]) => (
                  <p key={k} className="text-sm text-lavender">
                    {k} : {v}
                  </p>
                ))}
              </div>
            )
          })}
          <button type="button" onClick={() => setStep(0)} className={buttonClass({ variant: 'secondary', size: 'sm', className: 'self-start' })}>
            {L(quoteText.addService)}
          </button>
        </div>
      ) : null}

      {step === LAST ? (
        <div className="flex flex-col gap-10">
          <QSection title={L(photo.project.name)}>
            <TextField id="pj-name" label={L(photo.project.name)} value={project.name} onChange={(name) => setProject({ ...project, name })} />
            <Notes id="pj-desc" label={L(photo.project.description)} value={project.description} onChange={(description) => setProject({ ...project, description })} />
            <TextField id="pj-loc" label={L(photo.project.location)} value={project.location} onChange={(location) => setProject({ ...project, location })} />
            <p className="text-sm text-mist">{L(photo.project.budget)}</p>
            <ChoiceChips
              options={budgets.map((b) => ({ value: b.id, label: L(b.label) }))}
              value={budgets.filter((b) => L(b.label) === contact.budget).map((b) => b.id)}
              onChange={(v) => {
                const b = budgets.find((x) => x.id === v[0])
                setContact({ ...contact, budget: b ? L(b.label) : '' })
              }}
            />
            <p className="text-[0.8125rem] text-mist">{L(photo.project.references)}</p>
          </QSection>
          <ContactBlock value={contact} onChange={setContact} />
          <Ticket
            request={{
              service: 'Pixel Photo Lab',
              answers: [{ label: L(photo.project.name), value: project.name }, { label: L(photo.project.location), value: project.location }, ...photoAnswers(s, lang, yesNo)],
              lines: photoLines(s, lang),
              notes: project.description,
              contact,
            }}
          />
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className={buttonClass({ variant: 'secondary' })}>
            {L(quoteText.back)}
          </button>
        ) : null}
        {step < LAST ? (
          <button type="button" disabled={!s.services.length} onClick={() => setStep(step + 1)} className={buttonClass()}>
            {step === 3 ? L(quoteText.review) : L(quoteText.next)}
          </button>
        ) : null}
      </div>
    </div>
  )
}

function Question({ id, field: f, value, onChange }: { id: string; field: FieldDef; value: FieldValue | undefined; onChange: (v: FieldValue) => void }) {
  const L = useL()
  if (f.kind === 'number' || f.kind === 'text') return <TextField id={id} type={f.kind === 'number' ? 'number' : 'text'} label={L(f.label)} value={typeof value === 'string' ? value : ''} onChange={onChange} />
  const options = f.kind === 'yesno' ? [{ value: 'yes', label: L(quoteText.yes) }, { value: 'no', label: L(quoteText.no) }] : (f.options ?? []).map((o) => ({ value: o.id, label: L(o.label) }))
  const current = f.kind === 'yesno' ? (value === undefined ? [] : [value ? 'yes' : 'no']) : Array.isArray(value) ? value : typeof value === 'string' && value ? [value] : []
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold">{L(f.label)}</p>
      <ChoiceChips options={options} value={current} max={f.kind === 'multi' ? options.length : 1} onChange={(v) => onChange(f.kind === 'yesno' ? v[0] === 'yes' : f.kind === 'multi' ? v : (v[0] ?? ''))} />
    </div>
  )
}
