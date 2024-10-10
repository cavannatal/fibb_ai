import React, { ReactNode } from 'react';
import { BadgeDollarSign, Zap, Calendar, ArrowUpRight, BarChart2 } from 'lucide-react';

interface CardProps {
  children: ReactNode;
  className?: string;
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
  usage: {
    current: number;
    limit: number;
  };
  modelsGenerated: number;
}

const Dashboard: React.FC = () => {
  // Mock data - replace with actual data fetching logic
  const userData: UserData = {
    name: "Alice Johnson",
    tokens: {
      basic: { current: 30, total: 50 },
      advanced: { current: 15, total: 30 },
      premium: { current: 5, total: 20 }
    },
    plan: "Pro",
    nextBilling: "2024-11-10",
    usage: {
      current: 75,
      limit: 100
    },
    modelsGenerated: 42
  };

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