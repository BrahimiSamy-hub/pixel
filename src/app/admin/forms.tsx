'use client'

import { useActionState } from 'react'
import { createClient, type FormState, login, resetPassword } from './actions'
import { Btn, Input } from './ui'

function Message({ state }: { state: FormState }) {
  if (!state) return null
  if (state.error) return <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-300">{state.error}</p>
  return (
    <div className="space-y-2 rounded-md border border-flame/40 bg-orange-tint px-3 py-3 text-sm">
      <p className="text-amber">{state.ok}</p>
      {state.password && (
        <p>
          {state.username && (
            <>
              Identifiant : <code className="font-bold">{state.username}</code>
              <br />
            </>
          )}
          Mot de passe : <code className="font-bold select-all">{state.password}</code>
          <span className="block text-xs text-muted">Notez-le maintenant : il ne sera plus affiché.</span>
        </p>
      )}
    </div>
  )
}

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)
  return (
    <form action={action} className="space-y-4">
      <Input label="Identifiant" name="username" autoComplete="username" autoCapitalize="none" required />
      <Input label="Mot de passe" name="password" type="password" autoComplete="current-password" required />
      <Message state={state} />
      <Btn type="submit" disabled={pending} className="w-full">
        {pending ? 'Connexion…' : 'Se connecter'}
      </Btn>
    </form>
  )
}

export function CreateClientForm() {
  const [state, action, pending] = useActionState(createClient, undefined)
  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Identifiant (= adresse de la page)"
          name="username"
          placeholder="ex. cafe-elbahia"
          hint="Page : /c/identifiant"
          autoCapitalize="none"
          pattern="[a-zA-Z0-9][a-zA-Z0-9\-]{1,30}[a-zA-Z0-9]"
          required
        />
        <Input label="Nom affiché" name="displayName" placeholder="ex. Café El Bahia" />
      </div>
      <Input
        label="Mot de passe"
        name="password"
        type="text"
        autoComplete="off"
        minLength={8}
        hint="Laisser vide pour en générer un."
      />
      <Message state={state} />
      <Btn type="submit" disabled={pending}>
        {pending ? 'Création…' : 'Créer le compte et le QR code'}
      </Btn>
    </form>
  )
}

export function ResetPasswordForm({ userId }: { userId: string }) {
  const [state, action, pending] = useActionState(resetPassword, undefined)
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="userId" value={userId} />
      <Input label="Nouveau mot de passe" name="password" type="text" autoComplete="off" minLength={8} hint="Laisser vide pour en générer un." />
      <Message state={state} />
      <Btn type="submit" variant="ghost" disabled={pending}>
        Réinitialiser
      </Btn>
    </form>
  )
}
