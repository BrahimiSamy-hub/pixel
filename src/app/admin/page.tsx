import { desc, eq } from 'drizzle-orm'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getAdmin } from '@/server/auth'
import { cardBaseUrl } from '@/server/cards'
import { db, schema } from '@/server/db'
import { logout } from './actions'
import { CreateClientForm } from './forms'
import { AdminShell, Btn, Panel } from './ui'

export const metadata: Metadata = { title: 'Clients' }

const dateFormat = new Intl.DateTimeFormat('fr-DZ', { dateStyle: 'medium', timeZone: 'Africa/Algiers' })

export default async function AdminHome() {
  if (!(await getAdmin())) redirect('/admin/login')

  const clients = await db
    .select({
      id: schema.users.id,
      username: schema.users.username,
      active: schema.users.active,
      createdAt: schema.users.createdAt,
      lastLoginAt: schema.users.lastLoginAt,
      data: schema.cards.data,
      views: schema.cards.views,
    })
    .from(schema.users)
    .leftJoin(schema.cards, eq(schema.cards.userId, schema.users.id))
    .where(eq(schema.users.role, 'client'))
    .orderBy(desc(schema.users.createdAt))

  return (
    <AdminShell
      actions={
        <form action={logout}>
          <Btn variant="ghost" type="submit">
            Déconnexion
          </Btn>
        </form>
      }
    >
      <div className="grid gap-6">
        <Panel title="Nouveau client">
          <CreateClientForm />
          <p className="mt-4 text-xs text-muted">
            Les QR codes pointent vers <code dir="ltr">{cardBaseUrl()}/c/…</code>. Fixez le domaine final (CARD_BASE_URL)
            avant d’imprimer des cartes de visite.
          </p>
        </Panel>

        <Panel title={`Clients (${clients.length})`}>
          {clients.length === 0 ? (
            <p className="text-sm text-muted">Aucun client pour l’instant.</p>
          ) : (
            <ul className="divide-y divide-line">
              {clients.map((c) => (
                <li key={c.id}>
                  <a
                    href={`/admin/clients/${c.id}`}
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3 transition hover:text-flame"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">{c.data?.displayName ?? c.username}</span>
                      <span className="block text-xs text-muted" dir="ltr">
                        /c/{c.username}
                      </span>
                    </span>
                    {!c.active && <span className="rounded bg-red-500/15 px-2 py-0.5 text-xs text-red-300">Désactivé</span>}
                    <span className="text-xs text-mist">{c.views ?? 0} vues</span>
                    <span className="text-xs text-muted">
                      {c.lastLoginAt ? `Vu le ${dateFormat.format(c.lastLoginAt)}` : 'Jamais connecté'}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </AdminShell>
  )
}
