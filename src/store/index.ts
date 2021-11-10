import Vue from 'vue'
import Vuex from 'vuex'
import { BalanceResponse } from '@/services/balance/types';
import { EventResponse } from '@/services/event/types';
import { balanceStore } from '@/store/balance';
import { eventStore } from '@/store/event';

Vue.use(Vuex)

export interface State {
  balances: BalanceResponse | null,
  events: EventResponse | null,
}

export default new Vuex.Store<State>({
  modules: {
    balances: balanceStore,
    events: eventStore,
  }
})
