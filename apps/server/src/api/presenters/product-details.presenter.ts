import { Product } from '@/db/schemas'

type ProductDetailsPresenterParams = {
  product: Product
}

export const productDetailsPresenter = ({
  product,
}: ProductDetailsPresenterParams) => ({
  id: product.id,
  name: product.name,
  slug: product.slug,
  description: product.description,
  priceInCents: product.priceInCents,
  isAvailableForPurchase: product.isAvailableForPurchase,
})
