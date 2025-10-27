import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Utensils,
  CheckCircle,
  Shield,
  Truck,
  Zap,
  Star,
  Gift
} from 'lucide-react';

const WeeklyPlanSubscription: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    deliveryTime: '12:00-14:00',
    dietaryPreference: 'vegetarian',
    startDate: new Date().toISOString().split('T')[0],
    specialInstructions: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const planDetails = {
    name: 'Weekly Plan',
    pricePerMeal: 79,
    duration: '26 days (4 days free)',
    mealsPerDay: 2,
    gstRate: 0.05,
    description: 'Perfect for weekly consistency with great savings!',
    features: [
      '2 meals per day (Lunch + Dinner)',
      '4 days free each month',
      'Flexible delivery timing',
      'Free delivery',
      'Cancel anytime',
      'Fresh home-style food'
    ]
  };

  const calculateTotal = () => {
    const basePrice = planDetails.pricePerMeal * planDetails.mealsPerDay * 26;
    const tax = basePrice * planDetails.gstRate;
    return { basePrice, tax, total: basePrice + tax };
  };

  const totals = calculateTotal();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/subscription-success', {
        state: { service, selectedPlan: 'weekly', planDetails, formData, totals }
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mt-3">
            Weekly Plan Subscription
          </h1>
          <p className="text-gray-600">
            Get freshly cooked meals all week long with flexible scheduling and 4 days free!
          </p>
        </div>

        {/* Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center justify-center bg-blue-100 border border-blue-200 rounded-xl py-3 shadow-sm">
            <Star className="h-5 w-5 text-blue-600 mr-2" />
            <div className="text-center">
              <p className="text-sm text-gray-600">Price per Meal</p>
              <p className="text-lg font-semibold text-blue-700">₹79</p>
            </div>
          </div>

          <div className="flex items-center justify-center bg-indigo-50 border border-indigo-200 rounded-xl py-3 shadow-sm">
            <Utensils className="h-5 w-5 text-indigo-600 mr-2" />
            <div className="text-center">
              <p className="text-sm text-gray-600">Meals per Day</p>
              <p className="text-lg font-semibold text-indigo-700">2</p>
            </div>
          </div>

          <div className="flex items-center justify-center bg-cyan-50 border border-cyan-200 rounded-xl py-3 shadow-sm">
            <Shield className="h-5 w-5 text-cyan-600 mr-2" />
            <div className="text-center">
              <p className="text-sm text-gray-600">GST</p>
              <p className="text-lg font-semibold text-cyan-700">5%</p>
            </div>
          </div>

          <div className="flex items-center justify-center bg-sky-50 border border-sky-200 rounded-xl py-3 shadow-sm">
            <Gift className="h-5 w-5 text-sky-600 mr-2" />
            <div className="text-center">
              <p className="text-sm text-gray-600">Special Offer</p>
              <p className="text-lg font-semibold text-sky-700">4 Days Free 🎁</p>
            </div>
          </div>
        </div>

        {/* Form and Summary */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Personal Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {[ 
                { label: 'Full Name', name: 'fullName', type: 'text' },
                { label: 'Email Address', name: 'email', type: 'email' },
                { label: 'Phone Number', name: 'phone', type: 'tel' }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} *
                  </label>
                  <input
                    {...field}
                    required
                    value={(formData as any)[field.name]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  rows={3}
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                  <input
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Time *
                  </label>
                  <select
                    name="deliveryTime"
                    required
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="12:00-14:00">12:00 PM - 2:00 PM</option>
                    <option value="18:00-20:00">6:00 PM - 8:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Preference *
                  </label>
                  <select
                    name="dietaryPreference"
                    required
                    value={formData.dietaryPreference}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="jain">Jain</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  required
                  value={formData.startDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <textarea
                  name="specialInstructions"
                  rows={3}
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  placeholder="Any dietary requests?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                {isSubmitting ? 'Processing...' : `Subscribe Now - ₹${totals.total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Right: Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-blue-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">{planDetails.name}</h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{planDetails.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">₹{totals.basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (5%)</span>
                  <span className="text-gray-900 font-medium">₹{totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span className="text-gray-900">Total</span>
                  <span className="text-blue-600">₹{totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-blue-500" /> What's Included
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {planDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-green-500 mr-2" />
                <h4 className="font-semibold text-green-900">Satisfaction Guarantee</h4>
              </div>
              <p className="text-sm text-green-700">
                Love your first meal or get a full refund — no questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanSubscription;
