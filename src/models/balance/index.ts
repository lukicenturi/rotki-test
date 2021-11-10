export interface Balance {
  amount: number;
  usdValue: number;
}

export interface MappedBalance {
  asset: string;
  balance: Balance;
}
