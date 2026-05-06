"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@/navigation'
import { FaCookieBite, FaTimes, FaCheck, FaShieldAlt } from 'react-icons/fa'

const COOKIE_KEY = 'pixel_cookie_consent'

export function getCookieConsent() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(COOKIE_KEY)
}

export function setCookieConsent(value) {
  localStorage.setItem(COOKIE_KEY, value)
}

export function resetCookieConsent() {
  localStorage.removeItem(COOKIE_KEY)
  window.dispatchEvent(new CustomEvent('show-cookie-banner'))
}

export default function CookieConsent({ onAccept, onDecline }) {
  const [visible, setVisible] = useState(false)
  const [deciding, setDeciding] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(null)

  useEffect(() => {
    const stored = getCookieConsent()
    setCurrentStatus(stored)

    if (!stored) {
      // Small delay so banner doesn't flash instantly on load
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    } else if (stored === 'accepted' && onAccept) {
      onAccept()
    }
  }, [])

  // Listen for manual re-open trigger (e.g. from footer "Gérer les cookies" button)
  useEffect(() => {
    const handleShow = () => {
      setDeciding(false)
      setCurrentStatus(getCookieConsent())
      setVisible(true)
    }
    window.addEventListener('show-cookie-banner', handleShow)
    return () => window.removeEventListener('show-cookie-banner', handleShow)
  }, [])

  const handleAccept = () => {
    setDeciding(true)
    setCookieConsent('accepted')
    setCurrentStatus('accepted')
    if (onAccept) onAccept()
    setTimeout(() => setVisible(false), 300)
  }

  const handleDecline = () => {
    setDeciding(true)
    setCookieConsent('declined')
    setCurrentStatus('declined')
    if (onDecline) onDecline()
    setTimeout(() => setVisible(false), 300)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[9999]"
          role="dialog"
          aria-label="Gestion des cookies"
          aria-modal="true"
          id="cookie-consent-banner"
        >
          <div className="relative bg-n-8 border border-n-6 rounded-2xl shadow-2xl overflow-hidden">
            {/* Accent gradient bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#F17A28] via-[#ff9d5c] to-[#F17A28]" />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#F17A28]/15 flex items-center justify-center">
                  <FaCookieBite className="text-[#F17A28] text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-bold text-n-1 mb-0.5 flex items-center gap-1.5">
                    <FaShieldAlt className="text-[#F17A28] text-xs" />
                    Votre vie privée nous tient à cœur
                  </h2>
                  <p className="text-xs text-n-3 leading-relaxed">
                    Nous utilisons des cookies pour analyser l&apos;audience et améliorer votre expérience.
                    En acceptant, vous autorisez Google Analytics à collecter des données anonymes.
                  </p>
                </div>
              </div>

              {/* Current status badge */}
              {currentStatus && (
                <div className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full mb-3 ${
                  currentStatus === 'accepted'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {currentStatus === 'accepted' ? (
                    <><FaCheck className="text-[8px]" /> Analytics activés</>
                  ) : (
                    <><FaTimes className="text-[8px]" /> Analytics désactivés</>
                  )}
                </div>
              )}

              {/* Links */}
              <p className="text-xs text-n-4 mb-4">
                En savoir plus :{' '}
                <Link
                  href="/politique-de-confidentialite"
                  className="text-[#F17A28] hover:underline font-medium"
                  id="cookie-privacy-link"
                >
                  Politique de confidentialité
                </Link>
                {' · '}
                <Link
                  href="/conditions-dutilisation"
                  className="text-[#F17A28] hover:underline font-medium"
                  id="cookie-terms-link"
                >
                  Conditions d&apos;utilisation
                </Link>
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  id="cookie-accept-btn"
                  onClick={handleAccept}
                  disabled={deciding}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#F17A28] hover:bg-[#d96920] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#F17A28]/25 disabled:opacity-60"
                >
                  <FaCheck className="text-[10px]" />
                  Accepter
                </button>
                <button
                  id="cookie-decline-btn"
                  onClick={handleDecline}
                  disabled={deciding}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-n-7 hover:bg-n-6 border border-n-5 text-n-3 hover:text-n-1 text-xs font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 disabled:opacity-60"
                >
                  <FaTimes className="text-[10px]" />
                  Refuser
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
