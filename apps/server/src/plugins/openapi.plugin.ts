import Elysia from 'elysia'
import openapi from '@elysiajs/openapi'
import { OpenAPI } from './auth.plugin'

export const openApiPlugin = new Elysia().use(
  openapi({
    documentation: {
      components: await OpenAPI.components,
      paths: await OpenAPI.getPaths(),
    },
  }),
)
