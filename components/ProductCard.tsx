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
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col group"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {firstImage && (
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={`${firstImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          )}
          
          {hasDiscount && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
            >
              SALE
            </motion.div>
          )}
          
          {product.metadata?.featured_product && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
            >
              FEATURED
            </motion.div>
          )}
          
          {stockStatus < 10 && stockStatus > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
            >
              Only {stockStatus} left
            </motion.div>
          )}
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          {product.metadata?.category && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-gray-500 mb-2"
            >
              {product.metadata.category.metadata?.category_name || product.metadata.category.title}
            </motion.p>
          )}
          
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
          >
            {product.metadata?.product_name || product.title}
          </motion.h3>
          
          <div className="mt-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-2"
            >
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
            </motion.div>
            
            {stockStatus === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-red-600 font-semibold"
              >
                Out of Stock
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-green-600 text-sm"
              >
                In Stock
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}