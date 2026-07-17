export const SUBMIT_STEPS = {
  idle: null,
  updatingProduct: 'Atualizando produto',
  updatingExistingPhotos: 'Atualizando fotos existentes',
  uploadingNewPhotos: 'Atualizando novas fotos',
  refetchingProduct: 'Buscando o produto com as novas atualizações',
} as const

export type SubmitStep = keyof typeof SUBMIT_STEPS
