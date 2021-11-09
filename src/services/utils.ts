import { AxiosResponse } from 'axios';
import { ActionResult } from '@/models/action-result';

export function handleResponse<T>(response: AxiosResponse<ActionResult<T>>): T {
  const { result, message } = response.data;
  if (result) {
    return result;
  }
  throw new Error(message);
}
