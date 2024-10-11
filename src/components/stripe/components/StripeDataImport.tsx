import React, { useState, useEffect } from 'react';

interface SubscriptionInfo {
  tier: string;
  status: string;
  currentPeriodEnd: string;
}

function SubscriptionStatus({ userEmail }: { userEmail: string }) {
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://2i6bgkeplb.execute-api.us-east-2.amazonaws.com/default/frontEndData?email=${userEmail}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch subscription info');
        }

        const data: SubscriptionInfo = await response.json();
        setSubscriptionInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [userEmail]);

  if (isLoading) {
    return <div>Loading subscription information...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Subscription Information</h2>
      {subscriptionInfo ? (
        <>
          <p>Tier: {subscriptionInfo.tier}</p>
          <p>Status: {subscriptionInfo.status}</p>
          <p>Current Period Ends: {new Date(subscriptionInfo.currentPeriodEnd).toLocaleDateString()}</p>
        </>
      ) : (
        <p>No active subscription found.</p>
      )}
    </div>
  );
}

export default SubscriptionStatus;