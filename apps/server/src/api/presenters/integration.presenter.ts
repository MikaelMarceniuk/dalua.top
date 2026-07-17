import { Integration } from '@/db/schemas'

type integrationPresenterParams = {} & Integration

export const integrationPresenter = ({
  ...integration
}: integrationPresenterParams) => ({
  id: integration.id,
  type: integration.type,
  provider: integration.provider,
  isConnected: integration.isConnected,
})
