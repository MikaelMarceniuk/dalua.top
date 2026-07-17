import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'
import { env } from '@/config/env.config'

const ALGORITHM = 'aes-256-gcm'
const KEY = Buffer.from(env.CREDENTIALS_ENCRYPTION_KEY, 'hex')

export function encryptCredentials(data: Record<string, string>): string {
  const iv = randomBytes(12)
  const cipher = createCipheriv(ALGORITHM, KEY, iv)

  const plaintext = JSON.stringify(data)
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ])
  const authTag = cipher.getAuthTag()

  // formato: iv:authTag:ciphertext, tudo em base64
  return `${iv.toString('base64')}:${authTag.toString('base64')}:${encrypted.toString('base64')}`
}

export function decryptCredentials<T = Record<string, string>>(
  payload: string,
): T {
  const [ivB64, authTagB64, encryptedB64] = payload.split(':')

  const decipher = createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(ivB64, 'base64'),
  )
  decipher.setAuthTag(Buffer.from(authTagB64, 'base64'))

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedB64, 'base64')),
    decipher.final(),
  ])

  return JSON.parse(decrypted.toString('utf8'))
}
