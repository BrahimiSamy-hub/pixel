/**
 * Creates a back-office account (there is no sign-up page).
 *   npm run admin:create -- <username> <password>
 */
import { createAccount } from '../src/server/accounts'

const [username, password] = process.argv.slice(2)
if (!username || !password) {
  console.error('Usage: npm run admin:create -- <username> <password>')
  process.exit(1)
}

const result = await createAccount({ username, password, role: 'admin' })
if (!result.ok) {
  console.error(`Could not create admin: ${result.error}`)
  process.exit(1)
}
console.log(`Admin "${result.username}" created. Sign in at /admin.`)
