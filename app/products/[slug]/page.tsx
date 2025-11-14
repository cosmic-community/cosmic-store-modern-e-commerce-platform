// app/products/[slug]/page.tsx
import { getProductBySlug, getAllProducts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/ProductDetail'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await getAllProducts()
  
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.metadata?.product_name || product.title} - Cosmic Store`,
    description: product.metadata?.description?.replace(/<[^>]*>/g, '').substring(0, 160),
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <ProductDetail product={product} />
    </div>
  )
}