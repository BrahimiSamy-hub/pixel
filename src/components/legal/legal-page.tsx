import { getTranslations } from 'next-intl/server'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Container } from '@/components/ui/container'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { formatDate } from '@/lib/format'
import { site } from '@/lib/site'

type Doc = 'terms' | 'privacy'

const sectionsOf = {
  terms: ['acceptance', 'services', 'property', 'data', 'liability', 'law', 'changes', 'contact'],
  privacy: ['intro', 'collected', 'usage', 'retention', 'rights', 'contact'],
} as const

export async function LegalPage({ doc, locale }: { doc: Doc; locale: Locale }) {
  const t = await getTranslations('Legal')
  const sections = sectionsOf[doc]
  const title = t(`${doc}.title`)

  return (
    <>
      <section className="border-b border-line">
        <Container className="flex flex-col gap-5.5 pt-12 pb-10 md:pt-20">
          <Breadcrumbs items={[{ label: title }]} />
          <h1 className="text-[clamp(2.5rem,5.4vw,5rem)] leading-none font-semibold tracking-[-0.045em] rtl:leading-[1.25]">{title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav aria-label={t('toc')} className="flex gap-2">
              {(['terms', 'privacy'] as const).map((d) => (
                <Link
                  key={d}
                  href={d === 'terms' ? '/conditions-dutilisation' : '/politique-de-confidentialite'}
                  aria-current={d === doc ? 'page' : undefined}
                  className={cn(
                    'flex min-h-11 items-center rounded-full border px-4.5 text-[0.9375rem]',
                    d === doc ? 'border-orange bg-orange font-semibold text-ink' : 'border-line bg-ink-2 text-lavender hover:border-line-strong',
                  )}
                >
                  {t(`tabs.${d}`)}
                </Link>
              ))}
            </nav>
            {doc === 'privacy' ? (
              <p className="text-label text-mist">{t('updated', { date: formatDate(site.privacyUpdatedAt, locale) })}</p>
            ) : null}
          </div>
        </Container>
      </section>

      <Container className="flex flex-wrap items-start gap-x-18 gap-y-12 pt-12 pb-6">
        <nav aria-label={t('toc')} className="flex w-full flex-col gap-1 rounded-card border border-line bg-ink-2 p-6 md:sticky md:top-6 md:max-w-75 md:flex-[1_1_15rem]">
          <p className="mb-2.5 text-label text-orange">{t('toc')}</p>
          <ol className="flex flex-col">
            {sections.map((s, i) => (
              <li key={s}>
                <a href={`#${s}`} className="flex min-h-10 items-center gap-3 text-[0.9375rem] text-lavender hover:text-white">
                  <span className="font-mono text-mist">{String(i + 1).padStart(2, '0')}</span>
                  {t(`${doc}.${s}.title` as 'terms.acceptance.title')}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="flex max-w-190 min-w-0 flex-[999_1_35rem] flex-col gap-11 text-[1.0625rem] leading-[1.75] text-lavender">
          {sections.map((s, i) => {
            const key = `${doc}.${s}` as 'privacy.collected'
            const items = (s === 'collected' || s === 'usage') && doc === 'privacy' ? (t.raw(`${key}.items`) as string[]) : null
            const isContact = s === 'contact'
            return (
              <section key={s} id={s} className={cn('flex scroll-mt-6 flex-col gap-3', isContact && 'rounded-card border border-line bg-ink-2 p-7')}>
                <h2 className="text-2xl leading-snug font-semibold text-white">
                  <span className="me-3 font-mono text-orange">{String(i + 1).padStart(2, '0')}</span>
                  {t(`${key}.title`)}
                </h2>
                <p>
                  {t(`${key}.text`)}
                  {isContact ? (
                    <>
                      {' '}
                      <a href={`mailto:${site.email}`} className="text-white underline underline-offset-4">
                        {site.email}
                      </a>{' '}
                      ·{' '}
                      <a href={site.phone.href} className="text-white underline underline-offset-4" dir="ltr">
                        {site.phone.display}
                      </a>
                    </>
                  ) : null}
                </p>
                {items ? (
                  <ul className="flex list-disc flex-col gap-1.5 ps-6 marker:text-orange">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            )
          })}
        </article>
      </Container>
    </>
  )
}
