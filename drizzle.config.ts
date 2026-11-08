import { defineConfig } from 'drizzle-kit'

// The `turso` dialect speaks libSQL, which also handles local `file:` databases.
export default defineConfig({
  schema: './src/server/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'file:./data/pixel.db',
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
})
