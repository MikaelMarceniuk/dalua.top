import { db } from '..'
import { integrationSeed } from './integration.seed'

const seeder = async () => {
  await integrationSeed(db)
}

await seeder()
