import { integrationPresenter } from '@/api/presenters/integration.presenter'
import { dbPlugin } from '@/plugins/db.plugin'
import Elysia from 'elysia'

export const findIntegrationsRoute = new Elysia()
  .use(dbPlugin)
  .get('/', async ({ db, status }) => {
    const dbIntegrations = await db.query.integration.findMany()

    return status(200, {
      integrations: dbIntegrations.map((integration) =>
        integrationPresenter(integration),
      ),
    })
  })
