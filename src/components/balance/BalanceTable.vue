<template>
  <v-data-table
    :headers="headers"
    :items="balances"
  >
    <template v-slot:item.asset="{ item }">
      <v-col class="px-0">
        <v-avatar
          size="36px"
        >
          <img
            alt="Avatar"
            :src="require(`@/assets/assets/${item.asset}.png`)"
          >
        </v-avatar>
        <strong class="ml-4">{{ item.asset }}</strong>
      </v-col>
    </template>
    <template v-slot:item.amount="{ item }">
      {{ formatBalance(item.amount) }}
    </template>
    <template v-slot:item.price="{ item }">
      ${{ formatBalance(item.price) }}
    </template>
    <template v-slot:item.usdValue="{ item }">
      ${{ formatBalance(item.usdValue) }} ({{ formatBalance(item.percentage) }}%)
    </template>
  </v-data-table>
</template>
<script lang="ts">
  import { defineComponent } from '@vue/composition-api';
  import { formatBalance } from "@/utils/format-balance";

  export default defineComponent({
    name: 'BalanceTable',
    props: ['balances'],
    data() {
      return {
        headers: [
          {
            text: 'Asset',
            value: 'asset',
          },
          {
            text: 'Amount',
            value: 'amount',
          },
          {
            text: 'Price (USD)',
            value: 'price',
          },
          {
            text: 'USD Value',
            value: 'usdValue',
            align: 'right',
          }
        ]
      }
    },
    methods: {
      formatBalance,
    }
  })
</script>