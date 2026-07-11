import { products } from '@/db/schemas'
import { authPlugin } from '@/plugins/auth.plugin'
import { dbPlugin } from '@/plugins/db.plugin'
import { rolePlugin } from '@/plugins/role.plugin'
import { eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'

export const deleteProductRoute = new Elysia()
  // .use(authPlugin)
  // .use(rolePlugin)
  .use(dbPlugin)
  .delete(
    '/:id',
    async ({ db, params, status }) => {
      db.transaction(async (ctx) => {
        const productToDelete = await db.query.products.findFirst({
          where: (fields, { eq }) => eq(fields.id, params.id),
          with: {
            orderItems: true,
            images: true,
          },
        })
        if (!productToDelete) {
          return status(404, { message: 'Product not found' })
        }

        // TODO Validate orderItems and images

        await db.delete(products).where(eq(products.id, productToDelete.id))
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
