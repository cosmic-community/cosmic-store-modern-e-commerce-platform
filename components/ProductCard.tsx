'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.metadata?.product_images?.[0]
  const hasDiscount = product.metadata?.sale_price && product.metadata.sale_price < (product.metadata.price || 0)
  const stockStatus = product.metadata?.stock_quantity || 0

  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div 
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {firstImage && (
            <img
              src={`${firstImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
          
          {hasDiscount && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              SALE
            </div>
          )}
          
          {product.metadata?.featured_product && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              FEATURED
            </div>
          )}
          
          {stockStatus < 10 && stockStatus > 0 && (
            <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Only {stockStatus} left
            </div>
          )}
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          {product.metadata?.category && (
            <p className="text-sm text-gray-500 mb-2">
              {product.metadata.category.metadata?.category_name || product.metadata.category.title}
            </p>
          )}
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.metadata?.product_name || product.title}
          </h3>
          
          <div className="mt-auto">
            <div className="flex items-center gap-3 mb-2">
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.metadata.sale_price?.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.metadata.price?.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  ${product.metadata?.price?.toFixed(2)}
                </span>
              )}
            </div>
            
            {stockStatus === 0 ? (
              <div className="text-red-600 font-semibold">Out of Stock</div>
            ) : (
              <div className="text-green-600 text-sm">In Stock</div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}