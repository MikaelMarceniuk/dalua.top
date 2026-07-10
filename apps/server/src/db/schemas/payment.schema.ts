import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { orders } from './order.schema'
import { relations } from 'drizzle-orm/_relations'

export const PAYMENT_STATUS = [
  'pending',
  'approved',
  'rejected',
  'cancelled',
] as const
export type PaymentStatus = (typeof PAYMENT_STATUS)[number]

export const PAYMENT_PROVIDER = ['mercado_pago'] as const
export type PaymentProvider = (typeof PAYMENT_PROVIDER)[number]

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),

  provider: text('provider', { enum: PAYMENT_PROVIDER }).notNull(),

  externalReferenceId: text('external_reference_id').notNull(), // ID gerado no momento de iniciar o pagamento (preference, payment intent, etc)
  externalPaymentId: text('external_payment_id'), // ID do pagamento confirmado (só existe depois do webhook)

  status: text('status', { enum: PAYMENT_STATUS }).notNull().default('pending'),

  rawResponse: text('raw_response'), // Guarda o payload cru do webhook, útil pra debug e auditoria

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),

  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'restrict' }),
})

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
}))

export type Payment = typeof payments.$inferSelect
export type NewPayment = typeof payments.$inferInsert
