import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  Utensils,
  User,
  Star,
  Gift
} from 'lucide-react';

const SubscriptionSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get subscription data
  const subscriptionData =
    location.state || JSON.parse(localStorage.getItem('subscriptionData') || 'null');

  // ✅ If new data is passed via state, save it for persistence
  useEffect(() => {
    if (location.state) {
      localStorage.setItem('subscriptionData', JSON.stringify(location.state));
    }
  }, [location.state]);

  if (!subscriptionData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-gray-700 bg-gray-50">
        <h2 className="text-2xl font-bold text-red-500 mb-2">
          Invalid Subscription Details
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Please complete your subscription first.
        </p>
        <button
          onClick={() => navigate('/tiffin')}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all"
        >
          Back to Tiffin Services
        </button>
      </div>
    );
  }

  const { service, selectedPlan, planDetails, formData, totals } = subscriptionData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-4 py-10">
      {/* ✅ Success Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="text-center mb-8"
      >
        <CheckCircle2 className="text-green-600 w-20 h-20 mx-auto mb-4 drop-shadow-md" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Subscription Successful 🎉
        </h1>
        <p className="text-gray-700 text-lg">
          You’ve subscribed to the{' '}
          <span className="font-semibold capitalize text-green-700">{selectedPlan}</span>{' '}
          plan
          {service?.name && (
            <> for <span className="font-semibold text-green-700">{service.name}</span></>
          )}.
        </p>
      </motion.div>

      {/* ✅ Details Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-100 space-y-5"
      >
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 flex items-center gap-2">
          <Utensils className="text-orange-500 w-5 h-5" /> Subscription Details
        </h3>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
          <p><b>Plan:</b> {selectedPlan}</p>
          <p><b>Meals/Day:</b> {planDetails?.mealsPerDay}</p>
          <p><b>Price/Meal:</b> ₹{planDetails?.pricePerMeal}</p>
          <p><b>GST:</b> {planDetails?.gstRate ? planDetails.gstRate * 100 : 0}%</p>
          <p><b>Total:</b> ₹{totals?.total?.toFixed(2)}</p>
          {planDetails?.offer && (
            <p className="flex items-center gap-1 col-span-2">
              <Gift className="w-4 h-4 text-pink-500" /> <b>Offer:</b> {planDetails.offer}
            </p>
          )}
        </div>

        <hr className="my-4" />

        {/* ✅ Customer Info */}
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 flex items-center gap-2">
          <User className="text-green-600 w-5 h-5" /> Customer Info
        </h3>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
          <p><b>Name:</b> {formData?.fullName}</p>
          <p><b>Diet:</b> {formData?.dietaryPreference}</p>
          <p className="col-span-2 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{formData?.address}, {formData?.city} - {formData?.pincode}</span>
          </p>
          <p className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-500" /> {formData?.startDate}
          </p>
          <p className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-500" /> {formData?.deliveryTime}
          </p>
        </div>

        {/* ✅ Thank You Note */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mt-4 text-center">
          <Star className="inline-block w-5 h-5 text-yellow-400 mr-1" />
          <span className="text-gray-700 font-medium">
            Thank you for choosing{' '}
            <b className="text-green-700">{service?.name || 'our service'}</b>!
          </span>
        </div>
      </motion.div>

      <motion.button
        onClick={() => navigate('/tiffin')}
        whileHover={{ scale: 1.05 }}
        className="mt-10 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-all"
      >
        Back to Tiffin Services
      </motion.button>
    </div>
  );
};

export default SubscriptionSuccess;
