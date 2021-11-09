import { AxiosInstance } from 'axios';
import { ApiImplementation } from '@/services/types-api';
import { setupTransformer } from '@/services/axios-transformers';
import { ActionResult } from '@/models/action-result';
import { handleResponse } from '@/services/utils';
import { BalanceResponse } from './types';

export class BalancesApi {
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

  async allBalances(): Promise<BalanceResponse> {
    return this.axios
      .get<ActionResult<BalanceResponse>>('/balances', {
        transformResponse: setupTransformer([], true),
      })
      .then(handleResponse);
  }
}
