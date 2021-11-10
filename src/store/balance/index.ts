import { BalanceResponse } from '@/services/balance/types';
import { api } from '@/services/rotki-api';
import { Commit } from 'vuex';
import { Balance, MappedBalance } from '@/models/balance';

export interface BalanceState {
  totalBalances: number;
  balances: BalanceResponse;
  keyword: string,
  selectedAddresses: {
    [key: string]: boolean
  };
}

export const balanceStore = {
  state: {
    totalBalances: 0,
    balances: null,
    keyword: '',
    selectedAddresses: {},
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

    SET_KEYWORD(state: BalanceState, keyword: string): void {
      state.keyword = '';
    },
  },
  getters: {
    getBalances: (state: BalanceState): BalanceResponse => {
      return state.balances;
    },
    getMappedBalances: (state: BalanceState): MappedBalance[] => {
      const mappedBalances: MappedBalance[] = [];

      if (!state.balances) return mappedBalances;

      for (const address in state.balances) {
        for (const asset in state.balances[address]) {
          const assetBalance: Balance = state.balances[address][asset];
          const index = mappedBalances.findIndex(balance => balance.asset === asset);
          if (index > -1) {
            mappedBalances[index].balance.amount = +mappedBalances[index].balance.amount + +assetBalance.amount;
            mappedBalances[index].balance.usdValue = +mappedBalances[index].balance.usdValue + +assetBalance.usdValue;
          } else {
            mappedBalances.push({
              asset,
              balance: assetBalance
            })
          }
        }
      }

      return mappedBalances;
    },
    getTotalBalances: (state: BalanceState): number => {
      return state.totalBalances;
    },
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
    filterAsset({ commit, keyword }: { commit: Commit, keyword: string}): void {
      commit('SET_KEYWORD', keyword);
    }
  },
};
