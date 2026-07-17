import {
  NewProductImage,
  ProductImage,
} from '../../schemas/product-image.schema'

export const isNewImage = (image: ProductImage): image is NewProductImage =>
  image.kind === 'new'
