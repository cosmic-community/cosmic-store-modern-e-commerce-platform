import { Product } from '@/types'

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

const CART_STORAGE_KEY = 'smart-lead-cart'
const WISHLIST_STORAGE_KEY = 'smart-lead-wishlist'

// Cart operations
export function getCart(): Cart {
  if (typeof window === 'undefined') {
    return { items: [], total: 0 }
  }
  
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY)
    if (!cartData) {
      return { items: [], total: 0 }
    }
    return JSON.parse(cartData)
  } catch (error) {
    console.error('Error loading cart:', error)
    return { items: [], total: 0 }
  }
}

export function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    // Dispatch custom event to update UI
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }))
  } catch (error) {
    console.error('Error saving cart:', error)
  }
}

export function addToCart(product: Product, quantity: number = 1): Cart {
  const cart = getCart()
  
  const existingItemIndex = cart.items.findIndex(
    item => item.product.id === product.id
  )
  
  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += quantity
  } else {
    cart.items.push({ product, quantity })
  }
  
  cart.total = calculateTotal(cart.items)
  saveCart(cart)
  return cart
}

export function removeFromCart(productId: string): Cart {
  const cart = getCart()
  cart.items = cart.items.filter(item => item.product.id !== productId)
  cart.total = calculateTotal(cart.items)
  saveCart(cart)
  return cart
}

export function updateQuantity(productId: string, quantity: number): Cart {
  const cart = getCart()
  const item = cart.items.find(item => item.product.id === productId)
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId)
    }
    item.quantity = quantity
    cart.total = calculateTotal(cart.items)
    saveCart(cart)
  }
  
  return cart
}

export function clearCart(): Cart {
  const emptyCart = { items: [], total: 0 }
  saveCart(emptyCart)
  return emptyCart
}

export function getCartItemCount(): number {
  const cart = getCart()
  return cart.items.reduce((total, item) => total + item.quantity, 0)
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const price = item.product.metadata?.sale_price || item.product.metadata?.price || 0
    return total + (price * item.quantity)
  }, 0)
}

// Wishlist operations
export function getWishlist(): string[] {
  if (typeof window === 'undefined') return []
  
  try {
    const wishlistData = localStorage.getItem(WISHLIST_STORAGE_KEY)
    return wishlistData ? JSON.parse(wishlistData) : []
  } catch (error) {
    console.error('Error loading wishlist:', error)
    return []
  }
}

export function saveWishlist(wishlist: string[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: wishlist }))
  } catch (error) {
    console.error('Error saving wishlist:', error)
  }
}

export function addToWishlist(productId: string): string[] {
  const wishlist = getWishlist()
  if (!wishlist.includes(productId)) {
    wishlist.push(productId)
    saveWishlist(wishlist)
  }
  return wishlist
}

export function removeFromWishlist(productId: string): string[] {
  const wishlist = getWishlist()
  const filtered = wishlist.filter(id => id !== productId)
  saveWishlist(filtered)
  return filtered
}

export function isInWishlist(productId: string): boolean {
  const wishlist = getWishlist()
  return wishlist.includes(productId)
}