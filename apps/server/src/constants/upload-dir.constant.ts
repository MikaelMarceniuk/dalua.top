import { join } from 'node:path'

export const PRODUCT_UPLOADS_DIR = join(
  process.cwd(),
  'public',
  'uploads',
  'products',
)
