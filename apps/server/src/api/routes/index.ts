import { Elysia } from 'elysia'
import { findProductRoute } from './product/find-products.route'
import { createProductRoute } from './product/create-product.route'
import { deleteProductRoute } from './product/delete-product.route'
import { toggleAvailabilityRoute } from './product/toggle-availability.route'

export const routes = new Elysia()
  .get('/', () => 'Hello World!')
  .group('/product', (app) =>
    app
      .use(findProductRoute)
      .use(createProductRoute)
      .use(toggleAvailabilityRoute)
      .use(deleteProductRoute),
  )
