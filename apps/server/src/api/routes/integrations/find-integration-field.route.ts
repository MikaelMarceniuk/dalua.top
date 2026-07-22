import { integrationFieldPresenter } from '@/api/presenters/integration-field.presenter'
import { IntegrationProvider } from '@/db/enums/integration.enums'
import { dbPlugin } from '@/plugins/db.plugin'
import Elysia, { t } from 'elysia'

export const findIntegrationFieldsRoute = new Elysia().use(dbPlugin).get(
  '/:provider/fields',
  async ({ db, params, status }) => {
    const fields = await db.query.integrationFieldDefinition.findMany({
      where: (fields, { eq }) =>
        eq(fields.provider, params.provider as IntegrationProvider),
      orderBy: (fields, { asc }) => [asc(fields.position)],
    })

    if (fields.length === 0) {
      return status(404, {
        message: 'Provider not found or has no fields configured.',
      })
    }

    return { fields: fields.map((f) => integrationFieldPresenter(f)) }
  },
  {
    params: t.Object({ provider: t.String() }),
  },
)
