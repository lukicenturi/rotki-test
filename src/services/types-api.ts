import { AxiosInstance, AxiosResponseTransformer } from 'axios';

export interface ApiImplementation {
  readonly axios: AxiosInstance;
  readonly baseTransformer: AxiosResponseTransformer[];
}
