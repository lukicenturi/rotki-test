import Vue from 'vue'
import Vuex from 'vuex'
import { BalanceResponse } from '@/services/balance/types';
import { EventResponse } from '@/services/event/types';
import { api } from '@/services/rotki-api';

Vue.use(Vuex)

export interface State {
  balances: BalanceResponse | null,
  events: EventResponse | null,
}

export default new Vuex.Store<State>({
  state: {
    balances: null,
    events: null,
  },
  mutations: {
    SET_BALANCES(state, balances: BalanceResponse) {
      state.balances = balances;
    },
    SET_EVENTS(state, events: EventResponse) {
      state.events = events;
    }
  },
  getters: {
    getBalances: (state) => {
      return state.balances;
    },
    getEvents: (state) => {
      return state.events;
    }
  },
  actions: {
    async fetchAllBalances({ commit }) {
      try {
        const balances = await api.balances.allBalances();
        commit('SET_BALANCES', balances);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchAllEvents({ commit }) {
      try {
        const events = await api.events.allEvents();
        commit('SET_EVENTS', events);
      } catch (err) {
        console.log(err);
      }
    }
  },
})
