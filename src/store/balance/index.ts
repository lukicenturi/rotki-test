import { BalanceResponse } from '@/services/balance/types';
import { api } from '@/services/rotki-api';
import { Commit } from 'vuex';
import { Balance, MappedBalance } from '@/models/balance';

export interface BalanceState {
  totalBalances: number;
  balances: BalanceResponse;
  keyword: string;
  addresses: string[];
  selectedAddresses: string[];
}

export const balanceStore = {
  namespaced: true,
  state: {
    totalBalances: 0,
    balances: null,
    keyword: '',
    addresses: [],
    selectedAddresses: [],
  },
  mutations: {
    SET_BALANCES(state: BalanceState, balances: BalanceResponse): void {
      state.balances = balances;
      state.addresses = [];
      state.selectedAddresses = [];

      let totalBalances = 0;
      for(const address in state.balances) {
        state.addresses.push(address);
        state.selectedAddresses.push(address);

        for (const asset in state.balances[address]) {
          totalBalances += +state.balances[address][asset].usdValue;
        }
      }

      state.totalBalances = totalBalances;
    },
    SET_KEYWORD(state: BalanceState, keyword: string): void {
      state.keyword = keyword;
    },
    SET_SELECTED_ADDRESSES(state: BalanceState, { selectedAddresses }: { selectedAddresses: string[] }): void {
      state.selectedAddresses = selectedAddresses;
    }
  },
  getters: {
    getBalances: (state: BalanceState): BalanceResponse => {
      return state.balances;
    },
    getMappedBalances: (state: BalanceState): MappedBalance[] => {
      const mappedBalances: MappedBalance[] = [];

      if (!state.balances) return mappedBalances;

      for (const address in state.balances) {
        if (state.selectedAddresses.includes(address)) { // Filter By Account Address
          for (const asset in state.balances[address]) {
            if (asset.includes(state.keyword.toUpperCase())) { // Filter Asset Name By Keyword
              const assetBalance: Balance = Object.assign({}, state.balances[address][asset]);
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
        }
      }

      return mappedBalances;
    },
    getTotalBalances: (state: BalanceState): number => {
      return state.totalBalances;
    },
    getKeyword: (state: BalanceState): string => {
      return state.keyword;
    },
    getAddresses: (state: BalanceState): string[] => {
      return state.addresses;
    },
    getSelectedAddresses: (state: BalanceState): string[] => {
      return state.selectedAddresses;
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
    filterAsset(
      { commit }: { commit: Commit },
      { keyword }: { keyword: string }
    ): void {
      commit('SET_KEYWORD', keyword || '');
    },
    setSelectedAddresses(
      { commit }: { commit: Commit },
      { selectedAddresses }: { selectedAddresses: string[] }
    ) {
      commit('SET_SELECTED_ADDRESSES', { selectedAddresses });
    }
  },
};
