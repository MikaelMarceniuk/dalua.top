import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/server/db/schemas/index.ts',
  out: './src/server/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    prefix: 'timestamp',
    schema: 'drizzle',
  },
  casing: 'snake_case',
})
