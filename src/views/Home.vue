<template>
  <div class="home">
    <div v-for="(balance, asset) in mappedBalances" :key="asset">
      {{ asset }}
      {{ balance.balance.usdValue }}
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from '@vue/composition-api';
  import { useStore } from '@/store/utils';

  const headers = [
    {
      text: 'Asset'
    },
    {
      text: 'Price in USD',
    },
    {
      text: 'Amount',
    },
    {
      text: 'USD Value'
    }
  ]

  export default defineComponent({
    name: 'Home',
    created() {
      this.fetchAllBalances();
    },
    setup() {
      const store = useStore();

      const balances = computed(() => {
        return store.getters.getBalances;
      });

      const mappedBalances = computed(() => {
        return store.getters.getMappedBalances;
      });

      console.log(mappedBalances);

      const fetchAllBalances = async () => {
        await store.dispatch('fetchAllBalances');
      }

      return {
        balances,
        mappedBalances,
        fetchAllBalances,
      }
    }
  });
</script>
