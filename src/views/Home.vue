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
          <GroupedFilter
            :keyword="keyword"
            :onKeywordChanged="onKeywordChanged"
            :addresses="addresses"
            :selected-addresses="selectedAddresses"
            :set-selected-addresses="setSelectedAddresses"
          />
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
        return store.getters['balances/getTotalBalances'];
      });

      const mappedBalances = computed(() => {
        return store.getters['balances/getMappedBalances'].map((balance: MappedBalance) => ({
          asset: balance.asset,
          amount: balance.balance.amount,
          price: balance.balance.usdValue / balance.balance.amount,
          usdValue: balance.balance.usdValue,
          percentage: balance.balance.usdValue / totalBalances.value * 100,
        }));
      });

      const fetchAllBalances = async () => {
        await store.dispatch('balances/fetchAllBalances');
      };

      const keyword = computed(() => {
        return store.getters['balances/getKeyword'];
      });

      const onKeywordChanged = (newKeyword: string) => {
        store.dispatch('balances/filterAsset', {
          keyword: newKeyword
        })
      };

      const addresses = computed(() => {
        return store.getters['balances/getAddresses'];
      });

      const selectedAddresses = computed(() => {
        return store.getters['balances/getSelectedAddresses'];
      });

      const setSelectedAddresses = (newSelectedAddresses: string[]) => {
        store.dispatch('balances/setSelectedAddresses', {
          selectedAddresses: newSelectedAddresses
        } );
      }

      return {
        keyword,
        onKeywordChanged,
        totalBalances,
        mappedBalances,
        fetchAllBalances,
        addresses,
        selectedAddresses,
        setSelectedAddresses,
      }
    },
    methods: {
      formatBalance,
    }
  });
</script>
