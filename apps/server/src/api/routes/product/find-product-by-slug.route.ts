import { productDetailsPresenter } from '@/api/presenters/product-details.presenter'
import { dbPlugin } from '@/plugins/db.plugin'
import { Elysia, t } from 'elysia'

export const findProductBySlugRoute = new Elysia()
  // .use(authPlugin)
  // .use(rolePlugin)
  .use(dbPlugin)
  .get(
    '/:slug',
    async ({ db, params, status }) => {
      const productBySlug = await db.query.products.findFirst({
        where: (field, { eq }) => eq(field.slug, params.slug),
        with: {
          images: true,
        },
      })

      if (!productBySlug) {
        return status(404, { message: 'Product not found' })
      }

      return productDetailsPresenter({
        product: productBySlug,
        images: productBySlug.images,
      })
    },
    {
      // auth: true,
      // roles: 'admin'
      params: t.Object({
        slug: t.String(),
      }),
    },
  )
