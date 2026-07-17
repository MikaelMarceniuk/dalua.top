import { Elysia } from 'elysia'
import { findProductRoute } from './product/find-product.route'
import { findProductBySlugRoute } from './product/find-product-by-slug.route'
import { createProductRoute } from './product/create-product.route'
import { createProductImageRoute } from './product/create-product-images.route'
import { toggleAvailabilityRoute } from './product/toggle-availability.route'
import { updateProductRoute } from './product/update-product.route'
import { updateProductImageRoute } from './product/update-product-images.route'
import { deleteProductRoute } from './product/delete-product.route'

export const routes = new Elysia()
  .get('/', () => 'Hello World!')
  .group('/product', (app) =>
    app
      .use(findProductRoute)
      .use(findProductBySlugRoute)
      .use(createProductRoute)
      .use(createProductImageRoute)
      .use(updateProductRoute)
      .use(updateProductImageRoute)
      .use(toggleAvailabilityRoute)
      .use(deleteProductRoute),
  )
