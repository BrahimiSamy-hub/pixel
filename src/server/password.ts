import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'

// Node's built-in scrypt: no native addon to build, works on every host.
// Format: scrypt$N$r$p$<salt b64>$<hash b64>
const N = 2 ** 15
const r = 8
const p = 1
const KEY_LENGTH = 64

function derive(password: string, salt: Buffer, n: number, rr: number, pp: number) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password.normalize('NFKC'), salt, KEY_LENGTH, { N: n, r: rr, p: pp, maxmem: 128 * n * rr * 2 }, (err, key) =>
      err ? reject(err) : resolve(key),
    )
  })
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16)
  const key = await derive(password, salt, N, r, p)
  return `scrypt$${N}$${r}$${p}$${salt.toString('base64')}$${key.toString('base64')}`
}

export async function verifyPassword(password: string, stored: string) {
  const [algo, n, rr, pp, salt, hash] = stored.split('$')
  if (algo !== 'scrypt' || !n || !rr || !pp || !salt || !hash) return false
  const expected = Buffer.from(hash, 'base64')
  const key = await derive(password, Buffer.from(salt, 'base64'), Number(n), Number(rr), Number(pp))
  return key.length === expected.length && timingSafeEqual(key, expected)
}

/** Usernames double as URL slugs: lowercase letters, digits and inner hyphens. */
export const USERNAME_PATTERN = /^[a-z0-9](?:[a-z0-9-]{1,30}[a-z0-9])$/

export function normalizeUsername(value: string) {
  return value.trim().toLowerCase()
}

export const MIN_PASSWORD_LENGTH = 8
