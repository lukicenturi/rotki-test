import { Balance } from '@/models/balance';

export interface BalanceResponse {
  [address: string]: {
    [currency: string]: Balance;
  }
}
