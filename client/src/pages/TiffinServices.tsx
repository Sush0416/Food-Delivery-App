import React, { useState, useEffect } from 'react'
import { Calendar, Clock, Star, Users, Utensils } from 'lucide-react'
import { Restaurant } from '../types'

const TiffinServices: React.FC = () => {
  const [tiffinServices, setTiffinServices] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<'daily' | 'weekly' | 'monthly'>('daily')

  useEffect(() => {
    fetchTiffinServices()
  }, [])

  const fetchTiffinServices = async () => {
    try {
      const response = await fetch('/api/restaurants?type=tiffin')
      if (response.ok) {
        const data = await response.json()
        setTiffinServices(data.restaurants)
      }
    } catch (error) {
      console.error('Error fetching tiffin services:', error)
    } finally {
      setLoading(false)
    }
  }

  const plans = {
    daily: { price: 8.99, description: 'Perfect for trying out our service' },
    weekly: { price: 49.99, description: 'Best value with 1 day free' },
    monthly: { price: 179.99, description: 'Most popular with 4 days free' }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tiffin Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enjoy fresh, home-cooked meals delivered daily. Choose from our variety of subscription plans.
          </p>
        </div>

        {/* Subscription Plans */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Choose Your Plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(plans).map(([plan, details]) => (
              <div
                key={plan}
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                  selectedPlan === plan
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => setSelectedPlan(plan as any)}
              >
                <h3 className="text-lg font-semibold text-gray-900 capitalize mb-2">
                  {plan} Plan
                </h3>
                <p className="text-3xl font-bold text-orange-500 mb-2">
                  ${details.price}
                  <span className="text-sm text-gray-600 font-normal">/meal</span>
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {details.description}
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Utensils className="h-4 w-4 mr-2" />
                    <span>2 meals per day (Lunch + Dinner)</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{plan === 'daily' ? '1 day' : plan === 'weekly' ? '7 days' : '30 days'}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Daily delivery by 12 PM</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200">
              Subscribe to {selectedPlan} Plan
            </button>
          </div>
        </div>

        {/* Tiffin Services List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Tiffin Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiffinServices.map(service => (
              <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  {/* Service image */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    Tiffin Service
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{service.rating} • {service.deliveryTime} min delivery</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Specializes in home-style meals</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.cuisines.slice(0, 3).map(cuisine => (
                      <span
                        key={cuisine}
                        className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                    View Menu & Subscribe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TiffinServices