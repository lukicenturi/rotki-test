<template>
  <div class="home">
    <v-container>
      <div>
        <h1>
          ${{ formatBalance(totalBalances) }}
        </h1>
        <div class="text-caption">Total Balances</div>
      </div>
      <div class="mt-10">
        <div>
          <GroupedFilter />
        </div>
        <div>
          <BalanceTable :balances="mappedBalances" />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from '@vue/composition-api';
  import { useStore } from '@/store/utils';
  import { MappedBalance } from '@/models/balance';
  import BalanceTable from "@/components/balance/BalanceTable.vue";
  import GroupedFilter from "@/components/grouped-filter/GroupedFilter.vue";
  import { formatBalance } from "@/utils/format-balance";

  export default defineComponent({
    name: 'Home',
    components: {BalanceTable, GroupedFilter},
    created() {
      this.fetchAllBalances();
    },
    setup() {
      const store = useStore();

      const totalBalances = computed(() => {
        return store.getters.getTotalBalances;
      });

      const mappedBalances = computed(() => {
        return store.getters.getMappedBalances.map((balance: MappedBalance) => ({
          asset: balance.asset,
          amount: balance.balance.amount,
          price: balance.balance.usdValue / balance.balance.amount,
          usdValue: balance.balance.usdValue,
          percentage: balance.balance.usdValue / totalBalances.value * 100,
        }));
      });
      const fetchAllBalances = async () => {
        await store.dispatch('fetchAllBalances');
      }

      return {
        totalBalances,
        mappedBalances,
        fetchAllBalances,
      }
    },
    methods: {
      formatBalance,
    }
  });
</script>
