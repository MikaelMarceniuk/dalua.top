import { Product, ProductImage } from '@/db/schemas'
import { productImagePresenter } from './product-image.presenter'

type ProductDetailsPresenterParams = {
  product: Product
  images?: ProductImage[]
}

export const productDetailsPresenter = ({
  product,
  images,
}: ProductDetailsPresenterParams) => ({
  id: product.id,
  name: product.name,
  slug: product.slug,
  description: product.description,
  priceInCents: product.priceInCents,
  isAvailableForPurchase: product.isAvailableForPurchase,
  images: images?.map((image) => productImagePresenter({ image })) || [],
})
