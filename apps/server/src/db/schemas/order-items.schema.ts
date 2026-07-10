import { integer, pgTable, uuid } from 'drizzle-orm/pg-core'
import { orders } from './order.schema'
import { products } from './product.schema'
import { relations } from 'drizzle-orm/_relations'

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),

  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'restrict' }),

  quantity: integer('quantity').notNull().default(1),
  priceInCentsAtPurchase: integer('price_in_cents_at_purchase').notNull(),
})

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}))

export type OrderItems = typeof orderItems.$inferSelect
export type NewOrderItems = typeof orderItems.$inferInsert
