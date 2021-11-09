<template>
  <div class="home">
    <div v-for="(balance, address) in balances" :key="address">
      {{  address }}
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from '@vue/composition-api';
  import { useStore } from '@/store/utils';

  export default defineComponent({
    name: 'Home',
    created() {
      this.fetchAllBalances();
    },
    setup() {
      const store = useStore();

      const balances = computed(() => store.state.balances);

      const fetchAllBalances = async () => {
        await store.dispatch('fetchAllBalances');
      }

      return {
        balances,
        fetchAllBalances,
      }
    }
  });
</script>
