import { notFound } from 'next/navigation'

// Any unknown path inside a locale renders [locale]/not-found.tsx with the full site chrome.
export default function CatchAll() {
  notFound()
}
