import { sentinelClient } from '@better-auth/infra/client'
import { nextCookies } from 'better-auth/next-js'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  plugins: [sentinelClient(), nextCookies()],
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
})

export const { signIn, signOut, signUp, useSession } = authClient
