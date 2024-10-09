import { getCurrentUser } from 'aws-amplify/auth';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'pricing-table-id': string;
        'publishable-key': string;
        'client-reference-id'?: string;
        'customer-email'?: string;
        'on-price-click'?: string;
      };
    }
  }
}

const STRIPE_PUBLISHABLE_KEY = 'pk_live_51Q4wZeFdWkuROuns9OgKeaZNBF7MQTJwsCi8W20R8GIgYydQfXPa0DHxeEQB2yVXV1GAXZhDFb9vsiv0Kf4BpjII00z3fsR7BX';

interface PricingTable {
  header: string;
  id: string;
}

const MultiPricingTablePage: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    const fetchUser = async () => {
      try {
        const { userId: sub } = await getCurrentUser();
        setUserId(sub);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUserId(null);
      }
    };

    fetchUser();
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // const handlePriceClick = (event: CustomEvent) => {
  //   event.preventDefault();
    
  //   if (!userId) {
  //     navigate('/signup');
  //     return;
  //   }

  //   // Add any additional validations here
  //   // For example, checking if the user is allowed to subscribe to this plan
    
  //   // If all validations pass, allow the default Stripe behavior
  //   event?.target?.dispatchEvent(new CustomEvent('price-click-proceed'));
  // };

  useEffect(() => {
    const handlePriceClick = (event: CustomEvent) => {
      event.preventDefault();
      
      if (!userId) {
        navigate('/signup');
        return;
      }
  
      // Add any additional validations here
      
      // If all validations pass, allow the default Stripe behavior
      (event.target as HTMLElement).dispatchEvent(new CustomEvent('price-click-proceed'));
    };
  
    // Define the custom event
    const priceClickEvent = new CustomEvent('price-click', { bubbles: true });
  
    const pricingTable = document.querySelector('stripe-pricing-table');
    pricingTable?.addEventListener('price-click', handlePriceClick as EventListener);
  
    return () => {
      pricingTable?.removeEventListener('price-click', handlePriceClick as EventListener);
    };
  }, [userId, navigate]);

  // useEffect(() => {
  //   const pricingTable = document.querySelector('stripe-pricing-table');
  //   pricingTable?.addEventListener('price-click', handlePriceClick);
  
  //   return () => {
  //     pricingTable?.removeEventListener('price-click', handlePriceClick);
  //   };
  // }, [userId, navigate]);


  const pricingTables: PricingTable[] = [
    {
      header: "Consumer",
      id: "prctbl_1Q6n3LFdWkuROunsZYVnW4m0",
    },
    {
      header: "Professional",
      id: "prctbl_1Q6zdjFdWkuROunsmJ1w0kpm",
    },
    {
      header: "Founders",
      id: "prctbl_1Q6zrAFdWkuROunsP3xPWHbn",
    },
  ];

  const styles = `
    .headers-container {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 20px;
    }
    .table-header {
      font-size: 18px;
      font-weight: bold;
      padding: 10px 20px;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.3s ease;
    }
    .table-header:hover {
      background-color: #f0f0f0;
    }
    .table-header.active {
      border-bottom-color: #646cff;
      color: #646cff;
    }
  `;

  return (
    <div className="pricing-container">
      <style>{styles}</style>
      <div className="headers-container">
        {pricingTables.map((table, index) => (
          <div
            key={index}
            className={`table-header ${selectedTable === index ? 'active' : ''}`}
            onClick={() => setSelectedTable(index)}
          >
            {table.header}
          </div>
        ))}
      </div>
      
      <stripe-pricing-table
        pricing-table-id={pricingTables[selectedTable].id}
        publishable-key={STRIPE_PUBLISHABLE_KEY}
        client-reference-id={userId || undefined}
        on-price-click="price-click"
      />
    </div>
  );
};

export default MultiPricingTablePage;