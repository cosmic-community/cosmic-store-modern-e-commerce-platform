import { getAllProducts, getFeaturedProducts, getAllCategories } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import CategoryGrid from '@/components/CategoryGrid'
import ProductGrid from '@/components/ProductGrid'
import AnimatedSection from '@/components/AnimatedSection'

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
      
      <AnimatedSection delay={0.2}>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                Shop by Category
              </h2>
              <p className="text-lg text-gray-600 animate-fade-in-up animate-delay-100">
                Explore our curated collections
              </p>
            </div>
            <CategoryGrid categories={categories} />
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 animate-fade-in-up animate-delay-100">
                Handpicked favorites for you
              </p>
            </div>
            <FeaturedProducts products={featuredProducts} />
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                All Products
              </h2>
              <p className="text-lg text-gray-600 animate-fade-in-up animate-delay-100">
                Browse our complete collection
              </p>
            </div>
            <ProductGrid products={allProducts} />
          </div>
        </section>
      </AnimatedSection>
    </>
  )
}