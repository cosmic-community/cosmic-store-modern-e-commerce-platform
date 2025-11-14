'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/types'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const images = product.metadata?.product_images || []
  const [selectedImage, setSelectedImage] = useState(0)
  const hasDiscount = product.metadata?.sale_price && product.metadata.sale_price < (product.metadata.price || 0)
  const stockStatus = product.metadata?.stock_quantity || 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <motion.div 
            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {images[selectedImage] && (
              <img
                src={`${images[selectedImage].imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            )}
            
            {hasDiscount && (
              <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                SALE
              </div>
            )}
          </motion.div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden ${
                    selectedImage === index 
                      ? 'ring-2 ring-blue-600' 
                      : 'ring-1 ring-gray-200'
                  }`}
                >
                  <img
                    src={`${image.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${product.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {product.metadata?.category && (
            <Link 
              href={`/categories/${product.metadata.category.slug}`}
              className="inline-block text-blue-600 hover:text-blue-800 mb-4"
            >
              {product.metadata.category.metadata?.category_name || product.metadata.category.title}
            </Link>
          )}

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.metadata?.product_name || product.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            {hasDiscount ? (
              <>
                <span className="text-4xl font-bold text-gray-900">
                  ${product.metadata.sale_price?.toFixed(2)}
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  ${product.metadata.price?.toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Save ${((product.metadata.price || 0) - (product.metadata.sale_price || 0)).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-4xl font-bold text-gray-900">
                ${product.metadata?.price?.toFixed(2)}
              </span>
            )}
          </div>

          <div className="mb-6">
            {stockStatus === 0 ? (
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Out of Stock
              </div>
            ) : stockStatus < 10 ? (
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-lg font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Only {stockStatus} left in stock
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-lg font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                In Stock
              </div>
            )}
          </div>

          {product.metadata?.description && (
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: product.metadata.description }}
            />
          )}

          <div className="space-y-4">
            <button 
              disabled={stockStatus === 0}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
                stockStatus === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {stockStatus === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            
            <button className="w-full bg-gray-100 text-gray-900 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors">
              Add to Wishlist
            </button>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="font-semibold mb-4">Product Details</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">SKU:</dt>
                <dd className="text-gray-900">{product.id.slice(-8).toUpperCase()}</dd>
              </div>
              {product.metadata?.category && (
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category:</dt>
                  <dd className="text-gray-900">
                    {product.metadata.category.metadata?.category_name || product.metadata.category.title}
                  </dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-600">Availability:</dt>
                <dd className="text-gray-900">{stockStatus > 0 ? 'In Stock' : 'Out of Stock'}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}