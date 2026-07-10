import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { products } from './product.schema'
import { relations } from 'drizzle-orm/_relations'

export const productImages = pgTable('product_images', {
  id: uuid('id').primaryKey().defaultRandom(),

  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),

  imageUri: text('image_uri').notNull(),
  isHighlighted: boolean('is_highlighted').notNull().default(false),

  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}))

export type ProductImage = typeof productImages.$inferSelect
export type NewProductImage = typeof productImages.$inferInsert
