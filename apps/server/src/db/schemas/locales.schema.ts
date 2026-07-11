import { boolean, pgTable, text, unique, uuid } from 'drizzle-orm/pg-core'
import { products } from './product.schema'
import { productContentBlocks } from './product-content-blocks.schema'
import { productVariantOptions } from './product-variant.schema'

export const locales = pgTable('locales', {
  code: text('code').primaryKey(), // "pt-BR", "en-US"
  name: text('name').notNull(), // "Português (Brasil)"
  isDefault: boolean('is_default').notNull().default(false),
})

export const productTranslations = pgTable(
  'product_translations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    locale: text('locale')
      .notNull()
      .references(() => locales.code),
    name: text('name').notNull(),
    description: text('description').notNull(),
    slug: text('slug').notNull(), // slug também varia por idioma
  },
  (table) => [
    unique().on(table.productId, table.locale),
    unique().on(table.slug, table.locale), // slug único POR idioma
  ],
)

// mesma ideia pros outros textos traduzíveis
export const productContentBlockTranslations = pgTable(
  'product_content_block_translations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contentBlockId: uuid('content_block_id')
      .notNull()
      .references(() => productContentBlocks.id, { onDelete: 'cascade' }),
    locale: text('locale')
      .notNull()
      .references(() => locales.code),
    title: text('title').notNull(),
    content: text('content').notNull(),
  },
  (table) => [unique().on(table.contentBlockId, table.locale)],
)

export const productVariantOptionTranslations = pgTable(
  'product_variant_option_translations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    variantOptionId: uuid('variant_option_id')
      .notNull()
      .references(() => productVariantOptions.id, { onDelete: 'cascade' }),
    locale: text('locale')
      .notNull()
      .references(() => locales.code),
    label: text('label').notNull(),
  },
  (table) => [unique().on(table.variantOptionId, table.locale)],
)
