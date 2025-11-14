'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
      <div className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl font-bold mb-4"
            >
              Welcome to Cosmic Store
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl mb-8"
            >
              Discover amazing products
            </motion.p>
          </div>
        </motion.div>
      </div>
    )
  }

  const product = featuredProducts[currentSlide]
  if (!product) return null

  const firstImage = product.metadata?.product_images?.[0]

  return (
    <div className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {firstImage && (
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: "linear" }}
              src={`${firstImage.imgix_url}?w=1920&h=1200&fit=crop&auto=format,compress`}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          )}
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
            >
              <span className="text-sm font-medium">Featured Product</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              {product.metadata?.product_name || product.title}
            </motion.h1>
            
            {product.metadata?.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl mb-8 text-white/90 line-clamp-3"
                dangerouslySetInnerHTML={{ 
                  __html: product.metadata.description.replace(/<[^>]*>/g, '') 
                }}
              />
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-4 mb-8"
            >
              {product.metadata?.sale_price ? (
                <>
                  <span className="text-4xl font-bold">
                    ${product.metadata.sale_price.toFixed(2)}
                  </span>
                  <span className="text-2xl text-white/70 line-through">
                    ${product.metadata.price?.toFixed(2)}
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse-glow">
                    SALE
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold">
                  ${product.metadata?.price?.toFixed(2)}
                </span>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                href={`/products/${product.slug}`}
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Shop Now
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {featuredProducts.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2"
        >
          {featuredProducts.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75 w-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}