import { ProductDetails } from '@/components/admin/types/product-details.type'
import { ExistingProductImage } from '../../schemas/product-image.schema'

type ProductImageParserParams = {
  image: ProductDetails['images'][number]
}

export const productImageParser = ({
  image,
}: ProductImageParserParams): ExistingProductImage => ({
  ...image,
  kind: 'existing',
  action: 'keep',
})
