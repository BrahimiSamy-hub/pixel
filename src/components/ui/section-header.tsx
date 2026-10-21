import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { toneClasses, type Tone } from '@/lib/studios'

export function Eyebrow({
  index,
  children,
  tone = 'orange',
  className,
}: {
  index?: string
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3 text-label text-mist', className)}>
      {index ? <span className={toneClasses[tone].text}>{index}</span> : null}
      <span aria-hidden className="h-px w-7 bg-line-strong" />
      <span>{children}</span>
    </div>
  )
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  aside,
  tone,
  as: Heading = 'h2',
  className,
}: {
  index?: string
  eyebrow: ReactNode
  title: ReactNode
  aside?: ReactNode
  tone?: Tone
  as?: 'h1' | 'h2'
  className?: string
}) {
  return (
    <div className={cn('mb-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 md:mb-14', className)}>
      <div className="max-w-3xl">
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
        <Heading className="mt-5 text-balance text-h2">{title}</Heading>
      </div>
      {aside ? <div className="max-w-md text-base leading-relaxed text-mist md:text-[1.0625rem]">{aside}</div> : null}
    </div>
  )
}
