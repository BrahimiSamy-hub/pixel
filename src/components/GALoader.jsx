"use client"
import { useState, useEffect } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import CookieConsent, { getCookieConsent } from './CookieConsent'

const GA_ID = 'G-86F35330NS'

export default function GALoader() {
  const [gaEnabled, setGaEnabled] = useState(false)
  const [consentLoaded, setConsentLoaded] = useState(false)

  useEffect(() => {
    const stored = getCookieConsent()
    if (stored === 'accepted') {
      setGaEnabled(true)
    }
    setConsentLoaded(true)
  }, [])

  const handleAccept = () => {
    setGaEnabled(true)
  }

  const handleDecline = () => {
    setGaEnabled(false)
  }

  return (
    <>
      {gaEnabled && <GoogleAnalytics gaId={GA_ID} />}
      {consentLoaded && (
        <CookieConsent onAccept={handleAccept} onDecline={handleDecline} />
      )}
    </>
  )
}
