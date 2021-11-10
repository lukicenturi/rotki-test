import Vue from 'vue'
import Vuex from 'vuex'
import { BalanceState, balanceStore } from '@/store/balance';
import { EventState, eventStore } from '@/store/event';

Vue.use(Vuex)

export interface State {
  balances: BalanceState,
  events: EventState,
}

export default new Vuex.Store<State>({
  modules: {
    balances: balanceStore,
    events: eventStore,
  }
})
