import { IntegrationFieldDefinition } from '@/db/schemas'

type integrationFieldPresenterParams = {} & IntegrationFieldDefinition

export const integrationFieldPresenter = ({
  id,
  provider,
  key,
  label,
  placeholder,
  description,
  type,
  isSecret,
  isRequired,
  position,
}: integrationFieldPresenterParams) => ({
  id,
  provider,
  key,
  label,
  placeholder,
  description,
  type,
  isSecret,
  isRequired,
  position,
})
