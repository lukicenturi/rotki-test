import { AxiosInstance } from 'axios';
import { ApiImplementation } from '@/services/types-api';
import { setupTransformer } from '@/services/axios-transformers';
import { ActionResult } from '@/models/action-result';
import { handleResponse } from '@/services/utils';
import { EventResponse } from './types';

export class EventsApi {
  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  private get api(): ApiImplementation {
    return {
      axios: this.axios,
      baseTransformer: setupTransformer(),
    };
  }

  async allEvents(): Promise<EventResponse> {
    return this.axios
      .get<ActionResult<EventResponse>>('/events', {
        transformResponse: setupTransformer([], true),
      })
      .then(handleResponse);
  }
}
