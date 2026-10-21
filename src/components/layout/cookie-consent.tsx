'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import { useTranslations } from 'next-intl'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { site } from '@/lib/site'

// Same key as the previous site, so visitors keep the choice they already made.
const STORAGE_KEY = 'pixel_cookie_consent'
const OPEN_EVENT = 'show-cookie-banner'
const CHANGE_EVENT = 'pixel-consent-change'

type Consent = 'accepted' | 'declined' | null

function readConsent(): Consent {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'accepted' || value === 'declined' ? value : null
  } catch {
    return null
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

function writeConsent(value: Exclude<Consent, null>) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Private mode: the choice simply isn't remembered.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/** GA4 only loads after an explicit "accept". */
export function ConsentAndAnalytics() {
  const t = useTranslations('Cookie')
  // "undecided" on the server so nothing flashes during hydration.
  const consent = useSyncExternalStore(subscribe, readConsent, () => 'pending' as const)
  const [reopened, setReopened] = useState(false)

  useEffect(() => {
    const open = () => setReopened(true)
    window.addEventListener(OPEN_EVENT, open)
    return () => window.removeEventListener(OPEN_EVENT, open)
  }, [])

  const choose = (value: Exclude<Consent, null>) => {
    writeConsent(value)
    setReopened(false)
  }

  const showBanner = consent === null || reopened

  return (
    <>
      {consent === 'accepted' ? <GoogleAnalytics gaId={site.gaId} /> : null}
      {showBanner ? (
        <section
          aria-label={t('title')}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-3xl flex-wrap items-center gap-x-6 gap-y-4 rounded-[1.25rem] border border-line bg-ink-2 p-5 shadow-2xl shadow-black/50 sm:p-6"
        >
          <p className="min-w-0 flex-[1_1_20rem] text-sm leading-relaxed text-lavender">
            {t('text')}{' '}
            <Link href="/politique-de-confidentialite" className="text-white underline underline-offset-4">
              {t('policy')}
            </Link>
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm" onClick={() => choose('declined')}>
              {t('decline')}
            </Button>
            <Button size="sm" onClick={() => choose('accepted')}>
              {t('accept')}
            </Button>
          </div>
        </section>
      ) : null}
    </>
  )
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className="hover:text-white">
      {label}
    </button>
  )
}
