import { ProductImage } from '@/db/schemas'

type ProductImagePresenterParams = {
  image: ProductImage
}

export const productImagePresenter = ({
  image,
}: ProductImagePresenterParams) => ({
  id: image.id,
  imageUri: image.imageUri,
  isHighlighted: image.isHighlighted,
})
