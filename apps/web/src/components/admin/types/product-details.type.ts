export type ProductDetails = {
  id: string
  name: string
  slug: string
  description: string
  priceInCents: number
  isAvailableForPurchase: boolean
  images: {
    id: string
    imageUri: string
    isHighlighted: boolean
  }[]
}
