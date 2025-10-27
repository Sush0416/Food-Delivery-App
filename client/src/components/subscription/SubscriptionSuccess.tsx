import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, Calendar, Clock, MapPin, ArrowLeft, Home } from 'lucide-react'

const SubscriptionSuccess: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { service, selectedPlan, planDetails, formData, totals } = location.state || {}

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Subscription Details</h2>
          <button
            onClick={() => navigate('/tiffin')}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Back to Tiffin Services
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Subscription Successful!
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome to {service.name}'s {selectedPlan} plan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{selectedPlan} Plan</p>
                  <p className="text-orange-600 font-semibold">₹{planDetails.price}/meal</p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subscription Amount</span>
                  <span className="text-gray-900">₹{totals.basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST 5%)</span>
                  <span className="text-gray-900">₹{totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span className="text-gray-900">Total Paid</span>
                  <span className="text-gray-900">₹{totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Delivery Address</p>
                  <p className="text-gray-600">
                    {formData.address}<br />
                    {formData.city}, {formData.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">First Delivery</p>
                  <p className="text-gray-600">
                    Tomorrow, 12:00 PM - 2:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Regular Timings</p>
                  <p className="text-gray-600">
                    Lunch: 12:00 PM - 2:00 PM<br />
                    Dinner: 7:00 PM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-green-900 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-green-800">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              You'll receive a confirmation email within 5 minutes
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Our chef will contact you today to discuss meal preferences
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              First delivery starts tomorrow at your chosen time
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              You can customize your meals daily through our app
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => navigate('/tiffin')}
            className="flex items-center justify-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Tiffin Services
          </button>
          <button
            onClick={() => navigate('/tiffin/' + service._id)}
            className="flex items-center justify-center border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            View Service Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionSuccess