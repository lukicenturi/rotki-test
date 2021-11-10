export class Balance {
  amount: number;
  usdValue: number;

  constructor({ amount, usdValue}: any) {
    this.amount = +amount;
    this.usdValue = +usdValue;
  }
}

export interface MappedBalance {
  [asset: string]: {
    balance: Balance;
  };
}
