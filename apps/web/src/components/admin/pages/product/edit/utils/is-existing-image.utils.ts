import {
  ExistingProductImage,
  ProductImage,
} from '../../schemas/product-image.schema'

export const isExistingImage = (
  image: ProductImage
): image is ExistingProductImage => image.kind === 'existing'
