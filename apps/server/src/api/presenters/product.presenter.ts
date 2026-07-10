import { Product } from '@/db/schemas'

type ProductPresenterParams = {
  product: Product
  orderCount?: number
}

export const productPresenter = ({
  product,
  orderCount,
}: ProductPresenterParams) => ({
  id: product.id,
  description: product.description,
  priceInCents: product.priceInCents,
  isAvailableForPurchase: product.isAvailableForPurchase,
  orderCount,
})
