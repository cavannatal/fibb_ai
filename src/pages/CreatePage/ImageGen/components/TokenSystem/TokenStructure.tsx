import { ReactNode } from 'react';

  export enum TokenType {
      FIBB = 'Fibb',
      GEN = 'Gen',
  }
  
  export enum TokenSource {
      MONTHLY = 'Monthly',
      PURCHASED = 'Purchased',
  }
  
  export interface TokenBalance {
      type: TokenType;
      source: TokenSource;
      amount: number;
  }
  
  export interface TokenWallet {
      [TokenType.FIBB]: {
          [TokenSource.MONTHLY]: number;
          [TokenSource.PURCHASED]: number;
      };
      [TokenType.GEN]: {
          [TokenSource.MONTHLY]: number;
          [TokenSource.PURCHASED]: number;
      };
  }
  
  export const createEmptyWallet = (): TokenWallet => ({
    [TokenType.FIBB]: { [TokenSource.MONTHLY]: 0, [TokenSource.PURCHASED]: 0 },
    [TokenType.GEN]: { [TokenSource.MONTHLY]: 0, [TokenSource.PURCHASED]: 0 },
  });
  
  export const addTokens = (wallet: TokenWallet, type: TokenType, source: TokenSource, amount: number): TokenWallet => {
    return {
      ...wallet,
      [type]: {
        ...wallet[type],
        [source]: wallet[type][source] + amount,
      },
    };
  };
  
  export const useTokens = (wallet: TokenWallet, type: TokenType, amount: number): TokenWallet | null => {
    const monthlyBalance = wallet[type][TokenSource.MONTHLY];
    const purchasedBalance = wallet[type][TokenSource.PURCHASED];
  
    if (monthlyBalance + purchasedBalance < amount) {
      return null; // Not enough tokens
    }
  
    let remainingAmount = amount;
    let newMonthlyBalance = monthlyBalance;
    let newPurchasedBalance = purchasedBalance;
  
    if (monthlyBalance >= remainingAmount) {
      newMonthlyBalance -= remainingAmount;
    } else {
      remainingAmount -= monthlyBalance;
      newMonthlyBalance = 0;
      newPurchasedBalance -= remainingAmount;
    }
  
    return {
      ...wallet,
      [type]: {
        [TokenSource.MONTHLY]: newMonthlyBalance,
        [TokenSource.PURCHASED]: newPurchasedBalance,
      },
    };
  };