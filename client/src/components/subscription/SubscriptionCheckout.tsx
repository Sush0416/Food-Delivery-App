import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CreditCard, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Shield,
  Star,
  Utensils
} from 'lucide-react';

const SubscriptionCheckout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { service, selectedPlan, planDetails } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    deliveryInstructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!service || !planDetails) {
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
    );
  }

  const calculateTotal = () => {
    const basePrice = planDetails.price * 30; // Assuming 30 days
    const tax = basePrice * 0.18; // 18% GST
    return {
      basePrice,
      tax,
      total: basePrice + tax
    };
  };

  const totals = calculateTotal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/subscription-success', { 
        state: { service, selectedPlan, planDetails, formData, totals }
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-orange-600 hover:text-orange-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Service
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Service Info */}
              <div className="flex items-start space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{service.rating} • {service.deliveryTime} min delivery</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                </div>
              </div>

              {/* Plan Details */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Subscription Plan</h3>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900 capitalize">{selectedPlan} Plan</h4>
                      <p className="text-sm text-gray-600 mt-1">{planDetails.description}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <Utensils className="h-4 w-4 mr-2" />
                        <span>2 meals per day (Lunch + Dinner)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">₹{planDetails.price}</p>
                      <p className="text-sm text-gray-600">per meal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Pricing Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly subscription ({selectedPlan} plan)</span>
                    <span className="text-gray-900">₹{totals.basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="text-gray-900">30 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="text-gray-900">₹{totals.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span className="text-gray-900">Total Amount</span>
                    <span className="text-orange-600">₹{totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your complete delivery address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Instructions
                  </label>
                  <textarea
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Any special delivery instructions..."
                  />
                </div>

                {/* Payment Method */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-orange-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <CreditCard className="h-5 w-5 ml-3 mr-2 text-gray-400" />
                      <span className="flex-1">Credit/Debit Card</span>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-orange-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <Shield className="h-5 w-5 ml-3 mr-2 text-gray-400" />
                      <span className="flex-1">UPI Payment</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-semibold text-lg"
                >
                  {isProcessing ? 'Processing Payment...' : `Pay ₹${totals.total.toFixed(2)} Now`}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service</span>
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium capitalize">{selectedPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per meal</span>
                  <span className="font-medium">₹{planDetails.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Meals per day</span>
                  <span className="font-medium">2 (Lunch + Dinner)</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{totals.basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST 18%)</span>
                  <span className="text-gray-900">₹{totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span className="text-gray-900">Total</span>
                  <span className="text-orange-600">₹{totals.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  What's Included
                </h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Fresh meals delivered daily</li>
                  <li>• Free delivery</li>
                  <li>• Customizable menu options</li>
                  <li>• Cancel anytime</li>
                  <li>• Priority customer support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCheckout;