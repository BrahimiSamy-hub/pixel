import type { ReactNode } from 'react'
import './globals.css'

// The <html> element lives in [locale]/layout.tsx so `lang` and `dir` follow the locale.
// This root layout only exists so the root not-found page has a parent.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
