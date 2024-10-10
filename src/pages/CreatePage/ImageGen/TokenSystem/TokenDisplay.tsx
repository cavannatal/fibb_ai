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
        // Convert UserTokens to TokenWallet structure
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
        // TODO: Fetch and set the actual subscription tier
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

  return (
    <div className="token-display">
      <h1>Token Information</h1>
      
      <h2>Current Subscription Level: {subscriptionTier}</h2>
      
      <h2>Total Available Tokens</h2>
      <div className="total-tokens">
        <p>Research Tokens: {getTotalTokens(TokenType.RESEARCH)}</p>
        <p>Enhanced Tokens: {getTotalTokens(TokenType.ENHANCED)}</p>
        <p>Fibbs: {getTotalTokens(TokenType.FIBB)}</p>
      </div>

      <h2>Available Token Packs</h2>
      <div className="token-grid">
        {Object.entries(tokenInfo).map(([tokenType, info]) => (
          <div key={tokenType} className="token-card">
            <h3>{info.name}</h3>
            <p>Pack Size: {info.packSize}</p>
            <h4>Pricing:</h4>
            <ul>
              {Object.entries(info.pricing).map(([tier, price]) => (
                <li key={tier} className={tier === subscriptionTier ? 'current-tier' : ''}>
                  <span className="tier">{tier}:</span> ${price.toFixed(2)}
                  {tier === subscriptionTier && <span className="current-label"> (Current)</span>}
                </li>
              ))}
            </ul>
            <button onClick={() => console.log(`Purchase ${info.name}`)}>Purchase</button>
          </div>
        ))}
      </div>

      <h2>Your Token Wallet</h2>
      {loading ? (
        <div>Loading wallet data...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : wallet ? (
        <div className="wallet-grid">
          {Object.entries(wallet).map(([tokenType, sources]) => (
            <div key={tokenType} className="wallet-card">
              <h3>{tokenType} Tokens</h3>
              <ul>
                {Object.entries(sources).map(([source, amount]) => (
                  <li key={source}>
                    {source}: {Number(amount)}
                  </li>
                ))}
              </ul>
              <p className="total">
                Total: {Object.values(sources).reduce((sum: number, amount: unknown) => sum + (Number(amount) || 0), 0)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>No wallet data available.</div>
      )}
    </div>
  );
};

export default TokenDisplay;