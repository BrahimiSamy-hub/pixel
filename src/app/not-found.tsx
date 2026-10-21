import Link from 'next/link'

// Requests outside any locale (very rare: the proxy adds a locale to every path).
export default function RootNotFound() {
  return (
    <html lang="fr">
      <body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0e0c15', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <main style={{ textAlign: 'center', padding: 24 }}>
          <p style={{ fontSize: 64, fontWeight: 700, margin: 0 }}>404</p>
          <p>Page introuvable · Page not found · الصفحة غير موجودة</p>
          <Link href="/fr" style={{ color: '#f18a27' }}>pixeldz.store</Link>
        </main>
      </body>
    </html>
  )
}
