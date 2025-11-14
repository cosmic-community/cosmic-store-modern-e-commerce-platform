'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getCart, updateQuantity, removeFromCart, clearCart, type CartItem } from '@/lib/cart'

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCart()
    
    const handleCartUpdate = () => {
      loadCart()
    }
    
    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [])

  const loadCart = () => {
    const cartData = getCart()
    setCart(cartData.items)
    setLoading(false)
  }

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity)
  }

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId)
  }

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart()
    }
  }

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product.metadata?.sale_price || item.product.metadata?.price || 0
      return total + (price * item.quantity)
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading cart...</div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const firstImage = item.product.metadata?.product_images?.[0]
              const price = item.product.metadata?.sale_price || item.product.metadata?.price || 0

              return (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-6 shadow-md"
                >
                  <div className="flex gap-6">
                    <Link href={`/products/${item.product.slug}`}>
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {firstImage && (
                          <img
                            src={`${firstImage.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </Link>

                    <div className="flex-grow">
                      <Link href={`/products/${item.product.slug}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 mb-2">
                          {item.product.metadata?.product_name || item.product.title}
                        </h3>
                      </Link>
                      
                      <p className="text-2xl font-bold text-gray-900 mb-4">
                        ${price.toFixed(2)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6 shadow-md sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                {shipping === 0 && (
                  <div className="text-sm text-green-600">
                    🎉 You qualify for free shipping!
                  </div>
                )}
                {subtotal < 100 && (
                  <div className="text-sm text-gray-600">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors mb-4">
                Proceed to Checkout
              </button>

              <Link
                href="/"
                className="block text-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}