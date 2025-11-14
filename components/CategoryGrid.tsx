'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Category } from '@/types'

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No categories available</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {categories.map((category, index) => {
        const image = category.metadata?.category_image

        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/categories/${category.slug}`}>
              <div className="group relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {image && (
                  <img
                    src={`${image.imgix_url}?w=800&h=640&fit=crop&auto=format,compress`}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {category.metadata?.category_name || category.title}
                  </h3>
                  
                  {category.metadata?.description && (
                    <p className="text-white/90 text-sm mb-4 line-clamp-2">
                      {category.metadata.description}
                    </p>
                  )}
                  
                  <span className="inline-flex items-center text-white font-medium group-hover:gap-2 transition-all">
                    Shop Now
                    <svg 
                      className="w-5 h-5 ml-2 group-hover:ml-0 transition-all" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}