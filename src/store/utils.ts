import { Store } from 'vuex';
import { State } from '@/store/index';
import { inject } from '@vue/composition-api';
import { assert } from '@/utils/assertions';

export function useStore(): Store<State> {
  const store = inject<Store<State>>('vuex-store');
  assert(store);
  return store;
}
