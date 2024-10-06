import React, { useEffect } from 'react';

const SubscriptionPage: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement("stripe-pricing-table", {
    "pricing-table-id": "prctbl_1Q6n3LFdWkuROunsZYVnW4m0",
    "publishable-key": "pk_live_51Q4wZeFdWkuROuns9OgKeaZNBF7MQTJwsCi8W20R8GIgYydQfXPa0DHxeEQB2yVXV1GAXZhDFb9vsiv0Kf4BpjII00z3fsR7BX"
  });
};

export default SubscriptionPage;