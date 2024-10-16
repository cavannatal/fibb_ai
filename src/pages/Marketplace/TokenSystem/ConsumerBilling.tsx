import { TokenType } from './TokenStructure';

export type SubscriptionTier = 'Basic' | 'Starter' | 'Standard' | 'Pro';

export interface TokenInfo {
  name: string;
  packSize: number;
  pricing: Partial<Record<SubscriptionTier, number>>;
}

export interface TokenBillingInfo {
  [key: string]: TokenInfo;
}

const tokenBillingInfo: TokenBillingInfo = {
  [TokenType.GEN]: {
    name: 'Gen Token Pack',
    packSize: 10,
    pricing: {
      Basic: 4.99,
      Starter: 4.99,
      Standard: 2.99,
      Pro: 1.99,
    },
  },
  [TokenType.FIBB]: {
    name: 'Fibb Token',
    packSize: 1,
    pricing: {
      Starter: 15,
      Standard: 10,
      Pro: 5,
    },
  },
};

export class ConsumerBilling {
  static getTokenPrice(tokenType: TokenType, tier: SubscriptionTier): number | null {
    const tokenInfo = tokenBillingInfo[tokenType];
    return tokenInfo.pricing[tier] || null;
  }

  static calculateTokenCost(tokenType: TokenType, quantity: number, tier: SubscriptionTier): number | null {
    const tokenInfo = tokenBillingInfo[tokenType];
    const pricePerPack = this.getTokenPrice(tokenType, tier);
    if (pricePerPack === null) return null;

    const numberOfPacks = Math.ceil(quantity / tokenInfo.packSize);
    return numberOfPacks * pricePerPack;
  }

  static getTokenBillingInfo(): TokenBillingInfo {
    return tokenBillingInfo;
  }
}