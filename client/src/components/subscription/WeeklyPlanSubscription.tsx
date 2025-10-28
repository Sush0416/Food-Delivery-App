import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Utensils,
  Shield,
  Star,
  Gift,
  CreditCard,
  Wallet,
} from "lucide-react";

const WeeklyPlanSubscription: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Default fallback service data
  const service =
    location.state?.service || {
      name: "Tiffin Service",
      description: "Nutritious weekly meal plan with doorstep delivery",
    };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");

  // ✅ Weekly Plan Details
  const planDetails = {
    name: "Weekly Plan",
    pricePerMeal: 89,
    duration: "7 days",
    mealsPerDay: 2,
    gstRate: 0.05,
  };

  const calculateTotal = () => {
    const basePrice = planDetails.pricePerMeal * planDetails.mealsPerDay * 7;
    const tax = basePrice * planDetails.gstRate;
    return { basePrice, tax, total: basePrice + tax };
  };

  const totals = calculateTotal();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Proceed to payment
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();

    const required = ["fullName", "email", "phone", "address", "city", "pincode"];
    for (const field of required) {
      if (!formData[field as keyof typeof formData]?.trim()) {
        alert("⚠️ Please fill all required fields before proceeding.");
        return;
      }
    }

    setShowPayment(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Simulate payment and navigate
  const handlePayment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const dataToSend = {
        service,
        selectedPlan: "Weekly",
        planDetails,
        formData,
        totals,
        paymentMethod,
      };

      localStorage.setItem("subscriptionData", JSON.stringify(dataToSend));

      navigate("/subscription-checkout", {
        state: dataToSend,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* 🎁 Offer Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 rounded-2xl shadow-md mb-8 flex items-center justify-center gap-3">
          <Gift className="h-6 w-6 text-yellow-300" />
          <p className="text-lg font-semibold">
            💫 Special Offer: Get 1 Day Free with your Weekly Plan!
          </p>
        </div>

        {/* 🌟 Price Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="flex flex-col items-center bg-blue-100 border border-blue-200 rounded-xl py-3 shadow-sm">
            <Star className="h-5 w-5 text-blue-600 mb-1" />
            <p className="text-sm text-gray-600">Price per Meal</p>
            <p className="text-lg font-semibold text-blue-700">₹89</p>
          </div>
          <div className="flex flex-col items-center bg-indigo-50 border border-indigo-200 rounded-xl py-3 shadow-sm">
            <Utensils className="h-5 w-5 text-indigo-600 mb-1" />
            <p className="text-sm text-gray-600">Meals per Day</p>
            <p className="text-lg font-semibold text-indigo-700">2</p>
          </div>
          <div className="flex flex-col items-center bg-cyan-50 border border-cyan-200 rounded-xl py-3 shadow-sm">
            <Shield className="h-5 w-5 text-cyan-600 mb-1" />
            <p className="text-sm text-gray-600">GST</p>
            <p className="text-lg font-semibold text-cyan-700">5%</p>
          </div>
          <div className="flex flex-col items-center bg-sky-50 border border-sky-200 rounded-xl py-3 shadow-sm">
            <Gift className="h-5 w-5 text-sky-600 mb-1" />
            <p className="text-sm text-gray-600">Special Offer</p>
            <p className="text-lg font-semibold text-sky-700">1 Day Free 🎁</p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mt-3">
            Weekly Plan Subscription
          </h1>
          <p className="text-gray-600">
            Enjoy healthy, delicious meals delivered to your doorstep for 7 days.
          </p>
        </div>

        {/* FORM + PAYMENT */}
        {!showPayment ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Personal Information
            </h2>
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {[
                { label: "Full Name", name: "fullName", type: "text" },
                { label: "Email Address", name: "email", type: "email" },
                { label: "Phone Number", name: "phone", type: "tel" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    {...field}
                    value={(formData as any)[field.name]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${field.label}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address
                </label>
                <textarea
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Pincode"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Proceed to Payment – ₹{totals.total.toFixed(2)}
              </button>
            </form>
          </div>
        ) : (
          // 💳 Payment Section
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Select Payment Method
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: "Credit / Debit Card",
                  value: "credit",
                  icon: <CreditCard className="h-5 w-5 text-blue-600" />,
                },
                {
                  label: "UPI / Wallet",
                  value: "upi",
                  icon: <Wallet className="h-5 w-5 text-green-600" />,
                },
                {
                  label: "Cash on Delivery",
                  value: "cod",
                  icon: <Shield className="h-5 w-5 text-amber-600" />,
                },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${
                    paymentMethod === method.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  {method.icon}
                  <span className="font-medium text-gray-700">
                    {method.label}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={handlePayment}
              disabled={isSubmitting}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              {isSubmitting
                ? "Processing Payment..."
                : `Pay ₹${totals.total.toFixed(2)}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyPlanSubscription;
