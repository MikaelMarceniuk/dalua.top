import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core'
import { integration } from './integration.schema'
import { relations } from 'drizzle-orm'
import { integrationProviderEnum } from '../enums/integration.enums'

export const integrationFieldTypeEnum = ['text', 'password'] as const

export const integrationFieldDefinition = pgTable(
  'integration_field_definition',
  {
    id: uuid('id')
      .primaryKey()
      .$defaultFn(() => Bun.randomUUIDv7()),

    provider: text('provider', { enum: integrationProviderEnum }).notNull(),

    // chave usada tanto pro form quanto pra guardar no encryptedCredentials (ex: "access_token")
    key: text('key').notNull(),

    label: text('label').notNull(), // "Access Token"
    placeholder: text('placeholder'),
    description: text('description'), // texto de ajuda abaixo do campo

    type: text('type', { enum: integrationFieldTypeEnum })
      .notNull()
      .default('text'),
    isSecret: boolean('is_secret').notNull().default(false), // se true, renderiza como password + nunca retorna valor salvo
    isRequired: boolean('is_required').notNull().default(true),

    position: integer('position').notNull().default(0), // ordem de exibição no form

    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [unique().on(table.provider, table.key)],
)

export const integrationFieldDefinitionRelations = relations(
  integrationFieldDefinition,
  ({ one }) => ({
    integration: one(integration, {
      fields: [integrationFieldDefinition.provider],
      references: [integration.provider],
    }),
  }),
)

export type IntegrationFieldDefinition =
  typeof integrationFieldDefinition.$inferSelect
export type NewIntegrationFieldDefinition =
  typeof integrationFieldDefinition.$inferInsert
