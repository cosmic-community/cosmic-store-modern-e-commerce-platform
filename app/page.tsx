import { getAllProducts, getFeaturedProducts, getAllCategories } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import CategoryGrid from '@/components/CategoryGrid'
import ProductGrid from '@/components/ProductGrid'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const [featuredProducts, categories, allProducts] = await Promise.all([
    getFeaturedProducts(),
    getAllCategories(),
    getAllProducts(),
  ])

  return (
    <>
      <Hero featuredProducts={featuredProducts} />
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Explore our curated collections
            </p>
          </div>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked favorites for you
            </p>
          </div>
          <FeaturedProducts products={featuredProducts} />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Products
            </h2>
            <p className="text-lg text-gray-600">
              Browse our complete collection
            </p>
          </div>
          <ProductGrid products={allProducts} />
        </div>
      </section>
    </>
  )
}