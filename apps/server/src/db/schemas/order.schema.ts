import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth.schema'
import { relations } from 'drizzle-orm'
import { payments } from './payment.schema'

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  totalInCents: integer('total_in_cents').notNull(),

  status: text('status', {
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
  })
    .notNull()
    .default('pending'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),

  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'restrict' }),
})

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(user, {
    fields: [orders.userId],
    references: [user.id],
  }),
  payments: many(payments),
}))

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert
