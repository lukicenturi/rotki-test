import { BalanceResponse } from '@/services/balance/types';
import { api } from '@/services/rotki-api';
import { Commit } from 'vuex';
import { Balance, MappedBalance } from '@/models/balance';

export interface BalanceState {
  totalBalances: number;
  balances: BalanceResponse;
}

export const balanceStore = {
  state: {
    totalBalances: 0,
    balances: null,
  },
  mutations: {
    SET_BALANCES(state: BalanceState, balances: BalanceResponse): void {
      state.balances = balances;

      let totalBalances = 0;
      for(const address in state.balances) {
        for (const asset in state.balances[address]) {
          totalBalances += +state.balances[address][asset].usdValue;
        }
      }

      state.totalBalances = totalBalances;
    },
  },
  getters: {
    getBalances: (state: BalanceState): BalanceResponse => {
      return state.balances;
    },
    getMappedBalances: (state: BalanceState): MappedBalance => {
      const mappedBalances: MappedBalance = {};

      if (!state.balances) return mappedBalances;

      for (const address in state.balances) {
        for (const asset in state.balances[address]) {
          const assetBalance: Balance = state.balances[address][asset];
          if (mappedBalances[asset]) {
            mappedBalances[asset].balance.amount += +assetBalance.amount;
            mappedBalances[asset].balance.usdValue += +assetBalance.usdValue;
          } else {
            mappedBalances[asset] = {
              balance: assetBalance,
            };
          }
        }
      }

      return mappedBalances;
    }
  },
  actions: {
    async fetchAllBalances({ commit }: { commit: Commit} ): Promise<any> {
      try {
        const balances = await api.balances.allBalances();
        commit('SET_BALANCES', balances);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
