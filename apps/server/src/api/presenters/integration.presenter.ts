import { Integration } from '@/db/schemas'

type integrationPresenterParams = {} & Integration

export const integrationPresenter = ({
  ...integration
}: integrationPresenterParams) => ({
  id: integration.id,
  group: integration.group,
  provider: integration.provider,
  connectionType: integration.connectionType,
  isConnected: integration.isConnected,
})
