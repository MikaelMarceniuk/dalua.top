import { db } from '@/server/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import * as schema from '@/server/db/schemas'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  plugins: [nextCookies()],
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24, // renova sessão a cada 1 dia
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // cache de 5 min no cookie
    },
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
})
