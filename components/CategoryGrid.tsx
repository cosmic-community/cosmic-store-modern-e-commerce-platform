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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.15,
              ease: [0.25, 0.4, 0.25, 1]
            }}
          >
            <Link href={`/categories/${category.slug}`}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                {image && (
                  <motion.img
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    src={`${image.imgix_url}?w=800&h=640&fit=crop&auto=format,compress`}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-colors duration-300" />
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                  className="absolute inset-0 p-8 flex flex-col justify-end"
                >
                  <motion.h3
                    className="text-3xl font-bold text-white mb-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {category.metadata?.category_name || category.title}
                  </motion.h3>
                  
                  {category.metadata?.description && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      className="text-white/90 text-sm mb-4 line-clamp-2"
                    >
                      {category.metadata.description}
                    </motion.p>
                  )}
                  
                  <motion.span
                    className="inline-flex items-center text-white font-medium"
                    whileHover={{ gap: "0.75rem" }}
                    transition={{ duration: 0.2 }}
                  >
                    Shop Now
                    <motion.svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.span>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}