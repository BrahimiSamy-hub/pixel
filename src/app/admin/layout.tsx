import type { Metadata } from 'next'
import { Archivo, Barlow_Condensed } from 'next/font/google'
import type { ReactNode } from 'react'
import { Toaster } from 'sonner'

const archivo = Archivo({ subsets: ['latin', 'latin-ext'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' })
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-barlow', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Back-office', template: '%s · Pixel back-office' },
  robots: { index: false, follow: false },
}

// Back office for Pixel staff: French only, never indexed.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" dir="ltr" className={`${archivo.variable} ${barlow.variable}`}>
      <body className="min-h-dvh bg-ink text-paper">
        {children}
        <Toaster theme="dark" position="top-center" />
      </body>
    </html>
  )
}
