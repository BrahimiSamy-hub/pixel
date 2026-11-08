import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getAdmin } from '@/server/auth'
import { LoginForm } from '../forms'
import { Panel } from '../ui'

export const metadata: Metadata = { title: 'Connexion' }

export default async function AdminLoginPage() {
  if (await getAdmin()) redirect('/admin')
  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-4">
      <p className="mb-6 text-center font-mono text-xl font-bold tracking-[0.2em] uppercase">
        Pixel <span className="text-flame">Cards</span>
      </p>
      <Panel>
        <LoginForm />
      </Panel>
    </main>
  )
}
