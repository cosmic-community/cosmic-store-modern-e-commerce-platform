import { getAllProducts } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import { notFound } from 'next/navigation'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams
  const query = params.q?.toLowerCase() || ''

  if (!query) {
    notFound()
  }

  const allProducts = await getAllProducts()
  
  const searchResults = allProducts.filter(product => {
    const productName = (product.metadata?.product_name || product.title).toLowerCase()
    const description = product.metadata?.description?.toLowerCase() || ''
    const categoryName = product.metadata?.category?.metadata?.category_name?.toLowerCase() || ''
    
    return productName.includes(query) || 
           description.includes(query) || 
           categoryName.includes(query)
  })

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results for "{params.q}"
          </h1>
          <p className="text-gray-600">
            Found {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {searchResults.length > 0 ? (
          <ProductGrid products={searchResults} />
        ) : (
          <div className="text-center py-12">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-600 mb-8">
              Try adjusting your search terms or browse our categories
            </p>
          </div>
        )}
      </div>
    </div>
  )
}