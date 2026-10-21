import Image from 'next/image'
import { useTranslations } from 'next-intl'
import astronaut from '@/assets/astro.png'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
  const t = useTranslations('NotFound')
  const tNav = useTranslations('Nav')

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(var(--color-line-strong)_1px,transparent_1px)] bg-size-[34px_34px]">
      <span aria-hidden className="absolute inset-s-[12%] top-[18%] size-3 rounded-full bg-yellow" />
      <span aria-hidden className="absolute inset-s-[22%] top-[70%] size-2.5 rounded-full bg-red" />
      <span aria-hidden className="absolute inset-e-[16%] top-[22%] size-3.5 rounded-full bg-teal" />
      <span aria-hidden className="absolute inset-e-[26%] bottom-[14%] size-2.5 rounded-full bg-lime" />
      <Container className="relative flex flex-wrap items-center justify-center gap-x-18 gap-y-10 py-14 md:py-30">
        <Image src={astronaut} alt={t('mascotAlt')} sizes="380px" className="h-auto w-80 max-w-[80vw] -rotate-12 md:w-95" />
        <div className="flex max-w-150 min-w-0 flex-[1_1_27.5rem] flex-col gap-6">
          <p aria-label={t('label')} className="flex items-center gap-1 text-[clamp(6rem,14vw,12.5rem)] leading-[0.85] font-bold tracking-[-0.06em]" dir="ltr">
            <span aria-hidden>4</span>
            <span aria-hidden className="mx-[0.04em] inline-block h-[0.8em] w-[0.7em] bg-linear-135 from-orange-deep via-[#e4610c] to-orange-light clip-hex" />
            <span aria-hidden>4</span>
          </p>
          <h1 className="text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.035em]">{t('title')}</h1>
          <p className="text-lead text-lavender">{t('text')}</p>
          <div className="flex flex-wrap gap-3.5">
            <ButtonLink href="/">{t('home')}</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              {t('contact')}
            </ButtonLink>
          </div>
          <nav aria-label={t('popular')} className="flex flex-wrap gap-x-5 gap-y-2.5 border-t border-line pt-5 text-[0.9375rem]">
            <span className="text-mist">{t('popular')}</span>
            <Link href="/services" className="underline underline-offset-4">{tNav('services')}</Link>
            <Link href="/portfolio" className="underline underline-offset-4">{tNav('portfolio')}</Link>
            <Link href="/boutique" className="underline underline-offset-4">{tNav('shop')}</Link>
          </nav>
        </div>
      </Container>
    </section>
  )
}
