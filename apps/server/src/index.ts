import Elysia from 'elysia'
import { env } from '@/config/env.config'
import { authPlugin } from '@/plugins/auth.plugin'
import { openApiPlugin } from '@/plugins/openapi.plugin'

const app = new Elysia({ prefix: '/api' }).use(authPlugin).use(openApiPlugin)

app.listen(env.PORT)
console.log(`🦊 Elysia running at ${app.server?.hostname}:${app.server?.port}`)
