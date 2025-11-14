// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getProductsByCategory, getAllCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import type { Metadata } from 'next'
import type { Category } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  
  return categories.map((category: Category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.metadata?.category_name || category.title} - Cosmic Store`,
    description: category.metadata?.description || `Shop ${category.title} products`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-800">
        {category.metadata?.category_image && (
          <img
            src={`${category.metadata.category_image.imgix_url}?w=1920&h=512&fit=crop&auto=format,compress`}
            alt={category.title}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.metadata?.category_name || category.title}
            </h1>
            {category.metadata?.description && (
              <p className="text-xl text-white/90 max-w-2xl">
                {category.metadata.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                </p>
              </div>
              <ProductGrid products={products} />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No products found in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}