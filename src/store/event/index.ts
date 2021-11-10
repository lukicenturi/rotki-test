import { EventResponse } from '@/services/event/types';
import { api } from '@/services/rotki-api';
import { Commit } from 'vuex';

export interface EventState {
  events: EventResponse;
}

export const eventStore = {
  state: {
    events: null,
  },
  mutations: {
    SET_EVENTS(state: EventState, events: EventResponse): void {
      state.events = events;
    },
  },
  getters: {
    getEvents: (state: EventState): EventResponse => {
      return state.events;
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
  },
};
