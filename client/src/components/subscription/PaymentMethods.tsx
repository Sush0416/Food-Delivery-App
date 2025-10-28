import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Smartphone,
  Building2,
  ArrowLeft,
  CheckCircle,
  Shield,
  Lock
} from 'lucide-react';

const PaymentMethods: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { service, selectedPlan, planDetails, formData, totals } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Paytm, Google Pay, PhonePe, BHIM UPI',
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building2,
      description: 'All major banks supported',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600'
    }
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleProceed = () => {
    if (!selectedMethod) {
      alert('Please select a payment method to proceed.');
      return;
    }

    // Navigate to checkout with selected payment method
    navigate('/subscription-checkout', {
      state: {
        service,
        selectedPlan,
        planDetails,
        formData,
        totals,
        paymentMethod: selectedMethod
      }
    });
  };

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
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
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
            Choose Payment Method
          </h1>
          <p className="text-gray-600">
            Select your preferred payment method for {selectedPlan} Plan subscription
          </p>
        </div>

        {/* Subscription Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={service.image}
                alt={service.name}
                className="w-12 h-12 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <p className="text-gray-600 capitalize">{selectedPlan} Plan</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">₹{totals.total.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Total Amount</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            const isSelected = selectedMethod === method.id;

            return (
              <div
                key={method.id}
                onClick={() => handleMethodSelect(method.id)}
                className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : `${method.color} border-gray-200 hover:border-gray-300`
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                )}

                <div className="flex flex-col items-center text-center">
                  <IconComponent className={`h-12 w-12 mb-4 ${method.iconColor}`} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {method.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {method.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center mb-3">
            <Shield className="h-6 w-6 text-green-600 mr-3" />
            <h4 className="font-semibold text-green-900">Secure Payment</h4>
          </div>
          <p className="text-sm text-green-700 mb-3">
            Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
          </p>
          <div className="flex items-center text-sm text-green-700">
            <Lock className="h-4 w-4 mr-2" />
            SSL Encrypted • PCI DSS Compliant
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          disabled={!selectedMethod}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
            selectedMethod
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedMethod ? `Pay with ${paymentMethods.find(m => m.id === selectedMethod)?.name}` : 'Select Payment Method'}
        </button>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-4">
          By proceeding, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default PaymentMethods;
