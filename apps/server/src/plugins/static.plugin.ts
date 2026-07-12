import Elysia from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { generateUploadsDir } from '@/utils/generate-uploads-dir.utils'

await generateUploadsDir()

export const appStaticPlugin = new Elysia().use(
  staticPlugin({
    assets: 'public/uploads',
    prefix: '/uploads',
  }),
)
