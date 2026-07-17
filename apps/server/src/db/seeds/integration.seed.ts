import { Db } from '..'
import { integration, NewIntegration } from '../schemas/integration.schema'

const integrations: NewIntegration[] = [
  {
    group: 'payment',
    provider: 'mercado_pago',
    connectionType: 'api-key',
  },
  {
    group: 'logistic',
    provider: 'melhor_envio',
    connectionType: 'oauth',
  },
]

export const integrationSeed = async (db: Db) => {
  console.log('\n🌱 [Seed:Integration] Iniciando seed de integrações...')

  const created: string[] = []
  const skipped: string[] = []

  await db.transaction(async (ctx) => {
    const dbIntegrations = await ctx.query.integration.findMany()

    for (const int of integrations) {
      const doesIntegrationExist = dbIntegrations.some(
        ({ provider }) => provider == int.provider,
      )

      if (doesIntegrationExist) {
        skipped.push(int.provider)
        continue
      }

      await ctx.insert(integration).values({ ...int })
      created.push(int.provider)
    }
  })

  console.log('┌────────────────────────────────────────────')
  if (created.length) {
    console.log(`│ ✅ Criadas (${created.length}):`)
    created.forEach((p) => console.log(`│    • ${p}`))
  }
  if (skipped.length) {
    console.log(`│ ⏭️  Já existiam (${skipped.length}):`)
    skipped.forEach((p) => console.log(`│    • ${p}`))
  }
  console.log('└────────────────────────────────────────────')
  console.log(
    `🌱 [Seed:Integration] Concluído — ${created.length} criadas, ${skipped.length} ignoradas.\n`,
  )
}
