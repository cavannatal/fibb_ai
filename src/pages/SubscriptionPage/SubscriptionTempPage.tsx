import React, { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface PlanPrice {
  monthly: string;
  yearly: string;
}

interface Plan {
  name: string;
  price: PlanPrice | string;
  description: string;
  features: string[];
  packageId: { monthly: string, yearly: string } | string;
  popular?: boolean;
}

type PlanCategory = 'consumer' | 'professional' | 'founders';

const PricingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlanCategory>('consumer');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);
  
  const allPlans: Record<PlanCategory, Plan[]> = {
    consumer: [
      {
        name: 'Fibb Basic',
        price: { monthly: '$12', yearly: '$120' },
        description: 'For casual users',
        features: [
          'No access to Fibbs',
          '30 Generations per month',
          'Basic Support',
          'Additional Generations: $0.50'
        ],
        packageId: { monthly: '2fe526a3-1d2b-4870-bd97-b5fb9365538c', yearly: '5521fb82-7f5e-4106-8646-eb8e08e6a8db' },
      },
      {
        name: 'Fibb Starter',
        price: { monthly: '$27', yearly: '$270' },
        description: 'For beginners',
        features: [
          'All "Fibb Basic" Benefits',
          '1 Fibb per month',
          '50 Generations per month',
          'Higher Priority Support',
          'Additional Fibbs: $15/ea',
          'Additional Generations: $0.50/ea'
        ],
        packageId: { monthly: '19e5c058-9732-4b43-8863-7f4366ca5e02', yearly: '961cd828-f581-47b7-bd15-25b2b61dee7e' },
      },
      {
        name: 'Fibb Standard',
        price: { monthly: '$45', yearly: '$450' },
        description: 'Most popular',
        features: [
          'All "Fibb Starter" Benefits',
          '2 Fibbs per month',
          '100 Generations per month',
          'Higher Priority Support',
          'Premium Content',
          'Additional Fibbs: $10/ea',
          'Additional Generations: $0.30/ea'
        ],
        packageId: { monthly: 'cc2f2542-a7be-42cc-9290-d1f399c6830a', yearly: '51ae3be9-6aaf-4ea7-8e5f-5ea4707fd20f' },
        popular: true,
      },
      {
        name: 'Fibb Pro',
        price: { monthly: '$125', yearly: '$1250' },
        description: 'For power users',
        features: [
          'All "Fibb Standard" Benefits',
          '10 Fibbs per month',
          '500 Generations per month',
          'Priority Support',
          'Dedicated Account Manager',
          'Commercial use license',
          'Additional Fibbs: $5/ea',
          'Additional Generations: $0.20/ea'
        ],
        packageId: { monthly: '2f51a18d-f1e3-4cd1-9b72-ac45c38d85cf', yearly: '1bf43511-9aef-4f94-a0d2-79f3cbca76dc' },
      }
    ],
    professional: [
      {
        name: 'Launch',
        description: 'Provide your own professional portfolio.',
        price: '$1,250',
        features: [
          'Handcrafted Fibb',
          '100 Curated Headshots',
          '10 Clothing, Expression, and Background changes'
        ],
        packageId: { monthly: 'launch-monthly', yearly: 'launch-yearly' },
      },
      {
        name: 'Ascent',
        description: "We'll fly a photographer to you and coach you through a photoshoot in your city.",
        price: '$2,700',
        features: [
          '4-5 hour photoshoot',
          'All edits from your shoot',
          'Handcrafted Fibb',
          'Corporate Headshot Package',
          'Creative Headshot Package'
        ],
        packageId: { monthly: 'ascent-monthly', yearly: 'ascent-yearly' },
      },
      {
        name: 'Summit',
        description: 'Ascent + Lifestyle',
        price: '$3,250',
        features: [
          '4-5 hour photoshoot',
          'All edits from your shoot',
          'Handcrafted Fibb',
          'Corporate Headshot Package',
          'Creative Headshot Package',
          'Lifestyle Package'
        ],
        packageId: { monthly: 'summit-monthly', yearly: 'summit-yearly' },
      },
      {
        name: 'Pinnacle',
        description: 'A Fibb curated experience',
        price: '$5,000',
        features: [
          '8-10 hour photoshoot',
          'All edits from your shoot',
          'Handcrafted Fibb',
          'Corporate Headshot Package',
          'Creative Headshot Package',
          'Lifestyle Package',
          'Mega-Prompt Package',
          'Creative General Package'
        ],
        packageId: { monthly: 'pinnacle-monthly', yearly: 'pinnacle-yearly' },
      }
    ],
    founders: [
      {
        name: "Pioneer's Palette",
        price: '$1,750',
        description: '',
        features: [],
        packageId: { monthly: 'pioneers-palette-monthly', yearly: 'pioneers-palette-yearly' },
      },
      {
        name: 'Genesis Creator',
        price: '$3,000',
        description: '',
        features: [],
        packageId: { monthly: 'genesis-creator-monthly', yearly: 'genesis-creator-yearly' },
      },
      {
        name: "Founder's Forge",
        price: '$10,000',
        description: '',
        features: [],
        packageId: { monthly: 'founders-forge-monthly', yearly: 'founders-forge-yearly' },
      },
    ],
  };
  
  const initiateStripeCheckout = async (packageId: string) => {
    const { userId } = await getCurrentUser();

    try {
      console.log('Sending request with:', { userId, packageId });

      const response = await axios.post(
        'https://o1t89jiych.execute-api.us-east-2.amazonaws.com/api/fibb-stripe-checkout-consumer',
        { userId, packageId },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Response received:', response.data);

      if (response.data.statusCode === 400) {
        console.log('Server returned an error:', response.data.body);
        throw new Error(`Server error: ${response.data.body}`);
      }
      setCheckoutUrl(response.data.checkouturl);

      return response.data;
    } catch (error) {
      console.log('Error initiating Stripe checkout:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Error response:', error.response.data);
          console.log('Error status:', error.response.status);
          console.log('Error headers:', error.response.headers);
        } else if (error.request) {
          console.log('No response received:', error.request);
        } else {
          console.log('Error setting up request:', error.message);
        }
      } else {
        console.log('Unexpected error:', error);
      }
      throw error;
    }
  };

  const handleSubscription = async (packageId: string) => {
    if (!packageId) {
      throw new Error('Invalid packageId');
    }
  
    if (!isAuthenticated) {
      navigate("/signup");
      return;
    }
  
    try {
      const response = await initiateStripeCheckout(packageId);
      console.log('Received response:', response);
      setCheckoutUrl(response.checkoutUrl);
      window.open(response.checkoutUrl);
    } catch (error: unknown) {
      console.log('Error during subscription process:', error);
    }
  };

  const getAbstractShape = (index: number) => {
    const shapes = [
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0 100 C 80 30, 130 30, 200 100 S 300 170, 400 100" stroke="rgba(203,245,154,0.1)" strokeWidth="2" fill="none" />
        <circle cx="340" cy="60" r="100" fill="rgba(203,245,154,0.05)" />
      </svg>,
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0 150 Q 100 50, 200 150 T 400 150" stroke="rgba(203,245,154,0.1)" strokeWidth="2" fill="none" />
        <rect x="240" y="0" width="160" height="160" fill="rgba(203,245,154,0.05)" />
      </svg>,
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0 100 C 80 30, 130 30, 200 100 S 300 170, 400 100" stroke="rgba(203,245,154,0.1)" strokeWidth="2" fill="none" />
        <circle cx="60" cy="230" r="120" fill="rgba(203,245,154,0.05)" />
      </svg>,
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="rgba(203,245,154,0.1)" strokeWidth="2" fill="none" />
        <path d="M350 200 L400 250 L350 300 L300 250 Z" stroke="rgba(203,245,154,0.1)" strokeWidth="2" fill="none" />
        <circle cx="200" cy="150" r="50" fill="rgba(203,245,154,0.05)" />
      </svg>,
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0 0 Q 200 0, 400 150 T 0 300" stroke="rgba(203,245,154,0.1)" strokeWidth="2" fill="none" />
        <rect x="50" y="50" width="100" height="100" transform="rotate(45 100 100)" fill="rgba(203,245,154,0.05)" />
      </svg>,
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0 150 C 100 50, 300 50, 400 150 S 300 250, 200 150 S 100 50, 0 150" stroke="rgba(203,245,154,0.1)" strokeWidth="2" fill="none" />
        <circle cx="200" cy="150" r="100" fill="none" stroke="rgba(203,245,154,0.05)" strokeWidth="2" />
      </svg>,
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0 0 L400 0 L200 300 Z" stroke="rgba(203,245,154,0.1)" strokeWidth="2" fill="none" />
        <circle cx="200" cy="100" r="50" fill="rgba(203,245,154,0.05)" />
      </svg>
    ];
    return shapes[index % shapes.length];
  };

  return (
    <div className="bg-gradient-to-r from-[#093f48] to-[#004948] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 sm:mb-8"
        style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
        >Choose Your Plan</h1>
        <p className="text-xl sm:text-2xl text-center mb-6 sm:mb-8 text-[#cbf59a]"
        style={{ fontFamily: '"Font1", sans-serif' }}
        >Simple, transparent pricing that grows with you</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-6 sm:mb-8">
          {(Object.keys(allPlans) as PlanCategory[]).map((tab) => (
            <button
              key={tab}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 ease-in-out
                ${activeTab === tab
                  ? 'bg-[#cbf59a] text-[#004948] shadow-lg' 
                  : 'bg-[#144a53] text-white hover:bg-[#285a62]'
                }`}
              style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="h-16 mb-6 sm:mb-8">
          {activeTab === 'consumer' && (
            <div className="flex justify-center">
              <div className="relative bg-[#144a53] p-1 rounded-full inline-flex items-center">
                <div
                  className="absolute inset-0 h-full w-1/2 bg-[#cbf59a] rounded-full transition-transform duration-300 ease-in-out"
                  style={{
                    transform: billingPeriod === 'yearly' ? 'translateX(100%)' : 'translateX(0)',
                  }}
                />
                <button
                  className={`relative z-10 px-4 sm:px-8 py-2 text-sm font-medium rounded-full transition-colors duration-300 ease-in-out
                    ${billingPeriod === 'monthly' ? 'text-[#004948]' : 'text-white'}`}
                  onClick={() => setBillingPeriod('monthly')}
                  style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                >
                  Monthly
                </button>
                <button
                  className={`relative z-10 px-4 sm:px-8 py-2 text-sm font-medium rounded-full transition-colors duration-300 ease-in-out
                    ${billingPeriod === 'yearly' ? 'text-[#004948]' : 'text-white'}`}
                  onClick={() => setBillingPeriod('yearly')}
                  style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                >
                  Yearly
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={`grid gap-6 sm:gap-8 ${activeTab === 'founders' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
           {allPlans[activeTab].map((plan, index) => (
            <div key={plan.name} className="relative flex flex-col p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[#144a53] to-[#093f48] shadow-xl transform transition-all duration-300 hover:scale-105 overflow-hidden">
              {getAbstractShape(index)}
              <div className="relative z-10">
              {plan.popular && <div className="text-xs font-semibold uppercase tracking-wide text-[#cbf59a] mb-2">Most popular</div>}
                <h3 className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                >{plan.name}</h3>
                <p className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                >
                  {typeof plan.price === 'string' 
                    ? plan.price
                    : billingPeriod === 'monthly' 
                      ? plan.price.monthly 
                      : plan.price.yearly}
                  {activeTab === 'consumer' && <span className="text-lg sm:text-xl font-normal">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>}
                </p>
                <button 
                    className="w-full bg-[#f79302] text-black py-2 sm:py-3 px-4 rounded-full font-semibold hover:bg-[#d8ffa7] transition-colors duration-300 mb-4 transform hover:scale-105"
                    style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                    onClick={() => handleSubscription(billingPeriod === 'monthly' ? (plan.packageId as { monthly: string, yearly: string }).monthly : (plan.packageId as { monthly: string, yearly: string }).yearly)}
                  >
                  {activeTab === 'consumer' ? 'Subscribe' : activeTab === 'professional' ? 'Subscribe' : 'Subscribe'}
                </button>
                <p className="text-base sm:text-lg text-[#cbf59a] mb-4"
                style={{ fontFamily: '"Font1", sans-serif' }}
                >{plan.description}</p>
                <ul className="space-y-2 text-sm sm:text-md"
                style={{ fontFamily: '"Font1", sans-serif' }}
                >
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#cbf59a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;