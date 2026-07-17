import { pgTable, uuid, text, boolean, timestamp } from 'drizzle-orm/pg-core'

export const integrationProviderEnum = ['mercado_pago', 'melhor_envio'] as const
export type IntegrationProvider = (typeof integrationProviderEnum)[number]

export const integrationGroupEnum = ['payment', 'logistic'] as const
export type IntegrationType = (typeof integrationGroupEnum)[number]

export const integrationConnectionTypeEnum = ['api-key', 'oauth'] as const
export type IntegrationConnectionType =
  (typeof integrationConnectionTypeEnum)[number]

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

  isConnected: boolean('is_connected').notNull().default(false),
  connectedAt: timestamp('connected_at'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type Integration = typeof integration.$inferSelect
export type NewIntegration = typeof integration.$inferInsert
