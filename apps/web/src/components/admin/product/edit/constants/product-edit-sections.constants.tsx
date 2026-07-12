import {
  IconInfoCircle,
  IconPhoto,
  IconListDetails,
  IconAlignLeft,
} from '@tabler/icons-react'

export const productFormSections = [
  { id: 'basic-info', label: 'Informações básicas', icon: IconInfoCircle },
  { id: 'images', label: 'Imagens', icon: IconPhoto },
  { id: 'variants', label: 'Variantes', icon: IconListDetails },
  { id: 'content', label: 'Conteúdos', icon: IconAlignLeft },
] as const

export type ProductFormSectionId = (typeof productFormSections)[number]['id']
