import { betterAuth } from 'better-auth'
import { admin, openAPI } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/db'
import * as schema from '@/db/schemas'
import { sendVerificationEmail } from '@/lib/emails/send-verification-email'
import { env } from './env.config'

export const auth = betterAuth({
  plugins: [admin(), openAPI()],
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    password: {
      hash: async (password) => await Bun.password.hash(password),
      verify: async ({ password, hash }) =>
        await Bun.password.verify(password, hash),
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      sendVerificationEmail({ to: user.email, verificationUrl: url })
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24, // renova sessão a cada 1 dia
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // cache de 5 min no cookie
    },
  },
  trustedOrigins: [env.BETTER_AUTH_FRONTEND_DOMAIN],
  basePath: '/api/auth',
})
