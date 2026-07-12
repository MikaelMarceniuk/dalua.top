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
  name: product.name,
  slug: product.slug,
  description: product.description,
  priceInCents: product.priceInCents,
  isAvailableForPurchase: product.isAvailableForPurchase,
  orderCount,
})
