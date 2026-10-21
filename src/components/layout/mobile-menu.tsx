'use client'

import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { ButtonLink } from '@/components/ui/button'
import { usePathname } from '@/i18n/navigation'
import { site } from '@/lib/site'
import { LocaleSwitcher } from './locale-switcher'
import { NavLinks } from './nav-links'

/** Full-screen menu built on <dialog>: focus trap, Esc to close and inert background for free. */
export function MobileMenu() {
  const t = useTranslations('Nav')
  const dialog = useRef<HTMLDialogElement>(null)
  const pathname = usePathname()

  const close = () => dialog.current?.close()

  useEffect(() => {
    dialog.current?.close()
  }, [pathname])

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={t('openMenu')}
        aria-haspopup="dialog"
        className="flex size-12 items-center justify-center rounded-[14px] border border-line bg-ink-2 text-white lg:hidden"
      >
        <Menu size={20} strokeWidth={1.8} aria-hidden />
      </button>
      <dialog
        ref={dialog}
        aria-label={t('main')}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-white backdrop:bg-ink/80 open:flex open:flex-col"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-4 sm:px-10">
          <LocaleSwitcher />
          <button
            type="button"
            onClick={close}
            aria-label={t('closeMenu')}
            className="flex size-12 items-center justify-center rounded-[14px] border border-line bg-ink-2"
          >
            <X size={20} strokeWidth={1.8} aria-hidden />
          </button>
        </div>
        <nav aria-label={t('main')} className="flex-1 overflow-y-auto px-4 py-6 sm:px-10">
          <NavLinks onNavigate={close} className="flex-col items-stretch gap-1 [&_a]:min-h-14 [&_a]:text-base" />
        </nav>
        <div className="flex flex-col gap-3 border-t border-line px-4 py-6 sm:px-10">
          <ButtonLink href="/contact" onClick={close}>
            {t('cta')}
          </ButtonLink>
          <a href={site.phone.href} className="text-center text-sm text-mist" dir="ltr">
            {site.phone.display}
          </a>
        </div>
      </dialog>
    </>
  )
}
