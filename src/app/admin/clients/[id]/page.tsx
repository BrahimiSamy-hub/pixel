import { eq } from 'drizzle-orm'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getAdmin } from '@/server/auth'
import { cardUrl } from '@/server/cards'
import { db, schema } from '@/server/db'
import { renderQr } from '@/server/qr'
import { deleteClient, toggleActive } from '../../actions'
import { ResetPasswordForm } from '../../forms'
import { AdminShell, Btn, Input, LinkBtn, Panel } from '../../ui'

export const metadata: Metadata = { title: 'Client' }

export default async function ClientPage({ params }: PageProps<'/admin/clients/[id]'>) {
  if (!(await getAdmin())) redirect('/admin/login')
  const { id } = await params

  const user = await db.query.users.findFirst({ where: eq(schema.users.id, id) })
  if (!user || user.role !== 'client') notFound()
  const card = await db.query.cards.findFirst({ where: eq(schema.cards.userId, id) })

  const url = cardUrl(user.username)
  const qr = await renderQr(url, { format: 'svg' })
  const qrBase = `/admin/clients/${id}/qr`

  return (
    <AdminShell actions={<LinkBtn href="/admin">← Clients</LinkBtn>}>
      <h1 className="mb-1 text-2xl font-bold">{card?.data.displayName ?? user.username}</h1>
      <p className="mb-6 text-sm text-muted" dir="ltr">
        {url}
      </p>

      <div className="grid gap-6 md:grid-cols-[minmax(0,320px)_1fr]">
        <Panel title="QR code">
          {/* Rendered by our own server from a fixed URL: safe to inline. */}
          <div className="overflow-hidden rounded-md bg-white p-2" dangerouslySetInnerHTML={{ __html: String(qr.body) }} />
          <div className="mt-4 grid gap-2">
            <LinkBtn href={`${qrBase}?format=svg&download=1`}>SVG (impression)</LinkBtn>
            <LinkBtn href={`${qrBase}?format=png&size=2048&download=1`}>PNG 2048 px</LinkBtn>
            <LinkBtn href={`${qrBase}?format=png&size=2048&light=transparent&download=1`}>PNG fond transparent</LinkBtn>
          </div>
          <p className="mt-3 text-xs text-muted">
            À transmettre à l’infographe pour la carte de visite. Correction d’erreur élevée : un logo peut couvrir le centre.
          </p>
        </Panel>

        <div className="grid content-start gap-6">
          <Panel title="Page">
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <dt className="text-muted">Identifiant</dt>
              <dd dir="ltr">{user.username}</dd>
              <dt className="text-muted">Thème</dt>
              <dd>{card?.data.theme ?? '—'}</dd>
              <dt className="text-muted">Vues</dt>
              <dd>{card?.views ?? 0}</dd>
              <dt className="text-muted">Statut</dt>
              <dd>{user.active ? 'Actif' : 'Désactivé'}</dd>
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              <LinkBtn href={`/c/${user.username}`} target="_blank" rel="noreferrer">
                Voir la page
              </LinkBtn>
              <form action={toggleActive}>
                <input type="hidden" name="userId" value={user.id} />
                <Btn variant="ghost" type="submit">
                  {user.active ? 'Désactiver' : 'Réactiver'}
                </Btn>
              </form>
            </div>
          </Panel>

          <Panel title="Mot de passe">
            <ResetPasswordForm userId={user.id} />
          </Panel>

          <Panel title="Supprimer" className="border-red-500/30">
            <form action={deleteClient} className="space-y-3">
              <input type="hidden" name="userId" value={user.id} />
              <Input
                label={`Tapez « ${user.username} » pour confirmer`}
                name="confirm"
                autoComplete="off"
                pattern={user.username}
                required
              />
              <p className="text-xs text-muted">La page, les images et le compte sont supprimés. Le QR code imprimé ne fonctionnera plus.</p>
              <Btn variant="danger" type="submit">
                Supprimer définitivement
              </Btn>
            </form>
          </Panel>
        </div>
      </div>
    </AdminShell>
  )
}
