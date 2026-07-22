import { Elysia } from 'elysia'
import { findProductRoute } from './product/find-product.route'
import { findProductBySlugRoute } from './product/find-product-by-slug.route'
import { createProductRoute } from './product/create-product.route'
import { createProductImageRoute } from './product/create-product-images.route'
import { toggleAvailabilityRoute } from './product/toggle-availability.route'
import { updateProductRoute } from './product/update-product.route'
import { updateProductImageRoute } from './product/update-product-images.route'
import { deleteProductRoute } from './product/delete-product.route'
import { findIntegrationsRoute } from './integrations/find-integrations.route'
import { connectIntegrationRoute } from './integrations/connect-integration.route'
import { findIntegrationFieldsRoute } from './integrations/find-integration-field.route'

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
  .group('/integration', (app) =>
    app
      .use(findIntegrationsRoute)
      .use(connectIntegrationRoute)
      .use(findIntegrationFieldsRoute),
  )
