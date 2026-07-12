import { PRODUCT_UPLOADS_DIR } from '@/constants/upload-dir.constant'
import { mkdir } from 'node:fs/promises'

export const generateUploadsDir = async () => {
  await mkdir(PRODUCT_UPLOADS_DIR, { recursive: true })
}
