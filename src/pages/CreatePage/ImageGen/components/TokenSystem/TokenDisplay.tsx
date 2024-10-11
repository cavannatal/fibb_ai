import React, { useState, useEffect } from 'react';
import { TokenType, TokenSource, TokenWallet } from './TokenStructure';
import { ConsumerBilling, TokenBillingInfo, SubscriptionTier } from './ConsumerBilling';
import { tokenManagementService } from './TokenManagement';


interface TokenDisplayProps {
  userId?: string;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({ userId }) => {
  const [wallet, setWallet] = useState<TokenWallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('Basic');

  const tokenInfo: TokenBillingInfo = ConsumerBilling.getTokenBillingInfo();

  useEffect(() => {
    const fetchWallet = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const userTokens = await tokenManagementService.getUserTokens(userId);
        const walletData: TokenWallet = {
          [TokenType.FIBB]: {
            [TokenSource.MONTHLY]: userTokens.subsFibb,
            [TokenSource.PURCHASED]: userTokens.paidFibb,
          },
          [TokenType.ENHANCED]: {
            [TokenSource.MONTHLY]: userTokens.subsEnhanced,
            [TokenSource.PURCHASED]: userTokens.paidEnhanced,
          },
          [TokenType.RESEARCH]: {
            [TokenSource.MONTHLY]: userTokens.subsResearch,
            [TokenSource.PURCHASED]: userTokens.paidResearch,
          },
        };
        setWallet(walletData);
        setError(null);
        setSubscriptionTier('Standard');
      } catch (err) {
        setError('Failed to fetch wallet data. Please try again later.');
        console.error('Error fetching wallet:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, [userId]);

  const getTotalTokens = (tokenType: TokenType) => {
    if (!wallet) return 0;
    return Object.values(wallet[tokenType]).reduce((sum, amount) => sum + amount, 0);
  };

  const totalBalance = Object.values(TokenType).reduce((sum, type) => sum + getTotalTokens(type), 0);

  const tokenColors = {
    [TokenType.FIBB]: 'bg-green-500',
    [TokenType.ENHANCED]: 'bg-blue-500',
    [TokenType.RESEARCH]: 'bg-orange-500',
  };

  return (
    <div className="bg-gray-100 rounded-3xl p-8 max-w-7xl mx-auto shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Token Dashboard</h1>

      <div className="bg-white rounded-2xl p-8 mb-10 shadow-md flex justify-between items-center">
        <div>
          <h2 className="text-2xl text-gray-600 mb-2">Total Balance</h2>
          <p className="text-5xl font-bold text-gray-800">
            {totalBalance.toLocaleString()} <span className="text-2xl text-gray-600">Tokens</span>
          </p>
        </div>
        <div className="bg-green-100 px-6 py-3 rounded-full text-green-600 font-semibold">
          {subscriptionTier} Tier
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {Object.values(TokenType).map((tokenType) => (
          <div key={tokenType} className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <h3 className={`text-xl mb-4 ${tokenColors[tokenType].replace('bg-', 'text-')}`}>{tokenType} Tokens</h3>
            <p className="text-3xl font-bold text-gray-800 mb-4">
              {getTotalTokens(tokenType).toLocaleString()}
            </p>
            <div className={`h-1 rounded-full ${tokenColors[tokenType]}`} />
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Token Packs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(tokenInfo).map(([tokenType, info]) => (
          <div key={tokenType} className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{info.name}</h3>
              <p className="text-lg text-gray-600 mb-6">Pack Size: {info.packSize}</p>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Pricing:</h4>
              <ul className="space-y-3 mb-6">
                {Object.entries(info.pricing).map(([tier, price]) => (
                  <li key={tier} className={`flex justify-between items-center p-3 rounded-lg ${tier === subscriptionTier ? 'bg-green-100' : ''}`}>
                    <span className={tier === subscriptionTier ? 'text-green-600 font-semibold' : 'text-gray-600'}>
                      {tier}
                    </span>
                    <span className="font-semibold text-gray-800">${price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className={`w-full py-3 rounded-full font-semibold text-white transition-colors duration-300 ${tokenColors[tokenType as TokenType]} hover:opacity-90 mt-auto`}>
              Purchase
            </button>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center h-48 text-lg text-gray-600">
          Loading wallet data...
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 p-6 rounded-xl text-center mt-8">
          {error}
        </div>
      )}
    </div>
  );
};

export default TokenDisplay;