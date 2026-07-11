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
import { productVariants, productVariantTypes } from './product-variant.schema'
import { productContentBlocks } from './product-content-blocks.schema'
import { productTranslations } from './locales.schema'

export const products = pgTable('products', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => Bun.randomUUIDv7()),

  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
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
  variantTypes: many(productVariantTypes),
  variants: many(productVariants),
  contentBlocks: many(productContentBlocks),
  translations: many(productTranslations),
}))

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
