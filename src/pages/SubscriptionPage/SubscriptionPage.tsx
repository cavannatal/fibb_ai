import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import SubscriptionSwitch from './components/SubscriptionSwitch';

// Initialize Stripe
const stripePromise = loadStripe('your_stripe_publishable_key');

interface Plan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
  monthlyPriceId: string;
  yearlyPriceId: string;
}

const plans: Plan[] = [
  {
    name: 'Basic Plan',
    monthlyPrice: 10,
    yearlyPrice: 8,
    features: [
      'Limited generations (~200 / month)',
      'General commercial terms',
      'Access to member gallery',
      'Optional credit top ups',
      '3 concurrent fast jobs'
    ],
    monthlyPriceId: 'price_basic_monthly',
    yearlyPriceId: 'price_basic_yearly'
  },
  {
    name: 'Standard Plan',
    monthlyPrice: 30,
    yearlyPrice: 24,
    features: [
      '15h Fast generations',
      'Unlimited Relaxed generations',
      'General commercial terms',
      'Access to member gallery',
      'Optional credit top ups',
      '3 concurrent fast jobs'
    ],
    isPopular: true,
    monthlyPriceId: 'price_standard_monthly',
    yearlyPriceId: 'price_standard_yearly'
  },
  {
    name: 'Pro Plan',
    monthlyPrice: 60,
    yearlyPrice: 48,
    features: [
      '30h Fast generations',
      'Unlimited Relaxed generations',
      'General commercial terms',
      'Access to member gallery',
      'Optional credit top ups',
      'Stealth image generation',
      '12 concurrent fast jobs'
    ],
    monthlyPriceId: 'price_pro_monthly',
    yearlyPriceId: 'price_pro_yearly'
  },
  {
    name: 'Mega Plan',
    monthlyPrice: 120,
    yearlyPrice: 96,
    features: [
      '60h Fast generations',
      'Unlimited Relaxed generations',
      'General commercial terms',
      'Access to member gallery',
      'Optional credit top ups',
      'Stealth image generation',
      '12 concurrent fast jobs'
    ],
    monthlyPriceId: 'price_mega_monthly',
    yearlyPriceId: 'price_mega_yearly'
  }
];

const SubscriptionPage: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = () => {
    setIsYearly(!isYearly);
  };

  const handleSubscribe = async (plan: Plan) => {
    try {
      const priceId = isYearly ? plan.yearlyPriceId : plan.monthlyPriceId;
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });
      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        
        if (error) {
          console.error('Error:', error);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-[#084248]" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Purchase a subscription
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-4 text-xl text-gray-600"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Choose the plan that works for you
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 flex justify-center items-center"
        >
          <SubscriptionSwitch isYearly={isYearly} onToggle={handleToggle} />
        </motion.div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 * (index + 1) }}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${plan.isPopular ? 'ring-2 ring-[#084248]' : ''}`}
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-[#084248]">{plan.name}</h2>
                <p className="mt-4">
                  {isYearly && (
                    <span className="text-lg line-through text-gray-400">${plan.monthlyPrice}</span>
                  )}
                  <span className="text-4xl font-extrabold text-[#084248] ml-2">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-base font-medium text-gray-600">/ month</span>
                </p>
                {isYearly && (
                  <p className="mt-1 text-sm text-gray-500">20% off billed annually</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 w-full px-9 py-4 bg-[#084248] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleSubscribe(plan)}
                >
                  Subscribe
                </motion.button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-500 tracking-wide uppercase">What's included</h3>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <Check className="flex-shrink-0 h-5 w-5 text-[#084248]" aria-hidden="true" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;