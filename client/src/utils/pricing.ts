export const calculatePlanTotal = (planType: 'daily' | 'weekly' | 'monthly', price: number) => {
  const basePrices = {
    daily: price * 2, // 2 meals for 1 day
    weekly: price * 12, // 2 meals for 6 days (1 free)
    monthly: price * 52 // 2 meals for 26 days (4 free)
  };

  const basePrice = basePrices[planType];
  const tax = basePrice * 0.18; // 18% GST
  const total = basePrice + tax;

  return { basePrice, tax, total };
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};