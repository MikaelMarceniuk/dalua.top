import Elysia from 'elysia'
import { env } from '@/config/env.config'
import { authPlugin } from '@/plugins/auth.plugin'
import { openApiPlugin } from '@/plugins/openapi.plugin'
import { routes } from './api/routes'

const app = new Elysia({ prefix: '/api' })
  .use(authPlugin)
  .use(openApiPlugin)
  .use(routes)

app.listen(env.PORT)
console.log(`🦊 Elysia running at ${app.server?.hostname}:${app.server?.port}`)
