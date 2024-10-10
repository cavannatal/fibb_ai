import React, { useState } from 'react';

interface PlanPrice {
  monthly: string;
  yearly: string;
}

interface Plan {
  name: string;
  price: PlanPrice | string;
  description: string;
  features: string[];
  popular?: boolean;
}

type PlanCategory = 'consumer' | 'professional' | 'founders' ;

const PricingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlanCategory>('consumer');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const allPlans: Record<PlanCategory, Plan[]> = {
    consumer: [
      {
        name: 'Fibb Basic',
        price: { monthly: '$1', yearly: '$10' },
        description: 'For casual users',
        features: [
          'No access to Fibbs',
          '50 Generations per month',
          'Basic Support',
          'Additional Generations: $0.50'
        ]
      },
      {
        name: 'Fibb Starter',
        price: { monthly: '$27', yearly: '$270' },
        description: 'For beginners',
        features: [
          'All "Fibb Basic" Benefits',
          '1 Fibb per month',
          '20 Generations per month',
          'Higher Priority Support',
          'Additional Fibbs: $15/ea',
          'Additional Generations: $0.50/ea'
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ],
    founders: [
      {
        name: "Pioneer's Palette",
        price: '$1,750',
        description: '',
        features: []
      },
      {
        name: 'Genesis Creator',
        price: '$3,000',
        description: '',
        features: []
      },
      {
        name: "Founder's Forge",
        price: '$10,000',
        description: '',
        features: []
      },
    ],
    
  };

  return (
    <div className="bg-gradient-to-r from-[#093f48] to-[#004948] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-8"
        style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
        >Choose Your Plan</h1>
        <p className="text-2xl text-center mb-8 text-[#cbf59a]"
        style={{ fontFamily: '"Font1", sans-serif' }}
        >Simple, transparent pricing that grows with you</p>
        
        <div className="flex justify-center space-x-4 mb-8">
          {(Object.keys(allPlans) as PlanCategory[]).map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out
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

        <div className="h-16 mb-8">
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
                  className={`relative z-10 px-8 py-2 text-sm font-medium rounded-full transition-colors duration-300 ease-in-out
                    ${billingPeriod === 'monthly' ? 'text-[#004948]' : 'text-white'}`}
                  onClick={() => setBillingPeriod('monthly')}
                  style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                >
                  Monthly
                </button>
                <button
                  className={`relative z-10 px-8 py-2 text-sm font-medium rounded-full transition-colors duration-300 ease-in-out
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

        <div className={`grid gap-8 ${activeTab === 'founders' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
          {allPlans[activeTab].map((plan, index) => (
            <div key={plan.name} className="flex flex-col p-6 rounded-2xl bg-gradient-to-b from-[#144a53] to-[#093f48] shadow-xl transform transition-all duration-300 hover:scale-105">
              {plan.popular && <div className="text-xs font-semibold uppercase tracking-wide text-[#cbf59a] mb-2">Most popular</div>}
              <h3 className="text-3xl font-bold mb-2"
              style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
              >{plan.name}</h3>
              <p className="text-3xl font-bold mb-4"
              style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
              >
                {typeof plan.price === 'string' 
                  ? plan.price
                  : billingPeriod === 'monthly' 
                    ? plan.price.monthly 
                    : plan.price.yearly}
                {activeTab === 'consumer' && <span className="text-xl font-normal">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>}
              </p>
              <button className="w-full bg-[#f79302] text-black py-3 px-4 rounded-full font-semibold hover:bg-[#d8ffa7] transition-colors duration-300 mb-4 transform hover:scale-105"
              style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
              >
                {activeTab === 'consumer' ? 'Subscribe' : activeTab === 'professional' ? 'Subscribe' : 'Subscribe'}
              </button>
              <p className="text-lg text-[#cbf59a] mb-4"
              style={{ fontFamily: '"Font1", sans-serif' }}
              >{plan.description}</p>
              <ul className="space-y-2 text-md"
              style={{ fontFamily: '"Font1", sans-serif' }}
              >
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-[#cbf59a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;