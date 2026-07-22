export const integrationProviderEnum = ['mercado_pago', 'melhor_envio'] as const
export const integrationGroupEnum = ['payment', 'logistic'] as const
export const integrationConnectionTypeEnum = ['api-key', 'oauth'] as const
export const integrationFieldTypeEnum = ['text', 'password'] as const

export type IntegrationProvider = (typeof integrationProviderEnum)[number]
export type IntegrationGroup = (typeof integrationGroupEnum)[number]
export type IntegrationConnectionType =
  (typeof integrationConnectionTypeEnum)[number]
export type IntegrationFieldType = (typeof integrationFieldTypeEnum)[number]
