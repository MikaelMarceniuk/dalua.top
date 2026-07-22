import { relations } from 'drizzle-orm'
import { pgTable, uuid, text, boolean, timestamp } from 'drizzle-orm/pg-core'
import { integrationFieldDefinition } from './integration-field-definition.schema'
import {
  integrationConnectionTypeEnum,
  integrationGroupEnum,
  integrationProviderEnum,
} from '../enums/integration.enums'

export const integration = pgTable('integration', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => Bun.randomUUIDv7()),

  group: text('group', { enum: integrationGroupEnum }).notNull(),
  provider: text('provider', { enum: integrationProviderEnum })
    .notNull()
    .unique(),
  connectionType: text('connection_type', {
    enum: integrationConnectionTypeEnum,
  }).notNull(),
  encryptedCredentials: text('encrypted_credentials'),
  tokenExpiresAt: timestamp('token_expires_at'), // específico de oauth2

  isConnected: boolean('is_connected').notNull().default(false),
  connectedAt: timestamp('connected_at'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const integrationRelations = relations(integration, ({ many }) => ({
  fieldDefinitions: many(integrationFieldDefinition),
}))

export type Integration = typeof integration.$inferSelect
export type NewIntegration = typeof integration.$inferInsert
