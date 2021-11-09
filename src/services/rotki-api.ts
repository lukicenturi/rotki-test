import axios, { AxiosInstance } from 'axios';
import { EventsApi } from '@/services/event/events-api';
import { BalancesApi } from '@/services/balance/balances-api';
import { setupTransformer } from '@/services/axios-transformers';

export class RotkiApi {
  private readonly axios: AxiosInstance;

  private readonly _events: EventsApi;

  private readonly _balances: BalancesApi;

  private readonly _serverUrl: string;

  private readonly baseTransformer = setupTransformer([]);

  get serverUrl(): string {
    return this._serverUrl;
  }

  constructor() {
    this._serverUrl = process.env.VUE_APP_BACKEND_URL;
    this.axios = axios.create({
      baseURL: this._serverUrl,
      timeout: 30000,
    });
    this.baseTransformer = setupTransformer();
    this._events = new EventsApi(this.axios);
    this._balances = new BalancesApi(this.axios);
  }

  get events(): EventsApi {
    return this._events;
  }

  get balances(): BalancesApi {
    return this._balances;
  }
}

export const api = new RotkiApi();
