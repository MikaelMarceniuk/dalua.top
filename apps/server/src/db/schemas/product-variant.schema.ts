import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core'
import { products } from './product.schema'
import { relations } from 'drizzle-orm'
import { productVariantOptionTranslations } from './locales.schema'

// Tipo de variação: "Tamanho", "Cor", etc. — reutilizável entre produtos
export const productVariantTypes = pgTable('product_variant_types', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => Bun.randomUUIDv7()),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  name: text('name').notNull(), // "Tamanho"
  position: integer('position').notNull().default(0), // ordem de exibição
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const productVariantTypesRelations = relations(
  productVariantTypes,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productVariantTypes.productId],
      references: [products.id],
    }),
    options: many(productVariantOptions),
  }),
)

// Opção dentro do tipo: "250ml", "500ml", "1L"
export const productVariantOptions = pgTable('product_variant_options', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => Bun.randomUUIDv7()),
  variantTypeId: uuid('variant_type_id')
    .notNull()
    .references(() => productVariantTypes.id, { onDelete: 'cascade' }),
  label: text('label').notNull(), // "500ml"
  position: integer('position').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const productVariantOptionsRelations = relations(
  productVariantOptions,
  ({ one, many }) => ({
    variantType: one(productVariantTypes, {
      fields: [productVariantOptions.variantTypeId],
      references: [productVariantTypes.id],
    }),
    selections: many(productVariantSelections),
    translations: many(productVariantOptionTranslations),
  }),
)

// A combinação vendável de fato (o "SKU"), com preço próprio
export const productVariants = pgTable('product_variants', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => Bun.randomUUIDv7()),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  sku: text('sku').unique(),
  priceInCents: integer('price_in_cents').notNull(),
  stock: integer('stock').notNull().default(0),
  isAvailableForPurchase: boolean('is_available_for_purchase')
    .notNull()
    .default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const productVariantsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    selections: many(productVariantSelections),
  }),
)

// Liga a variante (SKU) às opções que a compõem (ex: variante X = "500ml")
// Se no futuro tiver Tamanho + Cor, essa variante teria 2 linhas aqui
export const productVariantSelections = pgTable(
  'product_variant_selections',
  {
    id: uuid('id')
      .primaryKey()
      .$defaultFn(() => Bun.randomUUIDv7()),
    productVariantId: uuid('product_variant_id')
      .notNull()
      .references(() => productVariants.id, { onDelete: 'cascade' }),
    variantOptionId: uuid('variant_option_id')
      .notNull()
      .references(() => productVariantOptions.id, { onDelete: 'cascade' }),
  },
  (table) => [unique().on(table.productVariantId, table.variantOptionId)],
)

export const productVariantSelectionsRelations = relations(
  productVariantSelections,
  ({ one }) => ({
    variant: one(productVariants, {
      fields: [productVariantSelections.productVariantId],
      references: [productVariants.id],
    }),
    option: one(productVariantOptions, {
      fields: [productVariantSelections.variantOptionId],
      references: [productVariantOptions.id],
    }),
  }),
)
