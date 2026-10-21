import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from '@/components/ui/breadcrumbs'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/section-header'
import { cn } from '@/lib/cn'
import { toneClasses, type Tone } from '@/lib/studios'

/** Standard top of an inner page: breadcrumbs, eyebrow, display title with an accent, lead. */
export function PageHero({
  crumbs,
  eyebrow,
  eyebrowIndex,
  title,
  accent,
  lead,
  tone = 'orange',
  children,
  className,
}: {
  crumbs: Crumb[]
  eyebrow?: ReactNode
  eyebrowIndex?: string
  title: ReactNode
  accent?: ReactNode
  lead?: ReactNode
  tone?: Tone
  children?: ReactNode
  className?: string
}) {
  return (
    <section className={cn('pt-12 pb-10 md:pt-20 lg:pt-24', className)}>
      <Container className="flex flex-col gap-7">
        <Breadcrumbs items={crumbs} />
        {eyebrow ? (
          <Eyebrow index={eyebrowIndex} tone={tone}>
            {eyebrow}
          </Eyebrow>
        ) : null}
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <h1 className="min-w-0 flex-[1_1_40rem] text-balance text-h1">
            {title}
            {accent ? (
              <>
                {' '}
                <span className={toneClasses[tone].text}>{accent}</span>
              </>
            ) : null}
          </h1>
          {lead ? <p className="flex-[0_1_24rem] text-lead text-lavender">{lead}</p> : null}
        </div>
        {children}
      </Container>
    </section>
  )
}
