import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { db } from '@/server/db'
import * as schema from '@/server/db/schemas'
import { resend } from './providers/email.provider'
import VerifyEmailTemplate from './emails/verify-email.template'

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
    autoSignIn: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: 'Noreply <noreply@mmarceniuk.dev>',
        subject: 'Verifique seu email — Dalua.top',
        to: user.email,
        react: <VerifyEmailTemplate verificationUrl={url} />,
      })
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
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
})
