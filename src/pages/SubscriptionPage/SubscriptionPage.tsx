import { getCurrentUser } from 'aws-amplify/auth';
import React, { useState, useEffect } from 'react';

const MultiPricingTablePage: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState(0);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    // Assume you have a function to get the current user's ID
    const fetchUserId = async () => {
      // Replace this with your actual logic to get the user ID
      const { userId: sub } = await getCurrentUser();
      setUserId(sub);
    };

    fetchUserId();
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const pricingTables = [
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
            onClick={() => {
              console.log(userId);
              setSelectedTable(index)
            }}
          >
            {table.header}
          </div>
        ))}
      </div>
      
      {React.createElement("stripe-pricing-table", {
        "pricing-table-id": pricingTables[selectedTable].id,
        "publishable-key": "pk_live_51Q4wZeFdWkuROuns9OgKeaZNBF7MQTJwsCi8W20R8GIgYydQfXPa0DHxeEQB2yVXV1GAXZhDFb9vsiv0Kf4BpjII00z3fsR7BX",
        "client-reference-id": userId,
        "client_reference_id": userId,
        "metadata": JSON.stringify({
          user_id: userId,
          plan_type: pricingTables[selectedTable].header,
          plan_id: pricingTables[selectedTable].id,
        })
      })}
    </div>
  );
};

export default MultiPricingTablePage;