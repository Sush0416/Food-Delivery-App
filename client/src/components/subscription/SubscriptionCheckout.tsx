import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { ArrowLeft, CreditCard, MapPin, User } from 'lucide-react'

// ✅ Replace with your real Stripe publishable key
const stripePromise = loadStripe('pk_test_51PxxxxxxYOUR_KEY')

// =====================
// ✅ Checkout Form
// =====================
const CheckoutForm: React.FC<{
  service: any
  planDetails: any
  totals: any
  selectedPlan: string
}> = ({ service, planDetails, totals, selectedPlan }) => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    pincode: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsSubmitting(true)

    // 💳 Simulated payment success (Stripe backend not yet integrated)
    setTimeout(() => {
      const subscriptionData = {
        service,
        selectedPlan,
        planDetails,
        formData,
        totals,
        paymentStatus: 'success',
      }

      localStorage.setItem('subscriptionData', JSON.stringify(subscriptionData))
      navigate('/subscription-success', { state: subscriptionData })
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 🧍 Customer Info */}
      <div className="flex items-center border p-3 rounded-lg">
        <User className="h-5 w-5 text-gray-400 mr-3" />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full outline-none"
        />
      </div>

      <div className="flex items-center border p-3 rounded-lg">
        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg w-full outline-none"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg w-full outline-none"
        />
      </div>

      {/* 💳 Stripe Card Input */}
      <div className="border rounded-lg p-4">
        <label className="text-gray-700 font-medium">Card Details</label>
        <div className="mt-2 p-2 border rounded-lg">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
      </div>

      {/* 💰 Price Summary */}
      <div className="bg-gray-50 border rounded-lg p-4">
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Subscription Amount</span>
          <span>₹{totals.basePrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>GST (5%)</span>
          <span>₹{totals.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-gray-900 border-t pt-2">
          <span>Total Payable</span>
          <span>₹{totals.total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isSubmitting}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
      >
        {isSubmitting ? 'Processing Payment...' : 'Pay & Subscribe Now'}
      </button>
    </form>
  )
}

// =====================
// ✅ Main Checkout Page
// =====================
const SubscriptionCheckout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // ✅ Ensure all required data is passed correctly
  const { service, selectedPlan, planDetails, totals } = location.state || {}

  if (!service || !planDetails || !totals) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Invalid Subscription Data
          </h2>
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
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 mb-4 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Complete Your Subscription
        </h1>

        {/* 🍱 Service Summary */}
        <div className="flex items-center mb-6">
          <img
            src={service.image}
            alt={service.name}
            className="w-16 h-16 object-cover rounded-lg mr-4"
          />
          <div>
            <h2 className="font-semibold text-lg">{service.name}</h2>
            <p className="text-gray-600 capitalize">{selectedPlan} Plan</p>
            <p className="text-orange-600 font-semibold">
              ₹{planDetails.pricePerMeal}/meal
            </p>
          </div>
        </div>

        {/* 💳 Stripe Elements Wrapper */}
        <Elements stripe={stripePromise}>
          <CheckoutForm
            service={service}
            planDetails={planDetails}
            totals={totals}
            selectedPlan={selectedPlan}
          />
        </Elements>

        <div className="flex items-center text-gray-500 mt-6 text-sm">
          <CreditCard className="h-4 w-4 mr-2" />
          Secure payment powered by Stripe (demo mode)
        </div>
      </div>
    </div>
  )
}

export default SubscriptionCheckout
