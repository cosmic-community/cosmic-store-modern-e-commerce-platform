// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  status?: string
  thumbnail?: string
}

// Image type for Cosmic media
export interface CosmicImage {
  url: string
  imgix_url: string
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    category_name?: string
    description?: string
    category_image?: CosmicImage
    display_order?: number
  }
}

// Product interface
export interface Product extends CosmicObject {
  type: 'products'
  metadata: {
    product_name?: string
    description?: string
    price?: number
    sale_price?: number
    stock_quantity?: number
    product_images?: CosmicImage[]
    category?: Category
    featured_product?: boolean
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

// Type guards for runtime validation
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products'
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories'
}

// Utility types
export type ProductWithCategory = Product & {
  metadata: Product['metadata'] & {
    category: Category
  }
}

// Helper function for Cosmic SDK errors
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}