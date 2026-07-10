import { Elysia } from 'elysia'
import { findProductRoute } from './product/find-products.route'
import { createProductRoute } from './product/create-product.route'

export const routes = new Elysia()
  .get('/', () => 'Hello World!')
  .group('/product', (app) => app.use(findProductRoute).use(createProductRoute))
