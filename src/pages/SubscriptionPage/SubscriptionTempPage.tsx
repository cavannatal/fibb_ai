import React, { useState } from 'react';

const PricingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'consumer' | 'professional' | 'founders'>('consumer');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const consumerPlans = [
    {
      name: 'Fibb Basic',
      price: '$1',
      features: [
        'No access to Fibbs',
        '50 Generations per month',
        'Basic Support',
        'Additional Generations: $0.50'
      ]
    },
    {
      name: 'Fibb Starter',
      price: '$27',
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
      price: '$45',
      popular: true,
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
      price: '$125',
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
  ];

  const professionalPlans = [
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
  ];

  const foundersPlans = [
    { name: "Pioneer's Palette", price: '$1,750' },
    { name: 'Genesis Creator', price: '$3,000' },
    { name: "Founder's Forge", price: '$10,000' }
  ];

  return (
    <div className="bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8 py-6 border-b border-gray-200">
          {['Consumer', 'Professional', 'Founders'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-semibold text-lg transition-all duration-300 ease-in-out
                ${activeTab.toLowerCase() === tab.toLowerCase() 
                  ? 'text-teal-600 border-b-2 border-teal-600' 
                  : 'text-gray-600 hover:text-teal-600'
                }`}
              onClick={() => setActiveTab(tab.toLowerCase() as 'consumer' | 'professional' | 'founders')}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: '#093f48' }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {activeTab === 'consumer' && (
            <>
              <div className="flex justify-center mb-12">
                <div className="relative bg-[#22535b] p-1 rounded-lg inline-flex items-center">
                  <div
                    className="absolute inset-0 h-full w-1/2 bg-white rounded-full transition-transform duration-300 ease-in-out"
                    style={{
                      transform: billingPeriod === 'yearly' ? 'translateX(100%)' : 'translateX(0)',
                    }}
                  />
                  <button
                    className={`relative z-10 px-6 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ease-in-out
                      ${billingPeriod === 'monthly' ? 'text-teal-900' : 'text-white'}`}
                    onClick={() => setBillingPeriod('monthly')}
                  >
                    Monthly
                  </button>
                  <button
                    className={`relative z-10 px-6 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ease-in-out
                      ${billingPeriod === 'yearly' ? 'text-teal-900' : 'text-white'}`}
                    onClick={() => setBillingPeriod('yearly')}
                  >
                    Yearly
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {consumerPlans.map((plan) => (
                  <div key={plan.name} className={`p-8 rounded-lg ${plan.popular ? 'ring-2 ring-teal-300' : ''}`}>
                    {plan.popular && <div className="text-xs font-semibold uppercase tracking-wide text-teal-300 mb-2">Most popular</div>}
                    <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                    <p className="text-4xl font-bold mb-4">{plan.price}<span className="text-lg font-normal">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span></p>
                    <button className="w-full bg-white text-teal-900 py-3 px-4 rounded-md font-semibold hover:bg-teal-100 transition-colors duration-300 mb-6">Subscribe</button>
                    <p className="text-sm font-semibold mb-4">This includes:</p>
                    <ul className="space-y-3 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 mr-3 text-teal-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}


          {activeTab === 'professional' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {professionalPlans.map((plan) => (
                <div key={plan.name} className="p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm mb-4">{plan.description}</p>
                  <p className="text-4xl font-bold mb-4">{plan.price}</p>
                  <button className="w-full bg-white text-teal-900 py-3 px-4 rounded-md font-semibold hover:bg-teal-100 transition-colors duration-300 mb-6">Pay</button>
                  <p className="text-sm font-semibold mb-4">This includes:</p>
                  <ul className="space-y-3 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 mr-3 text-teal-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'founders' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {foundersPlans.map((plan) => (
                <div key={plan.name} className="p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-4">{plan.price}</p>
                  <button className="w-full bg-white text-teal-900 py-3 px-4 rounded-md font-semibold hover:bg-teal-100 transition-colors duration-300">Pay</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;