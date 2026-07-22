import { IntegrationProvider } from './integration.type'

export type IntegrationFieldType = 'text' | 'password'

export type IntegrationField = {
  id: string
  provider: IntegrationProvider
  key: string
  label: string
  placeholder: string
  description: string
  type: IntegrationFieldType
  isSecret: boolean
  isRequired: boolean
  position: number
}
