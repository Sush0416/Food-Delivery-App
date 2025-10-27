export const PLANS = {
  daily: {
    name: 'Daily Plan',
    price: 79,
    description: 'Perfect for trying out our service',
    duration: '1 day',
    mealsPerDay: 2,
    features: [
      '2 meals per day (Lunch + Dinner)',
      'Flexible timing',
      'Cancel anytime',
      'Fresh meals daily',
      'Free delivery',
      'No commitment'
    ]
  },
  weekly: {
    name: 'Weekly Plan',
    price: 69,
    description: 'Best value with 1 day free',
    duration: '7 days',
    mealsPerDay: 2,
    features: [
      '2 meals per day (Lunch + Dinner)',
      'Build Your Own Tiffin',
      'Priority delivery',
      '1 day free (7 days for price of 6)',
      'Weekly menu customization',
      'Free delivery'
    ]
  },
  monthly: {
    name: 'Monthly Plan',
    price: 59,
    description: 'Most popular with 4 days free',
    duration: '30 days',
    mealsPerDay: 2,
    features: [
      '2 meals per day (Lunch + Dinner)',
      'Advanced customization',
      'Dedicated support',
      '4 days free (30 days for price of 26)',
      'Monthly menu planning',
      'Free delivery',
      'Priority customer support',
      'Special occasion meals'
    ]
  }
};

export const DIETARY_OPTIONS = [
  { value: 'vegetarian', label: 'Vegetarian', icon: '🥦' },
  { value: 'non-vegetarian', label: 'Non-Vegetarian', icon: '🍗' },
  { value: 'vegan', label: 'Vegan', icon: '🌱' },
  { value: 'jain', label: 'Jain', icon: '🪷' }
];

export const DELIVERY_TIME_SLOTS = [
  { id: 'lunch', time: '12:00-14:00', label: 'Lunch (12:00 PM - 2:00 PM)' },
  { id: 'dinner', time: '19:00-21:00', label: 'Dinner (7:00 PM - 9:00 PM)' },
  { id: 'custom', time: 'custom', label: 'Custom Timing' }
];