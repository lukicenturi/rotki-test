import { EventResponse } from '@/services/event/types';
import { api } from '@/services/rotki-api';
import { Commit } from 'vuex';
import { BalanceState } from '@/store/balance';
import { MappedEvent } from '@/models/event';

export interface EventState {
  events: EventResponse;
  keyword: string;
  addresses: string[];
  selectedAddresses: string[];
}

export const eventStore = {
  namespaced: true,
  state: {
    events: null,
    keyword: '',
    addresses: [],
    selectedAddresses: [],
  },
  mutations: {
    SET_EVENTS(state: EventState, events: EventResponse): void {
      state.events = events;
      state.addresses = [];
      state.selectedAddresses = [];

      for(const address in state.events) {
        state.addresses.push(address);
        state.selectedAddresses.push(address);
      }
    },
    SET_KEYWORD(state: BalanceState, keyword: string): void {
      state.keyword = keyword;
    },
    SET_SELECTED_ADDRESSES(state: BalanceState, { selectedAddresses }: { selectedAddresses: string[] }): void {
      state.selectedAddresses = selectedAddresses;
    }
  },
  getters: {
    getEvents: (state: EventState): EventResponse => {
      return state.events;
    },
    getMappedEvents: (state: EventState): MappedEvent[] => {
      const mappedEvents: MappedEvent[] = [];

      if (!state.events) return mappedEvents;

      for (const address in state.events) {
        if (state.selectedAddresses.includes(address)) { // Filter By Account Address
          state.events[address].events.forEach((event) => {
            if (event.asset.includes(state.keyword.toUpperCase())) { // Filter Asset Name By Keyword
              mappedEvents.push({
                asset: event.asset,
                eventType: event.eventType,
                value: event.value,
                timestamp: event.timestamp,
                address,
              });
            }
          })
        }
      }

      return mappedEvents.sort((a: MappedEvent, b: MappedEvent) => b.timestamp - a.timestamp);
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
    async fetchAllEvents({ commit }: { commit: Commit} ): Promise<any> {
      try {
        const events = await api.events.allEvents();
        commit('SET_EVENTS', events);
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
