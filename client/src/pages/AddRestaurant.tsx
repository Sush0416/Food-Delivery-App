import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AddRestaurant: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    cuisines: [] as string[],
    deliveryTime: 30,
    minOrder: 0,
    contact: {
      phone: '',
      email: ''
    }
  })
  const [currentCuisine, setCurrentCuisine] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [contactField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const addCuisine = () => {
    if (currentCuisine.trim() && !formData.cuisines.includes(currentCuisine.trim())) {
      setFormData(prev => ({
        ...prev,
        cuisines: [...prev.cuisines, currentCuisine.trim()]
      }))
      setCurrentCuisine('')
    }
  }

  const removeCuisine = (cuisine: string) => {
    setFormData(prev => ({
      ...prev,
      cuisines: prev.cuisines.filter(c => c !== cuisine)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        navigate('/restaurants')
      } else {
        console.error('Failed to create restaurant')
      }
    } catch (error) {
      console.error('Error creating restaurant:', error)
    } finally {
      setLoading(false)
    }
  }

  if (user?.role !== 'restaurant' && user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You must be a restaurant owner to add restaurants.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Restaurant</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 input-field"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 input-field"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address.street"
                  id="address.street"
                  required
                  value={formData.address.street}
                  onChange={handleChange}
                  className="mt-1 input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    id="address.city"
                    required
                    value={formData.address.city}
                    onChange={handleChange}
                    className="mt-1 input-field"
                  />
                </div>

                <div>
                  <label htmlFor="address.state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="address.state"
                    id="address.state"
                    required
                    value={formData.address.state}
                    onChange={handleChange}
                    className="mt-1 input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="address.country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="address.country"
                    id="address.country"
                    required
                    value={formData.address.country}
                    onChange={handleChange}
                    className="mt-1 input-field"
                  />
                </div>

                <div>
                  <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="address.zipCode"
                    id="address.zipCode"
                    required
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    className="mt-1 input-field"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cuisines */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cuisines</h3>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentCuisine}
                  onChange={(e) => setCurrentCuisine(e.target.value)}
                  placeholder="Add cuisine"
                  className="flex-1 input-field"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCuisine())}
                />
                <button
                  type="button"
                  onClick={addCuisine}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.cuisines.map(cuisine => (
                  <span
                    key={cuisine}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                  >
                    {cuisine}
                    <button
                      type="button"
                      onClick={() => removeCuisine(cuisine)}
                      className="ml-2 text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact.phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="contact.phone"
                  id="contact.phone"
                  required
                  value={formData.contact.phone}
                  onChange={handleChange}
                  className="mt-1 input-field"
                />
              </div>

              <div>
                <label htmlFor="contact.email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="contact.email"
                  id="contact.email"
                  required
                  value={formData.contact.email}
                  onChange={handleChange}
                  className="mt-1 input-field"
                />
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">
                  Delivery Time (minutes)
                </label>
                <input
                  type="number"
                  name="deliveryTime"
                  id="deliveryTime"
                  required
                  min="1"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  className="mt-1 input-field"
                />
              </div>

              <div>
                <label htmlFor="minOrder" className="block text-sm font-medium text-gray-700">
                  Minimum Order ($)
                </label>
                <input
                  type="number"
                  name="minOrder"
                  id="minOrder"
                  required
                  min="0"
                  step="0.01"
                  value={formData.minOrder}
                  onChange={handleChange}
                  className="mt-1 input-field"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors duration-200"
          >
            {loading ? 'Creating Restaurant...' : 'Create Restaurant'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddRestaurant