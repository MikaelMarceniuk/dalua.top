import { productDetailsPresenter } from '@/api/presenters/product-details.presenter'
import { Product, products } from '@/db/schemas'
import { dbPlugin } from '@/plugins/db.plugin'
import { generateUniqueSlug } from '@/utils/generate-slug.utils'
import { eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'

type UpdateProductResult =
  | { success: true; product: Product }
  | { success: false; error: string }

export const updateProductRoute = new Elysia()
  // .use(authPlugin)
  // .use(rolePlugin)
  .use(dbPlugin)
  .put(
    '/:id',
    async ({ db, body, params, status }) => {
      const result = await db.transaction(
        async (ctx): Promise<UpdateProductResult> => {
          const productToUpdate = await ctx.query.products.findFirst({
            where: (fields, { eq }) => eq(fields.id, params.id),
          })

          if (!productToUpdate) {
            return { success: false, error: 'Product not found.' }
          }

          const [updatedProduct] = await ctx
            .update(products)
            .set({
              name: body.name,
              slug:
                body.name !== productToUpdate.name
                  ? await generateUniqueSlug(body.name)
                  : productToUpdate.slug,
              description: body.description,
              priceInCents: body.priceInCents,
              isAvailableForPurchase: body.isAvailableForPurchase, // TODO Validar se pode
            })
            .where(eq(products.id, params.id))
            .returning()

          return { success: true, product: updatedProduct }
        },
      )

      return result.success
        ? status(200, productDetailsPresenter({ product: result.product }))
        : status(404, { error: result.error })
    },
    {
      // auth: true,
      // roles: 'admin',
      body: t.Object({
        name: t.String({ minLength: 3 }),
        description: t.String({ minLength: 3 }),
        priceInCents: t.Number({ minimum: 1 }),
        isAvailableForPurchase: t.Boolean({ default: false }),
      }),
      params: t.Object({
        id: t.String({ format: 'uuid' }),
      }),
    },
  )
