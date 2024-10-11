import { TokenType } from './TokenStructure';

export interface UserTokens {
  fibbTokens: number;
  enhancedTokens: number;
  researchTokens: number;
  paidFibb: number;
  subsFibb: number;
  paidEnhanced: number;
  subsEnhanced: number;
  paidResearch: number;
  subsResearch: number;
}

export async function fetchTokensFromDynamoDB(userId: string): Promise<UserTokens> {
  // This is a placeholder for the actual Lambda function call
  const response = await fetch(`https://your-api-gateway-url/getTokens?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch tokens');
  }
  return await response.json();
}

export function calculateConsumableTokens(tokens: UserTokens): UserTokens {
  return {
    ...tokens,
    fibbTokens: tokens.paidFibb + tokens.subsFibb,
    enhancedTokens: tokens.paidEnhanced + tokens.subsEnhanced,
    researchTokens: tokens.paidResearch + tokens.subsResearch,
  };
}

export function consumeTokens(tokens: UserTokens, tokenType: TokenType, amount: number): UserTokens | null {
  let updatedTokens = { ...tokens };
  let remainingAmount = amount;

  const consumeFromSource = (source: 'subs' | 'paid') => {
    const key = `${source}${tokenType}` as keyof UserTokens;
    const available = updatedTokens[key] as number;
    if (available >= remainingAmount) {
      updatedTokens[key] = available - remainingAmount;
      remainingAmount = 0;
    } else {
      remainingAmount -= available;
      updatedTokens[key] = 0;
    }
  };

  consumeFromSource('subs');
  if (remainingAmount > 0) {
    consumeFromSource('paid');
  }

  if (remainingAmount > 0) {
    return null; // Not enough tokens
  }

  return calculateConsumableTokens(updatedTokens);
}

export function resetSubscriptionTokens(tokens: UserTokens): UserTokens {
  return {
    ...tokens,
    subsFibb: 0,
    subsEnhanced: 0,
    subsResearch: 0,
  };
}

export function refillTokens(tokens: UserTokens, tokenType: TokenType, amount: number): UserTokens {
  const updatedTokens = { ...tokens };
  const key = `paid${tokenType}` as keyof UserTokens;
  updatedTokens[key] = (updatedTokens[key] as number) + amount;
  return calculateConsumableTokens(updatedTokens);
}