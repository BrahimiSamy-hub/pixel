'use client'

import { Check, Share2 } from 'lucide-react'
import { useState } from 'react'

export function ShareButton({ url, title, label, copiedLabel, className }: { url: string; title: string; label: string; copiedLabel: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch (error) {
        if ((error as DOMException).name === 'AbortError') return
      }
    }
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button type="button" onClick={share} className={className} aria-live="polite">
      {copied ? <Check size={18} aria-hidden /> : <Share2 size={18} aria-hidden />}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  )
}
