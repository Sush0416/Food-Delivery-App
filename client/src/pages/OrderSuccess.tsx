import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, Package, Clock, Home } from 'lucide-react'

const OrderSuccess: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const orderId = location.state?.orderId

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Order Successful!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Thank you for your order. We've received your payment and are preparing your food.
          </p>

          {orderId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-mono text-lg font-semibold text-gray-900">
                #{orderId.slice(-8).toUpperCase()}
              </p>
            </div>
          )}

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Package className="h-4 w-4 mr-2" />
              <span>Your food is being prepared</span>
            </div>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>Estimated delivery: 30-45 minutes</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/orders"
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 block"
            >
              View Order Details
            </Link>
            
            <Link
              to="/restaurants"
              className="w-full bg-white text-orange-500 border border-orange-500 py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors duration-200 block"
            >
              Order More Food
            </Link>
            
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess