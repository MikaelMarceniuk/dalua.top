import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { orderItems } from './order-items.schema'
import { relations } from 'drizzle-orm'
import { productImages } from './product-images.schema'

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),

  name: text('name').notNull(),
  description: text('description').notNull(),

  priceInCents: integer('price_in_cents').notNull(),
  isAvailableForPurchase: boolean('is_available_for_purchase')
    .notNull()
    .default(true),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const productsRelations = relations(products, ({ many }) => ({
  orderItems: many(orderItems),
  images: many(productImages),
}))

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
