import { env } from '@/config/env.config'
import { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle(env.DATABASE_URL)
