import React from 'react'
import { useCartStore } from '../store/cartStore'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Cart: React.FC = () => {
  const { items, total, updateQuantity, removeItem, clearCart } = useCartStore()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) {
      navigate('/auth')
      return
    }
    // Proceed to checkout
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
            <button
              onClick={() => navigate('/restaurants')}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {items.map((item) => (
                <div key={item.menuItem._id} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                      {/* Menu item image */}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.menuItem.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {item.menuItem.description}
                      </p>
                      <p className="text-orange-500 font-semibold mt-1">
                        ₹{item.menuItem.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.menuItem._id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.menuItem._id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => removeItem(item.menuItem._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-4 text-red-500 hover:text-red-600 font-medium"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>₹249</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>₹{(total * 0.18).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{(total + 249 + total * 0.18).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart