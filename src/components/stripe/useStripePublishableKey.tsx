import { useState, useEffect } from 'react';

export const useStripePublishableKey = () => {
  const [stripePublishableKey, setStripePublishableKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    const fetchKey = async () => {
      try {
        setDebugInfo('Attempting to fetch Stripe Publishable Key...');
        
        const response = await fetch('/.netlify/functions/get-stripe-key');
        
        setDebugInfo(prev => `${prev}\nResponse status: ${response.status}`);
        setDebugInfo(prev => `${prev}\nResponse type: ${response.type}`);

        const responseText = await response.text();
        setDebugInfo(prev => `${prev}\nResponse text (first 100 characters): ${responseText.substring(0, 100)}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (error) {
          throw new Error(`Failed to parse response as JSON: ${error instanceof Error ? error.message : 'Unknown parsing error'}`);
        }
        
        if (data && typeof data.publishableKey === 'string') {
          setStripePublishableKey(data.publishableKey);
          setDebugInfo(prev => `${prev}\nSuccessfully retrieved Stripe Publishable Key.`);
        } else {
          throw new Error('Publishable key not found in response or is not a string');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setError(`Failed to fetch Stripe publishable key: ${errorMessage}`);
        setDebugInfo(prev => `${prev}\nError: ${errorMessage}`);
      }
    };

    fetchKey();
  }, []);

  return { stripePublishableKey, error, debugInfo };
};