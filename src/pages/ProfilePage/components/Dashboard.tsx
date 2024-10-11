import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { BadgeDollarSign, Zap, Calendar, ArrowUpRight, BarChart2 } from 'lucide-react';
import SubscriptionStatus from '../../../components/stripe/components/StripeDataImport';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface SubscriptionInfo {
  tier: string;
  status: string;
  currentPeriodEnd: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<CardProps> = ({ children, className = '' }: CardProps) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const CardTitle: React.FC<CardProps> = ({ children, className = '' }: CardProps) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
);

interface ProgressProps {
  value: number;
}

const Progress: React.FC<ProgressProps> = ({ value }: ProgressProps) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div 
      className="bg-blue-600 h-2.5 rounded-full" 
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

interface TokenData {
  current: number;
  total: number;
}

interface UserData {
  name: string;
  tokens: {
    basic: TokenData;
    advanced: TokenData;
    premium: TokenData;
  };
  plan: string;
  nextBilling: string;
  status: string;
  usage: {
    current: number;
    limit: number;
  };
  modelsGenerated: number;
}

const Dashboard: React.FC = () => {
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function getUserEmail() {
      try {
        const currentUser = await getCurrentUser();
        const userAttributes = await fetchUserAttributes();
        setUserEmail(userAttributes.email || null);
      } catch (error) {
        console.error('Error fetching user email:', error);
        setUserEmail(null);
      }
    }
  
    getUserEmail();
  }, []);

  useEffect(() => {
    // Function to fetch subscription info
    const fetchSubscriptionInfo = async () => {
      if (!userEmail) {
        console.error('User email is not available');
        return;
      }
    
      const url = `https://2i6bgkeplb.execute-api.us-east-2.amazonaws.com/default/frontEndData?email=${userEmail}`;
      console.log('Fetching subscription info from:', url);
    
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error('Failed to fetch subscription info');
        }
    
        const data: SubscriptionInfo = await response.json();
        console.log('Received subscription data:', data);
        setSubscriptionInfo(data);
      } catch (error) {
        console.error('Error fetching subscription info:', error);
      }
    };
  
    if (userEmail) {
      fetchSubscriptionInfo();
    }
  }, [userEmail]);

  const userData: UserData = {
    name: "Alice Johnson",
    tokens: {
      basic: { current: 30, total: 50 },
      advanced: { current: 15, total: 30 },
      premium: { current: 5, total: 20 }
    },
    plan: subscriptionInfo?.tier || 'Loading...',
    nextBilling: subscriptionInfo?.currentPeriodEnd || 'Loading...',
    status: subscriptionInfo?.status || 'Loading...',
    usage: {
      current: 75,
      limit: 100
    },
    modelsGenerated: 42
  };
console.log(userData);
console.log(userEmail);
console.log(subscriptionInfo);

  const formatTokens = (value: number): string => {
    return value.toFixed(1);
  };

  const renderTokenCard = (type: string, data: TokenData) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{type} Tokens</CardTitle>
        <BadgeDollarSign className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatTokens(data.current)}</div>
        <Progress value={(data.current / data.total) * 100} />
        <p className="text-xs text-gray-500 mt-2">
          {formatTokens(data.current)} of {formatTokens(data.total)} tokens available
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderTokenCard("Basic", userData.tokens.basic)}
        {renderTokenCard("Advanced", userData.tokens.advanced)}
        {renderTokenCard("Premium", userData.tokens.premium)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <Zap className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.plan}</div>
            <p className="text-xs text-gray-500 mt-2">
              Next billing date: {userData.nextBilling}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Usage This Month</CardTitle>
            <Calendar className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.usage.current}/{userData.usage.limit}</div>
            <Progress value={(userData.usage.current / userData.usage.limit) * 100} />
            <p className="text-xs text-gray-500 mt-2">
              {userData.usage.current} of {userData.usage.limit} requests used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Models Generated</CardTitle>
            <BarChart2 className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.modelsGenerated}</div>
            <p className="text-xs text-gray-500 mt-2">
              Total models generated this month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;