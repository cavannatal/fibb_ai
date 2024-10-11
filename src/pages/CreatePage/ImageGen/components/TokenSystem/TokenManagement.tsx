import { TokenType } from './TokenStructure';
import { UserTokens, calculateConsumableTokens, consumeTokens, resetSubscriptionTokens, refillTokens, fetchTokensFromDynamoDB } from './TokenCounter';
import { ConsumerBilling, SubscriptionTier } from './ConsumerBilling';

export class TokenManagementService {
  async getUserTokens(userId: string): Promise<UserTokens> {
    const tokens = await fetchTokensFromDynamoDB(userId);
    return calculateConsumableTokens(tokens);
  }

  consumeUserTokens(tokens: UserTokens, tokenType: TokenType, amount: number): UserTokens | null {
    return consumeTokens(tokens, tokenType, amount);
  }

  resetUserSubscriptionTokens(tokens: UserTokens): UserTokens {
    return resetSubscriptionTokens(tokens);
  }

  refillUserTokens(tokens: UserTokens, tokenType: TokenType, amount: number): UserTokens {
    return refillTokens(tokens, tokenType, amount);
  }

  getTokenPrice(tokenType: TokenType, tier: SubscriptionTier): number | null {
    return ConsumerBilling.getTokenPrice(tokenType, tier);
  }

  calculateTokenPurchaseCost(tokenType: TokenType, quantity: number, tier: SubscriptionTier): number | null {
    return ConsumerBilling.calculateTokenCost(tokenType, quantity, tier);
  }

  getBillingInfo() {
    return ConsumerBilling.getTokenBillingInfo();
  }

  // Add methods for deployment and integration as needed
}

export const tokenManagementService = new TokenManagementService();