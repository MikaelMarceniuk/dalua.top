import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { products } from './product.schema'
import { relations } from 'drizzle-orm'
import { productContentBlockTranslations } from './locales.schema'

export const productContentBlocks = pgTable('product_content_blocks', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => Bun.randomUUIDv7()),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  title: text('title').notNull(), // "Benefits"
  content: text('content').notNull(), // HTML
  position: integer('position').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const productContentBlocksRelations = relations(
  productContentBlocks,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productContentBlocks.productId],
      references: [products.id],
    }),
    translations: many(productContentBlockTranslations),
  }),
)
