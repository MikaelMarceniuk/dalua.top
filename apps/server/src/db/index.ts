import { env } from '@/config/env.config'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schemas'

export type Db = NodePgDatabase<typeof schema> & {
  $client: Pool
}

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
})

export const db = drizzle({ client: pool, schema })
