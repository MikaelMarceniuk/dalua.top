import { products } from '@/db/schemas'
import { authPlugin } from '@/plugins/auth.plugin'
import { dbPlugin } from '@/plugins/db.plugin'
import { rolePlugin } from '@/plugins/role.plugin'
import { eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'

export const toggleAvailabilityRoute = new Elysia()
  // .use(authPlugin)
  // .use(rolePlugin)
  .use(dbPlugin)
  .put(
    '/:id',
    async ({ db, params, status }) => {
      db.transaction(async (ctx) => {
        const productToUpdate = await db.query.products.findFirst({
          where: (fields, { eq }) => eq(fields.id, params.id),
          with: {
            orderItems: true,
            images: true,
          },
        })
        if (!productToUpdate) {
          return status(404, { message: 'Product not found' })
        }

        await db
          .update(products)
          .set({
            isAvailableForPurchase: !productToUpdate.isAvailableForPurchase,
          })
          .where(eq(products.id, productToUpdate.id))
      })

      return status(204)
    },
    {
      // auth: true,
      // roles: 'admin',
      params: t.Object({
        id: t.String({ format: 'uuid' }),
      }),
    },
  )
