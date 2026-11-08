import { Archivo, Fraunces, Readex_Pro } from 'next/font/google'
import { notFound } from 'next/navigation'
import { resolveCardRequest } from './resolve'

const archivo = Archivo({ subsets: ['latin', 'latin-ext'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' })
const readex = Readex_Pro({ subsets: ['arabic', 'latin'], variable: '--font-readex', display: 'swap' })
const fraunces = Fraunces({ subsets: ['latin', 'latin-ext'], style: ['normal', 'italic'], variable: '--font-fraunces', display: 'swap', preload: false })

// Client pages have their own <html>: no site header/footer, and `lang`/`dir` follow the
// language chosen in the URL or the client's default.
export default async function CardLayout({ children, params }: LayoutProps<'/c/[slug]/[[...lang]]'>) {
  const resolved = await resolveCardRequest(await params)
  if (!resolved) notFound()
  const { lang } = resolved

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`${archivo.variable} ${readex.variable} ${fraunces.variable}`}>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
