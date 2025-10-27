// src/pages/Checkout.tsx
import React, { useState, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Clock } from 'lucide-react';

// --- Stripe Initialization ---
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  console.error('⚠️ Stripe publishable key is missing! Check your .env file.');
}

const stripePromise = loadStripe(stripeKey as string);

// --- CheckoutForm Component ---
const CheckoutForm: React.FC<{ finalTotal: number; deliveryAddress: any }> = ({ finalTotal, deliveryAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { items, clearCart } = useCartStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  // --- Create Payment Intent ---
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!user || items.length === 0) return;

      try {
        const res = await fetch('/api/payment/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            amount: Math.round(finalTotal * 100), // in cents
          currency: 'inr',
            metadata: { userId: user._id },
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setClientSecret(data.clientSecret);
        } else {
          setError('Failed to initialize payment');
        }
      } catch (err) {
        setError('Error creating payment intent');
        console.error(err);
      }
    };

    createPaymentIntent();
  }, [items, user, finalTotal]);

  // --- Handle Payment Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!stripe || !elements) {
      setError('Stripe not loaded');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement || !clientSecret) {
      setError('Card or client secret not found');
      setLoading(false);
      return;
    }

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.name || 'Guest',
            email: user?.email,
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        clearCart();
        navigate('/order-success', { state: { amount: finalTotal } });
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">{error}</div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="h-5 w-5 mr-2" /> Payment Details
        </h3>
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' },
                  padding: '10px 12px',
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading || !clientSecret}
        className="w-full bg-orange-500 text-white py-4 px-6 rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-semibold text-lg flex items-center justify-center"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
        ) : (
          `Pay ₹${finalTotal.toFixed(2)}`
        )}
      </button>
    </form>
  );
};

// --- DeliveryAddressForm Component ---
const DeliveryAddressForm: React.FC<{ onAddressChange: (address: any) => void }> = ({ onAddressChange }) => {
  const { user } = useAuth();
  const [address, setAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    country: user?.address?.country || '',
    zipCode: user?.address?.zipCode || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newAddress = { ...address, [name]: value };
    setAddress(newAddress);
    onAddressChange(newAddress);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="123 Main Street"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="New York"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="NY"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="United States"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="10001"
          />
        </div>
      </div>
    </div>
  );
};

// --- Checkout Page Component ---
const Checkout: React.FC = () => {
  const { items, total } = useCartStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState<any>(null);

  // Redirect if no items or user not logged in
  useEffect(() => {
    if (items.length === 0) navigate('/cart');
    if (!user) navigate('/auth');
  }, [items, user, navigate]);

  if (!items.length || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  const deliveryFee = 249;
  const taxRate = 0.18;
  const taxAmount = total * taxRate;
  const finalTotal = total + deliveryFee + taxAmount;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600 mb-6">Complete your order</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DeliveryAddressForm onAddressChange={setDeliveryAddress} />
            <Elements stripe={stripePromise}>
              <CheckoutForm finalTotal={finalTotal} deliveryAddress={deliveryAddress} />
            </Elements>
          </div>

          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{total.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>₹{deliveryFee.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>₹{taxAmount.toFixed(2)}</span></div>
              <div className="flex justify-between pt-2 font-semibold border-t"><span>Total</span><span className="text-orange-500">₹{finalTotal.toFixed(2)}</span></div>
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg flex items-center">
              <Clock className="h-5 w-5 text-orange-500 mr-2" />
              <span className="text-sm text-orange-800">Estimated delivery: 30-45 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
