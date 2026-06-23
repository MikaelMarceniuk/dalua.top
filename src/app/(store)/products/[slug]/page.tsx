import { notFound } from 'next/navigation'
import ProductDetail from '@/components/product/product-detail'
import { PRODUCTS } from '@/mock/product.mock'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) return {}
  return {
    title: `${product.name} — Lumina`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()

  return <ProductDetail product={product} />
}
