'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Product } from '@/types'

interface HeroProps {
  featuredProducts: Product[]
}

export default function Hero({ featuredProducts }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (featuredProducts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [featuredProducts.length])

  if (!featuredProducts || featuredProducts.length === 0) {
    return (
      <div className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to Cosmic Store</h1>
            <p className="text-xl mb-8">Discover amazing products</p>
          </div>
        </div>
      </div>
    )
  }

  const product = featuredProducts[currentSlide]
  if (!product) return null

  const firstImage = product.metadata?.product_images?.[0]

  return (
    <div className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
      {firstImage && (
        <img
          src={`${firstImage.imgix_url}?w=1920&h=1200&fit=crop&auto=format,compress`}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium">Featured Product</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            {product.metadata?.product_name || product.title}
          </h1>
          
          {product.metadata?.description && (
            <div 
              className="text-xl mb-8 text-white/90 line-clamp-3"
              dangerouslySetInnerHTML={{ 
                __html: product.metadata.description.replace(/<[^>]*>/g, '') 
              }}
            />
          )}
          
          <div className="flex items-center gap-4 mb-8">
            {product.metadata?.sale_price ? (
              <>
                <span className="text-4xl font-bold">
                  ${product.metadata.sale_price.toFixed(2)}
                </span>
                <span className="text-2xl text-white/70 line-through">
                  ${product.metadata.price?.toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  SALE
                </span>
              </>
            ) : (
              <span className="text-4xl font-bold">
                ${product.metadata?.price?.toFixed(2)}
              </span>
            )}
          </div>
          
          <Link
            href={`/products/${product.slug}`}
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {featuredProducts.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}